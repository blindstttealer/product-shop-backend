import { Response, Request, NextFunction } from "express";
import { RoleModel, UserModel } from "./schemas";
import * as z from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthenticateTokenMeRequest } from "./middleware";

const credsRegistrationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  username: z.string().min(2).optional(),
});

const credsLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export class AuthController {
  static async registration(req: Request, res: Response) {
    const meta = { ip: req.ip, userAgent: req.headers["user-agent"] };

    const { username, password, email } = credsRegistrationSchema.parse(
      req.body
    );

    const existingUser = await UserModel.findOne({ email: email });

    if (existingUser) {
      res.status(404);
      res.json({
        errorMessage: "Такой пользователь уже существует в базе данных",
      });
    }

    const userRole = await RoleModel.findOne({ role: "user" });
    const adminRole = await RoleModel.findOne({ role: "admin" });

    const hash = bcrypt.hashSync(password as string, 10);

    const user = await UserModel.create({
      userName: username,
      email: email,
      password: hash,
      roles: [userRole, adminRole],
    });

    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_ACCESS_SECRET!,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_REFRESH_SECRET!,
      { expiresIn: "30d" }
    );

    res.status(201).json({
      user: {
        id: user?._id,
        email: user.email,
        userName: user.userName,
      },
      token: {
        accessToken,
        refreshToken,
      },
      meta,
    });
  }

  static async login(req: Request, res: Response) {
    const { password, email } = credsLoginSchema.parse(req.body);

    const meta = { ip: req.ip, userAgent: req.headers["user-agent"] };

    const existingUser = await UserModel.findOne({ email: email });

    if (!existingUser) {
      res.status(400).json({
        error: "Пользователя с таким email не зарегистрирован",
      });
      return;
    }

    const isPasswordCorrect = bcrypt.compareSync(
      password as string,
      existingUser.password
    );

    if (isPasswordCorrect) {
      const accessToken = jwt.sign(
        { userId: existingUser._id },
        process.env.JWT_ACCESS_SECRET!,
        { expiresIn: "15m" }
      );

      const refreshToken = jwt.sign(
        { userId: existingUser._id },
        process.env.JWT_REFRESH_SECRET!,
        { expiresIn: "30d" }
      );

      res.status(201).json({
        user: {
          id: existingUser?._id,
          email: existingUser.email,
          userName: existingUser.userName,
        },
        token: {
          accessToken,
          refreshToken,
        },
        meta,
      });
    }
  }

  static async me(req: AuthenticateTokenMeRequest, res: Response) {
    const meta = { ip: req.ip, userAgent: req.headers["user-agent"] };
    const userId = req.userId;

    console.log("userId", userId);

    if (!userId) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        error: "User is not found",
      });
    }

    res.json({
      user: {
        id: user?._id,
        email: user?.email,
        userName: user?.userName,
      },
      meta,
    });
  }

  static async refresh(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body;

      console.log("refreshToken", refreshToken);

      if (!refreshToken) {
        return res.status(400).json({ error: "Refresh token is required" });
      }

      let payload: any;
      try {
        payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!);
      } catch (err) {
        return res.status(401).json({ error: "Invalid refresh token" });
      }

      const user = await UserModel.findById(payload.userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const newAccessToken = jwt.sign(
        { userId: user._id },
        process.env.JWT_ACCESS_SECRET!,
        { expiresIn: "15m" }
      );

      const newRefreshToken = jwt.sign(
        { userId: user._id },
        process.env.JWT_REFRESH_SECRET!,
        { expiresIn: "30d" }
      );

      res.json({
        user: {
          id: user._id,
          email: user.email,
          userName: user.userName,
        },
        token: {
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        },
        meta: { ip: req.ip, userAgent: req.headers["user-agent"] },
      });
    } catch (err) {
      console.error("Refresh error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

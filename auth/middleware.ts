import { NextFunction, Request, Response, RequestHandler } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export interface AuthenticateTokenMeRequest extends Request {
  userId?: JwtPayload | string;
}

export const checkAuthenticateTokenMiddleware = (
  req: AuthenticateTokenMeRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: "Authorization header missing" });
    }

    // Берём токен, убираем возможные лишние пробелы
    const token = authHeader.split(" ")[1]?.trim();

    if (!token) {
      return res.status(401).json({ error: "Token not provided" });
    }

    console.log("parsedToken middleware----", token, "length:", token.length);

    // Проверяем токен
    const payload = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET!,
    ) as jwt.JwtPayload & { userId: string };

    console.log("parsedTokenPayload", payload);

    // Добавляем userId в req
    req.userId = payload.userId;

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ error: "Token expired" });
    }

    if (error instanceof jwt.JsonWebTokenError) {
      console.log("JWT verify error:", error.message);
      return res.status(401).json({ error: "Invalid token" });
    }

    // Любая другая ошибка
    console.log("Middleware unexpected error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
// {
//   userId: '68b32c42e78490ec2fb386f6',
//   iat: 1756572775,
//   exp: 1756573675
// }

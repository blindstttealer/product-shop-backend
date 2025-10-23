import { Request, Response } from "express";
import { UserService } from "./service";

export class UserController {
  static async getUsers(req: Request, res: Response) {
    try {
      const users = await UserService.getUsers();
      res.json(users);
    } catch (e) {
      res.status(500);
      res.json("Ошибка 500 что делать? /users");
    }
  }

  static async getUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const currentUser = await UserService.getUser(id);
      res.json(currentUser);
    } catch (error) {
      res.status(500);
      res.json(`Ошибка 500 что делать? /users:id ${error}`);
    }
  }

  static async createUser(req: Request, res: Response) {
    try {
      const createdUser = await UserService.createUser(req.body);
      res.json(createdUser);
    } catch (error) {
      res.status(500);
      res.json(`Ошибка 500 что делать? /users:id ${error}`);
    }
  }

  static async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400);
        res.json(`нет айди, айди равен = ${id}`);
        return;
      }

      const updatedUser = await UserService.updateUser(id, req.body);
      res.json(updatedUser);
    } catch (error) {
      res.status(500);
      res.json(`Ошибка 500 /users:id PUT ${error}`);
    }
  }

  static async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400);
        res.json(` id is equal ${id}`);
      }

      const deletedUser = await UserService.deleteUser(id);

      if (!deletedUser) {
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json({
        success: true,
        message: "User deleted successfully",
        deletedUser,
      });
    } catch (error) {
      res.status(500);
      res.json(`Ошибка 500 /users:id delete ${error}`);
    }
  }
}

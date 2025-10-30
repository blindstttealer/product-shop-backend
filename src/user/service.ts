import { User } from "./schema";

export class UserService {
  static async getUsers() {
    const users = await User.find({});
    return users;
  }

  static async getUser(userId: string) {
    const currentUser = await User.findById(userId);
    return currentUser;
  }

  static async createUser(userBody: {
    name?: string;
    age: number;
    friends: string[];
  }) {
    const createdUser = new User(userBody);
    await createdUser.save();
    return createdUser;
  }

  static async updateUser(
    id: string,
    updateUserBody: { name?: string; age: number; friends: string[] }
  ) {
    const updatedUser = await User.findByIdAndUpdate(id, updateUserBody, {
      new: true,
    });
    await updatedUser?.save();
    return updatedUser;
  }

  static async deleteUser(userId: string) {
    const deletedUser = await User.findByIdAndDelete(userId, {
      new: true,
    });

    return deletedUser;
  }
}

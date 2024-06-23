import connectDatabase from "../..";
import UserModel from "../../models/User.model";

export interface User {
  clerkId: string;
  email: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
}

export const createUser = async (userData: User) => {
  try {
    await connectDatabase();

    const newUser = new UserModel(userData);
    await newUser.save();

    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);

    return null;
  }
};

export const getUserIdByClerkId = async (clerkId: string) => {
  try {
    const user = await UserModel.findOne({ clerkId }).select("_id").exec();

    return user ? user._id : null;
  } catch (error) {
    console.error("Error fetching user by clerk ID:", error);
    return null;
  }
};

export const isRedditFieldEmpty = async (clerkId: string) => {
  try {
    const userId = await getUserIdByClerkId(clerkId);

    if (!userId) {
      return false;
    }

    // Find the user document by user ID
    const user = await UserModel.findById(userId).select("reddits").exec();

    if (user && user.reddits.length === 0) {
      return true;
    }

    return false;
  } catch (error) {
    console.error("Error checking if reddits field is empty:", error);
    return false;
  }
};

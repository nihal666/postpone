import { Schema, models, Model, model, Types, SchemaTypes } from "mongoose";

interface IUser extends Document {
  clerkId: string;
  email: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
  reddits: Types.ObjectId[];
}

const userSchema: Schema<IUser> = new Schema({
  clerkId: { type: String, required: true, unique: true, index: true },
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  imageUrl: { type: String, required: true },
  reddits: [{ type: SchemaTypes.ObjectId, ref: "Reddit" }],
});

const UserModel: Model<IUser> = models.User || model("User", userSchema);

export default UserModel;

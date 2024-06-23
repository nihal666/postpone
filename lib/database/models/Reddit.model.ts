import {
  Document,
  Model,
  Schema,
  SchemaTypes,
  Types,
  model,
  models,
} from "mongoose";

interface IReddit extends Document {
  userName: string;
  redditorId: string;
  iconImage?: string;
  refreshToken: string;
  owner: Types.ObjectId;
}

const redditSchema = new Schema({
  username: { type: String, required: true, unique: true },
  redditorId: { type: String, required: true, unique: true, index: true },
  iconImage: { type: String, default: "" },
  refreshToken: { type: String, required: true, select: false },
  author: {
    type: SchemaTypes.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
});

const RedditModel: Model<IReddit> =
  models.Reddit || model<IReddit>("Reddit", redditSchema);

export default RedditModel;

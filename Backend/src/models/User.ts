import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  logintry: number;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    logintry: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<IUser>(
  "SiteSavedUser",
  userSchema
);

export default User;
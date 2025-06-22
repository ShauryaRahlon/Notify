import mongoose, { Document, Schema } from "mongoose";

interface friend {
  username: string;
  f_platform: string;
}
export interface User extends Document {
  username: string;
  password: string;
  email: string;
  isVerified: boolean;
  verifyCode: string;
  verifyCodeExpires: Date;
  resetCode?: string;
  resetCodeExpires?: Date;
  LeetCode?: boolean;
  CodeForces?: boolean;
  CodeChef?: boolean;
  emailNotifications?: boolean;
  browserNotifications?: boolean;
  pushNotifications?: boolean;
  friends?: friend[];
}

const UserSchema: Schema<User> = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    match: [
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      "Please use a valid email address",
    ],
  },
  password: { type: String, required: [true, "Password is required"] },
  verifyCode: { type: String },
  verifyCodeExpires: { type: Date },
  isVerified: { type: Boolean, default: false },
  resetCode: { type: String },
  resetCodeExpires: { type: Date },
  LeetCode: { type: Boolean, default: true },
  CodeForces: { type: Boolean, default: true },
  CodeChef: { type: Boolean, default: true },
  emailNotifications: { type: Boolean, default: true },
  browserNotifications: { type: Boolean, default: true },
  pushNotifications: { type: Boolean, default: false },
  friends: {
    type: [
      {
        username: { type: String },
        f_platform: { type: String },
      }
    ],
  },
});

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);
export default UserModel;

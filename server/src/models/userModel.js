import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      minLength: [3, "username must be minimum 3 character"],
      maxLength: [20, "username must be maximum 20 character"],
      required: true,
    },
    password: { type: String, required: true },
    role: { type: String, required: true },
  },
  { timestamps: true }
);

export const Users = mongoose.model("loginAndRegister", userSchema);

const mongoose = require("mongoose");
const uuid = require("uuid");

const UserSchema = new mongoose.Schema(
  {
    userCode: {
      type: String,
      unique: true,
      default: function genUUID() {
        return uuid.v1();
      },
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

UserSchema.index({ email: 1, password: 1 });
module.exports = mongoose.model("User", UserSchema);

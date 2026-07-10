const { createHmac, randomBytes } = require("crypto");
const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    salt: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) {
    return next();
  }

  const salt = randomBytes(16).toString();

  const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

  user.salt = salt;
  user.password = hashedPassword;

  next();
});

// Match password during login
userSchema.static("matchpass", async function (email, password) {
  const user = await this.findOne({ email });

  if (!user) {
    return false;
  }

  const userProvidedHash = createHmac("sha256", user.salt)
    .update(password)
    .digest("hex");

  if (userProvidedHash !== user.password) {
    return false;
  }

  return user;

  const token = createTokenForUser(user);

  return { user, token };
});

const User = model("User", userSchema);

module.exports = User;
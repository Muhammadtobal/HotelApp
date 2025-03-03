import { LogInSchema, singUpSchema } from "../middlewares/validate.js";
import { hashPassword, comparePasswords } from "../utils/hashing.js";
import jwt from "jsonwebtoken";
import prisma from "../prisma/client.js";
import { generateOtp, sendOtp } from "../helpers/senOtp.js";
import { storOtp, verfiyotpUser } from "./user.controller.js";
import passport from "passport";
export async function signUp(req, res, next) {
  try {
    const { name, email, password, isAdmin } = req.body;

    await singUpSchema.validateAsync({
      name,
      email,
      password,

      isAdmin,
    });

    const hashedPassword = await hashPassword(password, 12);
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,

        isAdmin,
      },
    });

    res.status(200).json({ message: "Success", data: newUser });
  } catch (error) {
    next(error);
  }
}

export async function logIn(req, res, next) {
  try {
    const { email, password } = req.body;

    await LogInSchema.validateAsync({ email, password });

    const userExist = await prisma.user.findUnique({ where: { email: email } });
    if (!userExist) {
      return res.status(402).json({ message: "User not found!" });
    }

    const isPasswordValid = await comparePasswords(
      password,
      userExist.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Incorrect password" });
    }
    const otp = generateOtp();
    await storOtp(userExist.id, otp);
    if (userExist.email) await sendOtp(userExist.email, otp);
    res.status(200).json({ message: "the OTP is send", userId: userExist.id });
  } catch (error) {
    next(error);
  }
}
export async function verfiyOtp(req, res, next) {
  try {
    const { id, otp } = req.body;
    const userExist = await prisma.user.findUnique({
      where: { id: Number(id) },
    });
    if (!userExist) throw new Error("User not found");
    const isVaild = await verfiyotpUser(id, otp);
    if (!isVaild) {
      throw new Error("Invalid OTP");
    }
    const token = generateToken(userExist);

    res
      .cookie("Authorization", "Bearer " + token, {
        expires: new Date(Date.now() + 8 * 3600000),
        httpOnly: process.env.NODE_ENV === "production",
        secure: process.env.NODE_ENV === "production",
      })
      .status(200)
      .json({ success: true, token, message: "Login SUCCESS" });
  } catch (error) {
    next(error);
  }
}
export function googleAuth(req, res, next) {
  passport.authenticate("google", { scope: ["profile", "email"] })(req, res, next);
}

export async function googleCallback(req, res, next) {
  passport.authenticate(
    "google",
    { failureRedirect: "/login" },
    async (err, user) => {
      if (err) return next(err);
      if (!user) return res.redirect("/login");
      try {

        const token = generateToken(user);

        res
          .cookie("Authorization", "Bearer " + token, {
            expires: new Date(Date.now() + 8 * 3600000),
            httpOnly: process.env.NODE_ENV === "production",
            secure: process.env.NODE_ENV === "production",
          })
          .status(200)
          .json({ success: true, token, message: "Login SUCCESS" });
      } catch (error) {
        next(error);
      }
    }
  )(req, res, next);
}
export async function logOut(req, res) {
  res
    .clearCookie("Authorization")
    .status(200)
    .json({ success: true, message: "Logout SUCCESS" });
}

function generateToken(user) {
  return jwt.sign(
    {
      email: user.email,
      isadmin: user.isadmin,
    },
    process.env.SECRET_TOKEN,
    { expiresIn: "8h", algorithm: "HS256" }
  );
}

import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

export const signup = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email: email });

        if (existingUser) {
            return res.status(400).send({ message: "User already exists" });
        }

        if (!usernameRegex.test(username)) {
            return res.status(400).send({ message: "Some characters are invalid" });
        }

        // Use BCrypt to encrypt the password and return the encrypted password
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        // Else create new user
        const user = await User.create({
            email: email,
            password: hashedPassword,
            username: username,
        });
        return res.status(201).send({ message: "User created successfully", user });
    } catch (error) {
        return res.status(500).send({ message: "Error Signing up", error: error });
    }
};

export const login = async (req: Request, res: Response) => {
    const { userId, password }: { userId: string; password: string } = req.body;

    try {
        let existingUser = undefined;
        if (userId.includes("@")) {
            // Check if user email exists and password is correct
            existingUser = await User.findOne({ email: userId });
        } else {
            // Check if username exists and password is correct
            existingUser = await User.findOne({ username: userId });
        }

        // User does not exist
        if (!existingUser) {
            return res.status(400).send({ message: "User Not found" });
        }

        // Compare the password entered by user
        const passwordMatched = await bcrypt.compare(
            password,
            existingUser.password
        );

        // Password does not match
        if (!passwordMatched) {
            return res.status(400).send({ message: "Wrong Password." });
        }

        // Password matches
        const jwtToken = jwt.sign(
            {
                _id: existingUser._id,
                email: existingUser.email,
            },
            process.env.JWT_KEY!,
            {
                expiresIn: "1d",
            }
        );

        res.cookie("token", jwtToken, {
            path: "/",
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // expires in 24 hours
            httpOnly: true,
            secure: true, // true if using HTTPS, false if using HTTP
            sameSite: "lax",
        });

        return res
            .status(200)
            .send({ message: "Logged in successfully", existingUser });
    } catch (error) {
        return res.status(500).send({ message: "Error Logging in", error: error });
    }
};

export const logout = (req: Request, res: Response) => {
    try {
        res.clearCookie("token", { path: "/" });

        return res.status(200).send({ message: "Logged out successfully" });
    } catch (error) {
        return res.status(500).send({ message: "Error Logging out", error: error });
    }
};

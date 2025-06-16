import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request: Request) {
    await dbConnect();
    try {
        const { username, email, password } = await request.json();
        const existingUserVerifiedByUsername = await UserModel.findOne({
            username,
            isVerified: true,
        })
        if (existingUserVerifiedByUsername) {
            return new Response(JSON.stringify({ success: false, message: "Username already exists" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }
        console.log("Existing user verified by username:", existingUserVerifiedByUsername);
        const existingUserByEmail = await UserModel.findOne({
            email
        });
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
        if (existingUserByEmail) {
            if (existingUserByEmail.isVerified) {
                return new Response(JSON.stringify({ success: false, message: "Email already exists" }), {
                    status: 400,
                    headers: { "Content-Type": "application/json" },
                });
            }
            else {
                const hashedPassword = await bcrypt.hash(password, 10);
                existingUserByEmail.password = hashedPassword;
                existingUserByEmail.verifyCode = verifyCode;
                const expiryDate = new Date();
                expiryDate.setHours(expiryDate.getHours() + 1);
                existingUserByEmail.verifyCodeExpires = expiryDate;
                await existingUserByEmail.save();
            }
        }
        else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1);
            const newUser = new UserModel({
                username,
                password: hashedPassword,
                email,
                verifyCode,
                verifyCodeExpires: expiryDate,
                isVerified: false,
            });
            await newUser.save();
        }
        console.log("User created or updated successfully");
        const EmailResponse = await sendVerificationEmail(email, username, verifyCode);
        if (!EmailResponse.success) {
            return new Response(JSON.stringify({ success: false, message: EmailResponse.message }), {
                status: 500,
                headers: { "Content-Type": "application/json" },
            });
        }
        return new Response(JSON.stringify({ success: true, message: "User created successfully. Please check your email for verification" }), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error connecting to the database:", error);
        return new Response(JSON.stringify({ success: false, message: "Database connection error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
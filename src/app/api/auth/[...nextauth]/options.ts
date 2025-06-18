import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";
import { Types } from "mongoose";

interface Credentials {
    identifier: string;
    password: string;
}
export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                identifier: { label: "Email or Username", type: "text", placeholder: "Enter your email or username" },
                password: { label: "Password", type: "password", placeholder: "Enter your password" }
            },
            async authorize(credentials: Credentials | undefined): Promise<User> {
                await dbConnect();
                try {
                    if (!credentials) {
                        throw new Error('No credentials provided');
                    }
                    const user = await UserModel.findOne({
                        $or: [
                            { email: credentials.identifier },
                            { username: credentials.identifier }
                        ]
                    })
                    if (!user) {
                        throw new Error('No user found with this email');
                    }
                    if (!user.isVerified) {
                        throw new Error('Please verify your account before login');
                    }
                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
                    if (isPasswordCorrect) {
                        return {
                            id: (user._id as Types.ObjectId).toString(),
                            _id: (user._id as Types.ObjectId).toString(),
                            email: user.email,
                            username: user.username,
                            isVerified: user.isVerified,
                            acceptingContest: user.acceptingContest
                        };
                    }
                    else {
                        throw new Error('Incorrect Password');
                    }
                } catch (error: unknown) {
                    if (error instanceof Error) {
                        throw new Error(error.message);
                    }
                    throw new Error("An unknown error occurred.");
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token._id = user._id;
                token.isVerified = user.isVerified;
                token.username = user.username;
                token.acceptingContest = user.acceptingContest;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user._id = token._id;
                session.user.isVerified = token.isVerified;
                session.user.username = token.username;
                session.user.acceptingContest = token.acceptingContest;
            }
            return session;
        }
    },
    pages: {
        signIn: '/sign-in'
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
    },
    secret: process.env.NEXTAUTH_SECRET,
}
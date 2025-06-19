'use server'
import dbConnect from "@/lib/dbConnect"
import ContestModel from "@/model/Contest"
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await dbConnect();
        const contests = await ContestModel.find();
        return NextResponse.json({ success: true, message: contests }, { status: 200 });
    } catch (error) {
        console.error('Error fetching contests:', error);
        return NextResponse.json({ success: false, message: "Failed to fetch contests." }, { status: 500 });
    }
}
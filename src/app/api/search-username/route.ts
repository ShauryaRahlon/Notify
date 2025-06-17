import { LeetCode } from "leetcode-query";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username");
    if (!username) {
      return NextResponse.json(
        { success: false, message: "Username is required." },
        { status: 400 }
      );
    }
    if (username.length < 3 || username.length > 15) {
      return NextResponse.json(
        {
          success: false,
          message: "Username must be between 3 and 15 characters.",
        },
        { status: 400 }
      );
    }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Username can only contain letters, numbers, and underscores.",
        },
        { status: 400 }
      );
    }
    const leetcode = new LeetCode();
    const user = await leetcode.user(username);
    console.log("User data:", user);

    return Response.json({ success: true, message: user }, { status: 200 });
  } catch (error) {
    console.error("Error checking username:", error);
    return Response.json(
      { success: false, message: "Failed to check username." },
      { status: 500 }
    );
  }
}

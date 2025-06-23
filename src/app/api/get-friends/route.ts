import { NextResponse,NextRequest } from "next/server";
import UserModel from "@/model/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import { LeetcodeResponse } from "@/types/LeetcodeResponse";
import { CodeforcesResponse } from "@/types/CodeforcesResponse";
import axios from "axios";
interface Friend {
    username: string;
  f_platform: string;
  
}

interface FriendsDetails{
  user:LeetcodeResponse | CodeforcesResponse;
}


export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ success:false,message: "Unauthorized" }, { status: 401 });
  }

  try {
    await dbConnect();
    const user = await UserModel.findById(session.user._id);
    if (!user) {
      return NextResponse.json({ success:false,message:"User not found" }, { status: 404 });
    }
    const friends: Friend[] = (user.friends ?? []).map((friend: any) => ({
      username: friend.username,
      f_platform: friend.f_platform
    }));
    if( friends.length === 0) {
    return NextResponse.json({ success:true,message:friends });
    }else{
      const friendsDetails: FriendsDetails[] = [];
      for (const friend of friends) {
        let userData: LeetcodeResponse | CodeforcesResponse | null = null;
        if (friend.f_platform === "leetcode") {
          try {
            const response = await axios.get<LeetcodeResponse>(`https://leetcode-stats.tashif.codes/${friend.username}/profile`);
            userData = response.data;
          } catch (error) {
            console.error(`Error fetching LeetCode data for ${friend.username}:`, error);
          }
        } else if (friend.f_platform === "codeforces") {
          try {
            const response = await axios.get<CodeforcesResponse>(`https://codeforces-stats.tashif.codes/${friend.username}`);
            userData = response.data;
          } catch (error) {
            console.error(`Error fetching Codeforces data for ${friend.username}:`, error);
          }
        }
        if (userData) {
          friendsDetails.push({ user: userData });
        }
      }
      return NextResponse.json({ success:true,message:friendsDetails });
    }
  } catch (error) {
    return NextResponse.json({ success:false,message: "Internal Server Error" }, { status: 500 });
  }
}
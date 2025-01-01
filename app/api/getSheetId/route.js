import connectionToDatabase from "@/lib/db";
import { NextResponse } from "next/server";
import List from "@/models/List";

export async function POST(request){
    try {
        await connectionToDatabase();
        const {domain}=await request.json();
        const list=await List.findOne({domain});
        return NextResponse.json({sheetId:list?.sheet_id},{status:201});
    } catch (error) {
        console.log(error)
    }
}
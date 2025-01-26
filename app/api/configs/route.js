import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function POST(request) {
    const {range,sheetId}=await request.json();
    const auth=new google.auth.GoogleAuth({
        credentials:{
            client_email:process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            private_key:process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g,"\n")
        },
        scopes:["https://www.googleapis.com/auth/spreadsheets.readonly"]
    })

    const sheets=google.sheets({version:"v4",auth:await auth.getClient()})
    //const range="Sheet1!A:Z"
    try{
        const response=await sheets.spreadsheets.values.get({
            spreadsheetId:sheetId,
            range
        })
        let filterdata=response.data.values;
        // filterdata=filterdata.slice(1,31);
        return NextResponse.json(filterdata,{status:200});
    }
    catch(error){
        console.log(error);
    }
}
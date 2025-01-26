import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function POST(request,{params}) {
    const {sheetId}=await request.json();
    const searchValue=params.city.replaceAll('-',' ');
    const auth=new google.auth.GoogleAuth({
        credentials:{
            client_email:process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            private_key:process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g,"\n")
        },
        scopes:["https://www.googleapis.com/auth/spreadsheets"]
    })

    const sheets=google.sheets({version:"v4",auth:await auth.getClient()})
    
    try{
        const response=await sheets.spreadsheets.values.get({
            spreadsheetId:sheetId,
            range:'Snapshot - Pages!A:C'
        })
        
        const data= response.data.values;
        let filterdata=data.filter((row)=>row[0]==searchValue)
        filterdata=filterdata?.[0]?.[1]
        console.log(filterdata);
        return NextResponse.json(filterdata);
    }
    catch(error){
        console.log(error);
    }
}
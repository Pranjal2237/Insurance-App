import axios from 'axios';
import { NextResponse } from 'next/server';

const cache = new Map();

export async function middleware(req) {
  const hostname = req.headers.get('host');
  const url = req.nextUrl.clone();
  let origin=url?.origin;
  origin=origin.split("//");
  origin=origin[1];
   if (cache.has(hostname)) {
    console.log("working");
    url.searchParams.set('sheetId',cache.get(hostname));
  }
  else{
  const response = await axios.post(`http://${origin}/api/getSheetId`,{domain:hostname});
  const { sheetId } =response.data;
  cache.set(hostname,sheetId);
  url.searchParams.set('sheetId', sheetId);
}
  url.searchParams.set("url",origin);
  return NextResponse.rewrite(url);
}

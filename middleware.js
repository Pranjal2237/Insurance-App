import axios from 'axios';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const hostname = req.headers.get('host');
  const url = req.nextUrl.clone();
  let origin=url?.origin;
  origin=origin.split("//");
  origin=origin[1];
  const response = await axios.post(`http://${origin}/api/getSheetId`,{domain:hostname});
  const { sheetId } =response.data;
  url.searchParams.set('sheetId', sheetId);
  url.searchParams.set("url",origin);
  return NextResponse.rewrite(url);
}

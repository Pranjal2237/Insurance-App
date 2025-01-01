import axios from 'axios';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const hostname = req.headers.get('host');
  const url = req.nextUrl.clone();
  const response = await axios.post(`${url.origin}/api/getSheetId`,{domain:hostname});

  const { sheetId } =response.data;
  url.searchParams.set('sheetId', sheetId);
  return NextResponse.rewrite(url);
}

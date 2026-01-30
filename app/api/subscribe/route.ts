import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const { email } = await request.json(); 
    console.log(email); // xx@qq.com
    
    const resend = new Resend(process.env.RESEND_API_KEY);
    // save to contact list
    // 1. create an account
    

    // // 2. add account to contact list


}
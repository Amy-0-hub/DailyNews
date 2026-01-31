import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const { email } = await request.json(); 
    console.log(email);
    
    const resend = new Resend(process.env.RESEND_API_KEY);
    // save to contact list
    // 1. create an account
    const { error:createError } = await resend.contacts.create({
        email: email,
    })
    if (createError) {
        return NextResponse.json({ error: createError.message }, { status: 500 })
    };
    

    // // 2. add account to contact list
    const { error: addError } = await resend.contacts.segments.add({
        email: email,
        segmentId: '0a78ac32-2782-42f3-a0b7-7e5169f1baaa',
    })
    if (addError) {
        return NextResponse.json({ error: addError.message }, { status: 500 })
    }

    return NextResponse.json({ message: 'Subscribed successfully'}, { status: 200 })
}
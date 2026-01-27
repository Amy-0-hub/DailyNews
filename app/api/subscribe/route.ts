import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const { email } = await request.json(); 
    console.log(email); // xx@qq.com

    const resend = new Resend(process.env.RESEND_API_KEY);

    // save to contact list
    // 1. create an account
    const {error: createError} = await resend.contacts.create ({
        email: email,
    })

    if (createError) {
        console.log(createError);
        return NextResponse.json({ error: createError.message }, { status: 500 });
    }

    // 2. add account to contact list
    const {error: addError} = await resend.contacts.segments.add ({
        email: email,
        segmentId: '4b9a3a1f-d1c6-4ef5-8692-5f1d29558bd4',
    })
    
    if (addError) {
        console.log(addError);
        return NextResponse.json({ error: addError.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Subscribed successfully' }, { status: 200 });
}
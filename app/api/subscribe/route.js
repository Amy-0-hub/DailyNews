export async function POST(request) {
    const { email } = await request.json();
    console.log(email);
    return new Response('OK', { status:200 });
}

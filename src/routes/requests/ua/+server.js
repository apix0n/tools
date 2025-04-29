export async function GET({ request }) {
    const ua = request.headers.get('user-agent');

    return new Response(ua, {
        status: 200,
        headers: {
            'Content-Type': 'text/plain'
        }
    });
}
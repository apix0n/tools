export async function GET({ request }) {
    // Get IP from headers or connection info
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]
        || request.headers.get('x-real-ip')
        || request.headers.get('cf-connecting-ip')
        || request.headers.get('x-client-ip')
        || request.headers.get('x-forwarded')
        || request.headers.get('forwarded-for')
        || '0.0.0.0';

    // Return response with plain text IP
    return new Response(ip, {
        status: 200,
        headers: {
            'Content-Type': 'text/plain'
        }
    });
}
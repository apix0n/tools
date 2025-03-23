export async function fallback({ request }) {
    // Convert headers object to formatted string
    const headerString = Array.from(request.headers.entries())
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n');

    // Return response with plain text headers
    return new Response(headerString, {
        status: 200,
        headers: {
            'Content-Type': 'text/plain'
        }
    });
}
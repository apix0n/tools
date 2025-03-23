export async function fallback({ request }) {
    const requestInfo = {
        method: request.method,
        url: request.url,
        headers: Object.fromEntries(request.headers.entries())
    };

    const cookieHeader = request.headers.get('cookie');
    if (cookieHeader) {
        requestInfo.cookies = Object.fromEntries(
            cookieHeader.split(';')
                .map(cookie => cookie.trim().split('='))
                .map(([key, value]) => [key, decodeURIComponent(value)])
        );
    }

    try {
        const contentType = request.headers.get('content-type');
        if (contentType) {
            if (contentType.includes('application/json')) {
                requestInfo.body = await request.json();
            } else if (contentType.includes('application/x-www-form-urlencoded')) {
                const formData = await request.formData();
                requestInfo.body = Object.fromEntries(formData);
            } else {
                requestInfo.body = await request.text();
            }
        }
    } catch (error) {
        requestInfo.body = undefined;
    }

    const requestString = JSON.stringify(requestInfo, null, 2);

    return new Response(requestString, {
        status: 200,
        headers: {
            'Content-Type': 'text/plain'
        }
    });
}
export function GET(){
    return new Response(new Date().toISOString(), {
        status: 200,
        headers: {
            'Content-Type': 'text/plain'
        }
    });
}
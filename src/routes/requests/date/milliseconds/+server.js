export function GET(){
    return new Response(new Date().getTime(), {
        status: 200,
        headers: {
            'Content-Type': 'text/plain'
        }
    });
}
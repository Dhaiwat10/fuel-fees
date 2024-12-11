// only re-fetch once every day
export async function GET() {
    const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd", { 
        next: {
            revalidate: 86400
        }
    });
    const data = await response.json();
    return Response.json(data);
}
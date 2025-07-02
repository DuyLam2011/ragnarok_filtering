import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch(
      'https://api.roarkaik.asia/arkaik/database/items?language=en&filterType[]=%7B%22code%22:6,%22name%22:%22Card%22%7D',
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Origin': 'https://ragnarok-filtering.vercel.app'
        },
        cache: 'no-store'
      }
    );

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    
    // Add CORS headers to the response
    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  } catch (error) {
    console.error('Error fetching cards:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Failed to fetch cards', message: error instanceof Error ? error.message : 'Unknown error' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      }
    );
  }
}

// Handle OPTIONS requests (CORS preflight)
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  });
}

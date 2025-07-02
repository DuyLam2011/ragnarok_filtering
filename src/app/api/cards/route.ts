import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch(
      'https://api.roarkaik.asia/arkaik/database/items?language=en&filterType[]=%7B%22code%22:6,%22name%22:%22Card%22%7D',
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch cards', message: error },
      { status: 500 }
    );
  }
}

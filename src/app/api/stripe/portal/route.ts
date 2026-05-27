import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST() {
  return NextResponse.json(
    {
      error:
        'Subscription management is temporarily unavailable while we prepare 1:1 booking.',
    },
    { status: 410 }
  );
}

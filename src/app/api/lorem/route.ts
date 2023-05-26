import { NextRequest, NextResponse } from 'next/server';

export async function GET(_request: NextRequest): Promise<NextResponse> {
    await delay(5000)
    const body = ['lorem', 'ipsum', 'dolor', 'sit', 'amet']
    return NextResponse.json(body)
}

function delay(ms: number): Promise<void> {
    return new Promise<void>((resolve, _) => {
        setTimeout(resolve, ms)
    })
}

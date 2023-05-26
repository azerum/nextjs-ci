import { baseUrl } from '@/base-url';

export async function useLorem() {
    const response = await fetch(`${baseUrl}/api/lorem`, { cache: 'no-store' })
    const body = await response.json()

    return body as string[]
}

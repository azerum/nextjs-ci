import { baseUrl } from '@/base-url'
import { useLorem } from '@/hooks/useLorem'
import fetchMock from "fetch-mock-jest"

beforeEach(() => {
    fetchMock.reset()
})

test('makes request to API', async () => {
    const endpoint = `${baseUrl}/api/lorem`
    const expectedBody = ['a', 'b', 'c']

    fetchMock.get(endpoint, {
        body: expectedBody,
        status: 200
    })

    const body = await useLorem()
    
    expect(fetchMock).toHaveFetched(endpoint)
    expect(body).toMatchObject(expectedBody)
})

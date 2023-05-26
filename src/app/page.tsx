
import { useLorem } from '@/hooks/useLorem'

export default async function Home() {
  const words = await useLorem()

  return <ul>
    {words.map((w) => <li key={w}>{w}</li>)}
  </ul>
}

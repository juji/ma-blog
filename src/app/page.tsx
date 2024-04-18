
export default async function Home() {

  const res = await fetch(
    (process.env.GHOST_URL as string) +
    '/ghost/api/content/posts/?key=' +
    (process.env.GHOST_KEY as string)
  )
  const data = await res.json()


  return (
    <main>
      <p>This is one</p>
      <pre>{JSON.stringify(data,null,2)}</pre>
    </main>
  );
}


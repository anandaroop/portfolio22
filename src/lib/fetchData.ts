export async function fetchData(
  query: string,
  variables: Record<string, unknown> = {}
) {
  const res = await fetch("http://localhost:3001", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  })

  const json = await res.json()

  if (res.ok) {
    return json
  } else {
    console.error(res.status, res.statusText)
    throw new Error(JSON.stringify(json.errors))
  }
}

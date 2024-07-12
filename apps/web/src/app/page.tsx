import { hc } from "hono/client";
import { AppType } from "@lmsgenie/api/src";

const client = hc<AppType>("http://localhost:5500/");

export default async function Home() {
  // const res = await client.posts.$post({
  //   form: {
  //     title: "Hello",
  //     description: "Hono is a cool project",
  //   },
  // });

  const res = await client.index.$get();

  const data = await res.json();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>{data.data}</p>
    </main>
  );
}

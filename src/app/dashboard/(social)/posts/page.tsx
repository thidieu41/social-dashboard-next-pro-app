export default async function Home() {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // delay 2s
  return <h1>Home Page</h1>;
}
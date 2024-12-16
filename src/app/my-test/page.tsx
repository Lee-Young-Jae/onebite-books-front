import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("review");

  return <div>{cookie?.value}</div>;
}

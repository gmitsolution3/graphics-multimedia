export async function getServices() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/services`, {
    cache: "no-store",
  });

  return res.json();
}
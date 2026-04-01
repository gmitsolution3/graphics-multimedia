export async function getServices() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/services`,
    {
      next: { revalidate: 300 },
    },
  );

  return res.json();
}

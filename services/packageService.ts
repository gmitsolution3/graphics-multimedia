export async function getPackages() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/packages`, {
    cache: "no-store",
  });

  return res.json();
}
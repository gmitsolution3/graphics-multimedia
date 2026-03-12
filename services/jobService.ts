export async function getJobPostings() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/job-postings`, {
    cache: "no-store",
  });

  return res.json();
}
import { Suspense } from "react"
import JobApplicationPage from "./JobApplicationPage"

export default function JobApplicationPageWrapper() {
  return (
    <Suspense fallback={"Loading..."}>
      <JobApplicationPage />
    </Suspense>
  )
}

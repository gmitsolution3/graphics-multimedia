import { Suspense } from "react";
import LoginPage from "./LoginPage";

export default function LoginPageWrapper() {
  return (
    <Suspense fallback={"Loading..."}>
      <LoginPage />
    </Suspense>
  );
}

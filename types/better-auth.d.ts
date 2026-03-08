import "better-auth";

declare module "better-auth" {
  interface User {
    role: "admin" | "user";
  }

  interface Session {
    user: {
      role: "admin" | "user";
    };
  }
}
export type AppUser = {
  id: string;
  name: string;
  email: string;
  phone: string;
  image?: string | null;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  role: "admin" | "user";
};

export type AppSession = {
  user: AppUser;
};

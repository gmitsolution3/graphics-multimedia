import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI!);

export const auth = betterAuth({
  database: mongodbAdapter(client.db()),

  emailAndPassword: {
    enabled: true,
  },

  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "user",
        input: false,
      },

      phone: {
        type: "string",
        defaultValue: "",
        input: true,
      },

      image: {
        type: "string",
        defaultValue: "",
        input: true,
      },
    },
  },

  session: {
    additionalFields: {
      role: {
        type: "string",
      },

      phone: {
        type: "string",
      },

      image: {
        type: "string",
      },
    },
  },

  secret: process.env.BETTER_AUTH_SECRET!,
});

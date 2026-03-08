"use client";

import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/assets/logo.png";
import { notify } from "@/utils/toast";
import { useRouter } from "next/navigation";

// Validation schema
const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be less than 50 characters"),
    email: z
      .string()
      .email("Please enter a valid email address")
      .min(1, "Email is required"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /[A-Z]/,
        "Password must contain at least one uppercase letter",
      )
      .regex(
        /[a-z]/,
        "Password must contain at least one lowercase letter",
      )
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z
      .string()
      .min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setServerError(null);

    try {
      const res = await authClient.signUp.email({
        email: data.email,
        password: data.password,
        name: data.name,
      });

      if (res?.error) {
        notify.error(res.error.message as string);
        return;
      }

      if (res?.data?.token) {
        notify.success("Registration successful. Login to continue.");

        router.replace("/login");
      }
    } catch (error: any) {
      setServerError(
        error.message || "Registration failed. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-card flex flex-col items-center justify-center p-4 relative">
      {/* Corner accents */}
      <div className="fixed top-0 left-0 w-24 h-24 border-l border-t border-primary/5 pointer-events-none"></div>
      <div className="fixed top-0 right-0 w-24 h-24 border-r border-t border-primary/5 pointer-events-none"></div>
      <div className="fixed bottom-0 left-0 w-24 h-24 border-l border-b border-primary/5 pointer-events-none"></div>
      <div className="fixed bottom-0 right-0 w-24 h-24 border-r border-b border-primary/5 pointer-events-none"></div>

      {/* Main container */}
      <div className="w-full max-w-md">
        {/* Logo and header */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-block mb-6 group">
            <div className="w-32 mx-auto opacity-80 group-hover:opacity-100 transition-opacity">
              <Image
                src={Logo}
                alt="Logo"
                width={120}
                height={40}
                className="w-full h-auto"
              />
            </div>
          </Link>

          <div className="inline-block">
            <div className="w-12 h-0.5 bg-primary mx-auto mb-4"></div>
          </div>

          <h2 className="text-2xl lg:text-3xl font-light tracking-tight mb-2">
            Create an account
          </h2>

          <p className="text-sm opacity-60">
            Join us to start your journey
          </p>
        </div>

        {/* Register Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Server error message */}
          {serverError && (
            <div className="p-4 border border-red-500/20 bg-red-500/5">
              <p className="text-xs text-red-500/80 text-center">
                {serverError}
              </p>
            </div>
          )}

          {/* Name Field */}
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-xs tracking-wide opacity-40 flex items-center gap-2"
            >
              <User className="w-3.5 h-3.5" />
              Full name *
            </label>
            <div className="relative">
              <input
                id="name"
                type="text"
                {...register("name")}
                className={`w-full bg-transparent border-b py-3 text-sm opacity-80 focus:opacity-100 focus:border-primary/60 outline-none transition-all duration-300 pr-8 ${
                  errors.name
                    ? "border-red-500/50"
                    : "border-border/60"
                }`}
                placeholder="John Doe"
              />
            </div>
            {errors.name && (
              <p className="text-xs text-red-500/70 mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-xs tracking-wide opacity-40 flex items-center gap-2"
            >
              <Mail className="w-3.5 h-3.5" />
              Email address *
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                {...register("email")}
                className={`w-full bg-transparent border-b py-3 text-sm opacity-80 focus:opacity-100 focus:border-primary/60 outline-none transition-all duration-300 pr-8 ${
                  errors.email
                    ? "border-red-500/50"
                    : "border-border/60"
                }`}
                placeholder="john@example.com"
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-500/70 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-xs tracking-wide opacity-40 flex items-center gap-2"
            >
              <Lock className="w-3.5 h-3.5" />
              Password *
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className={`w-full bg-transparent border-b py-3 text-sm opacity-80 focus:opacity-100 focus:border-primary/60 outline-none transition-all duration-300 pr-8 ${
                  errors.password
                    ? "border-red-500/50"
                    : "border-border/60"
                }`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-1/2 -translate-y-1/2 opacity-40 hover:opacity-100 transition-opacity"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-500/70 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-2">
            <label
              htmlFor="confirmPassword"
              className="block text-xs tracking-wide opacity-40 flex items-center gap-2"
            >
              <Lock className="w-3.5 h-3.5" />
              Confirm password *
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword")}
                className={`w-full bg-transparent border-b py-3 text-sm opacity-80 focus:opacity-100 focus:border-primary/60 outline-none transition-all duration-300 pr-8 ${
                  errors.confirmPassword
                    ? "border-red-500/50"
                    : "border-border/60"
                }`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className="absolute right-0 top-1/2 -translate-y-1/2 opacity-40 hover:opacity-100 transition-opacity"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-xs text-red-500/70 mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Password requirements hint */}
          <div className="text-[10px] opacity-30 space-y-1">
            <p>Password must contain:</p>
            <ul className="list-disc list-inside pl-2">
              <li>At least 8 characters</li>
              <li>One uppercase letter</li>
              <li>One lowercase letter</li>
              <li>One number</li>
            </ul>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              disabled={isLoading || isSubmitting}
              className="relative overflow-hidden group w-full bg-transparent border border-border/60 hover:border-primary/50 text-foreground uppercase text-xs tracking-[0.2em] px-8 py-6 rounded-none transition-all duration-500 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isLoading ? "Creating account..." : "Create account"}
                {!isLoading && (
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                )}
              </span>
              <div className="absolute inset-0 bg-primary/5 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
            </Button>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/40"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-4 bg-card text-xs opacity-30">
                or
              </span>
            </div>
          </div>

          {/* Login link */}
          <p className="text-center text-xs opacity-40">
            Already have an account?{" "}
            <Link
              href="/login"
              className="opacity-60 hover:opacity-100 hover:text-primary transition-all border-b border-transparent hover:border-primary/30 pb-0.5"
            >
              Sign in
            </Link>
          </p>
        </form>

        {/* Bottom accent */}
        <div className="text-center mt-10">
          <span className="text-[10px] tracking-[0.3em] uppercase opacity-30">
            Secure registration
          </span>
        </div>
      </div>
    </div>
  );
}

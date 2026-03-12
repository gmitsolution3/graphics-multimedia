"use client";

import { useState, useEffect } from "react";
import { useAppSession } from "@/lib/auth-client";
import { ImageUploader } from "@/components/image-uploader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2, User, Lock, Phone, Camera } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { notify } from "@/utils/toast";
import { usePatch } from "@/hooks/swr/usePatch";

// Profile form schema
const profileFormSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[0-9+\-\s]+$/, "Please enter a valid phone number"),
  image: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// Password form schema
const passwordFormSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, "Current password is required")
      .min(8, "Password must be at least 8 characters"),
    newPassword: z
      .string()
      .min(1, "New password is required")
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
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type PasswordFormValues = z.infer<typeof passwordFormSchema>;

export default function ProfilePage() {
  const { data: session, refetch } = useAppSession();
  const [loading, setLoading] = useState({
    profile: false,
    password: false,
  });

  const { updateItem: updateProfile, isUpdating: isProfileUpdating } =
    usePatch("/api/user/update");

  // Profile form
  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      image: "",
    },
  });

  // Password form
  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Initialize profile form from session
  useEffect(() => {
    if (session?.user) {
      profileForm.reset({
        name: session.user.name || "",
        phone: session.user.phone || "",
        image: session.user.image || "",
      });
    }
  }, [session, profileForm]);

  // Handle profile update
  async function onProfileSubmit(values: ProfileFormValues) {
    setLoading((prev) => ({ ...prev, profile: true }));

    try {
      const res = await fetch("/api/user/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (res.ok) {
        await refetch();
        notify.success("Profile updated successfully!");
      } else {
        notify.error(data.message || "Failed to update profile");
      }
    } catch (error: any) {
      notify.error(error.message || "Something went wrong!");
    } finally {
      setLoading((prev) => ({ ...prev, profile: false }));
    }
  }

  // Handle password update
  async function onPasswordSubmit(values: PasswordFormValues) {
    setLoading((prev) => ({ ...prev, password: true }));

    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        notify.success("Password updated successfully!");
        passwordForm.reset();
      } else {
        notify.error(data.message || "Failed to update password");
      }
    } catch (error: any) {
      notify.error(error.message || "Something went wrong!");
    } finally {
      setLoading((prev) => ({ ...prev, password: false }));
    }
  }

  if (!session) {
    return (
      <section className="container mx-auto px-5 lg:px-0 py-8">
        <Card className="p-8 text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading profile...</p>
        </Card>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-5 lg:px-0 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          Profile Settings
        </h1>
        <p className="text-sm text-muted-foreground mt-1.5">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Main Content */}
      <Card className="overflow-hidden border shadow-sm p-6">
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full max-w-[400px] grid-cols-2">
            <TabsTrigger value="profile" className="gap-2">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="password" className="gap-2">
              <Lock className="h-4 w-4" />
              Password
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Form {...profileForm}>
              <form
                onSubmit={profileForm.handleSubmit(onProfileSubmit)}
                className="space-y-6"
              >
                {/* Image Upload */}
                <FormField
                  control={profileForm.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Profile Picture</FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            {field.value ? (
                              <img
                                src={field.value}
                                alt="Profile"
                                className="h-24 w-24 rounded-full object-cover border-2 border-muted"
                              />
                            ) : (
                              <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center border-2 border-muted">
                                <Camera className="h-8 w-8 text-muted-foreground" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <ImageUploader
                              value={field.value}
                              onChange={field.onChange}
                            />
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Name */}
                <FormField
                  control={profileForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Enter your full name"
                            className="pl-9"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Phone */}
                <FormField
                  control={profileForm.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Enter your phone number"
                            className="pl-9"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email (read-only) */}
                <div className="space-y-2">
                  <FormLabel>Email Address</FormLabel>
                  <div className="relative">
                    <div className="absolute left-3 top-2.5">
                      <span className="text-muted-foreground">
                        ✉️
                      </span>
                    </div>
                    <Input
                      value={session.user.email || ""}
                      disabled
                      className="pl-9 bg-muted"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Email cannot be changed
                  </p>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={loading.profile}
                  className="w-full sm:w-auto"
                >
                  {loading.profile ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Updating...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </form>
            </Form>
          </TabsContent>

          {/* Password Tab */}
          <TabsContent value="password" className="space-y-6">
            <Form {...passwordForm}>
              <form
                onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
                className="space-y-6"
              >
                {/* Current Password */}
                <FormField
                  control={passwordForm.control}
                  name="currentPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="password"
                            placeholder="Enter your current password"
                            className="pl-9"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* New Password */}
                <FormField
                  control={passwordForm.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="password"
                            placeholder="Enter your new password"
                            className="pl-9"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Confirm Password */}
                <FormField
                  control={passwordForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm New Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="password"
                            placeholder="Confirm your new password"
                            className="pl-9"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password Requirements */}
                <Card className="bg-muted/50 p-4">
                  <h4 className="text-sm font-medium mb-2">
                    Password Requirements:
                  </h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li className="flex items-center gap-2">
                      <span className="text-green-600">✓</span> At
                      least 8 characters long
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-600">✓</span> At
                      least one uppercase letter
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-600">✓</span> At
                      least one lowercase letter
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-600">✓</span> At
                      least one number
                    </li>
                  </ul>
                </Card>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={loading.password}
                  className="w-full sm:w-auto"
                >
                  {loading.password ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Updating Password...
                    </>
                  ) : (
                    "Change Password"
                  )}
                </Button>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </Card>
    </section>
  );
}

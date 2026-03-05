"use client";

import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useGetServices } from "@/hooks/swr/useGetServices";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, PlusCircle, PackageX } from "lucide-react";
import { usePost } from "@/hooks/swr/usePost";
import PackageServiceSkeleton from "./../../../../../components/loaders/PackageServiceSkeleton";
import { notify } from "./../../../../../utils/toast";

const packageFormSchema = z.object({
  name: z.string().min(1, "Name is required").trim(),
  description: z.string().min(1, "Description is required"),
  price: z
    .number()
    .min(0, "Price must be greater than or equal to 0"),
  period: z.string().min(1, "Period is required"),
  services: z
    .array(
      z.object({
        name: z.string().min(1, "Service name is required"),
        included: z.boolean(),
      }),
    )
    .min(1, "At least one service is required"),
  cta: z.string().min(1, "CTA is required"),
  popular: z.boolean(),
});

type PackageFormData = z.infer<typeof packageFormSchema>;

export default function AddNewPackagePage() {
  const { data, isLoading: isServicesLoading } = useGetServices();
  const { createItem, isCreating } = usePost("/packages");

  const router = useRouter();

  const services = data?.data || [];

  const form = useForm<PackageFormData>({
    resolver: zodResolver(packageFormSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      period: "monthly",
      services: [],
      cta: "Get Started",
      popular: false,
    },
  });

  useEffect(() => {
    if (services.length > 0) {
      form.setValue(
        "services",
        services.map((service: any) => ({
          name: service.name,
          included: false,
        })),
      );
    }
  }, [services, form]);

  const { fields } = useFieldArray({
    control: form.control,
    name: "services",
  });

  const selectedServicesCount =
    form.watch("services")?.filter((s) => s.included)?.length || 0;

  const onSubmit = async (data: PackageFormData) => {
    try {
      const res = await createItem(data);

      if (res.success) {
        notify.success(res.message);

        form.reset({
          name: "",
          description: "",
          price: 0,
          period: "monthly",
          services: [],
          cta: "Get Started",
          popular: false,
        });

        router.push("/admin-dashboard/packages");
      }
    } catch (error: any) {
      notify.error(error.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-3xl font-bold text-gray-900">
            Add New Package
          </h1>
        </div>
        <p className="text-gray-600">
          Create a new pricing package for your services. Fill in the
          details below.
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          {/* Basic Information Card */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>
                Enter the basic details of your package including
                name, price, and description.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Field */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Package Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Pro Plan"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        This will be displayed as the package title.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Price Field */}
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        Set the price in your preferred currency.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Period Field */}
                <FormField
                  control={form.control}
                  name="period"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Billing Period</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a billing period" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="monthly">
                            Monthly
                          </SelectItem>
                          <SelectItem value="yearly">
                            Yearly
                          </SelectItem>
                          <SelectItem value="quarterly">
                            Quarterly
                          </SelectItem>
                          <SelectItem value="one-time">
                            One Time
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        How often will this package be billed?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* CTA Field */}
                <FormField
                  control={form.control}
                  name="cta"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Call to Action Text</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Get Started"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Text for the purchase/signup button.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Description Field - Full Width */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe what this package offers..."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Provide a detailed description of the package
                      benefits.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Popular Toggle */}
              <FormField
                control={form.control}
                name="popular"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-lg">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="flex items-center gap-2">
                        Mark as Popular Package
                        <Sparkles className="h-4 w-4 text-yellow-500" />
                      </FormLabel>
                      <FormDescription>
                        This package will be highlighted as a popular
                        choice.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Services Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Services Included</CardTitle>
                  <CardDescription>
                    Select which services are included in this
                    package.
                  </CardDescription>
                </div>
                {!isServicesLoading && services.length > 0 && (
                  <Badge variant="secondary" className="text-sm">
                    {selectedServicesCount} selected
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Loading State */}
                {isServicesLoading && (
                  <div className="space-y-3">
                    {[...Array(5)].map((_, i) => (
                      <PackageServiceSkeleton key={i} />
                    ))}
                  </div>
                )}

                {/* Empty State */}
                {!isServicesLoading && services.length === 0 && (
                  <div className="text-center py-12 px-4 border-2 border-dashed rounded-lg">
                    <PackageX className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No Services Available
                    </h3>
                    <p className="text-gray-600 mb-6">
                      You need to create at least one service before
                      creating a package.
                    </p>
                    <Link href="/admin-dashboard/services">
                      <Button>
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Create New Service
                      </Button>
                    </Link>
                  </div>
                )}

                {/* Services List */}
                {!isServicesLoading && services.length > 0 && (
                  <>
                    {fields.map((field, index) => {
                      const serviceName = form.watch(
                        `services.${index}.name`,
                      );

                      return (
                        <FormField
                          key={field.id}
                          control={form.control}
                          name={`services.${index}.included`}
                          render={({ field: checkboxField }) => (
                            <FormItem className="flex flex-row items-center space-x-3 space-y-0 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                              <FormControl>
                                <Checkbox
                                  checked={checkboxField.value}
                                  onCheckedChange={
                                    checkboxField.onChange
                                  }
                                />
                              </FormControl>
                              <FormLabel className="flex-1 font-medium cursor-pointer">
                                {serviceName}
                              </FormLabel>
                              <Badge
                                variant={
                                  checkboxField.value
                                    ? "default"
                                    : "outline"
                                }
                                className={
                                  checkboxField.value
                                    ? "bg-green-100 text-green-800 hover:bg-green-200"
                                    : "text-gray-500"
                                }
                              >
                                {checkboxField.value
                                  ? "Included"
                                  : "Not Included"}
                              </Badge>
                            </FormItem>
                          )}
                        />
                      );
                    })}

                    {form.formState.errors.services && (
                      <p className="text-sm text-red-600 mt-2">
                        {form.formState.errors.services.message}
                      </p>
                    )}
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={
                form.formState.isSubmitting || services.length === 0
              }
              className="min-w-[120px]"
            >
              {form.formState.isSubmitting ? (
                <>
                  <span className="animate-spin mr-2">⚪</span>
                  Creating...
                </>
              ) : (
                "Create Package"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowLeft, Loader2, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { usePost } from "@/hooks/swr/usePost";
import { notify } from "@/utils/toast";
import { formatPrice } from "@/utils";
import { useGetById } from "@/hooks/swr/useGetById";

// Form schema with validation
const applicationFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  address: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(500, "Address must be less than 500 characters"),
  resumeLink: z
    .string()
    .min(1, "Resume link is required")
    .url("Please enter a valid URL (Google Drive, Dropbox, etc.)"),
  expectedSalary: z
    .number()
    .min(1, "Expected salary is required")
    .max(10000000, "Salary must be less than 10,000,000"),
});

type ApplicationFormValues = z.infer<typeof applicationFormSchema>;

export default function ApplyForJob() {
  const params = useParams();
  const jobId = params.id as string;

  

  const { data, isLoading: isLoadingJob } = useGetById(
    "/job-postings",
    jobId,
  );

  const { createItem, isCreating } = usePost("/job-applications");

  const [isSubmitted, setIsSubmitted] = useState(false);

  const job = data?.data;

  const form = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationFormSchema),
    defaultValues: {
      name: "",
      email: "",
      address: "",
      resumeLink: "",
      expectedSalary: 0,
    },
    mode: "onChange",
  });

  const onSubmit = async (values: ApplicationFormValues) => {
    try {
      const payload = {
        ...values,
        jobId: jobId,
        jobTitle: job?.title,
      };

      console.log(payload)

      const res = await createItem(payload);

      if (res.success) {
        notify.success("Application submitted successfully!");
        setIsSubmitted(true);
        form.reset();
      }
    } catch (error: any) {
      notify.error(error.message || "Something went wrong!");
    }
  };

  if (isLoadingJob) {
    return (
      <div className="container mx-auto px-5 lg:px-0 flex justify-center items-center min-h-[60vh] py-[200px]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">
            Loading job details...
          </p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="container mx-auto px-5 lg:px-0 py-[200px]">
        <Card className="max-w-2xl mx-auto text-center py-12">
          <CardHeader>
            <CardTitle className="text-2xl">Job Not Found</CardTitle>
            <CardDescription>
              The job posting you're looking for doesn't exist or has
              been removed.
            </CardDescription>
          </CardHeader>
          <CardFooter className="justify-center">
            <Link href="/jobs">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Browse Jobs
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="container mx-auto px-5 lg:px-0 py-[200px]">
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-10 h-10 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <CardTitle className="text-2xl">
              Application Submitted!
            </CardTitle>
            <CardDescription className="text-base mt-2">
              Thank you for applying to {job.title} position.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              We've received your application and will review it
              shortly. If your qualifications match our requirements,
              we'll contact you for the next steps.
            </p>
            <div className="bg-muted/50 p-4 rounded-lg text-left">
              <h3 className="font-semibold mb-2">
                Application Summary:
              </h3>
              <p className="text-sm">
                <span className="text-muted-foreground">
                  Position:
                </span>{" "}
                {job.title}
              </p>
              <p className="text-sm">
                <span className="text-muted-foreground">
                  Department:
                </span>{" "}
                {job.department}
              </p>
              <p className="text-sm">
                <span className="text-muted-foreground">
                  Location:
                </span>{" "}
                {job.location}
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center gap-4">
            <Link href="/carrier">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Jobs
              </Button>
            </Link>
            <Link href="/">
              <Button>Go to Homepage</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-5 lg:px-0 py-20">
      {/* Back button */}
      <div className="mb-6">
        <Link href={`/jobs/${jobId}`}>
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Job Details
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Job Summary Card */}
        <div className="lg:col-span-1">
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle className="text-xl">Job Summary</CardTitle>
              <CardDescription>You're applying for</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">{job.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {job.department}
                </p>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Location:
                  </span>
                  <span className="text-sm font-medium">
                    {job.location}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Type:
                  </span>
                  <span className="text-sm font-medium">
                    {job.employmentType}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Workplace:
                  </span>
                  <span className="text-sm font-medium">
                    {job.workplaceType}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Experience:
                  </span>
                  <span className="text-sm font-medium">
                    {job.experienceLevel} • {job.experienceRequired}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Salary Range:
                  </span>
                  <span className="text-sm font-medium">
                    {formatPrice(job.salaryRange.min)} -{" "}
                    {formatPrice(job.salaryRange.max)} /
                    {job.salaryRange.period}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Openings:
                  </span>
                  <Badge variant="outline">
                    {job.openings} position
                    {job.openings > 1 ? "s" : ""}
                  </Badge>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="text-sm font-medium mb-2">
                  Deadline:
                </h4>
                <p className="text-sm">
                  {new Date(
                    job.applicationDeadline,
                  ).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Application Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                Apply for this Position
              </CardTitle>
              <CardDescription>
                Please fill out the form below to submit your
                application.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  {/* Name */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Email */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address *</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="john.doe@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Address */}
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Address *</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="123 Main St, City, Country"
                            className="resize-none min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Resume Link */}
                  <FormField
                    control={form.control}
                    name="resumeLink"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Resume/CV Link *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://drive.google.com/your-resume"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                        <p className="text-xs text-muted-foreground mt-1">
                          Please provide a link to your resume (Google
                          Drive, Dropbox, etc.)
                        </p>
                      </FormItem>
                    )}
                  />

                  {/* Expected Salary */}
                  <FormField
                    control={form.control}
                    name="expectedSalary"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Expected Salary (BDT) *</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="1"
                            placeholder="50000"
                            {...field}
                            onChange={(e) => {
                              const value =
                                e.target.value === ""
                                  ? 0
                                  : parseInt(e.target.value);
                              field.onChange(value);
                            }}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Form submission note */}
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <span className="font-semibold">Note:</span> By
                      submitting this application, you confirm that
                      all information provided is accurate and
                      complete. We'll review your application and
                      contact you if your qualifications match our
                      requirements.
                    </p>
                  </div>

                  {/* Submit button */}
                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={isCreating}
                  >
                    {isCreating ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Submitting Application...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Submit Application
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

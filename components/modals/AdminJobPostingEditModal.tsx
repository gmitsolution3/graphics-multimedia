"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Plus, Trash2, ChevronLeft, ChevronRight } from "lucide-react";

import { useEffect, Dispatch, SetStateAction, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { usePatch } from "@/hooks/swr/usePatch";
import { notify } from "@/utils/toast";
import { mutate } from "swr";
import { IJobPosting } from "@/types";

const salaryRangeSchema = z
  .object({
    min: z.number().min(1, "Minimum salary is required"),
    max: z.number().min(1, "Maximum salary is required"),
    period: z.enum(["month", "year"]),
  })
  .refine((data) => data.max > data.min, {
    message: "Maximum salary must be greater than minimum salary",
    path: ["max"],
  });

const jobPostingFormSchema = z.object({
  title: z
    .string()
    .min(1, "Job title is required")
    .max(200, "Title must be less than 200 characters"),
  department: z
    .string()
    .min(1, "Department is required")
    .max(100, "Department must be less than 100 characters"),
  location: z
    .string()
    .min(1, "Location is required")
    .max(200, "Location must be less than 200 characters"),
  employmentType: z.enum(
    ["Full-time", "Part-time", "Contract", "Internship"],
    "Employment type is required",
  ),
  workplaceType: z.enum(["Onsite", "Remote", "Hybrid"], "Workplace type is required"),
  experienceLevel: z.enum(["Junior", "Mid", "Senior"], "Experience level is required"),
  experienceRequired: z
    .string()
    .min(1, "Experience required is required"),
  salaryRange: salaryRangeSchema,
  description: z
    .string()
    .min(1, "Description is required")
    .max(2000, "Description must be less than 2000 characters"),
  responsibilities: z
    .array(
      z.object({
        value: z.string().min(1, "Responsibility is required"),
      }),
    )
    .min(1, "At least one responsibility is required"),
  requirements: z
    .array(
      z.object({
        value: z.string().min(1, "Requirement is required"),
      }),
    )
    .min(1, "At least one requirement is required"),
  skills: z
    .array(
      z.object({ value: z.string().min(1, "Skill is required") }),
    )
    .min(1, "At least one skill is required"),
  benefits: z
    .array(
      z.object({ value: z.string().min(1, "Benefit is required") }),
    )
    .min(1, "At least one benefit is required"),
  applicationDeadline: z
    .string()
    .min(1, "Application deadline is required"),
  openings: z.number().min(1, "At least 1 opening is required"),
  contactEmail: z
    .string()
    .email("Please enter a valid email")
    .min(1, "Contact email is required"),
});

type JobPostingFormValues = z.infer<typeof jobPostingFormSchema>;

interface IModalProps {
  selectedJobPosting: IJobPosting | null;
  isEditModalOpen: boolean;
  setIsEditModalOpen: Dispatch<SetStateAction<boolean>>;
}

// Define tabs (reorganized)
const TABS = [
  { id: "basic", label: "Basic Info", icon: "📋" },
  { id: "jobDetails", label: "Job Details & Salary", icon: "💼" },
  { id: "requirements", label: "Requirements & Skills", icon: "⚙️" },
  { id: "additional", label: "Additional Info", icon: "ℹ️" },
] as const;

type TabId = typeof TABS[number]["id"];

export default function AdminJobPostingEditModal({
  selectedJobPosting,
  isEditModalOpen,
  setIsEditModalOpen,
}: IModalProps) {
  const { updateItem, isUpdating } = usePatch("/job-postings");
  const [activeTab, setActiveTab] = useState<TabId>("basic");

  const editForm = useForm<JobPostingFormValues>({
    resolver: zodResolver(jobPostingFormSchema),
    defaultValues: {
      title: "",
      department: "",
      location: "",
      employmentType: "Full-time",
      workplaceType: "Hybrid",
      experienceLevel: "Junior",
      experienceRequired: "",
      salaryRange: {
        min: 30000,
        max: 50000,
        period: "month",
      },
      description: "",
      responsibilities: [{ value: "" }],
      requirements: [{ value: "" }],
      skills: [{ value: "" }],
      benefits: [{ value: "" }],
      applicationDeadline: "",
      openings: 1,
      contactEmail: "",
    },
    mode: "onChange",
  });

  const {
    fields: responsibilityFields,
    append: appendResponsibility,
    remove: removeResponsibility,
  } = useFieldArray({
    control: editForm.control,
    name: "responsibilities",
  });

  const {
    fields: requirementFields,
    append: appendRequirement,
    remove: removeRequirement,
  } = useFieldArray({
    control: editForm.control,
    name: "requirements",
  });

  const {
    fields: skillFields,
    append: appendSkill,
    remove: removeSkill,
  } = useFieldArray({
    control: editForm.control,
    name: "skills",
  });

  const {
    fields: benefitFields,
    append: appendBenefit,
    remove: removeBenefit,
  } = useFieldArray({
    control: editForm.control,
    name: "benefits",
  });

  // Format date for input field
  const formatDateForInput = (date: Date | string | undefined): string => {
    if (!date) return "";
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  };

  // Transform job posting data to form values
  const transformJobPostingToFormValues = (job: IJobPosting): JobPostingFormValues => {
    return {
      title: job.title || "",
      department: job.department || "",
      location: job.location || "",
      employmentType: job.employmentType as JobPostingFormValues["employmentType"],
      workplaceType: job.workplaceType as JobPostingFormValues["workplaceType"],
      experienceLevel: job.experienceLevel as JobPostingFormValues["experienceLevel"],
      experienceRequired: job.experienceRequired || "",
      salaryRange: {
        min: job.salaryRange?.min || 0,
        max: job.salaryRange?.max || 0,
        period: job.salaryRange?.period || "month",
      },
      description: job.description || "",
      responsibilities: job.responsibilities?.map((r) => ({ value: r })) || [{ value: "" }],
      requirements: job.requirements?.map((r) => ({ value: r })) || [{ value: "" }],
      skills: job.skills?.map((s) => ({ value: s })) || [{ value: "" }],
      benefits: job.benefits?.map((b) => ({ value: b })) || [{ value: "" }],
      applicationDeadline: formatDateForInput(job.applicationDeadline),
      openings: job.openings || 1,
      contactEmail: job.contactEmail || "",
    };
  };

  // Reset form when selectedJobPosting changes or modal opens
  useEffect(() => {
    if (selectedJobPosting && isEditModalOpen) {
      const formValues = transformJobPostingToFormValues(selectedJobPosting);
      editForm.reset(formValues);
      setActiveTab("basic");
    }
  }, [selectedJobPosting, isEditModalOpen, editForm]);

  const onEditSubmit = async (values: JobPostingFormValues) => {
    try {
      if (!selectedJobPosting?._id) return;

      const payload = {
        ...values,
        responsibilities: values.responsibilities.map((r) => r.value),
        requirements: values.requirements.map((r) => r.value),
        skills: values.skills.map((s) => s.value),
        benefits: values.benefits.map((b) => b.value),
      };

      const res = await updateItem({
        id: selectedJobPosting._id,
        data: payload,
      });

      if (res.success) {
        notify.success(res.message);
        setIsEditModalOpen(false);
        mutate(
          (key) =>
            typeof key === "string" &&
            key.startsWith("/job-postings"),
        );
        editForm.reset();
        setActiveTab("basic");
      }
    } catch (error: any) {
      notify.error(error.message || "Something went wrong!");
    }
  };

  // Navigation functions
  const goToNextTab = () => {
    const currentIndex = TABS.findIndex((tab) => tab.id === activeTab);
    if (currentIndex < TABS.length - 1) {
      // Validate current tab fields before moving to next
      const currentTabFields = getFieldsForTab(activeTab);
      editForm.trigger(currentTabFields as any).then((isValid) => {
        if (isValid) {
          setActiveTab(TABS[currentIndex + 1].id);
        }
      });
    }
  };

  const goToPreviousTab = () => {
    const currentIndex = TABS.findIndex((tab) => tab.id === activeTab);
    if (currentIndex > 0) {
      setActiveTab(TABS[currentIndex - 1].id);
    }
  };

  // Helper to get fields for a specific tab
  const getFieldsForTab = (tabId: TabId): (keyof JobPostingFormValues)[] => {
    switch (tabId) {
      case "basic":
        return ["title", "department", "location", "experienceRequired", "openings", "description"];
      case "jobDetails":
        return ["employmentType", "workplaceType", "experienceLevel", "salaryRange"];
      case "requirements":
        return ["responsibilities", "requirements", "skills", "benefits"];
      case "additional":
        return ["applicationDeadline", "contactEmail"];
      default:
        return [];
    }
  };

  // Helper to render a Select field
  const renderSelectField = <
    T extends "employmentType" | "workplaceType" | "experienceLevel",
  >(
    label: string,
    fieldName: T,
    options: string[],
    placeholder: string,
  ) => (
    <FormField
      control={editForm.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  // Helper to render array fields
  const renderArrayFields = (
    label: string,
    fields: { id: string }[],
    append: (value: { value: string }) => void,
    remove: (index: number) => void,
    fieldName:
      | "responsibilities"
      | "requirements"
      | "skills"
      | "benefits",
    placeholder: string,
  ) => (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <FormLabel>{label}</FormLabel>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append({ value: "" })}
        >
          <Plus className="h-4 w-4 mr-1" />
          Add {label}
        </Button>
      </div>
      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-2 items-start">
          <FormField
            control={editForm.control}
            name={`${fieldName}.${index}.value`}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input placeholder={placeholder} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {fields.length > 1 && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-10 w-10 text-destructive hover:text-destructive"
              onClick={() => remove(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Job Posting</DialogTitle>
          <DialogDescription>
            Update the job posting details. Changes will be saved when you submit.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as TabId)} className="w-full">
          <TabsList className="grid grid-cols-4 w-full mb-6">
            {TABS.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="text-xs px-2 py-1.5"
                title={tab.label}
              >
                <span className="hidden md:inline">{tab.icon} {tab.label}</span>
                <span className="md:hidden">{tab.icon}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <Form {...editForm}>
            <form onSubmit={editForm.handleSubmit(onEditSubmit)}>
              {/* Basic Information Tab (with Description) */}
              <TabsContent value="basic" className="space-y-4 py-2">
                <h3 className="text-sm font-medium text-muted-foreground border-b pb-2">
                  Basic Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={editForm.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Frontend Developer"
                            autoFocus
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={editForm.control}
                    name="department"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Department</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Development"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={editForm.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Dhaka, Bangladesh"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={editForm.control}
                    name="experienceRequired"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Experience Required</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., 1-2 years"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={editForm.control}
                    name="openings"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Openings</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="1"
                            {...field}
                            onChange={(e) =>
                              field.onChange(
                                parseInt(e.target.value) || 1,
                              )
                            }
                            value={field.value}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="mt-4">
                  <FormField
                    control={editForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter detailed job description..."
                            className="resize-none min-h-[150px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>

              {/* Job Details & Salary Tab (merged) */}
              <TabsContent value="jobDetails" className="space-y-4 py-2">
                <h3 className="text-sm font-medium text-muted-foreground border-b pb-2">
                  Job Details
                </h3>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {renderSelectField(
                    "Employment Type",
                    "employmentType",
                    ["Full-time", "Part-time", "Contract", "Internship"],
                    "Select employment type",
                  )}
                  {renderSelectField(
                    "Workplace Type",
                    "workplaceType",
                    ["Onsite", "Remote", "Hybrid"],
                    "Select workplace type",
                  )}
                  {renderSelectField(
                    "Experience Level",
                    "experienceLevel",
                    ["Junior", "Mid", "Senior"],
                    "Select experience level",
                  )}
                </div>

                <h3 className="text-sm font-medium text-muted-foreground border-b pb-2 mt-6">
                  Salary Range
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <FormField
                    control={editForm.control}
                    name="salaryRange.min"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Minimum (BDT)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="0"
                            {...field}
                            onChange={(e) =>
                              field.onChange(
                                parseInt(e.target.value) || 0,
                              )
                            }
                            value={field.value}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={editForm.control}
                    name="salaryRange.max"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Maximum (BDT)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="0"
                            {...field}
                            onChange={(e) =>
                              field.onChange(
                                parseInt(e.target.value) || 0,
                              )
                            }
                            value={field.value}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={editForm.control}
                    name="salaryRange.period"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Period</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select period" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="month">
                              Per Month
                            </SelectItem>
                            <SelectItem value="year">
                              Per Year
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>

              {/* Requirements & Skills Tab (merged) */}
              <TabsContent value="requirements" className="space-y-6 py-2">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-muted-foreground border-b pb-2">
                    Responsibilities
                  </h3>
                  {renderArrayFields(
                    "Responsibilities",
                    responsibilityFields,
                    appendResponsibility,
                    removeResponsibility,
                    "responsibilities",
                    "e.g., Build and maintain user interfaces",
                  )}
                </div>

                <div className="space-y-4 mt-6">
                  <h3 className="text-sm font-medium text-muted-foreground border-b pb-2">
                    Requirements
                  </h3>
                  {renderArrayFields(
                    "Requirements",
                    requirementFields,
                    appendRequirement,
                    removeRequirement,
                    "requirements",
                    "e.g., Bachelor's degree in Computer Science",
                  )}
                </div>

                <div className="space-y-4 mt-6">
                  <h3 className="text-sm font-medium text-muted-foreground border-b pb-2">
                    Skills
                  </h3>
                  {renderArrayFields(
                    "Skills",
                    skillFields,
                    appendSkill,
                    removeSkill,
                    "skills",
                    "e.g., React, Next.js, TypeScript",
                  )}
                </div>

                <div className="space-y-4 mt-6">
                  <h3 className="text-sm font-medium text-muted-foreground border-b pb-2">
                    Benefits
                  </h3>
                  {renderArrayFields(
                    "Benefits",
                    benefitFields,
                    appendBenefit,
                    removeBenefit,
                    "benefits",
                    "e.g., Friendly work environment",
                  )}
                </div>
              </TabsContent>

              {/* Additional Information Tab */}
              <TabsContent value="additional" className="space-y-4 py-2">
                <h3 className="text-sm font-medium text-muted-foreground border-b pb-2">
                  Additional Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={editForm.control}
                    name="applicationDeadline"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Application Deadline</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={editForm.control}
                    name="contactEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="careers@company.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center pt-6 border-t mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={goToPreviousTab}
                  disabled={activeTab === "basic"}
                  className="gap-2"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsEditModalOpen(false);
                      editForm.reset();
                      setActiveTab("basic");
                    }}
                  >
                    Cancel
                  </Button>

                  {activeTab === "additional" ? (
                    <Button disabled={isUpdating} type="submit">
                      {isUpdating ? (
                        <Loader2 className="animate-spin h-4 w-4 mr-2" />
                      ) : null}
                      Update Job
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      onClick={goToNextTab}
                      className="gap-2"
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </form>
          </Form>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
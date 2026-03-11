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
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { ImageUploader } from "@/components/image-uploader";

import { useEffect, Dispatch, SetStateAction } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { usePost } from "@/hooks/swr/usePost";
import { notify } from "@/utils/toast";

// Pricing schema for individual pricing items
const pricingSchema = z.object({
  duration: z.string().min(1, "Duration is required"),
  price: z
    .number()
    .min(1, "Price must be greater than 0")
    .max(999999.99, "Price must be less than 1,000,000"),
});

const influencerFormSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters"),
  designation: z
    .string()
    .min(1, "Designation is required")
    .max(100, "Designation must be less than 100 characters"),
  bio: z
    .string()
    .min(1, "Bio is required")
    .max(500, "Bio must be less than 500 characters"),
  image: z.string().min(1, "Image is required"),
  demoVideo: z
    .string()
    .url("Please enter a valid URL")
    .min(1, "Demo video URL is required"),
  pricing: z
    .array(pricingSchema)
    .min(1, "At least one pricing option is required"),
});

type InfluencerFormValues = z.infer<typeof influencerFormSchema>;

interface IModalProps {
  isAddModalOpen: boolean;
  setIsAddModalOpen: Dispatch<SetStateAction<boolean>>;
}

export default function AdminInfluencerAddModal({
  isAddModalOpen,
  setIsAddModalOpen,
}: IModalProps) {
  const { createItem, isCreating } = usePost("/influencers");

  const addForm = useForm<InfluencerFormValues>({
    resolver: zodResolver(influencerFormSchema),
    defaultValues: {
      name: "",
      designation: "",
      bio: "",
      image: "",
      demoVideo: "",
      pricing: [{ duration: "30 sec", price: 3000 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: addForm.control,
    name: "pricing",
  });

  const onAddSubmit = async (values: InfluencerFormValues) => {
    try {
      const res = await createItem({
        name: values.name,
        designation: values.designation,
        bio: values.bio,
        image: values.image,
        demoVideo: values.demoVideo,
        pricing: values.pricing,
      });

      if (res.success) {
        notify.success(res.message);
        setIsAddModalOpen(false);
        addForm.reset();
      }
    } catch (error: any) {
      notify.error(error.message || "Something went wrong!");
    }
  };

  useEffect(() => {
    if (isAddModalOpen) {
      addForm.reset({
        name: "",
        designation: "",
        bio: "",
        image: "",
        demoVideo: "",
        pricing: [{ duration: "30 sec", price: 3000 }],
      });
    }
  }, [isAddModalOpen, addForm]);

  return (
    <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Influencer</DialogTitle>
          <DialogDescription>
            Enter the influencer details below. Click submit when
            you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...addForm}>
          <form
            onSubmit={addForm.handleSubmit(onAddSubmit)}
            className="space-y-4 py-4"
          >
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground">
                Basic Information
              </h3>

              <FormField
                control={addForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter full name"
                        autoFocus
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={addForm.control}
                name="designation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Designation</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Brand Model & Influencer"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={addForm.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter influencer bio"
                        className="resize-none min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Media */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground">
                Media
              </h3>

              <FormField
                control={addForm.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profile Image</FormLabel>
                    <FormControl>
                      <ImageUploader
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={addForm.control}
                name="demoVideo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Demo Video URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://youtu.be/..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Pricing */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Pricing Options
                </h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => append({ duration: "", price: 0 })}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Pricing
                </Button>
              </div>

              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex gap-3 items-start"
                >
                  <div className="flex-1 grid grid-cols-2 gap-3">
                    <FormField
                      control={addForm.control}
                      name={`pricing.${index}.duration`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs">
                            Duration
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., 30 sec"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={addForm.control}
                      name={`pricing.${index}.price`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs">
                            Price ($)
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="0"
                              placeholder="Enter price"
                              {...field}
                              onChange={(e) => {
                                const value =
                                  e.target.value === ""
                                    ? 0
                                    : parseFloat(e.target.value);
                                field.onChange(value);
                              }}
                              value={field.value}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="mt-6 h-8 w-8 text-destructive hover:text-destructive"
                      onClick={() => remove(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              {addForm.formState.errors.pricing && (
                <p className="text-sm font-medium text-destructive">
                  {addForm.formState.errors.pricing.message}
                </p>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsAddModalOpen(false);
                  addForm.reset();
                }}
              >
                Cancel
              </Button>
              <Button disabled={isCreating} type="submit">
                {isCreating ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

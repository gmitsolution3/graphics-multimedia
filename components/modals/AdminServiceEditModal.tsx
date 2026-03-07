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
import { Button } from "../ui/button";

import { useEffect, Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { IService } from "@/types";
import { usePatch } from "@/hooks/swr/usePatch";
import { Loader2 } from "lucide-react";
import { notify } from "./../../utils/toast";

const serviceFormSchema = z.object({
  name: z
    .string()
    .min(1, "Service name is required")
    .max(100, "Service name must be less than 100 characters"),
  price: z
    .number()
    .min(0, "Price must be greater than or equal to 0")
    .max(999999.99, "Price must be less than 1,000,000"),
});

type ServiceFormValues = z.infer<typeof serviceFormSchema>;

interface IModalProps {
  selectedService: IService | null;
  isEditModalOpen: boolean;
  setIsEditModalOpen: Dispatch<SetStateAction<boolean>>;
}

export default function AdminServiceEditModal({
  selectedService,
  isEditModalOpen,
  setIsEditModalOpen,
}: IModalProps) {
  const { updateItem, isUpdating } = usePatch("/services");

  const editForm = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceFormSchema),
    defaultValues: {
      name: "",
      price: 0,
    },
  });

  const onEditSubmit = async (values: ServiceFormValues) => {
    try {
      const serviceName = values.name;
      const servicePrice = values.price;

      const res = await updateItem({
        id: selectedService?._id as string,
        data: {
          name: serviceName,
          price: servicePrice,
        },
      });

      if (res.success) {
        notify.success(res.message);
        setIsEditModalOpen(false);
        editForm.reset();
      }
    } catch (error: any) {
      notify.error(error.message || "Something went wrong!");
    }
  };

  useEffect(() => {
    editForm.reset({
      name: selectedService?.name,
      price: selectedService?.price || 0,
    });
  }, [isEditModalOpen, selectedService]);

  return (
    <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Service</DialogTitle>
          <DialogDescription>
            Update the service details below. Click submit when you're
            done.
          </DialogDescription>
        </DialogHeader>
        <Form {...editForm}>
          <form
            onSubmit={editForm.handleSubmit(onEditSubmit)}
            className="space-y-4 py-4"
          >
            <FormField
              control={editForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter service name"
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
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="Enter price"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value === "" ? 0 : parseFloat(e.target.value);
                        field.onChange(value);
                      }}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsEditModalOpen(false);
                  editForm.reset();
                }}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isUpdating}>
                {isUpdating ? (
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
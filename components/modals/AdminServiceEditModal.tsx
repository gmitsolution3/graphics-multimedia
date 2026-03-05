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
    },
  });

  const onEditSubmit = async (values: ServiceFormValues) => {
    try {
      const serviceName = values.name;

      const res = await updateItem({
        id: selectedService?._id as string,
        data: {
          name: serviceName,
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
    });
  }, [isEditModalOpen]);

  return (
    <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Service</DialogTitle>
          <DialogDescription>
            Update the service name below. Click submit when you're
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
              <Button type="submit">
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

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
import { Loader2 } from "lucide-react";

import { useEffect, Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { usePost } from "@/hooks/swr/usePost";
import { notify } from "@/utils/toast";

const serviceFormSchema = z.object({
  name: z
    .string()
    .min(1, "Service name is required")
    .max(100, "Service name must be less than 100 characters"),
});

type ServiceFormValues = z.infer<typeof serviceFormSchema>;

interface IModalProps {
  isAddModalOpen: boolean;
  setIsAddModalOpen: Dispatch<SetStateAction<boolean>>;
}

export default function AdminServiceAddModal({
  isAddModalOpen,
  setIsAddModalOpen,
}: IModalProps) {
  const { createItem, isCreating } = usePost("/services");

  const addForm = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const onAddSubmit = async (values: ServiceFormValues) => {
    try {
      const serviceName = values.name;

      const res = await createItem({
        name: serviceName,
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
    addForm.reset();
  }, [isAddModalOpen]);

  return (
    <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Service</DialogTitle>
          <DialogDescription>
            Enter the service name below. Click submit when you're
            done.
          </DialogDescription>
        </DialogHeader>
        <Form {...addForm}>
          <form
            onSubmit={addForm.handleSubmit(onAddSubmit)}
            className="space-y-4 py-4"
          >
            <FormField
              control={addForm.control}
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

import { SetStateAction, Dispatch } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import Image from "next/image";

interface IProps {
  previewImage: string | null;
  setPreviewImage: Dispatch<SetStateAction<string | null>>;
}

export default function AdminInfluencerImagePreviewModal({
  previewImage,
  setPreviewImage,
}: IProps) {
  return (
    <Dialog
      open={!!previewImage}
      onOpenChange={() => setPreviewImage(null)}
    >
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Image Preview</DialogTitle>
          <DialogDescription>
            Full size preview of the influencer&apos;s image
          </DialogDescription>
        </DialogHeader>
        <div className="relative w-full h-[500px] rounded-lg overflow-hidden">
          {previewImage && (
            <Image
              src={previewImage}
              alt="Influencer preview"
              fill
              className="object-contain"
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

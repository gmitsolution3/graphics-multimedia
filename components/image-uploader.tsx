"use client";

import { useState } from "react";
import Image from "next/image";
import { Loader2, UploadCloud, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useImageUpload } from "@/hooks/useImageUpload";

interface ImageUploaderProps {
  value?: string;
  onChange: (url: string) => void;
}

export const ImageUploader = ({
  value,
  onChange,
}: ImageUploaderProps) => {
  const { uploadImage } = useImageUpload();

  const [preview, setPreview] = useState<string | null>(
    value || null,
  );
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const localPreview = URL.createObjectURL(file);
    setPreview(localPreview);

    try {
      setUploading(true);

      const url = await uploadImage(file);

      onChange(url);
      setPreview(url);
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => {
    setPreview(null);
    onChange("");
  };

  return (
    <Card className="w-full p-4 border-dashed border-2 flex flex-col items-center justify-center gap-3">
      {preview ? (
        <div className="relative w-full h-60">
          <Image
            src={preview}
            alt="preview"
            fill
            className="object-cover rounded-md"
          />

          <Button
            size="icon"
            variant="destructive"
            className="absolute top-2 right-2"
            onClick={removeImage}
          >
            <X size={16} />
          </Button>

          {uploading && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-md">
              <Loader2 className="animate-spin text-white" />
            </div>
          )}
        </div>
      ) : (
        <label className="flex flex-col items-center gap-2 cursor-pointer">
          <UploadCloud className="h-8 w-8 text-muted-foreground" />

          <span className="text-sm text-muted-foreground">
            Click to upload image
          </span>

          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      )}
    </Card>
  );
};

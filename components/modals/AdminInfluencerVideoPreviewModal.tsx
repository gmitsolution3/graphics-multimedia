import { SetStateAction, Dispatch } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

interface IProps {
  previewVideo: string | null;
  setPreviewVideo: Dispatch<SetStateAction<string | null>>;
}

export default function AdminInfluencerVideoPreviewModal({
  previewVideo,
  setPreviewVideo,
}: IProps) {
  return (
    <Dialog
      open={!!previewVideo}
      onOpenChange={() => setPreviewVideo(null)}
    >
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Demo Video</DialogTitle>
          <DialogDescription>
            Preview the influencer&apos;s demo video
          </DialogDescription>
        </DialogHeader>
        <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-black">
          {previewVideo && (
            <iframe
              src={
                previewVideo
                  .replace("youtu.be", "youtube.com/embed")
                  .split("?")[0]
              }
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

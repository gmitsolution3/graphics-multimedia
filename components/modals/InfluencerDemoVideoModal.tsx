import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Film } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { getYouTubeEmbedUrl } from "@/utils";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  influencerName: string;
}

export default function InfluencerDemoVideoModal({
  isOpen,
  onClose,
  videoUrl,
  influencerName,
}: IProps) {
  const embedUrl = getYouTubeEmbedUrl(videoUrl);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl p-0 gap-0 bg-background border-border/40">
        {/* Header */}
        <DialogHeader className="flex flex-row items-center justify-between p-4 border-b border-border/40">
          <DialogTitle className="text-sm tracking-[0.2em] uppercase opacity-60">
            {influencerName} - Demo Reel
          </DialogTitle>
        </DialogHeader>

        {/* Video Player */}
        <div className="bg-black/90">
          <AspectRatio ratio={16 / 9}>
            {embedUrl ? (
              <iframe
                src={embedUrl}
                title={`${influencerName} Demo Reel`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <Film className="w-12 h-12 opacity-20 mx-auto mb-3" />
                  <p className="text-xs opacity-40">
                    Invalid video URL or unsupported format
                  </p>
                  <p className="text-[10px] opacity-30 mt-2">
                    {videoUrl}
                  </p>
                </div>
              </div>
            )}
          </AspectRatio>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border/40">
          <p className="text-xs opacity-30 text-center">
            *Demo reel shows recent work and professional experience
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

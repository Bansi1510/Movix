import { X } from "lucide-react";

import { useVideoById } from "@/hooks/useVideoById";

import VideoPlayer from "./VideoPlayer";

interface Props {
  videoId: string;
  onClose: () => void;
}

const VideoModal = ({
  videoId,
  onClose,
}: Props) => {
  const {
    data: video,
    isLoading,
    error,
  } = useVideoById(videoId);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90">
        <div className="text-white">
          Loading video...
        </div>
      </div>
    );
  }

  if (error || !video) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90">
        <div className="text-red-500">
          Failed to load video
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div className="relative h-[85vh] w-full max-w-6xl overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl">

        {/* Header */}
        <div className="flex h-16 items-center justify-between border-b border-zinc-800 px-6">
          <h2 className="truncate text-lg font-semibold text-white">
            {video.title}
          </h2>

          <button
            onClick={onClose}
            className="rounded-full p-2 text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Player */}
        <div className="h-[calc(85vh-64px)]">
          <VideoPlayer
            videoUrl={video.videoUrl}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
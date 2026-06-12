import { useParams } from "react-router-dom";

import { useVideo } from "../hooks/useVideo";
import VideoPlayer from "@/features/WatchVideo/VideoPlayer";
import VideoInfo from "@/features/WatchVideo/VideoInfo";
import VideoActions from "@/features/WatchVideo/VideoActions";
import CommentSection from "@/features/WatchVideo/CommentSection";


const WatchVideoPage = () => {
  const { videoId } = useParams();

  const {
    data: video,
    isLoading,
  } = useVideo(videoId!);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!video) {
    return <div>Video not found</div>;
  }

  return (
    <div className="container mx-auto max-w-5xl p-6">

      <VideoPlayer videoUrl={video.videoUrl} />

      <VideoInfo video={video} />

      <VideoActions video={video} />

      <CommentSection videoId={video.id} />
    </div>
  );
};

export default WatchVideoPage;
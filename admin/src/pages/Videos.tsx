
import { useState } from "react";

import { Search, Video } from "lucide-react";

import { Input } from "@/components/ui/input";



import AppPagination from "@/components/common/AppPagination";

import { useVideos } from "@/hooks/useVideos";
import { useDebounce } from "@/hooks/useDebounce";
import { useDeleteVideo } from "@/hooks/useDeleteVideo";
import VideoSkeleton from "@/features/videos/VideoSkeleton";
import VideoCard from "@/features/videos/VideoCard";
import VideoFilters from "@/features/videos/VideoFilters";
import type { SingleVideo } from "@/types/video.types";

const Videos = () => {
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");

  const [genre, setGenre] = useState("all");
  const [language, setLanguage] =
    useState("all");
  const [type, setType] =
    useState("all");

  const debouncedSearch =
    useDebounce(search);

  const { mutate: deleteVideo } =
    useDeleteVideo();

  const { data, isLoading } =
    useVideos({
      page,

      search: debouncedSearch,

      genre:
        genre === "all"
          ? undefined
          : genre,

      language:
        language === "all"
          ? undefined
          : language,

      type:
        type === "all"
          ? undefined
          : type,
    });
  console.log(data)

  const handleDelete = (
    videoId: string
  ) => {
    deleteVideo(videoId);
  };


  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-3xl font-bold">
            <Video className="h-8 w-8" />
            Videos
          </h1>

          <p className="mt-1 text-muted-foreground">
            Manage and monitor all uploaded
            videos.
          </p>
        </div>

        <div className="relative w-full lg:w-[400px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            placeholder="Search videos..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="pl-10"
          />
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col gap-6 xl:flex-row">
        {/* Videos Grid */}
        <div className="flex-1">
          {isLoading ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 2xl:grid-cols-3">
              {Array.from({
                length: 9,
              }).map((_, index) => (
                <VideoSkeleton
                  key={index}
                />
              ))}
            </div>
          ) : data?.videos?.length ? (
            <>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 2xl:grid-cols-3">
                {data.videos.map(
                  (video: SingleVideo) => (
                    <VideoCard
                      key={video.id}
                      video={video}
                      onDelete={
                        handleDelete
                      }
                    />
                  )
                )}
              </div>

              <div className="mt-10">
                <AppPagination
                  page={page}
                  totalPages={
                    data.pagination
                      ?.totalPages || 1
                  }
                  onPageChange={
                    setPage
                  }
                />
              </div>
            </>
          ) : (
            <div className="flex h-[400px] items-center justify-center rounded-xl border">
              <div className="text-center">
                <Video className="mx-auto mb-3 h-12 w-12 text-muted-foreground" />

                <h3 className="text-lg font-semibold">
                  No Videos Found
                </h3>

                <p className="text-sm text-muted-foreground">
                  Try adjusting your
                  filters or search.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Filters Sidebar */}
        <div className="w-full xl:w-80">
          <VideoFilters
            genre={genre}
            setGenre={(value) => {
              setPage(1);
              setGenre(value);
            }}
            language={language}
            setLanguage={(value) => {
              setPage(1);
              setLanguage(value);
            }}
            type={type}
            setType={(value) => {
              setPage(1);
              setType(value);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Videos;


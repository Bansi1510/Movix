import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "react-toastify";

import { videoSchema, type VideoFormValues } from "@/schemas/video.schema";
import { useCreateVideo } from "@/hooks/useCreateVideo";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Film,
  Upload,
  Languages,
  IndianRupee,
  ImageIcon,
  Video,
  Tag,
  Megaphone,
  Download,
  Globe,
  CloudUpload,
  CheckCircle2,
  Clapperboard,
  Check,
} from "lucide-react";

const genres = [
  "Action", "Adventure", "Comedy", "Drama", "Fantasy",
  "Horror", "Mystery", "Romance", "Sci-Fi", "Thriller", "Documentary",
];

const languages = [
  "English", "Hindi", "Gujarati", "Tamil", "Telugu", "Malayalam",
];

const AddVideo = () => {
  const { mutate, isPending } = useCreateVideo();

  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [bannerImageFile, setBannerImageFile] = useState<File | null>(null);
  const [trailerFile, setTrailerFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<VideoFormValues>({
    resolver: zodResolver(videoSchema),
    defaultValues: {
      title: "",
      description: "",
      genre: "",
      language: "English",
      tags: "",
      type: "FREE",
      price: "",
      hasAds: false,
      downloadable: false,
      isPublished: false,
    },
  });

  const onSubmit = (values: VideoFormValues) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("language", values.language);
    formData.append(
      "tags",
      JSON.stringify(values.tags.split(","))
    );

    formData.append(
      "genre",
      JSON.stringify(values.genre.split(","))
    ); formData.append("type", values.type);
    formData.append("price", String(Number(values.price || "0")));
    formData.append("hasAds", String(values.hasAds));
    formData.append("downloadable", String(values.downloadable));
    formData.append("isPublished", String(values.isPublished));
    if (videoFile) formData.append("video", videoFile);
    if (thumbnailFile) formData.append("thumbnail", thumbnailFile);
    if (bannerImageFile) formData.append("bannerImage", bannerImageFile);
    if (trailerFile) formData.append("trailer", trailerFile);

    mutate(formData, {
      onSuccess: () => {
        toast.success("Video uploaded successfully");
        reset();
        setVideoFile(null);
        setThumbnailFile(null);
        setBannerImageFile(null);
        setTrailerFile(null);
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          console.log(error.response?.data)
          toast.error(error.response?.data?.message || "Upload failed");
        } else {
          toast.error("Something went wrong");
        }
      },
    });
  };

  const isPublished = watch("isPublished");

  return (
    <div className="min-h-screen bg-background">
      {/* Page header */}
      <div className="border-b bg-card sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
              <Clapperboard className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-sm font-semibold text-foreground leading-none">
                Upload New Video
              </h1>
              <p className="text-xs text-muted-foreground mt-0.5">
                Add content to your library
              </p>
            </div>
          </div>

          <div
            className={`flex items-center gap-2 text-xs px-3 py-1.5 rounded-full border font-medium transition-all ${isPublished
              ? "bg-green-50 border-green-200 text-green-700 dark:bg-green-950/40 dark:border-green-800 dark:text-green-400"
              : "bg-secondary border-border text-muted-foreground"
              }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${isPublished
                ? "bg-green-500 dark:bg-green-400"
                : "bg-muted-foreground"
                }`}
            />
            {isPublished ? "Published" : "Draft"}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-6xl mx-auto px-8 py-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* ── Single unified card ── */}
          <div className="bg-card border rounded-2xl overflow-hidden">

            {/* ══ SECTION 1: Video Information ══ */}
            <SectionDivider
              icon={<Film className="w-4 h-4" />}
              label="Video Information"
              step="01"
            />

            <div className="px-8 py-7 space-y-6 border-b">

              {/* Title */}
              <div>
                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2 block">
                  Title <span className="text-destructive normal-case">*</span>
                </Label>
                <Input
                  className="h-11 rounded-xl"
                  placeholder="Enter video title"
                  {...register("title")}
                />
                {errors.title && (
                  <p className="text-destructive text-xs mt-1.5">
                    {errors.title.message}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2 block">
                  Description
                </Label>
                <Textarea
                  rows={5}
                  className="rounded-xl resize-none"
                  placeholder="Write a compelling synopsis for your content..."
                  {...register("description")}
                />
                {errors.description && (
                  <p className="text-destructive text-xs mt-1.5">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* Genre / Language / Type */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div>
                  <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2 block">
                    Genre
                  </Label>
                  <Select
                    value={watch("genre")}
                    onValueChange={(v) => setValue("genre", v)}
                  >
                    <SelectTrigger className="h-11 rounded-xl">
                      <SelectValue placeholder="Select genre" />
                    </SelectTrigger>
                    <SelectContent>
                      {genres.map((g) => (
                        <SelectItem key={g} value={g}>{g}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2 block">
                    Language
                  </Label>
                  <Select
                    value={watch("language")}
                    onValueChange={(v) => setValue("language", v)}
                  >
                    <SelectTrigger className="h-11 rounded-xl">
                      <Languages className="mr-2 h-4 w-4 text-muted-foreground" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((l) => (
                        <SelectItem key={l} value={l}>{l}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2 block">
                    Content Type
                  </Label>
                  <div className="flex gap-2">
                    {(["FREE", "PREMIUM"] as const).map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setValue("type", t)}
                        className={`flex-1 h-11 rounded-xl text-sm font-medium border transition-all ${watch("type") === t
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background text-muted-foreground border-input hover:bg-accent hover:text-accent-foreground"
                          }`}
                      >
                        {t === "FREE" ? "Free" : "Premium"}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tags / Price */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <div>
                  <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2 flex items-center gap-1.5">
                    <Tag className="w-3 h-3" /> Tags
                  </Label>
                  <Input
                    className="h-11 rounded-xl"
                    placeholder="action, drama, thriller"
                    {...register("tags")}
                  />
                </div>

                <div>
                  <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2 flex items-center gap-1.5">
                    <IndianRupee className="w-3 h-3" /> Price
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground text-sm select-none">
                      ₹
                    </span>
                    <Input
                      className="pl-8 h-11 rounded-xl"
                      placeholder="0"
                      {...register("price")}
                      onInput={(e) => {
                        e.currentTarget.value = e.currentTarget.value.replace(
                          /[^0-9]/g,
                          ""
                        );
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* ══ SECTION 2: Media Uploads ══ */}
            <SectionDivider
              icon={<Upload className="w-4 h-4" />}
              label="Media Uploads"
              step="02"
            />

            <div className="px-8 py-7 border-b">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                <UploadBox
                  title="Video File"
                  subtitle="MP4, MOV, AVI"
                  icon={<Video className="w-5 h-5" />}
                  accept="video/*"
                  required
                  file={videoFile}
                  onChange={setVideoFile}
                />
                <UploadBox
                  title="Thumbnail"
                  subtitle="JPG, PNG — 16:9"
                  icon={<ImageIcon className="w-5 h-5" />}
                  accept="image/*"
                  required
                  file={thumbnailFile}
                  onChange={setThumbnailFile}
                />
                <UploadBox
                  title="Banner Image"
                  subtitle="JPG, PNG — wide"
                  icon={<ImageIcon className="w-5 h-5" />}
                  accept="image/*"
                  file={bannerImageFile}
                  onChange={setBannerImageFile}
                />
                <UploadBox
                  title="Trailer"
                  subtitle="MP4, MOV — 3 min"
                  icon={<Video className="w-5 h-5" />}
                  accept="video/*"
                  file={trailerFile}
                  onChange={setTrailerFile}
                />
              </div>
            </div>

            {/* ══ SECTION 3: Publishing Settings ══ */}
            <SectionDivider
              icon={<Globe className="w-4 h-4" />}
              label="Publishing Settings"
              step="03"
            />

            <div className="px-8 py-7">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <CheckboxCard
                  icon={<Megaphone className="w-4 h-4" />}
                  title="Has Ads"
                  description="Show advertisements during playback"
                  checked={watch("hasAds")}
                  onChange={(v) => setValue("hasAds", v)}
                />
                <CheckboxCard
                  icon={<Download className="w-4 h-4" />}
                  title="Downloadable"
                  description="Allow users to save offline"
                  checked={watch("downloadable")}
                  onChange={(v) => setValue("downloadable", v)}
                />
                <CheckboxCard
                  icon={<Globe className="w-4 h-4" />}
                  title="Published"
                  description="Make visible to all users"
                  checked={watch("isPublished")}
                  onChange={(v) => setValue("isPublished", v)}
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={isPending}
            className="w-full h-12 mt-5 rounded-xl text-base font-semibold gap-2"
          >
            <CloudUpload className="w-5 h-5" />
            {isPending ? "Uploading…" : "Upload Video"}
          </Button>
        </form>
      </div>
    </div>
  );
};

/* ── SectionDivider ── */

const SectionDivider = ({
  icon,
  label,
  step,
}: {
  icon: React.ReactNode;
  label: string;
  step: string;
}) => (
  <div className="flex items-center justify-between px-8 py-4 bg-muted/40 border-b">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
        {icon}
      </div>
      <span className="text-sm font-semibold text-foreground">{label}</span>
    </div>
    <span className="text-xs font-mono text-muted-foreground/50 tabular-nums">
      {step}
    </span>
  </div>
);

/* ── UploadBox ── */

interface UploadBoxProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  accept: string;
  required?: boolean;
  file: File | null;
  onChange: (file: File | null) => void;
}

const UploadBox = ({
  title,
  subtitle,
  icon,
  accept,
  required,
  file,
  onChange,
}: UploadBoxProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <div
      onClick={() => inputRef.current?.click()}
      className={`group cursor-pointer rounded-xl border-2 border-dashed transition-all p-5 flex flex-col gap-3 min-h-[130px] ${file
        ? "border-green-400 bg-green-50 dark:border-green-700 dark:bg-green-950/20"
        : "border-border hover:border-primary/40 hover:bg-accent/50"
        }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => onChange(e.target.files?.[0] || null)}
      />

      <div className="flex items-start justify-between">
        <div
          className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${file
            ? "bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400"
            : "bg-muted text-muted-foreground group-hover:text-primary"
            }`}
        >
          {file ? <CheckCircle2 className="w-5 h-5" /> : icon}
        </div>

        {required && !file && (
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
            Required
          </span>
        )}
        {file && (
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-700 border border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800">
            Ready
          </span>
        )}
      </div>

      <div>
        <p
          className={`text-sm font-medium truncate ${file
            ? "text-green-700 dark:text-green-400"
            : "text-foreground"
            }`}
        >
          {file
            ? file.name.length > 20
              ? file.name.slice(0, 18) + "…"
              : file.name
            : title}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">
          {file
            ? `${(file.size / 1024 / 1024).toFixed(2)} MB`
            : subtitle}
        </p>
      </div>

      {!file && (
        <p className="text-xs text-muted-foreground/60 group-hover:text-muted-foreground transition-colors">
          Click to browse
        </p>
      )}
    </div>
  );
};

/* ── CheckboxCard ── */

interface CheckboxCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}

const CheckboxCard = ({
  icon,
  title,
  description,
  checked,
  onChange,
}: CheckboxCardProps) => (
  <div
    onClick={() => onChange(!checked)}
    className={`relative cursor-pointer rounded-xl border transition-all p-4 select-none ${checked
      ? "bg-primary/5 border-primary/30"
      : "bg-background border-input hover:bg-accent hover:border-border"
      }`}
  >
    {/* Custom checkbox top-right */}
    <div className="flex items-start justify-between mb-3">
      <div
        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${checked
          ? "bg-primary/10 text-primary"
          : "bg-muted text-muted-foreground"
          }`}
      >
        {icon}
      </div>

      {/* Checkbox indicator */}
      <div
        className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${checked
          ? "bg-primary border-primary"
          : "bg-background border-input"
          }`}
      >
        {checked && <Check className="w-3 h-3 text-primary-foreground" strokeWidth={3} />}
      </div>
    </div>

    <p
      className={`text-sm font-semibold mb-0.5 ${checked ? "text-foreground" : "text-foreground/80"
        }`}
    >
      {title}
    </p>
    <p className="text-xs text-muted-foreground leading-relaxed">
      {description}
    </p>
  </div>
);

export default AddVideo;
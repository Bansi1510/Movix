import {
  Filter,
  Film,
  Languages,
  Crown,
} from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface VideoFiltersProps {
  genre: string;
  setGenre: (value: string) => void;

  language: string;
  setLanguage: (value: string) => void;

  type: string;
  setType: (value: string) => void;
}

const genres = [
  "Action",
  "Comedy",
  "Drama",
  "Horror",
  "Sci-Fi",
  "Romance",
  "Thriller",
  "Adventure",
];

const languages = [
  "English",
  "Hindi",
  "Gujarati",
  "Tamil",
  "Telugu",
];

const VideoFilters = ({
  genre,
  setGenre,
  language,
  setLanguage,
  type,
  setType,
}: VideoFiltersProps) => {
  return (
    <div className="sticky top-4 rounded-xl border bg-card p-5 shadow-sm">
      <div className="mb-5 flex items-center gap-2">
        <Filter className="h-5 w-5" />
        <h2 className="text-lg font-semibold">
          Filters
        </h2>
      </div>

      <div className="space-y-5">
        {/* Genre */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium">
            <Film className="h-4 w-4" />
            Genre
          </label>

          <Select
            value={genre}
            onValueChange={setGenre}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Genre" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">
                All Genres
              </SelectItem>

              {genres.map((item) => (
                <SelectItem
                  key={item}
                  value={item}
                >
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Language */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium">
            <Languages className="h-4 w-4" />
            Language
          </label>

          <Select
            value={language}
            onValueChange={setLanguage}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Language" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">
                All Languages
              </SelectItem>

              {languages.map((item) => (
                <SelectItem
                  key={item}
                  value={item}
                >
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Type */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium">
            <Crown className="h-4 w-4" />
            Type
          </label>

          <Select
            value={type}
            onValueChange={setType}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Type" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">
                All Types
              </SelectItem>

              <SelectItem value="FREE">
                FREE
              </SelectItem>

              <SelectItem value="PREMIUM">
                PREMIUM
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default VideoFilters;
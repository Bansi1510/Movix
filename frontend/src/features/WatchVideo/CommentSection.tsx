import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Props {
  videoId: string;
}

const CommentSection = ({
  videoId,
}: Props) => {
  const [message, setMessage] =
    useState("");

  return (
    <div className="mt-8 space-y-4">
      <h2 className="text-xl font-semibold">
        Comments
      </h2>

      <div className="flex gap-2">
        <Input
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
          placeholder="Write a comment..."
        />

        <Button>
          Post
        </Button>
      </div>

      <div className="space-y-3">
        {/* comments list here */}
      </div>
    </div>
  );
};

export default CommentSection;
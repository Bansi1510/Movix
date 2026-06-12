import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useCommentVideo } from "@/hooks/useCommentVideo";
import { useVideoComments } from "@/hooks/useVideoComments";

interface Props {
  videoId: string;
}

const CommentSection = ({
  videoId,
}: Props) => {
  const [message, setMessage] =
    useState("");

  const {
    mutate: commentVideo,
    isPending,
  } = useCommentVideo();

  const {
    data: comments = [],
    isLoading,
  } = useVideoComments(videoId);
  console.log(comments)
  const handleComment = () => {
    if (!message.trim()) return;

    commentVideo(
      {
        videoId,
        message,
      },
      {
        onSuccess: () => {
          setMessage("");
        },
      }
    );
  };

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

        <Button
          onClick={handleComment}
          disabled={isPending}
        >
          {isPending
            ? "Posting..."
            : "Post"}
        </Button>
      </div>

      {isLoading ? (
        <p>Loading comments...</p>
      ) : comments.length === 0 ? (
        <p className="text-muted-foreground">
          No comments yet
        </p>
      ) : (
        <div className="space-y-4">
          {comments.map((comment: any) => (
            <div
              key={comment.id}
              className="rounded-lg border p-4"
            >
              <p className="font-medium">
                {comment.user?.name ||
                  comment.user?.email}
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                {comment.message}
              </p>

              <p className="mt-2 text-xs text-muted-foreground">
                {new Date(
                  comment.createdAt
                ).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentSection;
import { useNavigate } from "react-router-dom";
import {
  PlayCircle,
  Calendar,
  User,
  IndianRupee,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogOverlay,
} from "@/components/ui/dialog";

import { useUserPurchases } from "@/hooks/useUserPurchases";

interface PurchasesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PurchasesDialog = ({
  open,
  onOpenChange,
}: PurchasesDialogProps) => {
  const navigate = useNavigate();

  const { data, isLoading } = useUserPurchases();

  const purchases = data || [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>

      {/* ✅ FIXED OVERLAY */}
      <DialogOverlay className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" />

      <DialogContent
        className="
          fixed
          top-1/2
          left-1/2
          z-50
          grid
          w-[95vw]
          max-w-[95vw]
          -translate-x-1/2
          -translate-y-1/2
          gap-4
          rounded-xl
          bg-background
          text-foreground
          border
          border-border
          shadow-2xl
          p-0
          overflow-hidden
        "
      >
        {/* Header */}
        <DialogHeader className="border-b px-6 py-4 bg-background">
          <DialogTitle className="text-2xl font-bold">
            My Purchases
          </DialogTitle>
        </DialogHeader>

        {/* Loading */}
        {isLoading ? (
          <div className="flex items-center justify-center h-[60vh]">
            <p className="text-muted-foreground">
              Loading purchases...
            </p>
          </div>
        ) : purchases.length === 0 ? (
          <div className="flex items-center justify-center h-[60vh]">
            <p className="text-muted-foreground text-lg">
              No purchased videos found.
            </p>
          </div>
        ) : (
          <div className="h-[75vh] overflow-y-auto p-6 space-y-4 bg-background">
            {purchases.map((purchase: any) => (
              <div
                key={purchase.id}
                onClick={() => {
                  navigate(`/watch/${purchase.video.id}`);
                  onOpenChange(false);
                }}
                className="
                  group
                  flex
                  gap-5
                  p-4
                  rounded-xl
                  border
                  border-border
                  bg-background
                  dark:bg-card
                  hover:bg-muted/40
                  dark:hover:bg-accent/30
                  cursor-pointer
                  transition-all
                  duration-200
                "
              >
                {/* Thumbnail */}
                <div className="w-56 h-32 shrink-0 overflow-hidden rounded-lg bg-muted">
                  <img
                    src={purchase.video.thumbnail}
                    alt={purchase.video.title}
                    className="
                      w-full
                      h-full
                      object-cover
                      group-hover:scale-105
                      transition-transform
                      duration-300
                    "
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-semibold line-clamp-2">
                    {purchase.video.title}
                  </h3>

                  {purchase.video.description && (
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                      {purchase.video.description}
                    </p>
                  )}

                  {/* Meta */}
                  <div className="flex flex-wrap gap-5 mt-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>
                        {new Date(purchase.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    {purchase.video.price && (
                      <div className="flex items-center gap-1">
                        <IndianRupee size={14} />
                        <span>{purchase.video.price}</span>
                      </div>
                    )}

                    {purchase.video.user?.name && (
                      <div className="flex items-center gap-1">
                        <User size={14} />
                        <span>{purchase.video.user.name}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Play Icon */}
                <div className="flex items-center">
                  <PlayCircle
                    size={40}
                    className="text-primary group-hover:scale-110 transition-transform"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PurchasesDialog;
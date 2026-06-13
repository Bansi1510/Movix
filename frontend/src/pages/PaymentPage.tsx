import { useParams } from "react-router-dom";

import { useVideo } from "@/hooks/useVideo";

import PaymentHeader from "@/features/payment/PaymentHeader";
import VideoPaymentCard from "@/features/payment/VideoPaymentCard";
import PaymentMethods from "@/features/payment/PaymentMethods";
import { useCreateOrder } from "@/hooks/useCreateOrder";

const PaymentPage = () => {
  const { videoId } = useParams();
  const createOrderMutation =
    useCreateOrder();

  const {
    data: video,
    isLoading,
    isError,
  } = useVideo(videoId as string);

  const handlePayment = () => {
    createOrderMutation.mutate(video.id, {
      onSuccess: (data) => {
        console.log(data);
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">
          Loading video details...
        </p>
      </div>
    );
  }

  if (isError || !video) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-destructive">
          Video not found
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <PaymentHeader />

        <div className="grid gap-6 lg:grid-cols-2">
          <VideoPaymentCard video={video} />

          <PaymentMethods
            price={video.price}
            loading={createOrderMutation.isPending}
            onPay={handlePayment}
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
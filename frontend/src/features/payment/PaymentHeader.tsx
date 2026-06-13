import { ShieldCheck } from "lucide-react";

const PaymentHeader = () => {
  return (
    <div className="text-center">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
        <ShieldCheck className="h-7 w-7 text-primary" />
      </div>

      <h1 className="text-3xl font-bold">
        Secure Checkout
      </h1>

      <p className="mt-2 text-muted-foreground">
        Complete your purchase and unlock premium content
      </p>
    </div>
  );
};

export default PaymentHeader;
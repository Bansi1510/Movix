import {
  CreditCard,
  Smartphone,
  ShieldCheck,
  Lock,
} from "lucide-react";

import { Button } from "@/components/ui/button";

interface PaymentMethodsProps {
  onPay: () => void;
  loading: boolean;
  price: number;
}

const PaymentMethods = ({
  onPay,
  loading,
  price,
}: PaymentMethodsProps) => {
  return (
    <div className="rounded-2xl border bg-card p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-xl font-semibold">
          Secure Payment
        </h3>

        <p className="mt-1 text-sm text-muted-foreground">
          Lifetime access after purchase
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Smartphone className="h-5 w-5 text-primary" />
          <span>UPI (GPay, PhonePe, Paytm)</span>
        </div>

        <div className="flex items-center gap-3">
          <CreditCard className="h-5 w-5 text-primary" />
          <span>Credit / Debit Cards</span>
        </div>

        <div className="flex items-center gap-3">
          <ShieldCheck className="h-5 w-5 text-primary" />
          <span>Protected by Razorpay</span>
        </div>

        <div className="flex items-center gap-3">
          <Lock className="h-5 w-5 text-primary" />
          <span>Lifetime video access</span>
        </div>
      </div>

      <div className="mt-8 border-t pt-6">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-muted-foreground">
            Total Amount
          </span>

          <span className="text-2xl font-bold">
            ₹{price}
          </span>
        </div>

        <Button
          onClick={onPay}
          disabled={loading}
          className="w-full"
          size="lg"
        >
          {loading
            ? "Creating Order..."
            : `Pay ₹${price}`}
        </Button>
      </div>
    </div>
  );
};

export default PaymentMethods;
import { useState } from "react";
import {
  Eye,
  EyeOff,
  Film,
  Lock,
  Mail,
  User,
} from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { signUpSchema, type SignUpFormData } from "@/schemas/auth.schema";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSignUp } from "@/hooks/useSignIn";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/app/slices/auth.slice";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate, isPending } = useSignUp();

  const onSubmit = (data: SignUpFormData) => {
    mutate(
      {
        name: data.name,
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: (response) => {
          dispatch(
            loginSuccess(response.data.user)
          );

          navigate("/");
        },

        onError: (error: any) => {
          console.log(
            error?.response?.data?.message
          );
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="grid min-h-screen lg:grid-cols-2">
        <div className="relative hidden overflow-hidden border-r lg:flex items-center justify-center bg-muted/30">
          <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-background to-primary/5" />

          <div className="relative z-10 max-w-md px-8 text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-primary text-primary-foreground shadow-lg">
              <Film size={38} />
            </div>

            <h1 className="mb-4 text-5xl font-bold tracking-tight">
              Join Movix
            </h1>

            <p className="text-lg text-muted-foreground">
              Create your account and start exploring movies.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center p-4">
          <Card className="w-full max-w-md border bg-card/80 backdrop-blur-xl shadow-2xl">
            <CardContent className="p-8">
              <div className="mb-8 text-center">
                <div className="mb-4 flex justify-center lg:hidden">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                    <Film size={24} />
                  </div>
                </div>

                <h2 className="text-3xl font-bold">
                  Create Account
                </h2>

                <p className="mt-2 text-sm text-muted-foreground">
                  Create an account to get started
                </p>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>

                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                      id="name"
                      placeholder="John Doe"
                      className="pl-10"
                      {...register("name")}
                    />
                  </div>

                  {errors.name && (
                    <p className="text-sm text-destructive">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>

                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                      id="email"
                      placeholder="john@example.com"
                      className="pl-10"
                      {...register("email")}
                    />
                  </div>

                  {errors.email && (
                    <p className="text-sm text-destructive">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>

                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create password"
                      className="pl-10 pr-10"
                      {...register("password")}
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>

                  {errors.password && (
                    <p className="text-sm text-destructive">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">
                    Confirm Password
                  </Label>

                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                      id="confirmPassword"
                      type={
                        showConfirmPassword ? "text" : "password"
                      }
                      placeholder="Confirm password"
                      className="pl-10 pr-10"
                      {...register("confirmPassword")}
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword((prev) => !prev)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>

                  {errors.confirmPassword && (
                    <p className="text-sm text-destructive">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isPending || isSubmitting}
                  className="h-11 w-full"
                >
                  {isPending
                    ? "Creating Account..."
                    : "Create Account"}
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-11 w-full"
                >
                  <Link to="/login">
                    Already have a Account
                  </Link>
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
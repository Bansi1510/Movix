import { zodResolver } from "@hookform/resolvers/zod";
import { Film, Lock, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/hooks/useLogin";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/store/slices/auth.slice";
import { useNavigate } from "react-router-dom";
import LoadingButton from "@/components/common/LoadingButton";
import type { AxiosError } from "axios";
import { toast } from "react-toastify";
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters long"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });
  const loginMutation = useLogin();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = (values: LoginFormValues) => {
    console.log(values);
    loginMutation.mutate(values, {
      onSuccess: (data) => {
        dispatch(
          setCredentials(data.admin)
        );
        navigate("/dashboard");
      },
      onError: (error) => {
        const axiosError = error as AxiosError<{
          message: string;
        }>;

        toast.error(
          axiosError.response?.data?.message ??
          "Something went wrong"
        );
      },
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground px-4 transition-colors">

      <div className="w-full max-w-md">

        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <Film className="h-8 w-8 text-primary" />
          </div>

          <h1 className="text-3xl font-bold">
            Welcome Admin to Movix
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to access dashboard
          </p>
        </div>

        {/* Card */}
        <Card className="border border-border bg-card/60 backdrop-blur">
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
            <CardDescription>
              Enter your credentials to continue
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm">Email</label>

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    type="email"
                    placeholder="admin@movix.com"
                    className="pl-10"
                    {...form.register("email")}
                  />
                </div>

                {form.formState.errors.email && (
                  <p className="text-xs text-red-500">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-sm">Password</label>

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    {...form.register("password")}
                  />
                </div>

                {form.formState.errors.password && (
                  <p className="text-xs text-red-500">
                    {form.formState.errors.password.message}
                  </p>
                )}
              </div>

              {/* Button */}
              <LoadingButton
                type="submit"
                className="w-full gap-2"
                loading={loginMutation.isPending}
                loadingText="Signing In..."
              >
                Sign In
              </LoadingButton>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
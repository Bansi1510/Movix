import { LogOut, Mail, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RootState } from "@/app/store";
import { logout } from "@/app/slices/auth.slice";


const Dashboard = () => {
  const dispatch = useDispatch();

  const user = useSelector(
    (state: RootState) => state.auth.user
  );

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">
              Dashboard
            </h1>

            <p className="text-muted-foreground">
              Welcome back, {user?.name}
            </p>
          </div>

          <Button
            variant="destructive"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        <Card>
          <CardContent className="space-y-6 p-6">
            <h2 className="text-2xl font-semibold">
              User Information
            </h2>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-muted-foreground" />

                <div>
                  <p className="text-sm text-muted-foreground">
                    Name
                  </p>

                  <p className="font-medium">
                    {user?.name}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />

                <div>
                  <p className="text-sm text-muted-foreground">
                    Email
                  </p>

                  <p className="font-medium">
                    {user?.email}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold">
                Total Movies
              </h3>

              <p className="mt-2 text-3xl font-bold">
                120
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold">
                Watchlist
              </h3>

              <p className="mt-2 text-3xl font-bold">
                24
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold">
                Favorites
              </h3>

              <p className="mt-2 text-3xl font-bold">
                12
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
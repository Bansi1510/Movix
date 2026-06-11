import { useSelector } from "react-redux";

import { RootState } from "@/app/store";
import UserMenu from "@/features/dashboard/UserMenu";
import Feed from "@/features/dashboard/Feed";

const Dashboard = () => {
  const user = useSelector(
    (state: RootState) => state.auth.user
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">
              Movix
            </h1>

            <p className="text-muted-foreground">
              Welcome back, {user?.name}
            </p>
          </div>

          <UserMenu />
        </div>

        <Feed />
      </div>
    </div>
  );
};

export default Dashboard;
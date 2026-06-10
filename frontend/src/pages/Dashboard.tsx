import { useSelector } from "react-redux";

import { RootState } from "@/app/store";
import UserMenu from "@/features/dashboard/UserMenu";


const Dashboard = () => {

  const user = useSelector(
    (state: RootState) => state.auth.user
  );

  console.log(user)

  return (
    <div className="min-h-screen bg-background p-6">
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




    </div >
  );
};

export default Dashboard;
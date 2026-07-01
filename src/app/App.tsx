import { AppLayout } from "./layouts/AppLayout";
import { DashboardPage } from "../features/dashboard";

export function App() {
  return (
    <AppLayout>
      <DashboardPage />
    </AppLayout>
  );
}

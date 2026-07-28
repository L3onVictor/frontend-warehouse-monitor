import DashClient from "./DashClient";
import { Suspense } from "react";

export default function DashboardPage() {
 
  return (
    <Suspense fallback={<div className="p-6">Carregando dashboard...</div>}>
      <DashClient />
    </Suspense>
  );
}
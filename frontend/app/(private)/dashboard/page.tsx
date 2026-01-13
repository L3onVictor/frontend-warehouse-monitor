import { TemperatureChart } from "./components/Graficos";
import { SummaryCards } from "./components/SummaryCards";
import { TemperatureReading } from "./components/types";
import { temperatureMock } from "@/app/mocks/dadosSensores";

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard de Temperatura</h1>

      <SummaryCards data={temperatureMock} />
      <TemperatureChart data={temperatureMock} />
    </div>
  );
}

{"Aqui faremos a conexão com a API para buscar os dados de temperatura."}
{"Se ela ainda não estiver sido feita"}
/*
async function getTemperatures(): Promise<TemperatureReading[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/temperatures?environmentId=lab-01`,
    { cache: "no-store" }
  );

  return res.json();
}

export default async function DashboardPage() {
  const data = await getTemperatures();

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard de Temperatura</h1>

      <SummaryCards data={data} />

      <TemperatureChart data={data} />
    </div>
  );
}
*/
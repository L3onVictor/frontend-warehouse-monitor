import { NavMenu } from "@/components/layout/NavMenu";


export default function DashboardPage() {
  return (

    
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-900">
        <p>olá</p>
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-6">
            Bem-vindo ao Painel de Controle IoT
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-12">
            Monitore e gerencie seus dispositivos conectados de forma eficiente.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl px-6">
            <div className="bg-blue-100 dark:bg-blue-800 p-6 rounded-lg shadow-md text-center">
                <h2 className="text-2xl font-semibold text-blue-800 dark:text-blue-200 mb-4">Dispositivos Ativos</h2>
                <p className="text-4xl font-bold text-blue-900 dark:text-blue-100">42</p>
            </div>
            <div className="bg-green-100 dark:bg-green-800 p-6 rounded-lg shadow-md text-center">
                <h2 className="text-2xl font-semibold text-green-800 dark:text-green-200 mb-4">Alertas Recentes</h2>
                <p className="text-4xl font-bold text-green-900 dark:text-green-100">7</p>
            </div>
            <div className="bg-yellow-100 dark:bg-yellow-800 p-6 rounded-lg shadow-md text-center">
                <h2 className="text-2xl font-semibold text-yellow-800 dark:text-yellow-200 mb-4">Consumo de Energia</h2>
                <p className="text-4xl font-bold text-yellow-900 dark:text-yellow-100">350 kWh</p>
            </div>
        </div>
    </div>
  );
}
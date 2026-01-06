import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-900">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        Bem-vindo ao Sistema IoT
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-12">
        Gerencie e monitore seus dispositivos conectados com facilidade.
      </p>
      <Image
        src="/image.png"
        alt="Ilustração do Painel de Controle IoT"
        width={600}
        height={400}
        className="rounded-lg shadow-lg"
      />
    </div>
  );
} 
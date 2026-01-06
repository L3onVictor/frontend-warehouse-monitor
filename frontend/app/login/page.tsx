export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-900">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-6">
            Página de Login
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-12"> 
            Faça login para acessar o painel de controle IoT.
        </p>
        {/* Formulário de login pode ser adicionado aqui */}
    </div>
  );
}
export default function CadastroPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-900">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-6">
            Página de Cadastro
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-12">
            Aqui você pode cadastrar novos dispositivos IoT no sistema.
        </p>
        {/* Formulário de cadastro pode ser adicionado aqui */}
    </div>
  );
}
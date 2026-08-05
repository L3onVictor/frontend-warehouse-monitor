import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export default function CadastroUsuarioPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">
          Criar conta
        </CardTitle>

        <CardDescription className="text-center">
          Cadastre o funcionário para acessar o Warehouse Monitor.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="nome">
              Nome
            </label>

            <Input
              id="nome"
              type="text"
              placeholder="Nome do Funcionário"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email">
              E-mail
            </label>

            <Input
              id="email"
              type="email"
              placeholder="exemplo@email.com"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="senha">
              Senha
            </label>

            <Input
              id="senha"
              type="password"
              placeholder="••••••••"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmarSenha">
              Confirmar senha
            </label>

            <Input
              id="confirmarSenha"
              type="password"
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-center justify-between rounded-lg border p-3">
            <div className="space-y-1">
              <p className="font-medium">
                Receber notificações
              </p>

              <p className="text-sm text-muted-foreground">
                Receba alertas por e-mail quando ocorrerem eventos importantes.
              </p>
            </div>

            <Switch id="receberEmail" />
          </div>

          <Button
            className="w-full"
            type="submit"
          >
            Criar conta
          </Button>
        </form>
      </CardContent>

      <CardFooter className="justify-center">
        <Button
          variant="link"
          type="button"
        >
          Já possui uma conta? Entrar
        </Button>
      </CardFooter>
    </Card>
  );
}
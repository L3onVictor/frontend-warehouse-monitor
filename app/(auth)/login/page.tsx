import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <Card>

      <CardHeader className="text-center">
        <CardTitle>Entrar</CardTitle>

        <CardDescription>
          Faça login.
        </CardDescription>
      </CardHeader>

      <CardContent>

        <form className="space-y-4">

          <div className="space-y-2">
            <label htmlFor="email">
              E-mail
            </label>

            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password">
              Senha
            </label>

            <Input
              id="password"
              type="password"
              placeholder="••••••••"
            />
          </div>

          <Button
            className="w-full"
            type="submit"
          >
            Entrar
          </Button>

        </form>

      </CardContent>

      <CardFooter className="justify-center">
        <Button
          variant="link"
          type="button"
        >
          Esqueci minha senha
        </Button>
      </CardFooter>

    </Card>
  );
}
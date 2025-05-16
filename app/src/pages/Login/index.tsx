import { Card, CardBody, CardHeader } from '@heroui/card';

import { LoginForm } from './components/form';

export default function LoginPage() {
  return (
    <section className="flex flex-col justify-center items-center gap-4 h-screen">
      <Card className="w-1/3 px-2 py-4 max-lg:w-3/5 max-md:w-4/5">
        <CardHeader className="flex flex-col items-center">
          <h1 className="text-2xl font-semibold">Login</h1>
          <p className="text-lg">Seja bem-vindo</p>
        </CardHeader>
        <CardBody>
          <LoginForm />
        </CardBody>
      </Card>
    </section>
  );
}

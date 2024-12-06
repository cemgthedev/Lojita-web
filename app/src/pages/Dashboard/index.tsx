import { useAuthentication } from "@/hooks/use-authentication.hook";

export const DashboardPage = () => {
  const { user } = useAuthentication();
  
  return (
    <section className="flex flex-col gap-4 m-4">
      <p>Dashboard</p>
      <p>{JSON.stringify(user)}</p>
    </section>
  );
};

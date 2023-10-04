import { useCars } from "../src/hooks/useCars";

export default function Home() {
  const { cars } = useCars();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
    </main>
  );
}
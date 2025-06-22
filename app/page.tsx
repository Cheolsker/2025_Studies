import { Counter } from "./components/Counter";
import { PrimaryButton } from "./components/PrimaryButton";

export default function Home() {
  return (
    <main>
      <Counter />

      <div className="mt-4">
        <PrimaryButton onClick={() => console.log("PrimaryButton clicked!")}>
          클릭하세요
        </PrimaryButton>
      </div>
    </main>
  );
}

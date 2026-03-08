import Image from "next/image";
import ToDo from "./components/ToDo";

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold p-5"> Next JS To Do App </h1>
      <ToDo />
    </div>
  );
}

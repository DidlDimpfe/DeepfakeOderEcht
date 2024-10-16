import { Celebrity } from "@/lib/queries";
import PageHeading from "./PageHeading";

export default function ToDoLabel({ celebrity }: { celebrity: Celebrity }) {
  return (
    <PageHeading className="absolute left-1/2 top-4 z-10 -translate-x-1/2 md:top-6 lg:top-10">
      <h2>
        Wähle {celebrity.gender === "f" ? "die" : "den"} echte
        {celebrity.gender === "f" ? "" : "n"} {celebrity.first_name}{" "}
        {celebrity.last_name}
      </h2>
    </PageHeading>
  );
}

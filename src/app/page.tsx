import { ToDoList } from "./ToDoList";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-black text-4xl">TO DO LIST</h1>
      <ToDoList />
    </main>
  );
}

import fetchTodos from "@/lib/fetchTodos"

export default async function TodoList() {
    const todos = await fetchTodos();

    const sortedTodos = todos.reverse();

    const content = (
        <>
            {sortedTodos.map(todo => (
                <h1 key={todo.id}>{todo.title}</h1>
            ))}
        </>
    )
  return content;
}

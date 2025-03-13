import { useState } from "react";

type ToDo = {
  name: string;
  done: boolean;
};

const ToDoList = () => {
  const { ToDo, setToDo } = useState<ToDo[]>([]);
  const { input, setInput } = useState<string>();

  const OnChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const addToDo () =>(){
    const newTodo = {
      name: input,
      done: false
    }
    setToDo([...ToDo, newTodo])
  }

  return (
    <div>
      <div>todolist</div>
      <input placeholder="Tarefas " value={input} onChange={OnChangeInput} />
      <button onClick={addToDo}>Adicionar</button>
      <p></p>
    </div>
  );
};

export default ToDoList;

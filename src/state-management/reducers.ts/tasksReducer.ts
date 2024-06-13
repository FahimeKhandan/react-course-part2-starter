interface Task {
  id: number;
  title: string;
}

interface AddTask {
  type: "ADD";
  task: Task;
}

interface Delete {
  type: "DELETE";
  id: number;
}

type Action = AddTask | Delete;

const taskReducer = (tasks: Task[], action: Action) => {
  switch (action.type) {
    case "ADD":
      return [...tasks, action.task];
    case "DELETE":
      return tasks.filter((task) => task.id !== action.id);
  }
};

export default taskReducer;

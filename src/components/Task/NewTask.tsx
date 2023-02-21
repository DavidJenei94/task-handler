import { Dispatch, SetStateAction, useState } from 'react';
import { Task } from '../../models/task.model';

import styles from './NewTask.module.scss';

interface NewTaskProps {
  setTaskList: Dispatch<SetStateAction<Task[]>>;
}

const NewTask = ({ setTaskList }: NewTaskProps) => {
  const [taskName, setTaskName] = useState<string>('');
  const [deadline, setDeadline] = useState<string>(
    new Date().toISOString().substring(0, 16)
  );

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (taskName === "") return;

    setTaskList((prevValue) => {
      const tasks = [...prevValue];
      tasks.push({
        id: 8,
        task: taskName,
        deadline: new Date(deadline),
        done: false,
      });

      return tasks;
    });

    console.log('New Task Added!');
  };

  return (
    <div className={styles.task}>
      <form onSubmit={submitHandler}>
        <input
          name="task"
          value={taskName}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setTaskName(event.target.value)
          }
          placeholder="New task"
          required
        />
        <input
          type="datetime-local"
          id="meeting-time"
          name="deadline"
          value={deadline}
          onChange={(event) => setDeadline(event.target.value)}
          min={new Date().toISOString().substring(0, 16)}
          required
        />
        <button type="submit">Add New Task</button>
      </form>
    </div>
  );
};

export default NewTask;

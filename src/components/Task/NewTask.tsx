import { Dispatch, SetStateAction, useContext, useState } from 'react';
import { Task } from '../../models/task.model';
import { addTask } from '../../service/task.api';
import AuthContext from '../../store/auth-context';
import FeedbackContext from '../../store/feedback-context';
import { toIsoString } from '../../utils/general.utils';

import Button from '../UI/Button';
import Input from '../UI/Input';

import styles from './NewTask.module.scss';

interface NewTaskProps {
  setTaskList: Dispatch<SetStateAction<Task[]>>;
}

const NewTask = ({ setTaskList }: NewTaskProps) => {
  const authCtx = useContext(AuthContext);
  const feedbackCtx = useContext(FeedbackContext);

  const [taskName, setTaskName] = useState<string>('');
  const [deadline, setDeadline] = useState<string>(
    toIsoString(new Date()).substring(0, 16)
  );

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (taskName === '') return;

    try {
      const newTask = await addTask(taskName, deadline, authCtx.id);

      if (!newTask.id) {
        throw new Error(newTask.message);
      }

      setTaskList((prevValue) => {
        const tasks = [...prevValue];
        tasks.push({
          id: newTask.id,
          task: taskName,
          deadline: new Date(deadline),
          done: false,
        });

        tasks.sort((a: any, b: any) => {
          return a.deadline - b.deadline;
        });

        return tasks;
      });

      feedbackCtx.showMessage(newTask.message, 4000);
    } catch (error: any) {
      feedbackCtx.showMessage(error.message, 4000);
    }
  };

  return (
    <div className={styles.task}>
      <form onSubmit={submitHandler}>
        <Input
          name="task"
          value={taskName}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setTaskName(event.target.value)
          }
          placeholder="New task"
          required
        />
        <Input
          type="datetime-local"
          id="meeting-time"
          name="deadline"
          value={deadline}
          onChange={(event) => setDeadline(event.target.value)}
          min={new Date().toISOString().substring(0, 16)}
          required
        />
        <Button type="submit">
          <p>Add New Task</p>
        </Button>
      </form>
    </div>
  );
};

export default NewTask;

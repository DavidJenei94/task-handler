import { Dispatch, SetStateAction, useState } from 'react';
import { Task } from '../../models/task.model';

import styles from './SingleTask.module.scss';
import checkedCircle from '../../assets/checked-circle.png';
import emptyCircle from '../../assets/empty-circle.png';

interface SingleTaskProps {
  task: Task;
  setTaskList: Dispatch<SetStateAction<Task[]>>;
}

const SingleTask = ({ task, setTaskList }: SingleTaskProps) => {
  const checkHandler = () => {
    setTaskList((prevState) => {
      return prevState.map((taskInList) => {
        if (task.id === taskInList.id) {
          return { ...taskInList, done: !task.done };
        }

        return taskInList;
      });
    });
  };

  const handleDoubleClick = () => {
    setTaskList((prevState) => {
      return prevState.filter((taskInList) => taskInList.id !== task.id);
    });
  };

  const deadline = `${task.deadline
    .toISOString()
    .substring(0, 10)} ${task.deadline.toISOString().substring(11, 16)}`;

  return (
    <div className={styles.task} onDoubleClick={handleDoubleClick}>
      <img
        src={task.done ? checkedCircle : emptyCircle}
        className={styles['check-image']}
        onClick={checkHandler}
      />
      <div className={styles['task-text']}>
        <p className={styles['task-title']}>{task.task}</p>
        <p className={styles['task-deadline']}>{deadline}</p>
      </div>
    </div>
  );
};

export default SingleTask;

import { Dispatch, SetStateAction, useContext } from 'react';
import { Task } from '../../models/task.model';
import { deleteTask, updateTask } from '../../service/task.api';
import FeedbackContext from '../../store/feedback-context';
import { isToday, isTomorrow, toIsoString } from '../../utils/general.utils';
import useLongPress from '../../hooks/useLongPress';

import styles from './SingleTask.module.scss';
import checkedCircle from '../../assets/checked-circle.png';
import emptyCircle from '../../assets/empty-circle.png';

interface SingleTaskProps {
  task: Task;
  setTaskList: Dispatch<SetStateAction<Task[]>>;
}

const SingleTask = ({ task, setTaskList }: SingleTaskProps) => {
  const feedbackCtx = useContext(FeedbackContext);

  const handleDoubleClick = async () => {
    try {
      const data = await deleteTask(task.id);

      setTaskList((prevState) => {
        return prevState.filter((taskInList) => taskInList.id !== task.id);
      });

      feedbackCtx.showMessage(data.message, 4000);
    } catch (error: any) {
      feedbackCtx.showMessage(error.message, 4000);
    }
  };

  const longPressEvent = useLongPress(handleDoubleClick, () => {}, {
    shouldPreventDefault: true,
    delay: 500,
  });

  const checkHandler = async () => {
    try {
      await updateTask(task.id, task.done ? 0 : 1);

      setTaskList((prevState) => {
        return prevState.map((taskInList) => {
          if (task.id === taskInList.id) {
            return { ...taskInList, done: !task.done };
          }

          return taskInList;
        });
      });
    } catch (error: any) {
      feedbackCtx.showMessage(error.message, 4000);
    }
  };

  const deadlineColorClass = isToday(task.deadline)
    ? 'red'
    : isTomorrow(task.deadline)
    ? 'yellow'
    : '';
  const deadlineClass = `${styles['task-deadline']} ${styles[deadlineColorClass]}`;

  const deadline = `${toIsoString(task.deadline).substring(
    0,
    10
  )} ${toIsoString(task.deadline).substring(11, 16)}`;

  return (
    <div
      className={styles.task}
      onDoubleClick={handleDoubleClick}
      {...longPressEvent}
    >
      <img
        src={task.done ? checkedCircle : emptyCircle}
        className={styles['check-image']}
        onClick={checkHandler}
        alt="Check/uncheck task circle."
      />
      <div className={styles['task-text']}>
        <p className={styles['task-title']}>{task.task}</p>
        <p className={deadlineClass}>{deadline}</p>
      </div>
    </div>
  );
};

export default SingleTask;

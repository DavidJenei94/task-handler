import { useState } from 'react';
import { Task } from '../../models/task.model';

import NewTask from './NewTask';
import SingleTask from './SingleTask';

const TaskList = () => {
  const [taskList, setTaskList] = useState<Task[]>([
    { id: 1, task: 'Do some stuff', deadline: new Date(), done: false },
    { id: 2, task: 'Do some more stuff', deadline: new Date(), done: false },
    { id: 3, task: 'Do some extra stuff', deadline: new Date(), done: false },
    { id: 4, task: 'Do ', deadline: new Date(), done: false },
  ]);

  return (
    <>
      <NewTask setTaskList={setTaskList} />
      {taskList.map((task) => (
        <SingleTask key={task.id} task={task} setTaskList={setTaskList} />
      ))}
    </>
  );
};

export default TaskList;

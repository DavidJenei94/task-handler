import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Task } from '../../models/task.model';
import { fetchTasks } from '../../service/task.api';
import AuthContext from '../../store/auth-context';

import NewTask from './NewTask';
import SingleTask from './SingleTask';

const TaskList = () => {
  const [taskList, setTaskList] = useState<Task[]>([]);

  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const fetchTaskList = async () => {
      const modifiedTasks = await fetchTasks(authCtx.id);
      setTaskList(modifiedTasks);
    };

    if (authCtx.isAuthenticated) {
      fetchTaskList();
    } else {
      navigate('/login');
    }
  }, [authCtx.isAuthenticated, authCtx.id, navigate]);

  taskList.sort((a: any, b: any) => {
    return a.deadline - b.deadline;
  });

  return (
    <>
      {authCtx.isAuthenticated && (
        <>
          <NewTask setTaskList={setTaskList} />
          {taskList.map((task) => (
            <SingleTask key={task.id} task={task} setTaskList={setTaskList} />
          ))}
        </>
      )}
    </>
  );
};

export default TaskList;

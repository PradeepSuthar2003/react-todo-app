import { Stack, Paper, Container, List, Typography, Button } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { useState, useRef, useEffect } from 'react';
import { theme } from './theme';
import { TaskObj } from './utils/constants';
import { TaskInput, TaskItem } from './components'
import AlertMessage from './components/AlertMessage';
import { MessageObj } from './utils/constants';

function App() {

  const task = useRef<HTMLInputElement | null>(null);
  let [taskList, addTask] = useState<TaskObj[]>([]);
  const [taskCount, setTaskCount] = useState<number>(0);
  let [comCount, setComCount] = useState<number>(0);
  const [showAlert, setShowAlert] = useState<MessageObj>({ display: 'none', alertTitle: '', alertType: 'info' });

  useEffect(() => {
    getLocalTaskList();
    task.current = document.getElementById('task-input') as HTMLInputElement;
    task.current.addEventListener("onsubmit", onAddPress);

    return () => {
      task.current?.removeEventListener("onsubmit", onAddPress);
    };
  }, [taskCount]);

  const showAlertHandler = (prop: MessageObj) => {
    setShowAlert(prop);
    setTimeout(() => {
      setShowAlert({ display: 'none', alertTitle: '', alertType: 'info' });
    }, 3000);
  }

  const onAddPress = () => {
    if (task.current!.value.toString().length !== 0) {
      if (task.current!.value.toString().length > 3 && task.current!.value.toString().length < 15) {
        //addTask([...taskList, { checked: false, title: task.current!.value }]);
        localStorage.setItem('taskList', JSON.stringify([...taskList, { checked: false, title: task.current!.value }]));
        setTaskCount(taskCount + 1);
        showAlertHandler({ display: 'flex', alertTitle: 'New Task added', alertType: 'success' });
        task.current!.value = '';
      } else {
        showAlertHandler({ display: 'flex', alertTitle: 'Task name must be greater than 3 char and less than 15 char', alertType: 'error' });
      }
    } else {
      showAlertHandler({ display: 'flex', alertTitle: 'Please enter task', alertType: 'error' });
    }
  }

  const getLocalTaskList = () => {

    if (localStorage.getItem('taskList') !== null) {
      addTask(JSON.parse(localStorage.getItem("taskList")!));
      setTaskCount((JSON.parse(localStorage.getItem("taskList")!)).length);
      getCompleteTaskCount();
    } else {
      localStorage.setItem('taskList', JSON.stringify([]));
    }
  }


  const removeEle = (index: number) => {
    let newArr: TaskObj[] = [];

    setTaskCount(taskCount - 1);

    (taskList).filter((arrEle, i) => {
      if (index === i && taskList[index].checked) {
        setComCount(--comCount);
      }
      if (index !== i) {
        newArr.push(arrEle);
      }
      return index !== i;
    });

    showAlertHandler({ display: 'flex', alertTitle: 'Task deleted...', alertType: 'error' });

    localStorage.setItem('taskList', JSON.stringify(newArr));
  }


  const taskCompleted = (index: number) => {

    addTask(taskList.filter((arrEle, i) => {
      if (i === index) {
        setComCount(taskList[i].checked ? --comCount : ++comCount);
        taskList[i].checked = taskList[i].checked ? false : true;
      }
      return arrEle;
    }));
    showAlertHandler({ display: 'flex', alertTitle: taskList[index].checked ? 'Make to complete' : 'Make to incomplete', alertType: 'success' });
    localStorage.setItem('taskList', JSON.stringify(taskList));

  }

  const clearAllChecked = () => {
    let count: number = 0;
    let newArr: TaskObj[] = [];

    taskList.filter((arrEle) => {
      count = arrEle.checked ? ++count : count;
      if (arrEle.checked === false) {
        newArr.push(arrEle);
      }
      return arrEle.checked === false;
    });

    setTaskCount(taskCount - count);
    setComCount(comCount - count);

    showAlertHandler({ display: 'flex', alertTitle: 'All complete task deleted', alertType: 'error' });
    localStorage.setItem('taskList', JSON.stringify(newArr));
  }

  const getCompleteTaskCount = () => {
    let count = 0;
    taskList.filter((arrEle) => {
      if (arrEle.checked) {
        count++;
      }
      return arrEle;
    });

    setComCount(count);
  }

  return (
    <ThemeProvider theme={theme}>

      <Container sx={{ display: 'flex', justifyContent: 'center', height: '100%' }}>

        <Paper elevation={5} sx={{ padding: { xs: 3, md: 5 }, width: { xs: 400, md: 600 }, backgroundColor: '#fff' }}>
          <AlertMessage sx={{ display: showAlert.display, position: 'fixed', top: '30px', width: '280px' }} alertType={showAlert.alertType} alertTitle={showAlert.alertTitle}></AlertMessage>
          <Stack direction='column' spacing={5}>
            <Typography variant='h3' align='center' fontSize={{ xs: 40, md: 50 }}>Todo List</Typography>

            <TaskInput onClick={onAddPress} ref={task} helpText='Task name must be greater than 3 char and less than 15 char' />

            <Stack direction="row" justifyContent="space-between">
              <Typography variant='body2'>Total task : {taskCount}</Typography>
              <Typography variant='body2'>Total completed task : {comCount}</Typography>
            </Stack>

            <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between">
              <List sx={{ height: '250px', overflowY: 'scroll', width: '290px' }}>
                <Typography variant='body2' position='sticky'>{taskList.length === 0 ? "No Incomplete Task :) " : "Incomplete Task : "}</Typography>
                {taskList.map((ls, index) => ls.checked ? null : <TaskItem key={index} index={index} onCheck={taskCompleted} onClick={removeEle} checked={ls.checked} text={ls.title} />)}
              </List>

              <Stack direction='column'>
                <List sx={{ height: '250px', overflowY: 'scroll', width: '290px' }} >
                  <Typography variant='body2' position='sticky'>{taskList.length === 0 ? "No Completed Task :( " : "Complete Task : "}</Typography>
                  {taskList.map((ls, index) => ls.checked ? <TaskItem key={index} index={index} onCheck={taskCompleted} onClick={removeEle} checked={ls.checked} text={ls.title} /> : null)}
                </List>
                <Button variant='contained' disableElevation color='error' onClick={() => clearAllChecked()}>Clear</Button>
              </Stack>
            </Stack>
          </Stack>
        </Paper>

      </Container>

    </ThemeProvider>
  );
}

export default App;

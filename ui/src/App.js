import React, {useState, useEffect} from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AddTaskForm } from './components/AddTaskForm';
import { Task } from "./components/Task";
import axios from "axios";
import { API_URL } from "./utils";

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function App() {
  useEffect(() => {
    document.title = "Task List"; // Set the static title for the web page
  }, []); 


  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true); // Introduce loading state

const fetchTasks = async () => {
  try {
    const { data } = await axios.get(API_URL);

    setTasks(data);
    setLoading(false); // Set loading to false when data is fetched
    
  } catch (error) {
    console.log(error)
  }
}


useEffect(() => {
  fetchTasks();
}, [])


  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AddTaskForm fetchTasks={fetchTasks} />
      {loading ? ( // Render spinner if loading is true
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
          <CircularProgress />
        </Box>
      ) : (
        tasks.map((task) => <Task task={task} key={task.id} fetchTasks={fetchTasks} />)
      )}
    </ThemeProvider>
  );
}
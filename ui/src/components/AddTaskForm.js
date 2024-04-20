import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import { Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from "axios";
import { API_URL } from '../utils';

import '@fontsource/anton';

export const AddTaskForm = ({ fetchTasks }) => {
    const [newTask, setNewTask] = useState("")

    const addNewTask = async () => {
        try {
            await axios.post(API_URL, {
                name: newTask,
                completed: false,
            });

            await fetchTasks();

            setNewTask("");
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div>
        <Typography marginTop="200px" align="center" variant="h2" paddingTop={2} paddingBottom={2} style={{ fontSize: "7rem", fontFamily: 'Anton, sans-serif' }}>
            TASK LIST
            </Typography>
        <div className="addTaskForm">
        <TextField size="small" label="Task" variant="outlined" value={newTask} onChange={(e) => setNewTask(e.target.value)}/>
        <Button disabled={!newTask.length} variant="outlined" onClick={addNewTask}>
            <AddIcon />
        </Button>
        </div>

    </div>
  )
}

import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CircularProgress from '@mui/material/CircularProgress';
import { API_URL } from '../utils';
import axios from 'axios';

import '@fontsource/anton';

export const AddTaskForm = ({ fetchTasks }) => {
    const [newTask, setNewTask] = useState('');
    const [addingTask, setAddingTask] = useState(false); // Add state for indicating if task is being added

    const addNewTask = async () => {
        try {
            setAddingTask(true); // Set addingTask to true when adding a new task
            await axios.post(API_URL, {
                name: newTask,
                completed: false,
            });
            await fetchTasks();
            setNewTask('');
            setAddingTask(false); // Set addingTask to false after adding task
        } catch (error) {
            console.log(error);
            setAddingTask(false); // Ensure to set addingTask to false in case of error
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && newTask.trim() !== '') {
            addNewTask();
        }
    };


    return (
        <div>
            <Typography
                marginTop="200px"
                align="center"
                variant="h2"
                paddingTop={2}
                paddingBottom={2}
                style={{ fontSize: '7rem', fontFamily: 'Anton, sans-serif' }}
            >
                TASK LIST
            </Typography>
            <div className="addTaskForm">
                <TextField size="small" label="Task" variant="outlined" value={newTask} onChange={(e) => setNewTask(e.target.value)} onKeyDown={handleKeyDown} />
                <Button disabled={!newTask.length || addingTask} variant="outlined" onClick={addNewTask}>
                    {addingTask ? <CircularProgress size={24} /> : <AddIcon />}
                </Button>
            </div>
        </div>
    );
};

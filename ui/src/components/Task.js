import { Checkbox, Typography, Button, CircularProgress } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import React, { useState } from 'react';
import { UpdateTaskForm } from "./UpdateTaskForm";
import classnames from "classnames";
import axios from "axios";
import { API_URL } from "../utils";


export const Task = ({ task, fetchTasks }) => {
    const { id, name, completed } = task;
    const [isComplete, setIsComplete] = useState(completed);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [deletingTask, setDeletingTask] = useState(false); // State for tracking task deletion

    const handleUpdateTaskCompletion = async () => {
        try {
            await axios.put(API_URL, {
                id, name, completed: !isComplete,
            });
            setIsComplete((prev) => !prev);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteTask = async () => {
        try {
            setDeletingTask(true); // Set deletingTask to true when deleting task
            await axios.delete(`${API_URL}/${task.id}`);
            await fetchTasks();
        } catch (error) {
            console.log(error);
        } finally {
            setDeletingTask(false); // Ensure to set deletingTask to false after task deletion
        }
    };

    return (
        <div className="task">
            <div className={classnames("flex", { done: isComplete })}>
                <Checkbox checked={isComplete} onChange={handleUpdateTaskCompletion} />
                <Typography variant="h4">{name}</Typography>
            </div>

            <div className="taskButtons">
                <Button variant="contained" onClick={() => setIsDialogOpen(true)} sx={{ backgroundColor: 'white', color: 'black' }}>
                    <EditIcon />
                </Button>
                <Button color="error" variant="contained" onClick={handleDeleteTask} sx={{ backgroundColor: 'darkgrey', color: 'black' }}>
                    {deletingTask ? <CircularProgress size={24} /> : <DeleteIcon />}
                </Button>
            </div>

            <UpdateTaskForm fetchTasks={fetchTasks} isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} task={task} />
        </div>
    );
};

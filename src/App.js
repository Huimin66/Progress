import React from "react"
import Header from "./components/Header"
import Tasks from "./components/Tasks"
import { useState } from "react"
import AddTask from "./components/AddTask"

const App = ()=>{
    const [ifShowAddForm, setifShowAddForm]=useState(false)
    const [tasks, setTasks]= useState(
        [
            {
                id:1,
                text:'Doctor Appointment',
                day:'Feb 5th at 2:30',
                reminder: true
            },
            {
                id:2,
                text:'Meeting at School',
                day:'Feb 6th at 1:30',
                reminder: true
            },
            {
                id:3,
                text:'Food Shopping',
                day:'Feb 5th at 3:30',
                reminder: false
            }
        ]
    )

    // Add Tasks
    const addTask = (task)=>{
        const id = Math.floor(Math.random()*1000)+1
        const newTask = {id, ...task}
        setTasks([...tasks, newTask])
    }
    // Delete Task
    const deleteTask = (id)=>  {
        setTasks(tasks.filter((task)=>(task.id !== id)))
    }

    // Toggle Reminder
    const toggleReminder = (id)=>{
        setTasks(tasks.map((task)=>task.id === id?{...task, reminder: !task.reminder}:task))
    }
    return (
        <div className="container"> 
            {/* if we click Add Button,  ifShowAddForm will be the opposite*/}
             {/* Pass showAdd to Header, to determine which text to be show on the button*/}
            <Header onAdd = {()=>setifShowAddForm(!ifShowAddForm)} 
                    showAdd={ifShowAddForm}
            />

            {ifShowAddForm && <AddTask onAdd={addTask}/>}
            {
                tasks.length > 0 ? 
                (<Tasks tasks={tasks} onDelete = {deleteTask} onToggle={toggleReminder}/> )
                :'No Tasks to show' 
            }
        </div>
    )
}

export default App
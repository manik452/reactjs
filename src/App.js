import logo from './logo.svg';
import './App.css';
import Welcome from './Welcome';
import ShoppingList from './ShoppingList';
import Header from './component/Header';
import * as React from 'react';
import Tasks from './component/Tasks';
import { useState } from "react"
import AddTask from './component/AddTask';


function App() {
    const [showAddTask, setShowAddTask] = useState(false)

    const [tasks, setTasks] = useState([
        {
            id: 1,
            text: 'Doctors Appointment',
            day: 'Feb 5th at 2:30pm',
            reminder: true,
        },
        {
            id: 2,
            text: 'Doctors Appointment2',
            day: 'Feb 5th at 2:30pm',
            reminder: true,
        },
        {
            id: 3,
            text: 'Doctors Appointment3',
            day: 'Feb 5th at 2:30pm',
            reminder: true,
        }

    ])
    // Add Task
    const addTask = (task) => {
        console.log(task)
        const id = Math.floor(Math.random() * 1000) + 1
        console.log('id='+id)
        const newTask = { id, ...task }
        setTasks([...tasks, newTask]);

    }
    // Delete Task
    const deleteTask = (id) => {
        setTasks(tasks.filter((task)=> task.id !== id))

    }

    //Toggle Remainder
    const toggleReminder = (id) => {
        setTasks(tasks.map((task) => task.id === id ? {
            ...task, reminder: !task.reminder
        } : task))
    }


  return (
      <div className="container">
          <Header onAdd={() => setShowAddTask(!showAddTask)} showAddTask={showAddTask} />
          {showAddTask && < AddTask onAdd={addTask} />}
          {tasks.length > 0 ? < Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> : 'No Tasks To Show' }
         
    </div>
  );
}

/*class App extends React.Component {
    render(){
        return <h1> Hello From Class </h1>
    }
}*/

export default App;

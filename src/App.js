import logo from './logo.svg';
import './App.css';
import Welcome from './Welcome';
import ShoppingList from './ShoppingList';
import Header from './component/Header';
import * as React from 'react';
import Tasks from './component/Tasks';
import { useState, useEffect } from "react"
import AddTask from './component/AddTask';
import Footer from './component/Footer';

import About from './component/About';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CardHeader from './component/CartHeader';
import CartHeader from './component/CartHeader';
import Home from './component/Home';
import Cart from './component/Cart';
import PageNotFound from './component/PageNotFound';
import Login from './component/login/Login';
import SignupAndLogin from './component/login/SignupAndLogin';


function App() {
    const [showAddTask, setShowAddTask] = useState(false)

    const [tasks, setTasks] = useState([])

    useEffect(() => {
        const getTasks = async () => {
            const taskFromServer = await fetchTasks()
            setTasks(taskFromServer)
        }
        getTasks()
    }, [])

    //Fetch Task from server
    const fetchTasks = async () => {
        const res = await fetch('http://localhost:5000/tasks')
        const data = await res.json();

        return data
    }
    //Fetch Task from server
    const fetchTask = async (id) => {
        const res = await fetch(`http://localhost:5000/tasks/${id}`)
        const data = await res.json();

        return data
    }
    // Delete Task server
    const deleteTask = async (id) => {
        await fetch(`http://localhost:5000/tasks/${id}`, {
            method: 'DELETE'
        })
        setTasks(tasks.filter((task) => task.id !== id))

    }
    // Add Task Server
    const addTask = async (task) => {
        console.log(JSON.stringify(task))
        const res = await fetch('http://localhost:5000/tasks', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(task)
        })

        const data = await res.json()
        console.log(data)
        setTasks([...tasks, data])

    }
    //Toggle Remainder Server
    const toggleReminder = async (id) => {
        const taskToToggle = await fetchTask(id)
        const updateTask = {
            ...taskToToggle,
            reminder: !taskToToggle.reminder
        }

        const res = await fetch(`http://localhost:5000/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(updateTask)
        })

        const data = await res.json()

        setTasks(tasks.map((task) => task.id === id ? {
            ...task, reminder: data.reminder
        } : task))
    }
    // Add Task
    /* const addTask = (task) => {
         console.log(task)
         const id = Math.floor(Math.random() * 1000) + 1
         console.log('id='+id)
         const newTask = { id, ...task }
         setTasks([...tasks, newTask]);
 
     }*/
    // Delete Task
    /* const deleteTask = (id) => {
         setTasks(tasks.filter((task)=> task.id !== id))
 
     }*/

    //Toggle Remainder
    /*const toggleReminder = (id) => {
        setTasks(tasks.map((task) => task.id === id ? {
            ...task, reminder: !task.reminder
        } : task))
    }*/


    return (
        <div>
            <BrowserRouter>
                <CartHeader />

                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/cart" element={<Cart />} />
                    <Route exact path="/login" element={<Login />} />
                    <Route element={<PageNotFound />} />
                </Routes>




                {/*<div className="container">
           
          <Header onAdd={() => setShowAddTask(!showAddTask)} showAddTask={showAddTask} />
          {showAddTask && < AddTask onAdd={addTask} />}
          {tasks.length > 0 ? < Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> : 'No Tasks To Show' }
            <Footer />
            </div>*/}
            </BrowserRouter>
        </div>

    );
}

/*class App extends React.Component {
    render(){
        return <h1> Hello From Class </h1>
    }
}*/

export default App;

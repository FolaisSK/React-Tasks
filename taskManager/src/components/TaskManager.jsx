import React, {useEffect, useState} from "react";
import styles from "./taskManager.module.css";
import {mockTaskManager}  from "./mockTaskManager.jsx";
// import "./taskManager.module.css"

const TaskManager = () => {

    const [tasks, setTasks] = useState([]);
    const[newTask, setNewTask] = useState("");

    const [newSearch, setNewSearch] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!newTask.trim()) return;

        setTasks((prev)=>[...prev, newTask]);
        //get the previous state, spread it then add new task
        setNewTask("");
    }

    function deleteTask(taskToDelete){
        setTasks(tasks.filter((task)=>(task !== taskToDelete)))
    }


    const handleSearchSubmit = (e)=>{
        e.preventDefault();
        if(!newSearch.trim()) {
            setTasks((prev)=>[...prev]);
            //get the previous state, spread it then add new task
            setNewSearch("");
            return;
        }

        const filteredTasks = tasks.filter((task)=> task.toLowerCase().includes(newSearch.toLowerCase()))
        setTasks(filteredTasks);

    }

    useEffect(
        ()=>{
            async function fetchTasks() {
            try{
                const data = await mockTaskManager();
                setTasks(data);
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        }
    fetchTasks();
            },[]
    )



    // fetchTasks();


    return (
        <>
            <div className={styles.mainContainer}>
                <div className={styles.wrapper}>
                    <header>
                        <div className={styles.pageBanner}>
                            <h1 className={styles.title}>Task Manager</h1>

                            <form onKeyUp={handleSearchSubmit} className={styles.searchTasks}>
                                <input type="text" value={newSearch} onChange={(e)=>setNewSearch(e.target.value)} placeholder="Search tasks..."/>
                            </form>
                        </div>
                    </header>

                    <div className={styles.taskList}>
                        <h2 className={styles.title}>Tasks to Do</h2>

                        <ul>
                            {
                                tasks.map((task, index) => (
                                    <li key={index}>
                                        <span className={styles.name}>{task}</span>
                                        <span onClick={()=>deleteTask(task)} className={styles.delete}>delete</span>
                                    </li>
                                ))
                            }
                            {/*<li>*/}
                            {/*    <span className={styles.name}>Learn JavaScript</span>*/}
                            {/*    <span className={styles.delete}>delete</span>*/}
                            {/*</li>*/}

                            {/*<li>*/}
                            {/*    <span className={styles.name}>Practice DOM Manipulation</span>*/}
                            {/*    <span className={styles.delete}>delete</span>*/}
                            {/*</li>*/}

                            {/*<li>*/}
                            {/*    <span className={styles.name}>Build a mini project</span>*/}
                            {/*    <span className={styles.delete}>delete</span>*/}
                            {/*</li>*/}

                            {/*<li>*/}
                            {/*    <span className={styles.name}>Revise CSS Flexbox</span>*/}
                            {/*    <span className={styles.delete}>delete</span>*/}
                            {/*</li>*/}

                        </ul>
                    </div>

                    <form onSubmit={handleSubmit} className={styles.addTask}>
                        <input type="text" value={newTask} onChange={(e)=> setNewTask(e.target.value)} placeholder="Add a task..."/>
                        <button>Add</button>
                    </form>

                </div>
            </div>

        </>
    )
}


export default TaskManager;
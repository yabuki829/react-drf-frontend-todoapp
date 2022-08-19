import React from 'react'
import { useState,useEffect } from 'react';
import axios from "axios"

const ApiFetch = () => {
	const [tasks,setTasks] = useState([])
	const [selected,setSelectedTask] = useState([{ id: "", title: "" }])
	const [addTask,setAddTask] = useState([{ id: "", title: "" }])
	const [id,setId] = useState(1)

	useEffect(() => {
		console.log("初回なのでtaskを取得します")
		axios.get("http://127.0.0.1:8000/api/tasks/",{
			headers:{
				"Authorization":"Token 9449594ab94835b2e8a217b95b525e457d3dcaf0"
			}
		})
		.then(res => {setTasks(res.data)})
		
	},[])

	const getTask = () => {
		// idのtaskを取得する
		console.log("取得する")
		axios.get(`http://127.0.0.1:8000/api/tasks/${id}/`,{
			headers:{
				"Authorization":"Token 9449594ab94835b2e8a217b95b525e457d3dcaf0"
			}
		})
		.then(res => {
			setSelectedTask(res.data)

		})
	}

	const deleteTask = (id) => {
		// idのtaskを取得する
		console.log("削除する")
		axios.delete(`http://127.0.0.1:8000/api/tasks/${id}/`,{
			headers:{
				"Authorization":"Token 9449594ab94835b2e8a217b95b525e457d3dcaf0"
			}
		})
		.then(res => {
			console.log("削除しました")
			setTasks(tasks.filter(task => task.id !== id ))
			setSelectedTask([{ id: "", title: "" }])
		})
	}
	const newTask = (task) => {
		console.log("taskを追加します")
		const data = {
			title: task.title
		}
		
		axios.post("http://127.0.0.1:8000/api/tasks/",data,{
			headers:{
				"Content-Type":"application/json",
				"Authorization":"Token 9449594ab94835b2e8a217b95b525e457d3dcaf0"
			}
		})
		.then(res => {
			console.log("追加しました")
			setTasks([...tasks,res.data])
			setAddTask({ id: "", title: "" })
		})
	}


	const editTask = (task) => {
		console.log("taskを変更しますします")
		
		axios.put(`http://127.0.0.1:8000/api/tasks/${id}/`,task,{
			headers:{
				"Content-Type":"application/json",
				"Authorization":"Token 9449594ab94835b2e8a217b95b525e457d3dcaf0"
			}
		})
		.then(res => {
			console.log("taskを変更しましたしました",selected.id)
			
			setTasks(
				tasks.map(
					
					(task) => (
						console.log(task.id,"===",selected.id),
						task.id === selected.id ? res.data : task
						)
					
					)
			)
			console.log(tasks)
			setSelectedTask(res.data)
		})
	}
	const handleInputChange = () => event => {
		const value = event.target.value;
		const name = event.target.name;
		setAddTask({...addTask, [name]: value})
	}
	const handleEditInputChange = (event) => {
		const value = event.target.value;
		const name = event.target.name;
		setSelectedTask({...selected, [name]: value})
	}

  return (
    <div>
			<h1>------------追加------------</h1>
			<input type="text" name='title' value={addTask.title} onChange={handleInputChange()} placeholder="new task" required/>
			<p>{addTask.title}</p>
			<button onClick={() => newTask(addTask)}>Add</button>
			<br />
			<h1>---------Task List---------</h1>
			<ul>
				{
					tasks.map(task => 
							<li key={task.id}> 
								{task.title} {task.id}  
								<button onClick={ () => deleteTask(task.id)}>
									delete
								</button>
							</li>
						)
				}
			</ul>
			<h1>-----------詳細------------</h1>
			<input type="text" value={id} onChange={event => setId(event.target.value)} />
			
			<button onClick={getTask}>get</button>
			<br />
			{/* <button onClick={deleteTask(id)}>削除</button> */}
			
			<h2>{ selected.title }</h2>
			<input type="text" name='title' value={selected.title} onChange={(event) => handleEditInputChange(event)} placeholder="edit task" required />
			<button onClick={() => editTask(selected)}>Edit</button>



			
			<h1>---------------------------</h1>
		</div>
  )
}

export default ApiFetch
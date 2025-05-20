import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const Task = ({setShowAddTask}) => {
    const { id } = useParams()
    const [task, setTask] = useState([])
    useEffect(()=>{
        setShowAddTask(false)
        const fetchTask = async () => {
            try{const response = await fetch(`http://localhost:5000/tasks/${id}`)
            const data = await response.json()
            setTask(data)}
            catch (error){
                console.log('Erro fetching data', error);
            }
        }
        fetchTask()
    }, [id, setShowAddTask])
    return(
        <>
            <div className="bg-blue-200 p-2 my-2 px-4 cursor pointer rounded">
                <h3 className="flex items-center justify-between font-bold text-lg">
                    {task.text}
                </h3>
                <p><strong>Id:</strong> {task.id}</p>
                <p><strong>Reminder:</strong>  {task.reminder ? 'Yes' : 'No'} </p>
            </div>
            <Link to="/" className="text-blue-700 hover:underline">Go Back</Link>
        </>
    )
}
export default Task
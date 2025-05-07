const ManyTasks = ({tasks}) => {
    return(
        <>
        {tasks.map((task)=>( <h3 className="bg-blue-200 p-2 my-2 px-4 cursor-pointer text-base font-bold rounded" key={task.id}>{task.text}</h3>))}
           
        </> 
    )
}

export default ManyTasks
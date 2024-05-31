import { useState,useEffect } from 'react'
import Navbar from './components/Navbar'
import {v4 as uuidv4} from 'uuid';


function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("")
  const [showFinished, setShowFinished] = useState(true)

  
  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])
  
  const saveToLS = (params) =>{
    localStorage.setItem("todos", JSON.stringify(params))
  }
  
  const toggleFinished = (e) =>{
    setShowFinished(!showFinished)
  }


const handleAdd = (e) => {
  const newTodo = { todo, id: uuidv4(), isCompleted: false };
  setTodos(prevTodos => {
    const updatedTodos = [...prevTodos, newTodo];
    saveToLS(updatedTodos);
    return updatedTodos;
  });
  setTodo("");
};

const handleDelete = (e, id) => {
  setTodos(prevTodos => {
    const newTodos = prevTodos.filter(item => item.id !== id);
    saveToLS(newTodos);
    return newTodos;
  });
};

const handleEdit = (e, id) => {
  const todoToEdit = todos.find(item => item.id === id);
  if (todoToEdit) {
    setTodo(todoToEdit.todo);
    setTodos(prevTodos => {
      const newTodos = prevTodos.filter(item => item.id !== id);
      saveToLS(newTodos);
      return newTodos;
    });
  }
};

  
  const handleChange = (e)=>{
    setTodo(e.target.value)
  }
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item=>{
      return item.id == id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
  }
  
  

  return (
    <>
      <Navbar/>
      <div className="container mx-auto mt-14 rounded-xl p-5 bg-[#50636c] min-h-[80vh] w-[90%] sm:w-[70%] lg:w-[40%] text-white">
        <div className="addTodo">
          <h2 className="text-2xl font-bold mt-4">Add a Todo</h2>
          <input type="text" className='md:w-3/4 w-3/5 rounded-md py-1 my-3 px-2 text-black'onChange={handleChange} value={todo}/>
          <button className='bg-green-500 hover:bg-green-600 px-4 md:px-6 py-2 rounded-md mx-4 text-white disabled:bg-green-300' onClick={handleAdd} disabled={(todo.length<=2)}>Save</button>
        </div>
        <input className='w-6' type="checkbox" checked={showFinished} onChange={toggleFinished}/><span className='text-base'> Show Finished</span> 
          <h2 className="text-xl font-bold my-4">
            Your Todos
          </h2>
            <div className="todos">
              {todos.length===0 && <div className='m-5'>No Todo's To Show</div>}
              {todos.map(item =>{
                
                return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex justify-between md:w-3/4 my-3">
                  <div className='flex gap-5'>
                  <input onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} name={item.id} id='' />
                <div className={item.isCompleted?"line-through":""}>
                  {item.todo}
                </div>
                  </div>
                  <div className="buttons flex h-full">
                    <button className='bg-blue-500 hover:bg-blue-600 p-3 py-1 rounded-md mx-1 text-white' onClick={(e)=>{handleEdit(e,item.id)}}>Edit</button>
                    <button className='bg-red-500 hover:bg-red-600 p-3 py-1 rounded-md mx-1 text-white' onClick={(e)=>{handleDelete(e,item.id)}}>Delete</button>
                  </div>
                  </div>
              })}
            </div>
          
      </div>
    </>
  )
}

export default App

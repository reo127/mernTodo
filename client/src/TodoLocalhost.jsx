import React, { useState, useEffect } from 'react'

const TodoLocalhost = () => {
  const [todos, setTodos] = useState([])
  const [title, setTitle] = useState('')
  const [todoupdate, setTodoupdate] = useState([])
  const [desc, setDesc] = useState('')

  useEffect(() => {
    getTodo()
  }, [todos])


  // Get all todos
  const getTodo = async () => {
    let url = 'http://127.0.0.1:8000/todos'
    let response = await fetch(url, {
      method: "GET",
      "Content-Type": "application/json"
    });
    setTodos(await response.json())
  }


// Add new Todo
const addTodo = async (e) => {
  e.preventDefault()
  fetch('http://127.0.0.1:8000/todos', {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({title, desc})
  })
  setTitle('')
  setDesc('')
}


// Delete todo
const deleteTodo = async (id) =>{
  fetch(`http://127.0.0.1:8000/todos/${id}`, {
    method: "DELETE",
    headers:  {"Content-Type": "application/json"}
  })
}


// Update Todo
const updateTodo = async (id) => {
  
  let response = await fetch(`http://127.0.0.1:8000/todos/${id}`, {
    method: "GET",
    "Content-Type": "application/json" 
  });
  setTodoupdate(await response.json())
  console.log(todoupdate);
  
  
  let title = prompt("Enter title ");
  let desc = prompt('Enter Description');

  if( title === ""){
    title = todoupdate.title
  }else if(desc === ""){
    desc = todoupdate.desc
  }
  
  fetch(`http://127.0.0.1:8000/todos/${id}`, { 
    method: "PUT",
    headers:  {"Content-Type": "application/json"},
    body: JSON.stringify({title , desc})
  })
  
}


  return (
    <div className='bg-[#00256C] h-[100vh]'>
      <div className=' mx-auto '>
        <hr className=' border-[#00256C]' />
        <h1 className='text-white text-[4rem] font-bold max-w-full text-center mt-12' style={{ textShadow: '0 0 1px black' }} >What is for Today</h1>

        {/* Input Todo From */}
        <div className='bg-[#0D99FF] shadow-xl max-w-[70rem] mx-auto flex flex-wrap justify-between rounded-2xl mt-12 '>

          <input type="text" placeholder='Enter Your Todo' value={title} onChange={e => setTitle(e.target.value)}
            style={{ all: 'unset', fontSize: '2rem', padding: '.8rem' }} className='mt-12   rounded-xl w-[10rem] '
          />
          <br />
          <input type="text" placeholder='Enter Your Todo' value={desc} onChange={e => setDesc(e.target.value)}
            style={{ all: 'unset', fontSize: '2rem', padding: '.8rem' }} className='mt-12   rounded-xl w-[10rem] '
          />
          <button className='text-white text-3xl px-10 py-1 m-1 rounded-2xl bg-[#9747FF] font-bold border border-blue-200' onClick={addTodo}>SAVE</button>
        </div>


        {/* Todo List */}
        {todos.slice(0).reverse().map((ele) => {
          return (
            <div className='bg-[#0D99FF] max-w-[70rem] mx-auto mt-12 rounded-2xl p-4 flex items-center justify-between flex-wrap border border-blue-200' key={ele._id}>
              <div className="data">
                <h3 className='text-white text-3xl font-bold ' style={{ textShadow: '0 0 2px black' }}> {ele.title} </h3>
                <p className='text-white text-xl' style={{ textShadow: '0 0 1px black' }}> {ele.desc} </p>
              </div>

              <div className="btn flex">
                <button className='text-white text-2xl font-bold px-4 py-1 m-1 rounded-2xl bg-[#d4b347] shadow-lg border border-blue-200' onClick={() => updateTodo(ele._id)}>EADIT</button>
                <button className='text-white text-2xl font-bold px-4 py-1 m-1 rounded-2xl bg-[#FF5A35] shadow-lg border border-blue-200' onClick={() => deleteTodo(ele._id)}>DELETE</button>
              </div>
            </div>
          )
        })}
      </div>

    </div>
  )
}

export default TodoLocalhost
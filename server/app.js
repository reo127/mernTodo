const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();
const Todo = require('./models/TodoSchema')
const { register, login } = require('./Routers/AuthUser')

require('dotenv').config()



app.use(cors())
app.use(express.json())

// Connecting database
mongoose.connect( process.env.DATABASE )
.then(()=>{
    console.log('Database Connected successfuly');
}).catch(err => console.log(err))




app.use('/register', register )
app.use('/login', login )


// Routes for todos =========================================================================>>
app.get('/todos', async (req, res) => {
    const todos = await Todo.find();
    res.status(200).json(todos)
})

app.get('/todos/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id)
    res.status(200).json(todo)
})

// Create new Todo
app.post('/todos', (req, res) => {
    const {title, desc} = req.body; 
    const todo = Todo({title, desc})
    todo.save();
    res.json(todo)
})

// Delete Todo
app.delete('/todos/:id', async (req, res) => {
    const del = await Todo.findByIdAndDelete(req.params.id);
    res.status(200).json({del})
})

// Update Todos
app.put('/todos/:id', async (req, res) => {
    const { title, desc } = req.body;
    const todo = await Todo.findById(req.params.id);
    
    todo.title = title;
    todo.desc = desc;
    todo.save();
    res.status(200).json(todo)
})




app.listen( process.env.PORT , ()=>{
    console.log('app listening at 8000')
})
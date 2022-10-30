const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();
const Todo = require('./models/TodoSchema')

app.use(cors())
app.use(express.json())

// Connecting database
mongoose.connect('mongodb+srv://rohan:kankimagi@cluster0.ecwot4i.mongodb.net/todo?retryWrites=true&w=majority')
.then(()=>{
    console.log('Database Connected successfuly');
}).catch(err => console.log(err))


// API Routes
// Get all Todos
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




app.listen(8000, ()=>{
    console.log('app listening at 8000')
})
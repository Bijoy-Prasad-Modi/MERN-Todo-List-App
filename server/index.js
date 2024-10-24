const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./Models/Todo.js');

const app = express();
app.use(cors()); //Enable CORS for cross-domain requests
app.use(express.json()); //Parse incoming requests as JSON

mongoose.connect('mongodb://127.0.0.1:27017/test')  //Connecting to MongoDB


app.get('/get',(req, res)=>{
    TodoModel.find()
    .then(result => res.json(result))
    .catch(err => res.json(err))
});


app.put('/update/:id', (req, res)=>{
    const{id} = req.params;
    TodoModel.findByIdAndUpdate({_id: id}, {done: true})
    .then(result => res.json(result))
    .catch(err => res.json(err));
});


app.delete('/delete/:id', (req, res)=>{
    const{id} = req.params;
    TodoModel.findByIdAndDelete({_id: id})
    .then(result => res.json(result))
    .catch(err => res.json(err));
});


app.post('/add', (req, res) =>{
    const task = req.body.task;
    TodoModel.create({ task })
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));  //Handle errors properly
});


app.listen(3001, ()=>{
    console.log("Server is Running on port 3001")
});


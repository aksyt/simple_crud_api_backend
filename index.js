const express = require("express");
const mongoose= require("mongoose");
const Task= require("./model/task_model.js");
const app= express();
app.use(express.json());
const port=3000;

app.get('/',(req,res)=>{
    res.send("hello dear whassup");
});

//mongoose connection between node and backend
mongoose.connect("mongodb+srv://aksyout:AKmAXixJ3K8DZvX3@backenddb.rum1tbd.mongodb.net/?retryWrites=true&w=majority&appName=BackendDB")
.then(()=>{ console.log("Connected to database");})
.catch(()=>{console.log("Connection failed");});
//insert new document into mongo collection

app.post('/api/tasks', async (req,res)=>{
    try{
        const task= await Task.create(req.body);
        res.status(200).json(task);
    }catch(error)
    {
        res.status(500).json({message:error.message});
    }
});

//display/fetch all tasks in the tasklist
app.get('/api/tasks',async (req,res)=>{
    try{
        const taskList= await Task.find({});
        res.status(200).json(taskList);
    }
    catch(error)
    {
        res.status(500).json({message:error.message});
    }
});

//display/fetch a specific task with index
app.get('/api/task/index/:ind', async (req,res)=>{
    try{
        const { ind } =req.params;
        const specific_task= await Task.find({index:ind});//const specific_task= await Task.findById(id); use for specific id search
        res.status(200).json(specific_task);
    }
    catch(error)
    {
        res.status(500).json({message:error.message});
    }
});

//display/fetch a specific task with id
app.get('/api/task/:id', async (req,res)=>{
    try{
        const { id } =req.params;
        const specific_task= await Task.findById(id);
        res.status(200).json(specific_task);
    }
    catch(error)
    {
        res.status(500).json({message:error.message});
    }
});

//update a pre-existing task field
app.put('/api/task/:id',async (req,res)=>{
    
        const {id}=req.params;
        const task=await Task.findByIdAndUpdate(id,req.body);//update with whatever the user provides in the request body
       
    
        if(!task)
            {
                return res.status(404).json({message:"task not found"});
            }
            const updated_task=await Task.findById(id);
            res.status(200).json(updated_task);

});

//delete a pre-existing task field
app.delete('/api/task/:id',async (req,res)=>{
    
    const {id}=req.params;
    const task=await Task.findByIdAndDelete(id);
   

    if(!task)
        {
            return res.status(404).json({message:"task not found"});
        }
    res.status(200).json({message:"Task deleted successfully"});

});
console.log("jai baba ki");
app.listen(port,()=>{
    console.log("server is running on port "+port);
});




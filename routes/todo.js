const express = require("express");
const router = express.Router();
const Todo = require("../models/todo");

// getting all items
router.get("/", async (req, res) =>{
    // res.send("Hello world")
    try {
        const todoItems = await Todo.find(); 
        res.json(todoItems)
        
    } catch (err) {
        res.status(500).json({message: err.message})
        
    }

})
// getting one item
router.get("/:id", getTodoItem, (req, res) =>{
    // res.send(req.params.id)
    // res.send(res.todoItem.name)
    res.send(res.todoItem)
    
})
// creating an item
router.post("/", async (req, res) =>{
    const todoItem = new Todo({
        name: req.body.name,
        deadline: req.body.deadline,
        category: req.body.category
    })

    try {
        const newTodo = await todoItem.save()
        res.status(201).json(newTodo)
    } catch (err) {
        res.status(400).json({message:err.message})
        
    }
    
})
// updating one item
router.patch("/", getTodoItem, async (req, res) =>{
    if(req.body.name != null) {
        req.todoItem.name = req.body.name;
    }
    if(req.body.category != null) {
        req.todoItem.category = req.body.category;
    }
    try {
        const updatedTodoItem = await res.todoItem.save()
        res.json(updatedTodoItem)
    } catch (error) {
        res.status(400).json({message:err.message})
        
    }
    
})
// deleting one item
router.delete("/", getTodoItem, async(req, res) =>{
    try {
        await res.todoItem.delete()
        res.json({message:"deleted todo item"})
    } catch (err) {
        res.status(500).json({message:err.message})
        
    }
    
})

async function getTodoItem(req, res, next){
    let todoItem
    try {
        todoItem = await Todo.findById(req.params.id)
        if(todoItem == null){
            return res.status(404).json({message:"Cannot find todo item"})
        }
    } catch (err) {
        res.status(500).json({message:err.message})
        
    }
    res.todoItem = todoItem;
    next();
}
module.exports = router;
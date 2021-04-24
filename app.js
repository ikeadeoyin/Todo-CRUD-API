const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 3000;


const dbUrl = "mongodb+srv://admin:oyin@cluster0.obiw3.mongodb.net/todoapi?retryWrites=true&w=majority";
mongoose.connect(dbUrl,{ useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => console.log("connected to db"))
    .catch((err) => console.log(err))

app.use(express.json());

// const todoRoutes =
const todoRouter = require("./routes/todo");
 app.use("/todo", todoRouter);



app.listen(port, ()=>{
    console.log("May Node be with you")
})
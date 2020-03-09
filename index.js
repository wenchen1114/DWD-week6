const fs = require('fs');
const path = require('path');
const express = require('express');
const config = require('./config');
const PORT = config.PORT;
const MONGODB_URI = config.MONGODB_URI;

const mongoose = require('mongoose');

mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true});

const models = require('./models/mood');

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


//get the path to your public directory
const publicURL = path.resolve(`${__dirname}/public`);
//define which folder will hold your static files
app.use(express.static(publicURL));

app.get("/",(req,res)=>{
    res.sendFile(path.resolve(__dirname, './views/index.html'));
});

// GET: /mood
app.get("/api/v1/mood", async(req, res) =>{
    try{
        const data = await models.find();
        res.json(data);
    }catch(error){
        res.json(error);
    }
});

// POST: /mood
app.post("/api/v1/mood", async(req, res) =>{
    try{
        const newData = {
            "day": req.body.day,
            "mood": req.body.mood
        }
        const data = await models.create(newData);
        res.json(data);
    }catch(error){
        res.json(error);
    }
});

// PUT: /moods:id
// app.put("/api/v1/moods/:id", async(req, res) =>{
//     try{
//         const id = req.params.id;
//         const updatedData = {
//             "todo": req.body.todo,
//             "status": req.body.status
//         }

//         const changedData = await models.findOneAndUpdate({_id:id}, updatedData, {new: true});
//         res.json(changedData);
//     }catch(error){
//         res.json(error);
//     }
// });

// DELETE: /deletemoods
app.delete("/api/v1/deletemoods/:id", async(req, res) =>{
    try{
        const id = req.params.id;
        const deletedData = await models.findOneAndDelete(id);
        res.json({message:"delete", deletedDocument: deletedData});
    }catch(error){
        res.json(error);
    }
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
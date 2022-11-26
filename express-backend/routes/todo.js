const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Todo = require("../models/Todo");
const User = require("../models/User");

const privateKey = process.env.JWT_PRIVATE_KEY;

//DO NOT COMMIT THIS TO GIT!
/*const privateKey = ``; */

router.use(function (req, res, next) {
    if (req.header("Authorization")) {
        try {
            req.payload = jwt.verify(req.header("Authorization"), privateKey, {
                algorithms: ["RS256"],
            });
        } catch (error) {
            return res
                .status(401)
                .json({ 
                    error: "Something went wrong. " 
                });
        }
    } else {
        return res.status(401).json({error: "Unauthorized"});
    }
    next();
});

router.post("/", async function (req, res) {
   
    const todo = new Todo({
        title: req.body.title,
        description: req.body.description,
        author: req.payload.id,
        dateCreated: req.body.dateCreated,
        checked: req.body.checked,
        completed: req.body.completed,
        username: req.body.username
    });
    return todo
        .save()
        .then((saveTodo) => {
            return res.status(201).json({
                _id: saveTodo._id,
                title: saveTodo.title,
                description: saveTodo.description,
                author: saveTodo.author, 
                dateCreated: saveTodo.dateCreated,
                checked: saveTodo.checked,
                completed: saveTodo.completed,
                username: saveTodo.username
        });
    })
    .catch((error) => {
        return res.status(500).json({ error: "Something went wrong" });
    });
});

router.get("/", async function (req, res, next) {
    const todos = await Todo.find().where("author").equals(req.payload.id).exec();
    return res.status(200).json({ todos: todos });
});

router.get("/:id", async function (req, res, next) {
    const todo = await Todo.findOne().where("_id").equals(req.params.id).exec();
    return res.status(200).json(todo);
  });

  router.delete("/:id", async function (req, res, next) {
    const todo = await Todo.deleteOne().where("_id").equals(req.params.id).exec();
    return res.status(200).json(todo);
  });

  router.put("/:id", async function (req, res, next) {

    const filter = {_id: req.params.id};
    const update = { 
        title: req.body.title, 
        description: req.body.description,
        author: req.body.author, 
        dateCreated: req.body.dateCreated, 
        checked: req.body.checked, 
        completed: req.body.completed,
        username: req.body.username
    };

    const todo = await Todo.findOneAndUpdate(filter, update);
    return res.status(200).json(todo);
  });
    
    
module.exports = router;


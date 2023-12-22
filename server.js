import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

// create the new date
let datePublication = new Date();

let jour = datePublication.getDate();
let mois = datePublication.getMonth() + 1; // Ajouter 1 car les mois sont 0-indexés
let annee = datePublication.getFullYear();

let dateFormated = `${jour}/${mois}/${annee}`; // Date format


let posts =[
    {
        id: 1,
        image: "images/greenhouse.jpg",
        publish: dateFormated,
        content: "lorem ipsum",
        author: "Diallo"
    },
    {
        id: 2,
        image: "images/greenhouse.jpg",
        publish: dateFormated,
        content: "lorem ipsum",
        author: "Bah"
    },
    {
        id: 3,
        image: "images/greenhouse.jpg",
        publish: dateFormated,
        content: "lorem ipsum",
        author: "Balde"
    },
    {
        id: 4,
        image: "images/greenhouse.jpg",
        publish: dateFormated,
        content: "lorem ipsum",
        author: "sow"
    }
]

let numId = 3;

app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());

// get all posts
app.get("/posts", (req, res) =>{
    res.json(posts);
})
// get the specific post
app.get("/posts/:id", (req, res)=>{
    const id = parseInt(req.params.id);
    const post = posts.find((post) => post.id ===id);
    res.json(post);
})
// post the new post
app.post("/posts", (req, res) =>{
    const newId = numId +1;
    const post ={
        id: newId,
        image: req.body.image,
        publish: req.body.publish,
        content: req.body.content,
        author: req.body.author,
    }
    numId = newId;
    posts.push(post);
    res.json(post);
})

// edit the post
app.patch("/posts/:id", (req, res) =>{
    const id = parseInt(req.params.id);
    const post = posts.find((post) => post.id === id);
    if(!post) return res.status(400).json({message: "Post note edit"});

    if(req.body.image) post.image = req.body.image;
    if(req.body.publish) post.publish = req.body.publish;
    if(req.body.content) post.content = req.body.content;
    if(req.body.author) post.author = req.body.author;

    res.json(post);
})

// Delete post

app.delete("/posts/:id", (req, res) =>{
    const id = parseInt(req.params.id);
    const index = posts.findIndex((post) => post.id === id);
    if(index === -1) return res.status(400).json({ message: "Post not deleted"});
    posts.splice(index, 1);
    res.json(posts);
})
app.listen(port, ()=>{
    console.log(`This server is running on port http://localhost:${port}`);
})
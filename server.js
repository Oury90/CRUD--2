import express from "express";
import bodyParser from "body-parser";
// import multer from "multer";


const app = express();
const port = 4000;

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'public/images/');
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname);
//     }
// });

// const upload = multer({ storage: storage });
let img = "images/greenhouse.jpg";

// create the new date
let datePublication = new Date();

let jour = datePublication.getDate();
let mois = datePublication.getMonth() + 1; // Ajouter 1 car les mois sont 0-indexés
let annee = datePublication.getFullYear();

let dateFormated = `${jour}/${mois}/${annee}`; // Date format


let posts =[
    {
        id: 1,
        content: "lorem ipsum",
        publish: dateFormated,
        author: "Diallo"
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
        content: req.body.content,
        publish: dateFormated,
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

    if(req.body.content) post.content = req.body.content;
    if(req.body.publish) post.publish = req.body.publish;
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
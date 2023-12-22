import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const URL_API = "http://localhost:4000"

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(express.static("public"));
app.set("view engine", "ejs");

// get post
app.get("/", async(req, res) =>{
    try {
        const response = await axios.get(`${URL_API}/posts`);
        const data = response.data;
        res.render("index.ejs", { posts: data});
    } catch (error) {
        console.error(error);
    }
    
})
app.get("/new", (req, res) =>{
    res.render("form.ejs");
})

// get a post by id
app.get("/edit/:id", async(req, res) =>{
    try {
        const response = await axios.get(`${URL_API}/posts/${req.params.id}`);
        const data = response.data;
        // console.log(data);

        res.render("form.ejs", { post: data});
    } catch (error) {
        console.error(error);
    }
})

// new post
app.post("/posts", async(req, res) =>{
    try {
        const response = await axios.post(`${URL_API}/posts`, req.body);
        res.redirect("/");
    } catch (error) {
        console.error(error);
    }
    
})
// edit post

app.post("/posts/:id", async(req, res) =>{
    try {
        const response = await axios.patch(`${URL_API}/posts/${req.params.id}`, req.body);
        res.redirect("/");
    } catch (error) {
        console.error(error);
    }
   
})
// delete post
app.get("/posts/:id", async(req, res) =>{
    try {
        const response = await axios.delete(`${URL_API}/posts/${req.params.id}`);
        res.redirect("/");
    } catch (error) {
        console.error(error);
    }
})




app.listen(port, () =>{
    console.log(`This server is running on port ${port}`);
})
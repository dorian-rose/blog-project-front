const express = require("express")
const app = express();
//import and use cookies:
const cookieParser = require('cookie-parser');
app.use(cookieParser())
//dotenv to access .env
require("dotenv").config();
//* cors model to access env
const cors = require("cors");
app.use(cors());

const port = process.env.PORT || 5000

//to parse JSON and URLENCODED req.bodies
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//set ejs folders virtually in public
app.use(express.static(__dirname + "/public"));

//establish template engine (ejs)
app.set("view engine", "ejs");
//establish where views folders will be
app.set("views", __dirname + "/views");

//configure routers

app.use("/", require("./routers/userRouters"))
app.use("/admin", require("./routers/adminRouters"))

app.use((req, res, next) => {
    res.status(404).render("404", {
        titulo: "404",
        texto: "La pagina no se encuentra",
    });
});

//let app to listen to port 
app.listen(port, () => {
    console.log(`App listening to ${port}`)
})
const express = require("express")
const app = express()
const mysql = require("mysql2");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "sanatorio"
} );

app.get("/profesionales", (req,res) =>{

    db.query('SELECT * FROM  profesionales',
        (err, result) => {
            if (err){
                console.log(err)
            }else{
                res.send(result);
            }
        }
    );
})



app.post("/create", (req,res) =>{
    const nombre = req.body.nombre;
    const apellido = req.body.apellido
    db.query('INSERT INTO profesionales(nombre, apellido) VALUES(?, ?)', [nombre, apellido],
        (err, result) => {
            if (err){
                console.log(err)
            }else{
                res.send("Profesional registrado con éxito!")
            }
        }
    );
})

app.listen(3001, () =>{
    console.log("corriendo en el puerto 3001")
})
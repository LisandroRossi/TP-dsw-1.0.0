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

app.get("/pacientes", (req,res) =>{

    db.query('SELECT * FROM  pacientes',
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
    const apellido = req.body.apellido;
    const dni= req.body.dni;
    const email= req.body.email;
    const telefono= req.body.telefono;

    db.query('INSERT INTO pacientes(nombre, apellido, dni, email, telefono) VALUES(?, ?, ?, ?, ?)', [nombre, apellido, dni, email, telefono],
        (err, result) => {
            if (err){
                console.log(err)
            }else{
                res.send("Paciente registrado con éxito!")
            }
        }
    );
})

app.listen(3001, () =>{
    console.log("corriendo en el puerto 3001")
})
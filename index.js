
const express = require('express');
require('dotenv').config();
const path = require('path');
const nodemailer = require('nodemailer');
const app = express();
const mysql = require('mysql2');
const { dir } = require('console');
const { dirname } = require('path');
const PORT = process.env.PORT || 8080;

//Conexión a la Base de Datos

/*const conexion = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});


conexion.connect((err) => {
    if (err) {
        console.error(`Error en la conexión: ${err.stack}`)
        return;
    }
    //console.log(`Conectado a la Base de Datos ${process.env.DATABASE}`);
});*/

app.use(express.json());
app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({extended:false}))


app.post('/registro',async(req, res) => {
    /*const { nombre, email, contacto , personas } = req.body;
    

    if (nombre == '' || email == '') {
    

        } else{

        let datos = {
            nombre:nombre, 
            email:email,
            contacto:contacto,
            personas:personas
            
        };

        
        let sql = 'INSERT INTO registro set ?';

        conexion.query(sql, datos, (err, result) => {
            if (err) throw err;
            res.sendFile(__dirname + '/public/registro.html');
        })

    }*/



const transporter = nodemailer.createTransport({ 
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.USEREMAIL,
        pass: process.env.PASS
}})

transporter.verify()


    try{
        const {body} = req
        const {email} = body


        let info = await transporter.sendMail({
            from: process.env.USEREMAIL,
            to: `${email}`,
            subject: 'Gracias por Reservar en nuestro Hotel',
            html: `Muchas gracias por reservar con nosotros, estaremos enviando sus credenciales a la brevedad. <br>
            Todos nuestros servicios estan a su dispocisión.`
        })

        if(!info.error){
            res.send(info.error)
        } else {
            console.log(info.error)
            res.send(info.error)
        }

    } catch (error){
        res.send(error.message)
    }

});



app.listen(PORT, () => {
    //console.log(`El servidor está trabajando en el Puerto ${PORT}`);
})




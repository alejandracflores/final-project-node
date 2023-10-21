const morgan = require('morgan');
const express = require('express');
const app = express();
//const pokemon = require('./Routes/')
app.use(morgan('dev')); // log every request to the console
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/", (req, res, next) => {
    return res.status(200).json({code:1, message:"Hola Mundo"})
});

app.use((req,res, next)=>{
    return res.status(404).json({code:404, message:"URL no encontrada"})
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Servidor en funcionamiento...")
})
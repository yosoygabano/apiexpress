const express = require('express');
const app = express();
const morgan = require('morgan');

//configuracion 
app.set('port', process.env.PORT || 3000);
app.set('json spaces',2);
//middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.delete('/uno',(req, res)=>{
    res.json({"Nombre": "yosoygabano"});
});

app.use(require('./routes/empresas'));

app.listen(app.get('port'), () =>{
    console.log(`Server en el puerto ${app.get('port')}`); 
    });

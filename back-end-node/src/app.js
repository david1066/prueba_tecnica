'user strict'
const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const sequelize = require('./database/db');
const City = require('./database/models/city');

//middleware 

//llenar el req.body
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//rutas
app.get('/', (req, res) => {
    
  
   /*  User.create({
        name:"David",
    surname: "Quiñones",
    email: "davinchi1066@hotmail.com",
    password: "david",
    typedocument: "C.C",
    document:2342342,
    city: "Bogota",
    birthday: new Date(1998,7,6)
    }).then(user=>{
        res.json(user);
    }).catch(err=>{
        res.send('Error');
    }
    );
 */

     City.findAll().then(cities=>{
        res.json(cities);
    });
});
app.use('/api/user',require('./routes/user'));
app.use('/api/city',require('./routes/city'));

//arrancamos el servidor
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
    //conectar a la base de datos de
    //force true: drop tables
    sequelize.sync({
        force:false
    }).then(()=>{
        console.log("nos hemos conectado  a la base de datos");
    }).catch(error=>{
        console.log("se ha producido un error", error);
    });

});
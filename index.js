'use strict'

var app = require('./app');
var port = process.env.PORT || 3789;

console.log(port, 'puertoo');


console.log('la coneccion a la base de datos zoo se ha realizado correctamentee');
app.listen(port, () => {
    console.log('El servidor local con node y express esta en linea');
});

const express=require("express")// se importa express para la configuracion de la app con los parametros de puerto y ruta hacia los clientes
const config=require("./config.js")// se importa la configuracion que viene en formato de objeto desde config.js
const morgan=require(`morgan`)
const path=require(`path`)
const home=require("./modulos/home/rutas.js")// y se importa desde clientes el router a utilizar para los clientes
const cookieParser = require('cookie-parser');
const auth=require("./modulos/auth/rutas.js")// y se importa desde auth/rutas para utilizar las rutas de password
const error=require(`./red/errors.js`)
const edicion = require("./modulos/edicion/rutas.js")

const app=express()// se crea la app 
//middleware
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(morgan(`dev`))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
//configuracion del puerto
app.set("port", config.app.port)
//establecimiento de la ruta raiz para los clientes


app.use("/home",home)
app.use("/auth",auth)
app.use("/edicion",edicion)

app.use(error)

module.exports=app;//exportacion de la app hacia index.js
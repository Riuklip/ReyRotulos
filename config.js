//require(`dotenv`).config()// se importa la configuracion por variables de entorno

module.exports={// se exporta a la app.js
    app:{
        port:3000// configuracion de puerto


    },
    mysql:{
        host: "localhost",
        User :"root",
        password:`vegetta777`,
        database:`reyrotulos`
    },
    jwt:{
        secret:"notasecreta"
    }
}
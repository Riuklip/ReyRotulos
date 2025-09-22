//require(`dotenv`).config()// se importa la configuracion por variables de entorno

module.exports={// se exporta a la app.js
    app:{
        port:3000// configuracion de puerto


    },
    mysql:{
        host: "sql5.freesqldatabase.com",
        User :"sql5799585",
        password:`ALa1wA8wnA`,
        database:`sql5799585`
    },
    jwt:{
        secret:"notasecreta"
    }
}
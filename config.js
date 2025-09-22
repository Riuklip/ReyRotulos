//require(`dotenv`).config()// se importa la configuracion por variables de entorno

module.exports={// se exporta a la app.js
    app:{
        port:3000// configuracion de puerto


    },
    mysql:{
        host: "sql.freedb.tech",
        User :"freedb_EliCarlos",
        password:`dT7znSD2s?Qsp&a`,
        database:`freedb_DatatestEli`
    },
    jwt:{
        secret:"notasecreta"
    }
}
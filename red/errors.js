const respuesta=require(`./respuestas`)

function error(error,req,res,next) {
    console.log(`error`,error)
    const message=error.message||`error interno`
    const errorStatus=error.statusCode||500
    respuesta.error(req,res,message,errorStatus)
}

module.exports=(error)
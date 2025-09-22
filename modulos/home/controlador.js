// const funcDB=require(`../../DB/mysql.js`)// se importa las funciones de mysql.js

// se define el nombre de la tabla
const TABLA=`items`
const auth= require("../auth/index.js")


module.exports=function(dbinyectada){// se exporta a la app.js

    funcDB=dbinyectada;
    if(!funcDB){
        let funcDB=require(`../../DB/mysql.js`)
    }

    function todos() {
    // y se retorna el resultado enviado por todos()
    return funcDB.todos(TABLA)
    
}    
function uno(id) {
    // y se retorna el resultado enviado por todos()
    return funcDB.uno(TABLA,id)
    
}
function eliminar(body) {
    // y se retorna el resultado enviado por todos()
    return funcDB.eliminar(TABLA,body)
    
}
async function agregar(body) {
    const clientes={
        id:body.id,
        nombre:body.nombre,
        email:body.email
    }
    // y se retorna el resultado enviado por todos()
    const respuesta =await funcDB.agregar(TABLA,clientes)
     var insertId=0
    if(body.id===0) {
        insertId=respuesta.insertId
    }else{
        insertId=body.id
    }
    var respuesta2=""
    if(body.nombre||body.password){
        respuesta2 =await auth.agregar({
            id:insertId,
            nombre:body.nombre,
            password:body.password
        })
    }

    return respuesta2
    
}
async function actualizar(body) {
    const clientes={
        id:body.id,
        nombre:body.nombre,
        email:body.email
    }
    // y se retorna el resultado enviado por todos()
    const respuesta =await funcDB.actualizar(TABLA,clientes)
    var insertId=0
    if(body.id===0) {
        insertId=respuesta.insertId
    }else{
        insertId=body.id
    }
    var respuesta2=""
    if(body.nombre||body.password){
        respuesta2 =await auth.actualizar({
            id:insertId,
            nombre:body.nombre,
            password:body.password
        })
    }

    return respuesta2
    
}


return {
    todos,
    uno,
    eliminar,
    agregar,
    actualizar}
}
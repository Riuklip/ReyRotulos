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
    const items={
        titulo:body.titulo,
        descripcion:body.descripcion,
        linkimg:body.linkimg,
        precio:body.precio,
        activo:body.activo
    }
    // y se retorna el resultado enviado por todos()
    const respuesta =await funcDB.agregar(TABLA,items)
}
    async function actualizar(body) {
    const items={
        id:body.id,
        titulo:body.titulo,
        descripcion:body.descripcion,
        linkimg:body.linkimg,
        precio:body.precio,
        activo:body.activo
    }
    console.log (items)
    // y se retorna el resultado enviado por todos()
    const respuesta =await funcDB.actualizar(TABLA,items)    
}


return {
    todos,
    uno,
    eliminar,
    agregar,
    actualizar}
}
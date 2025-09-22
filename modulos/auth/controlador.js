// const funcDB=require(`../../DB/mysql.js`)// se importa las funciones de mysql.js
const bcrypt=require("bcrypt")
// se define el nombre de la tabla
const TABLA=`userandPass`
const auth=require("../../auth/index.js");
const { actualizar } = require("../home/index.js");


module.exports=function(dbinyectada){// se exporta a la app.js

    let funcDB=dbinyectada;
    if(!funcDB){
        let funcDB=require(`../../DB/mysql.js`)
    }


async function agregar(data) {
    const dataAuth={
        // id:data.id|
    }
    if (data.nombre){
        dataAuth.nombre=data.nombre
    }
    if (data.password){
        dataAuth.password=await bcrypt.hash(data.password.toString(),5)
    }
        // y se retorna el resultado enviado por todos()
        return funcDB.agregar(TABLA,dataAuth)
    
}

async function login(usuario,password) {
    var databd=await funcDB.query(TABLA,{nombre:usuario})
    databd=databd[0]
    return bcrypt.compare(password.toString(),databd.passwords).then((resultado)=>{
        if (resultado===true){
            return auth.asignarToken({...databd})
        }else{
            throw new Error("Info invalida")
        }
    })
    
}

return {
    agregar,login
}

}
const config = require(`../config.js`)// se importa los parametros de configuracion de config.js
const mysql=require('mysql2')// se importa el modulo de mysql2

const dbconfig={//asumo que son palabras reservadas de mysql2 para la configuracion de la bd host user password database
   host:config.mysql.host,
   user:config.mysql.User,
   password:config.mysql.password,
   database:config.mysql.database,

}

let conexion;// se crea una variable en la que inicializar la conexion dentro de la funcion conectmysql

//funcion conectmysql
function conectmysql(){
   conexion=mysql.createConnection(dbconfig);// se crea la conexion

   conexion.connect((err)=>{//se inicia la conexion y esta arroja un error en la variable err 
      if(err){// se comprueba si es true y se define un mensaje un interval para volver a intentar conectar
         console.log(`[db err]`,err);
         setTimeout(conectmysql,200)
      }else{
         console.log(`[DB conectada]`)
      }// caso contrario se ice db conectada
   })


   conexion.on(`error`,(err)=>{
      // se busca algun error y en caso de exitir se compara con connection lost y caso de ser ese se vuelve a intentar conectar
      if(err.code===`PROTOCOL_CONECTION_LOST`){
         conectmysql()
      }else{
         return err;// sino retorna el error
      
      }
   })
}
conectmysql();// se incia la conexion

function todos(table) {// la funcion todos se exporta a controlador.js para al toma de todos los datos de la bd y retorna una promesa con la informacion obtenida por el query con las sentencias en sql
    return new Promise((resolve,reject)=>{
      conexion.query(`SELECT * FROM ${table}`,
         (error,result)=>{
            //en caso de haber error lo devuelve
         
         return error? reject(error):resolve(result);
         // caso contrario retorna la respuesta
      })
    })
}
function uno(table,id) {
    return new Promise((resolve,reject)=>{
      conexion.query(`SELECT * FROM ${table} WHERE id=${id}`,
         (error,result)=>{
            //en caso de haber error lo devuelve
         return error? reject(error):resolve(result);//operador ternario
         // caso contrario retorna la respuesta
         
      })
    })
}


function query(table,data) {
   return new Promise((resolve,reject)=>{
      conexion.query(`SELECT * FROM ${table} WHERE ?`,data,
         (error,result)=>{
            //en caso de haber error lo devuelve
         return error? reject(error):resolve(result);//operador ternario
         // caso contrario retorna la respuesta
         
      })
   })
}
function eliminar(table,data) {
   return new Promise((resolve,reject)=>{
      conexion.query(`DELETE FROM ${table} WHERE id=${data.id}`,
         (error,result)=>{
            //en caso de haber error lo devuelve
         return error? reject(error):resolve(result[0]);//operador ternario
         // caso contrario retorna la respuesta
         
      })
   })
}
function agregar(table,data) {
   return new Promise((resolve,reject)=>{
            conexion.query(`insert into ${table} set ?`,data,
         (error,result)=>{
            //en caso de haber error lo devuelve
         return error? reject(error):resolve(result);//operador ternario
         // caso contrario retorna la respuesta
         
      })
   })
}
function actualizar(table,data) {
   return new Promise((resolve,reject)=>{
      conexion.query(`update ${table} set ? WHERE id=?`,[data,data.id],
         (error,result)=>{
            //en caso de haber error lo devuelve
         return error? reject(error):resolve(result);//operador ternario
         // caso contrario retorna la respuesta
         
      })
   })
}


module.exports={// se exporta a la app.js
   todos,uno,agregar,eliminar,query,actualizar
}
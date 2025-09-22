const app=require("./app");//se hace la importacion de la app configurada en el modulo app.js 





//se establece el puerto de escucha de la app
app.listen(app.get("port"),()=>{
    console.log("Server alojado en el puerto:",app.get("port"))
})
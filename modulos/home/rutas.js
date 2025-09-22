const express=require("express")
const respuesta=require(`../../red/respuestas.js`)
const controlador=require(`./index.js`)
const router=express.Router()


router.get("/",(req,resp)=>{
        try {
            // respuesta.success(req,resp,"Página alojada",200)
            resp.render('templates/home.ejs',{titulo:"Home"})
        
    } catch (error) {
        console.log(error)
    }
    
})

router.get("/catalogo",async (req,resp)=>{
        try {
            const data=await controlador.todos()
            console.log(data)
            // respuesta.success(req,resp,"Página alojada",200)
            resp.render('templates/catalogo.ejs',{titulo:"Catalogo",usuario:"",data})
        
    } catch (error) {
        console.log(error)
    }
    
})

module.exports=router;
const express=require("express")
const respuesta=require(`../../red/respuestas.js`)
const controlador=require(`./index.js`)
const router=express.Router()
const seguridad=require("../edicion/seguridad.js")

router.get("/",(req,resp)=>{
        try {
            // respuesta.success(req,resp,"Página alojada",200)
            resp.render('templates/auth.ejs',{titulo:"Inicio de sesión",usuario:""})
        
    } catch (error) {
        console.log(error)
    }
    
})
router.get("/register",(req,resp)=>{
        try {
            // respuesta.success(req,resp,"Página alojada",200)
            resp.render('templates/register.ejs',{titulo:"Registrar Usuario"})
        
    } catch (error) {
        console.log(error)
    }
    
})
router.post("/validar",async function (req,resp){
    try {
        
        let formulario=req.body
        const token= await controlador.login(formulario.Username,formulario.Password)
        // respuesta.success(req,resp,token,200)
        resp.cookie('token', token, { httpOnly: true });
        resp.redirect("../edicion")
    } catch (error) {
        respuesta.error(req,resp,"Datos invalidos",500)
    }
    
    
})
router.post("/registrar",(req,resp)=>{
        cuerpo=req.body
    let formulario={
        nombre:cuerpo.Username,
        password:cuerpo.Password,
    }
    controlador.agregar(formulario)
    resp.redirect("../auth/")
    
    
})


module.exports=router;
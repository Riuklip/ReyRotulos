const express=require("express")
const respuesta=require(`../../red/respuestas.js`)
const controlador=require(`./index.js`)
const auth=require("../../auth/index.js")
const router=express.Router()


router.get("/",async (req,resp)=>{
    let info= await auth.verificarTokencookie(req,resp)
    const datab=await controlador.todos()
    try {

            // respuesta.success(req,resp,"Página alojada",200)
            console.log(info)
            resp.render('templates/edicion.ejs',{
                usuario:info,
                titulo:"Edicion de elementos",
                datab:datab
            })
        
    } catch (error) {
        console.log(error)
    }
    
})
router.get("/eliminar",async (req,resp)=>{
    const productId = {id:req.query.id};
    console.log("IDDDDDDDDDDDDDDDDDD:",req.query.id)
    elemento=controlador.eliminar(productId);
    resp.redirect("../edicion")
})
router.get("/nuevo",async (req,resp)=>{
    let info= await auth.verificarTokencookie(req,resp)
                resp.render('templates/nuevo.ejs',{
                usuario:info,
                titulo:"Añadir elemento",
            })
})
router.post("/nuevo/validar",async (req,resp)=>{
    console.log(req.body)
    cuerpo=req.body

    if (!cuerpo.activo) {
        cuerpo.activo="off"
    }

        let formulario={
        titulo:cuerpo.titulo,
        descripcion:cuerpo.descripcion,
        linkimg:cuerpo.linkimg,
        precio:cuerpo.precio,
        activo:cuerpo.activo

    }
    try {
        
        controlador.agregar(formulario)
        resp.redirect("../../edicion")
    } catch (error) {
        
    }
})
router.get("/editar",async (req,resp)=>{
    const productId = req.query.id;
    console.log(productId)
    let info= await auth.verificarTokencookie(req,resp)
        resp.render('templates/editar.ejs',{
        usuario:info,
        titulo:"Añadir elemento",
        id:productId
        })
})
router.post("/editar/validar",async (req,resp)=>{
    cuerpo=req.body

    if (!cuerpo.activo) {
        cuerpo.activo="off"
    }

        let formulario={
        id:cuerpo.id,    
        titulo:cuerpo.titulo,
        descripcion:cuerpo.descripcion,
        linkimg:cuerpo.linkimg,
        precio:cuerpo.precio,
        activo:cuerpo.activo

    }
    try {
        controlador.actualizar(formulario)
        resp.redirect("../../edicion")
    } catch (error) {
        
    }
})

module.exports=router;
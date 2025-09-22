const auth=require("../../auth/index.js")

module.exports=function chequearAuth(){
    function middleware(req,res,next){
        auth.chequearToken.confirmarToken(req)
    next()
}
return middleware
}
exports.success=function (req,res,mensaje=`se logro`,status=200) {
    const statusCode=status||200;
    const mensajeok=mensaje||``;

    res.status(statusCode).send({
        error:false,
        status:statusCode,
        body:mensajeok
    })
    
}
exports.error=function (req,res,mensaje=`No se logro`,status=500) {
    const statusCode=status||400  //alternativa para predeterminado cortocircuit
    const mensajeok=mensaje||``;
    res.status(statusCode).send({
        error:true,
        status:statusCode,
        body:mensajeok
    })
    
}
const jwt=require("jsonwebtoken")
const config=require("../config")
const secret=config.jwt.secret
function asignarToken(data) {
    return jwt.sign(data,secret)
    //token
}
function verificarToken(token,secret) {
    return jwt.verify(token,secret)
    
}
async function verificarTokencookie(req, res) {
    const token =req.cookies.token;
    
    if (!token) {
        return res.status(403).send('Token no proporcionado');
    }

    try {
        const decoded = jwt.verify(token, secret); // Reemplaza con tu clave
        return decoded; // Almacena la información del token en req.usuario
        } catch (error) {
        return res.status(401).send('Token inválido');
    }
}

const chequearToken={
    confirmarToken: function (req) {
        const decodificado=decodificarCabecera(req.params.cabecera)
    }
}
function obtenerToken(autorizacion) {
    if (!autorizacion) {
     throw new Error("No viene Token");
        
    }
    if (autorizacion.indexOf("Bearer")===-1){
        throw new Error("Formato invalido");
        
    }

    let token= autorizacion.replace("Bearer","")
    return token;
}
function decodificarCabecera(req) {
    const autorizacion = req.headers.autorizacion||"";
    const token =  obtenerToken(autorizacion)
    const decodificado= verificarToken(token)
    req.user=decodificado
    return decodificado;
}

module.exports={asignarToken,verificarTokencookie,chequearToken}
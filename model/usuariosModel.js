
module.exports = {

    registrarSeguridad:function(conexion,datos,hasheddni,res){

        conexion.query('INSERT INTO usuarios SET ? ' ,{email:datos.email,password:hasheddni,rol:"seguridad",idEstabl:res})
    },
    loginUsuario:function(conexion,email,funcion){

        conexion.query('SELECT * FROM usuarios WHERE email = ?',[email],funcion)
    },
    guardarSesion:function(conexion,idUsers){
        conexion.query('UPDATE usuarios SET ? ' , {usuSesion:idUsers})
    }


}
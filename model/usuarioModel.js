module.exports = {

    registrarUser:function(conexion,datos,funcion){

        conexion.query('INSERT INTO usuarios SET ?' , {email:datos.email,rol:datos.rol,},funcion) 

    }


}




module.exports = {

    obtenerAdmin:function(conexion,funcion){
        conexion.query("SELECT * FROM administrador",funcion);

    },

    habilitarAdmin:function(conexion,datos,hasheddni,funcion){
        conexion.query('UPDATE establecimiento set ?',{resg:datos.idAdmin})
        conexion.query('UPDATE administrador SET ? WHERE idAdmin= ( SELECT MAX(resg) from establecimiento)' ,{password:hasheddni,estado:datos.estado},funcion) 
        conexion.query('INSERT INTO usuarios SET ? ' ,{email:datos.email,password:hasheddni,rol:"administrador",idEstabl:datos.idAdmin},funcion)
    }


}
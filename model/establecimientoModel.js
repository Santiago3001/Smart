module.exports ={

 insertarEstbl:function(conexion,datos,suc,funcion){

    conexion.query('UPDATE establecimiento SET ? WHERE idEstbl = ?', [{nombre:datos.nombre,cuit:datos.cuit, direccion:datos.direccion, localidad: datos.localidad, provincia: datos.provincia, descripcion: datos.descripcion},suc],funcion) 
},
insertarParam:function(conexion,datos,establ,funcion){

    conexion.query('UPDATE establecimiento SET ? WHERE idEstbl = ? ' , [{capactot:datos.capactot,aforopermitido:datos.aforopermitido, capacpermitida:datos.capacpermitida, diasantes: datos.diasantes, diasdespues: datos.diasdespues},establ],funcion) 
},
obtenerEstbl:function(conexion,suc,funcion){
    conexion.query("SELECT * FROM establecimiento WHERE idEstbl = ?",[suc],funcion);

},
mostrarEstablecimiento(conexion,establ,funcion){
    conexion.query('SELECT * FROM establecimiento where idEstbl= ?',[establ],funcion)
}


}
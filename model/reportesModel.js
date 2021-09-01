
/*
obtenerRepo:function (conexion,funcion){
    conexion.query("SELECT * FROM administrador",funcion);

},
*/
module.exports ={

    insertarReporte:function(conexion,req,){

    conexion.query('INSERT INTO reporte SET ? ' ,{dni:req,  })
    },

    fechapositivo:function(conexion, req, file ){
        conexion.query('UPDATE reporte SET ?  ORDER BY idreporte DESC LIMIT 1',{ fechTestPositivo: req.fechaTestPositivo, archivoTestPositivo:file.filename}) 
    },

    obtenerRepo:function(conexion,suc,funcion){
        conexion.query('SELECT visitante.nombres,visitante.apellidos,visitante.dni,visitante.email, reporte.archivoTestPositivo, DATE_FORMAT(reporte.fechTestPositivo, "%Y-%m-%d") as fechTestPositivo FROM visitante INNER JOIN reporte ON visitante.dni = reporte.dni WHERE visitante.idEstable = ?',[suc],funcion);
    
    },
    
}


// 
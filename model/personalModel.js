module.exports ={

    insertarPersonal:function(conexion,datos,res,funcion){
       
        conexion.query('INSERT INTO personal SET ?' , {nombres:datos.nombres,apellidos:datos.apellidos,email:datos.email,dni:datos.dni,telefono:datos.telefono,direccion:datos.direccion,idEstable:res,cargo:datos.cargo},funcion) 
        
    },
    obtenerPerso:function(conexion,suc,funcion){
        conexion.query('SELECT * FROM personal WHERE idEstable = ?',[suc],funcion);
    
    },
    insertarIdEstblEnPersonal:function(conexion,funcion){
        //conexion.query('INSERT INTO establecimiento (idAdmin) SELECT max(idAdmin) FROM administrador',funcion)
     },
    buscarPersonal:function(conexion,dni,funcion){
        conexion.query('SELECT * FROM personal WHERE dni = ?',[dni],funcion)
    },
    buscSuc:function(conexion,funcion){
        conexion.query('SELECT usuSesion FROM usuarios limit 1 ',funcion)
    },
    buscDni:function(conexion,dni,dni2,funcion){
        conexion.query('SELECT personal.dni personal.idEstable FROM personal WHERE dni =? UNION SELECT visitante.dni visitante.idEstable  FROM visitante WHERE dni=?',[dni,dni2],funcion)
    }
   
   }
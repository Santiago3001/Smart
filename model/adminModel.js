
module.exports ={
    insertar:function(conexion,datos,funcion){

        conexion.query('INSERT INTO administrador SET ?' , {nombres:datos.nombres,apellidos:datos.apellidos,email:datos.email,dni:datos.dni,telefono:datos.telefono},funcion) 

    },

    buscEmail:function(conexion,email,funcion){

        conexion.query('SELECT email FROM administrador WHERE email= ?', [email],funcion) 
    },

    loginAdmin:function(conexion,email,funcion){

        conexion.query('SELECT * FROM administrador WHERE email = ?',[email],funcion)
    },

    insertarIdEstbl:function(conexion,funcion){
        conexion.query('INSERT INTO establecimiento (idAdmin) SELECT max(idAdmin) FROM administrador',funcion)
     },
     establecerPassword:function(conexion,datos,funcion){
        conexion.query('UPDATE administrador SET ? WHERE idAdmin= ( SELECT MAX(idAdmin) FROM establecimiento)' , {password:datos},funcion) 
    },

    buscEmailSeg:function(conexion,email,funcion){

        conexion.query('SELECT email FROM seguridad WHERE email= ?', [email],funcion) 
    },
    insertarSeg:function(conexion,datos,hash,funcion){

        conexion.query('INSERT INTO seguridad SET ?' , {nombres:datos.nombres,apellidos:datos.apellidos,email:datos.email,dni:datos.dni,telefono:datos.telefono,password:hash},funcion) 

    },
    mostrarDatosPersonales:function(conexion,suc,funcion){
        conexion.query('SELECT nombres,apellidos,email,dni,telefono FROM establecimiento INNER JOIN administrador ON administrador.idAdmin = establecimiento.idAdmin WHERE establecimiento.idEstbl = ?',[suc],funcion);
    
    }
    

   
    
}



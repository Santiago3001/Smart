module.exports = {

    buscDni:function(conexion,dni,funcion){
        conexion.query('SELECT dni, idEstable, habilitado FROM visitante WHERE dni= ?', [dni],funcion)

    },
    verificarDniRandom:function(conexion,dni,codigo,funcion){
        conexion.query('SELECT * FROM visitante WHERE dni= ? and verificacion =?', [dni,codigo],funcion)

    },
    registrarVisitante:function(conexion,datos,random,suc){

        conexion.query('INSERT INTO visitante SET ? ' ,{nombres:datos.nombres,apellidos:datos.apellidos,dni:datos.dni,telefono:datos.telefono,email:datos.email,verificacion:random, idEstable:suc})
    },
    regAsist:function(conexion,datos, fecha, hsi, suc, dniVisitante ){

        conexion.query('INSERT INTO asistencia SET ? ' ,{fecha: fecha, horaIngreso: hsi, temperatura:datos.temperatura, idEstable:suc,dniVisitante: dniVisitante })
    },
    mostrarAsistencia:function(conexion,funcion){
        
        conexion.query("SELECT count(idAsistencia) as cantAsist FROM asistencia WHERE enLocal=1",funcion);
         },
    

    buscarP:function(conexion,dni,funcion,){
     conexion.query('SELECT * FROM asistencia WHERE dniVisitante = ? ',[dni],funcion)

    },  
    regSal:function(conexion,hsi, dni  ){
        conexion.query('UPDATE asistencia SET enLocal = 0 , horaSalida = ?  WHERE dniVisitante = ?',[hsi,dni])
    },
    buscarPS:function(conexion,dni,funcion,){
        conexion.query('SELECT * FROM asistencia WHERE dniVisitante = ? AND enLocal = ? ',[dni,1],funcion)
   
       },
    desabhilitar:function(conexion,dni) {
        conexion.query('UPDATE visitante SET habilitado  = ? WHERE dni = ?',['deshabilitado',dni])
   
       },
   

    

   




}
module.exports ={

    mostrarAsistencia:function(conexion,funcion){
        
        conexion.query("SELECT count(idAsistencia) as cantAsist FROM asistencia WHERE enLocal=1",funcion);
        
        },
    

    buscarP:function(conexion,dni,funcion,){
     conexion.query('SELECT enLocal FROM asistencia WHERE dniVisitante = ?',[dni],funcion)

    },

    regSal:function(conexion, hsi ){
        conexion.query('UPDATE asistencia SET ?',{ horaSalida: hsi, enLocal:0}) 
    },

    
}

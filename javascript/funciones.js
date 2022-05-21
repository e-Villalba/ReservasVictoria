
/////////////////////////////////////////////////////////////////////FUNCIONES///////////////////////////////////////////////////////////////////////////////
//Variable de Luxon para controlar las fechas
const DateTime = luxon.DateTime  
//Función para obtener ultimo dia habilitado para reservas
  function ultimoDiaReservas() {
    let dt = DateTime.now();
    return dt.plus({ months: 6 }).toFormat('yyyy-MM-dd')
  }
  //Función para Formatear Fechas a presentar al Usuario - Formato dd/mm/yyyy
  function formatFechaMostrada(pfecha) {
 
    return pfecha.substr(8, 2) + '/' + pfecha.substr(5, 2) + '/' + pfecha.substr(0, 4)
  }
  //Función para obtener Fecha Actual y comparar y controlas fechas ingresadas por el pasajero
  function fechaActual() {
    let fec = new Date()
    let mes = (fec.getMonth() + 1).toString()    
    mes.length == 1 && (mes = "0" + mes) //Optimizado Operador &&    
    let dia = fec.getDate().toString()
    dia.length == 1 && (dia = "0" + dia)  //Optimizado Operador &&    
    hoy = fec.getFullYear().toString() + '-' + mes + '-' + dia        
    return hoy;
  }
  //Función para controlar las fechas, que sean correcta, que no sean anteriores a la fecha actual y que los intervalos sean correctos.
  function controlarFechas(fec1, fec2) {       
    let mjeError = "Fechas Solicitadas: " + formatFechaMostrada(fec1) + ' - ' + formatFechaMostrada(fec2) + '\n';
    if(fec1=='' || fec2=='')
    {
      swal("Fechas Incorrectas!", "Debe ingresar correctamente las Fecha de Checkin y CheckOut", "error");
      return false;
    }
    else if (fec2 === fec1) {
      swal("Fechas Incorrectas", mjeError + "Las Fecha de Check In y CheckOut no pueden ser iguales, ingrese correctamente las fechas", "error");
      return false;
    }
    else if (fec2 < fec1) {
      swal("Fechas Incorrectas", mjeError + "La Fecha de Check In no puede ser Mayor a la fecha de CheckOut, ingrese correctamente las fechas", "error");
      return false;
    }
    else if (fec1 < fechaActual() || fec2 < fechaActual()) {
      swal("Fechas Incorrectas",mjeError + "Las Fechas de Check In/Check Out no pueden ser menores a la Fecha Actual, ingrese correctamente las fechas", "error");
      return false
    }
    else {
      return true;
    }
  }


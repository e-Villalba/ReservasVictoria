
/////////////////////////////////////////////////////////////////////CLASES///////////////////////////////////////////////////////////////////////////////
//Clase para los Habitaciones del Simulador de Reservas.
class habitacion {
  constructor(nroHabitacion, tipoHabitacion, tarifa, descripcion,fechaOcupDesde,fechaOcupHasta,foto) {
    this.nroHabitacion = nroHabitacion
    this.tipoHabitacion = tipoHabitacion.toUpperCase()
    this.fechaOcupDesde = fechaOcupDesde
    this.fechaOcupHasta = fechaOcupHasta
    this.pasajero = ''
    this.tarifa = tarifa
    this.descripcion = descripcion
    this.foto=foto
  }
  //Validar Ocupación Habitación -Devuelve True cuando la habitación está libre/disponible
  validarOcupacion(fechaPasajeroDesde, fechaPasajeroHasta) {
    if (this.fechaOcupDesde == '' && this.fechaOcupHasta == '') {
      return true
    }
    else if (fechaPasajeroDesde >= this.fechaOcupDesde && fechaPasajeroDesde <= this.fechaOcupHasta) {
      return false
    }
    else if (fechaPasajeroHasta >= this.fechaOcupDesde && fechaPasajeroHasta <= this.fechaOcupHasta) {
      return false
    }
    else if (fechaPasajeroDesde <= this.fechaOcupDesde && fechaPasajeroHasta >= this.fechaOcupHasta) {
      return false
    }
    else {
      return true
    }
  }
}
//Clase para los Pasajeros del Simulador de Rerservas
class pasajero {
  constructor(appellido, nombres, dni, mail) {
    this.apellido = appellido
    this.nombres = nombres
    this.dni = dni
    this.mail = mail
  }
}
class reserva {
  constructor(apellido, nombres, habitacion, fecDesde, fecHasta, mail) {
    this.apellido = apellido
    this.nombres = nombres
    this.habitacion = habitacion
    this.fecDesde = fecDesde
    this.fecHasta = fecHasta
    this.cantidadDias = 0
    this.totalEstadia = 0
    this.tarifaPorNoche = 0
    this.mail = mail
  }
  calcularEstadia(tarifa) {
    const Interval = luxon.Interval;
    this.tarifaPorNoche = tarifa;
    const desde = DateTime.local(parseInt(this.fecDesde.substring(0, 4)), parseInt(this.fecDesde.substring(5, 7)), parseInt(this.fecDesde.substring(8, 10)));
    const hasta = DateTime.local(parseInt(this.fecHasta.substring(0, 4)), parseInt(this.fecHasta.substring(5, 7)), parseInt(this.fecHasta.substring(8, 10)));
    this.cantidadDias = (Interval.fromDateTimes(desde, hasta)).length('days');

    this.totalEstadia = new Intl.NumberFormat().format(tarifa.replace(".", "") * this.cantidadDias);

  }

}


/////////////////////////////////////////////////////////////////////ARRAYS Y VARIABLES///////////////////////////////////////////////////////////////////////
//Array para contener los Objetos de la Clase habitacion
let habitaciones = []
const pasajeros = []
//////////////////////Obtengo el pasajero del Local Storage
let pasajeroStorage = JSON.parse(localStorage.getItem("pasajero"));
if (pasajeroStorage) {let { apellido, nombres, mail } = pasajeroStorage[0]}; //Optimizado Desestructurar Objeto    
fetch('../json/habitaciones.json')
  .then((res) => res.json())
  .then((data) => {
    data.forEach((hab) => {
      const { nroHabitacion, tipoHabitacion, tarifa, descripcion,fechaOcupDesde,fechaOcupHasta,foto } = hab;
      habitaciones.push(new habitacion(nroHabitacion, tipoHabitacion, tarifa, descripcion,fechaOcupDesde,fechaOcupHasta,foto))
    })
  })


let tipoHab = ""
let fechaPasajeroDesde = new Date()
let fechaPasajeroHasta = new Date()
//Variables para la gestión de reservas
let verOtraHabitacion = "S"
let habDisponible = "N"

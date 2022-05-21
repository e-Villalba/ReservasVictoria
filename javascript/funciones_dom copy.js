

function fnCancelarReserva() {
    //Elimino las reservas del Storage
    localStorage.removeItem('listaReservas')
    // Elimino los hijos del contenedor
    let elemento = document.getElementById("divContenedor");
    while (elemento.firstChild) {
        elemento.removeChild(elemento.firstChild);
    }
    //Informo la Reserva Eliminada
    let contenedor = document.createElement("div");
    contenedor.innerHTML = `
            <div class="card cardatosContacto">
            <h5 class="card-header text-center letraEncabezadosM">Reserva Eliminada</h5>
              <div class="card-body ">
                  <h5 class="card-title text-center letraLabel" > <i class="fa-solid fa-person"></i> Pasajero: ${reser.apellido} ${reser.nombres}</h5>                                    
                  <h5 class="card-title text-center letraLabel" > <i class="fa-solid fa-bed"></i> Habitación: ${reser.habitacion}</h5>                                    
                  <h5 class="card-title text-center letraLabel" > <i class="fa-solid fa-calendar-check"></i> Checkin: ${formatFechaMostrada(reser.fecDesde)} - CheckOut: ${formatFechaMostrada(reser.fecHasta)}</h5>   
                  <h5 class="card-title text-center letraLabel" > <i class="fa-solid fa-file-invoice-dollar"></i> Cantidad Noches: ${reser.cantidadDias} - Tarifa por Noche $: ${reser.tarifaPorNoche} - Total Estadía $: ${reser.totalEstadia}</h5>                                    
              </div>        
            </div>  `
    let divContenedor = document.getElementById("divContenedor");
    //Agrego el Div Creado.
    divContenedor.appendChild(contenedor);
}
//Función que muestra Reservas del pasajero si es que ya existen
function fnMuestraReserva() {
    //Busco las Reservas en el Local Storage
    let reservasStorage = JSON.parse(localStorage.getItem("listaReservas"));
    //Si Hay reservas las presento al usuario
    if (reservasStorage) {
        // Elimino los hijos del contenedor
        let elemento = document.getElementById("divContenedor");
        while (elemento.firstChild) {
            elemento.removeChild(elemento.firstChild);
        }
        //Cargo la Reserva del Storage y las presento al Usuario
        let posicionReservasStorage = 0;
        for (reser of reservasStorage) {
            let contenedor = document.createElement("div");

            contenedor.innerHTML = `
            <div class="card cardatosContacto">
            <h5 class="card-header text-center letraEncabezadosM">Reserva Registrada en el Sistema</h5>
              <div class="card-body ">
              <form id="formDatosReserva${reser.habitacion}" action="" method="" enctype="">
                  <h5 class="card-title text-center letraLabel" >Ya posee una reserva Registrada en el Sistema</h5>
                  <h5 class="card-title text-center letraLabel" > <i class="fa-solid fa-person"></i> Pasajero: ${reser.apellido} ${reser.nombres}</h5>
                  <h5 class="card-title text-center letraLabel" > <i class="fa-solid fa-envelope-circle-check"></i> e-mail: ${reser.mail}</h5>
                  <h5 class="card-title text-center letraLabel" > <i class="fa-solid fa-bed"></i> Habitación: ${reser.habitacion}</h5> 
                  <h5 class="card-title text-center letraLabel" > <i class="fa-solid fa-calendar-check"></i> Checkin: ${formatFechaMostrada(reser.fecDesde)} - CheckOut: ${formatFechaMostrada(reser.fecHasta)}</h5>   
                  <h5 class="card-title text-center letraLabel" > <i class="fa-solid fa-file-invoice-dollar"></i> Cantidad Noches:${reser.cantidadDias} - Tarifa por Noche $: ${reser.tarifaPorNoche} - Total Estadía $: ${reser.totalEstadia}</h5>                                                     
                  
                  <input type="hidden" name="to_name" id="to_name" value=${reser.mail}>                          
                  <input type="hidden" name="apellido" id="apellido" value= ${reser.apellido} > 
                  <input type="hidden" name="nombres" id="nombres" value= ${reser.nombres}> 
                  <input type="hidden" name="checkin" id="checkin" value= ${formatFechaMostrada(reser.fecDesde)}> 
                  <input type="hidden" name="checkout" id="checkout" value= ${formatFechaMostrada(reser.fecHasta)}> 
                  <input type="hidden" name="habitacion" id="habitacion" value= ${reser.habitacion}>           

                  <div class="d-flex justify-content-center mb-3" >                 
                    <a href="#" class="btn btn-primary btnCancelarReserva" id=${posicionReservasStorage}>Cancelar Reserva</a>                
                </div>
              </form >    
              </div>
                
            </div>  `
            posicionReservasStorage++
            let divContenedor = document.getElementById("divContenedor");
            //Agrego el Div Creado.
            divContenedor.appendChild(contenedor);
            //NUEVO mail con reserva
        }
        const btnCancelarReserva = document.getElementsByClassName('btnCancelarReserva');

        for (let i = 0; i < btnCancelarReserva.length; i++) {
            let posicion = btnCancelarReserva[i].id;
            btnCancelarReserva[i].addEventListener('click', fnCancReservaArray);
            function fnCancReservaArray() {
                reservaEliminada = reservasStorage.splice(posicion, 1)

                let elemento = document.getElementById("divContenedor");
                while (elemento.firstChild) {
                    elemento.removeChild(elemento.firstChild);
                }
                //Informo la Reserva Eliminada
                let contenedor = document.createElement("div");
                contenedor.innerHTML = `
                            <div class="card cardatosContacto">
                            <h5 class="card-header text-center letraEncabezadosM">Reserva Eliminada</h5>
                              <div class="card-body ">
                                  <h5 class="card-title text-center letraLabel" > <i class="fa-solid fa-person"></i> Pasajero: ${reservaEliminada[0].apellido} ${reservaEliminada[0].nombres}</h5>                                    
                                  <h5 class="card-title text-center letraLabel" > <i class="fa-solid fa-bed"></i> Habitación: ${reservaEliminada[0].habitacion}</h5>                                    
                                  <h5 class="card-title text-center letraLabel" > <i class="fa-solid fa-calendar-check"></i> Checkin: ${formatFechaMostrada(reservaEliminada[0].fecDesde)} - CheckOut: ${formatFechaMostrada(reservaEliminada[0].fecHasta)}</h5>   
                                  <h5 class="card-title text-center letraLabel" > <i class="fa-solid fa-file-invoice-dollar"></i> Cantidad Noches: ${reservaEliminada[0].cantidadDias} - Tarifa por Noche $: ${reservaEliminada[0].tarifaPorNoche} - Total Estadía $: ${reser.totalEstadia}</h5>                                    
                              </div>        
                            </div>  `
                let divContenedor = document.getElementById("divContenedor");
                //Agrego el Div Creado.
                divContenedor.appendChild(contenedor);
                localStorage.setItem("listaReservas", JSON.stringify(reservasStorage))

            }

        }



    }
}
//Función para confirmar Reservas
function fnConfReserva() {
    // Elimino los hijos del contenedor
    let elemento = document.getElementById("divContenedor");
    while (elemento.firstChild) {
        elemento.removeChild(elemento.firstChild);
    }
    let contenedor = document.createElement("div");
    contenedor.innerHTML = `
    <div class="card cardatosContacto">
    <h5 class="card-header text-center letraEncabezadosM">Reserva Confirmada</h5>
      <div class="card-body ">
      <form id="formDatosReserva" action="" method="" enctype="">          
          <h5 class="card-title text-center letraLabel" > <i class="fa-solid fa-person"></i> Pasajero: ${reser.apellido} ${reser.nombres}</h5>
          <h5 class="card-title text-center letraLabel" > <i class="fa-solid fa-envelope-circle-check"></i> e-mail: ${reser.mail}</h5>
          <h5 class="card-title text-center letraLabel" > <i class="fa-solid fa-bed"></i> Habitación: ${reser.habitacion}</h5>                                    
          <h5 class="card-title text-center letraLabel" > <i class="fa-solid fa-calendar-check"></i> Checkin: ${formatFechaMostrada(reser.fecDesde)} - CheckOut: ${formatFechaMostrada(reser.fecHasta)}</h5>    
          <h5 class="card-title text-center letraLabel" > <i class="fa-solid fa-file-invoice-dollar"></i> Cantidad Noches:${reser.cantidadDias} - Tarifa por Noche $: ${reser.tarifaPorNoche} - Total Estadía $: ${reser.totalEstadia}</h5>                                                     
          
          <input type="hidden" name="to_name" id="to_name" value=${reser.mail}>                          
          <input type="hidden" name="apellido" id="apellido" value= ${reser.apellido} > 
          <input type="hidden" name="nombres" id="nombres" value= ${reser.nombres}> 
          <input type="hidden" name="checkin" id="checkin" value= ${formatFechaMostrada(reser.fecDesde)}> 
          <input type="hidden" name="checkout" id="checkout" value= ${formatFechaMostrada(reser.fecHasta)}> 
          <input type="hidden" name="habitacion" id="habitacion" value= ${reser.habitacion}>           

          <div class="d-flex justify-content-center mb-3" >                 
          <a href="#" class="btn btn-primary" id="btnCancelarReserva">Cancelar Reserva</a>                
          <input type="submit" class="btn btn-primary " id="btnEnviarMail" value="Enviar Email" >
        </div>
      </form >    
      </div>
        
    </div>  `
    let divContenedor = document.getElementById("divContenedor");
    //Agrego el Div Creado.
    divContenedor.appendChild(contenedor);
    //Agrego la opción de Cancelar Reserva y el Listener para eliminar
    const btnCancelarReserva = document.getElementById("btnCancelarReserva");
    btnCancelarReserva.addEventListener('click', fnCancelarReserva);




    //NUEVO mail con reserva
    const btn = document.getElementById('btnEnviarMail');
    //let formulario = document.getElementById('divDatosForm');
    document.getElementById('formDatosReserva')
        .addEventListener('submit', function (event) {
            event.preventDefault();

            btn.value = 'Enviando...';

            const serviceID = 'default_service';
            const templateID = 'template_5ldtmfx';

            emailjs.sendForm(serviceID, templateID, this)
                .then(() => {
                    btn.value = 'Enviar Email';
                    let elemento = document.getElementById("divContenedor");
                    while (elemento.firstChild) {
                        elemento.removeChild(elemento.firstChild);
                    }
                    let contenedor = document.createElement("div");
                    contenedor.innerHTML = `
    <div class="card habitaciones cardatosContacto">
    <h5 class="card-header text-center letraEncabezadosM">Reserva informada</h5>
    <div class="card-body habitaciones d-flex justify-content-center">
        <h5 class="card-title text-center letraLabel" id="textoHabitaciones">Se ha enviado un mail a ${reser.mail} con los datos de la reserva realizada. </h5>                            
    </div>
</div>  `
                    let divContenedor = document.getElementById("divContenedor");
                    //Agrego el Div Creado.
                    divContenedor.appendChild(contenedor);

                }, (err) => {
                    btn.value = 'Enviar Email';
                    swal("Error al enviar e-Mail", "Se produjeron errores, verifique la dirección de e-mail ingresada", "error");
                });
        });

}


//VER SI SI USA HABILITAR BUSQUEDA
function habilitarBusqueda() {
    //Cargo el pasajero en un elemento del array
    let vNombre = document.getElementById("idNombre").value
    let vApellido = document.getElementById("idApellido").value
    let vEMail = document.getElementById("userEmail").value

    let divDatosUsuario=document.getElementById("divDatosUsuario")

    let contDatosUsuario = document.createElement("div");
    while (divDatosUsuario.firstChild) {
        divDatosUsuario.removeChild(divDatosUsuario.firstChild);
    }

    contDatosUsuario.innerHTML =`<li class="nav-item">                                    
            <a class="nav-link active" id="aUsuario"href="#"> <i id="iUsuario" class="fa-solid fa-user-check" style="filter:invert(0)"></i> ${vNombre} ${vApellido}</a>
                </li>   `
    divDatosUsuario.appendChild(contDatosUsuario)
    let vUserLogueado = document.getElementById("aUsuario")
    vUserLogueado.addEventListener("click", fnMuestraReserva)

    //vUserLogueado.textContent = "Usuario: " + vApellido + ' ' + vNombre


    //Elimino el pasajero anterior si es que hubiera
    //localStorage.removeItem('pasajero');

    pasajeros.push(new pasajero(vApellido, vNombre, 0, vEMail))

    ///Guardo el pasajero en el LOCALSTORAGE
    localStorage.setItem("pasajero", JSON.stringify(pasajeros));

    //////////////////////Obtengo el pasajero del Local Storage
    pasajeroStorage = JSON.parse(localStorage.getItem("pasajero"));
    apellido = pasajeroStorage[0].apellido
    nombres = pasajeroStorage[0].nombres
    mail = pasajeroStorage[0].mail; //Optimizado Desestructurar Objeto  
    // Elimino los hijos del contenedor
    let elemento = document.getElementById("divContenedor");
    while (elemento.firstChild) {
        elemento.removeChild(elemento.firstChild);
    }
    let divBusqueda = document.getElementById("divDatosBusqueda")
    let contenedor = document.createElement("div");
    contenedor.innerHTML = `    
                <div class="row mt-4">
                <div class="col-md-12 d-flex justify-content-center">
                    <label for="fecDesde" class="d-flex letraLabel px-2">Fecha CheckIn</label>
                    <input type="date" class="letraLabel" style="height:30px " id="fecDesde" name="CheckIn"
                        value="" min="" max="">
                    <label for="fecHasta" class="d-flex  mt-0 letraLabel px-2">Fecha
                        CheckOut</label>
                    <input type="date" class="letraLabel" style="height:30px" id="fecHasta" name="CheckOut"
                        value="" min="" max="">
                    <label for="tipoHab" class="d-flex mt-0 letraLabel px-2">Tipo Habitación</label>
                    <select class="d-flex  datosContacto  ms-2 mt-0" style="height:30px" name="tipoHab" id="tipoHab">
                        <option class="" value="TODAS" selected>Todas</option>
                        <option class="" value="SIMPLE">Simple</option>
                        <option class="" value="DOBLE">Doble</option>
                        <option class="" value="FAMILIAR">Familiar</option>
                        <option class="" value="VIP">Vip</option>
                    </select>
                    <button type="button" id="buscarReservas" name="buscarReservas"
                        class="btn btn-primary first mt-0 px-2" style="width: 200px;"> <i
                            class="fa-solid fa-bell-concierge" style="filter:invert(0)"></i> Buscar
                        Habitaciones</button>
                </div>
            </div>  

        `
    //Agrego el Div Creado.
    divBusqueda.appendChild(contenedor);
    let boton = document.getElementById("buscarReservas")
    boton.addEventListener("click", respuestaClick)

    //Obtengo la Fecha actual para pasar vía Dom a los objetos Fec Desde y Hasta
    let diaActual = fechaActual()
    //Obtengo el último día del año para pasar vía Dom a los objetos Fec Desde y Hasta
    let ultimoDia = ultimoDiaReservas()
    //Paso vía Dom valores al Fec Desde

    document.getElementById("fecDesde").min = diaActual
    document.getElementById("fecDesde").max = ultimoDia
    //Paso vía Dom valores al Fec Hasta
    document.getElementById("fecHasta").min = diaActual
    document.getElementById("fecHasta").max = ultimoDia
    //Evento del Listener del botón buscar reservas
    function respuestaClick() {
        let reservasStorage = JSON.parse(localStorage.getItem("listaReservas"));

        //reservasStorage ? fnMuestraReserva() : buscaHabitacionesDisponibles() //Optimizado
        buscaHabitacionesDisponibles();
    }
}


//Función que busca las habitaciones disponibles
function buscaHabitacionesDisponibles() {

    //Seteo las Fechas cargadas por el usuario
    let fechaPasajeroDesde = document.getElementById("fecDesde").value;
    let fechaPasajeroHasta = document.getElementById("fecHasta").value;
    tipoHab = document.getElementById("tipoHab").value;

    // Elimino los hijos del contenedor
    let elemento = document.getElementById("divContenedor");
    while (elemento.firstChild) {
        elemento.removeChild(elemento.firstChild);
    }
    //Controlo que las fechas de Checkin-Checkout sean correctas y si son correctas procedo a buscar habitaciones disponibles.
    if (controlarFechas(fechaPasajeroDesde, fechaPasajeroHasta)) {
        //Creo un Div para mostrar al usuario las habitaciones Disponibles.
        let contenedor = document.createElement("div");
        contenedor.innerHTML = `
            <div class="card habitaciones cardatosContacto">
            <h5 class="card-header text-center letraEncabezadosM">Habitaciones Disponibles</h5>
            <div class="card-body habitaciones d-flex justify-content-center">
                <h5 class="card-title text-center letraLabel" id="textoHabitaciones">Estimado ${nombres} ${apellido} se listan las habitaciones disponibles para el período indicado</h5>                            
            </div>
        </div>  `
        let divContenedor = document.getElementById("divContenedor");
        //Agrego el Div Creado.
        //divContenedor.appendChild(contenedor);
        let cantHabitacionesLibres = 0
        //Recorro el listado de Habitaciones Disponibles y cargo los elementos del Dom a agregar en el HTML, uno por cada habitación
        let habitFiltradas = []
        if (tipoHab != "TODAS") { habitFiltradas = habitaciones.filter((el) => (el.tipoHabitacion == tipoHab)) }
        else { habitFiltradas = [...habitaciones] }
        //Busco las Reservas en el Local Storage
        let reservasStorage = JSON.parse(localStorage.getItem("listaReservas"));
        //Si Hay reservas las presento al usuario

        ////Comienzo Carrousel
        let varHtml = `        
        <div class="container " style="width:75vh;">
            <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel" data-bs-interval="false">
                  <div class="carousel-inner">`
        console.log("habitFiltradas")
        console.log(habitFiltradas)
        console.log("reservasStorage")
        console.log(reservasStorage)
        let habDisp = []
        
        if (reservasStorage)
        {
        habDisp= habitFiltradas.filter((el) => {
            if (reservasStorage.find((filter) => parseInt(filter.habitacion) === parseInt(el.nroHabitacion))) { } else {
            return el
            }
            })
        }
        else{
        habDisp = [...habitFiltradas]}
        
        for (const habitacion of habDisp) {
            if (habitacion.validarOcupacion(fechaPasajeroDesde, fechaPasajeroHasta)) {
                estadoHab = 'Libre'

                varHtml = varHtml + `
                        <div class="carousel-item ${cantHabitacionesLibres == 0 ? 'active' : ''}">
                            <div class="card h-100">
                                <img src=${habitacion.foto} class="card-img-top w-100 bg-dark" alt="...">
                                    <div class="card-body">
                                        <h5 class="card-title text-center">Habitación ${habitacion.nroHabitacion} - Tipo Habitacion: ${habitacion.tipoHabitacion} - Tarifa: ${habitacion.tarifa} por noche</h5>
                                        <p class="card-text text-center">Cama matrimonial King Size, vista al Jardín. Desayuno Incluido.</p>                    
                                    </div>
                                    <a href="#" class="btn btn-primary reservar" id=${habitacion.nroHabitacion}>Reservar</a>      
                            </div>
                        </div>`
                cantHabitacionesLibres++ //Optimización

                //////


            }
        }

        //contenedor.innerHTML = contenedor.innerHTML 
        varHtml = varHtml + ` 
                                </div>
                                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls"
                                    data-bs-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Previous</span>
                                    </button>
                                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls"
                                    data-bs-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Next</span>
                                    </button>
                                </div>
                                </div>
                            </div>
                            </div>`
        contenedor.innerHTML = contenedor.innerHTML + varHtml
        divContenedor.appendChild(contenedor);
        //En caso de no haber encontrado Habitaciones disponibles se informa al usuario.
        if (cantHabitacionesLibres == 0) {
            let h5Texto = document.getElementById("textoHabitaciones")
            h5Texto.className = "letraLabel"
            h5Texto.innerText = "Estimado " + nombres + " " + apellido + " no hay habitaciones disponibles para las fechas solicitadas."
        }
        //Para los botones generados con la clase "reservar" se agrega a cada uno un listener que "escucha el click". 
        const btnReservar = document.getElementsByClassName('reservar');
        for (let i = 0; i < btnReservar.length; i++) {
            let habit = btnReservar[i].id;
            btnReservar[i].addEventListener('click', resp);
            function resp() {
                // Elimino los hijos del contenedor
                let elemento = document.getElementById("divContenedor");
                while (elemento.firstChild) {
                    elemento.removeChild(elemento.firstChild);
                }

                /////////////////////////////guardar reserva en local storage///////////////////////////////////////////////////////////
                let reservas = []

                //Agrego la nueva Reserva
                reservas.push(new reserva(apellido, nombres, habit, fechaPasajeroDesde, fechaPasajeroHasta, mail));
                let habitacionReservada = (habitaciones.filter((el) => el.nroHabitacion == habit));
                reservas[0].calcularEstadia(habitacionReservada[0].tarifa);
                //Busco las Reservas en el Local Storage y las agregos al Array
                let reservasAlmacenadas = JSON.parse(localStorage.getItem("listaReservas"));
                if (reservasAlmacenadas) {
                    console.log("reservasAlmacenadas")
                    console.log(reservasAlmacenadas)
                    for (reserAlm of reservasAlmacenadas) {
                        reservas.push(new reserva(reserAlm.apellido, reserAlm.nombres, reserAlm.habitacion, reserAlm.fecDesde, reserAlm.fecHasta, reserAlm.mail));
                        reservas[reservas.length - 1].calcularEstadia(reserAlm.tarifaPorNoche)
                    }
                }
                //Guardo las Reservas Almacenadas en el Array
                localStorage.setItem("listaReservas", JSON.stringify(reservas));
                let reservasStorage = JSON.parse(localStorage.getItem("listaReservas"));
                let reservaActual = reservasStorage.filter((el) => el.habitacion == habit)

                for (reser of reservaActual) {
                    let contenedor = document.createElement("div");
                    contenedor.innerHTML = `
                  <div class="card cardatosContacto">
                  <h5 class="card-header text-center letraEncabezadosM ">Habitación a Reservar</h5>
                  <div class="card-body ">
                      <h5 class="card-title text-center letraLabel" ><i class="fa-solid fa-person"></i> Pasajero: ${reser.apellido} ${reser.nombres}</h5>                                    
                      <h5 class="card-title text-center letraLabel" ><i class="fa-solid fa-bed"></i> Habitación: ${reser.habitacion}</h5>                                    
                      <h5 class="card-title text-center letraLabel" ><i class="fa-solid fa-calendar-check"></i> Checkin: ${formatFechaMostrada(reser.fecDesde)} - CheckOut: ${formatFechaMostrada(reser.fecHasta)}</h5>                            
                      <h5 class="card-title text-center letraLabel" ><i class="fa-solid fa-file-invoice-dollar"></i> Cantidad Noches: ${reser.cantidadDias} - Tarifa por Noche $: ${reser.tarifaPorNoche} - Total Estadía $: ${reser.totalEstadia}</h5>                                                                
                    <div class="d-flex justify-content-center" >                 
                        <a href="#" class="btn btn-primary mt-3" id="btnConfirmarReserva">Confirmar Reserva</a>
                      </div>    
                  </div>
                  </div>  `
                    let divContenedor = document.getElementById("divContenedor");
                    //Agrego el Div Creado.
                    divContenedor.appendChild(contenedor);
                }
                ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                const btnConfReserva = document.getElementById("btnConfirmarReserva");
                btnConfReserva.addEventListener('click', fnConfReserva);
            }
        }
    }
}

/////////////////////////////////////////////////////////////////////////Llamada a Métodos que interactuan con el Botón Búsquedas
let botonPasajero = document.getElementById("btnDatosPasajero")
botonPasajero.addEventListener("click", habilitarBusqueda)

function fncLogout()
{
    swal("Desea cerrar sus sesión en el Sistema de Reservas?", {
        buttons: {
          Cancelar: "Nop, sigo en el Sistema",
          Salir: {
            text: "Si, quiero salir YA!",
            value: "Salir",
          },
          
        },
      })
      .then((value) => {
        switch (value) {       
          case "Cancelar":            
            break;       
          case "Salir":
            localStorage.removeItem("pasajero");
            location.href="../vistas/reservas.html";
            break;
       
          
        }
      });

}

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
                  <div class="d-flex justify-content-center mb-3" >                 
                    <a href="#" class="btn btn-primary" id="btnBusqueda">Volver a Búsqueda</a>                                  
                    </div>
              </div>        
            </div>  `
    let divContenedor = document.getElementById("divContenedor");
    //Agrego el Div Creado.
    divContenedor.appendChild(contenedor);
    //Agrego la opción de Volver a Búsqueda de Reservas
    const btnBusqueda = document.getElementById("btnBusqueda");
    btnBusqueda.addEventListener('click', buscaHabitacionesDisponibles);
}
//Función que muestra Reservas del pasajero si es que ya existen
function fnMuestraReserva() {
    //Busco las Reservas en el Local Storage
    let reservasStorage = JSON.parse(localStorage.getItem("listaReservas"));
    // Elimino los hijos del contenedor
    let elemento = document.getElementById("divContenedor");
    while (elemento.firstChild) {
        elemento.removeChild(elemento.firstChild);
    }
    //Si Hay reservas las presento al usuario
    let reservasFiltradas=[]
    if(reservasStorage)
    {
        reservasFiltradas= reservasStorage.filter((el) => (el.apellido == apellido && el.nombres==nombres))
    }
   
    
    if (reservasFiltradas.length>0) {
        let contenedor = document.createElement("div");
            contenedor.innerHTML = `
                <div class="card cardatosContacto">
                <h5 class="card-header text-center letraEncabezadosM">Reservas Registradas en el Sistema</h5>`
        //Cargo la Reserva del Storage y las presento al Usuario
        let posicionReservasStorage = 0;
        for (reser of reservasFiltradas) {
            contenedor.innerHTML+=` 
            <div class="card cardatosContacto">    
                    <div class="card-body ">
                    <form id="formDatosReserva${reser.habitacion}" action="" method="" enctype="">                  
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

                        <div class="d-flex justify-content-center " >                 
                            <a href="#" class="btn btn-primary btnCancelarReserva" id=${posicionReservasStorage}>Cancelar Reserva</a>                
                        </div>
                    </form >    
                    </div>
            </div>    
            </div>  `
            posicionReservasStorage++
            let divContenedor = document.getElementById("divContenedor");
            //Agrego el Div Creado.
            divContenedor.appendChild(contenedor);
            
        }
        const btnCancelarReserva = document.getElementsByClassName('btnCancelarReserva');

        for (let i = 0; i < btnCancelarReserva.length; i++) {
            let posicion = btnCancelarReserva[i].id;
            btnCancelarReserva[i].addEventListener('click', fnCancReservaArray);
            function fnCancReservaArray() {
                reservaEliminada = reservasFiltradas.splice(posicion, 1)
             
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
                                  <div class="d-flex justify-content-center mb-3" >                 
                                    <a href="#" class="btn btn-primary" id="btnReservas">Ver Mis Reservas</a>                                  
                                  </div>
                              </div>        
                            </div>  `
                let divContenedor = document.getElementById("divContenedor");
                //Agrego el Div Creado.
                divContenedor.appendChild(contenedor);
                //Si quedan reservas las agrego, cuando no hay mas limpio el arry del localStorage
                //localStorage.setItem("listaReservas", JSON.stringify(reservasFiltradas))
                
                if(reservasFiltradas.length>0)
                {
                    localStorage.setItem("listaReservas", JSON.stringify(reservasFiltradas))
                }
                else
                {
                    let reservasOtros= reservasStorage.filter((el) => (el.apellido != apellido && el.nombres!=nombres))
                    console.log("Reservas Otros")
                    console.log(reservasOtros)
                    reservasOtros.length===0?localStorage.removeItem("listaReservas"):localStorage.setItem("listaReservas", JSON.stringify(reservasOtros))
                        
                }
                //Agrego la opción de Volver a Búsqueda de Reservas
                const btnReservas = document.getElementById("btnReservas");
                btnReservas.addEventListener('click', fnMuestraReserva);

            }

        }

    }
    else
    {
        let contenedor = document.createElement("div");
        contenedor.innerHTML = `
            <div class="card habitaciones cardatosContacto">
                <div class="card cardatosContacto">
                    <h5 class="card-header text-center letraEncabezadosM">Reservas Registradas en el Sistema</h5>
                </div>
                <div class="card-body ">
                    <h5 class="card-title text-center letraLabel">Estimad@ ${nombres} ${apellido} no tiene reservas registradas en el Sistema.
                </div>
            </div>
                `

        let divContenedor = document.getElementById("divContenedor");
        //Agrego el Div Creado.
        divContenedor.appendChild(contenedor);
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
          <input type="hidden" name="cantidadDias" id="cantidadDias" value= ${reser.cantidadDias}>           
          <input type="hidden" name="tarifaPorNoche" id="tarifaPorNoche" value= ${reser.tarifaPorNoche}>     
          <input type="hidden" name="totalEstadia" id="totalEstadia" value= ${reser.totalEstadia}>     


          <div class="d-flex justify-content-center mb-3" >                 
          <a href="#" class="btn btn-primary" id="btnBusqueda">Volver a Búsqueda</a>                
          <input type="submit" class="btn btn-primary " id="btnEnviarMail" value="Enviar Email" >
        </div>
      </form >    
      </div>
        
    </div>  `
    let divContenedor = document.getElementById("divContenedor");
    //Agrego el Div Creado.
    divContenedor.appendChild(contenedor);
    //Agrego la opción de Volver a Búsqueda de Reservas
    const btnBusqueda = document.getElementById("btnBusqueda");
    btnBusqueda.addEventListener('click', buscaHabitacionesDisponibles);




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

//Habilitar Búsqueda luego del login
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
            <a class="nav-link active" id="aLogout" href="#"> <i id="iUsuario" class="fa-solid fa-user-check" style="filter:invert(0)"></i> ${vNombre} ${vApellido}</a>                
            </li>   `
    divDatosUsuario.appendChild(contDatosUsuario)
    let vMisReservas = document.getElementById("aUsuario")
    vMisReservas.addEventListener("click", fnMuestraReserva)
    let vLogout = document.getElementById("aLogout")
    vLogout.addEventListener("click",fncLogout)

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
                <h5 class="card-title text-center letraLabel" id="textoHabitaciones">Estimad@ ${nombres} ${apellido} se listan las habitaciones disponibles para el período indicado</h5>                            
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
        //Busco las Reservas en el Local Storage para no mostrar las habitaciones ya reservadas
        let reservasStorage = JSON.parse(localStorage.getItem("listaReservas"));        

        ////Comienzo Carrousel
        let varHtml = `        
        <div class="container " style="width:75vh;">
            <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel" data-bs-interval="false">
                  <div class="carousel-inner">`
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
                                        <p class="card-text text-center">${habitacion.descripcion}</p>                    
                                    </div>
                                    <a href="#" class="btn btn-primary reservar" id=${habitacion.nroHabitacion}>Reservar</a>      
                            </div>
                        </div>`
                cantHabitacionesLibres++ //Optimización
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
            h5Texto.innerText = "Estimad@ " + nombres + " " + apellido + " no hay habitaciones disponibles para las fechas solicitadas."
            
            // Elimino los hijos del contenedor
            let elemento = document.getElementById("carouselExampleControls");
            while (elemento.firstChild) {
                elemento.removeChild(elemento.firstChild);
                }
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

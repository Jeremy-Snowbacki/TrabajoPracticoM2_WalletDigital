// Inicialización de jQuery - Esperar a que el DOM esté listo

$(document).ready(function() {
  // Inicializar saldo y movimientos si no existen 

  if (!localStorage.getItem("saldo")) {
    localStorage.setItem("saldo", "1500");
  }
  
  // Validar si el saldo es NaN o inválido
  let saldoGuardado = localStorage.getItem("saldo");
  if (isNaN(parseFloat(saldoGuardado)) || saldoGuardado === "NaN") {
    localStorage.setItem("saldo", "1500");
  }
  
  if (!localStorage.getItem("movimientos")) {
    localStorage.setItem("movimientos", JSON.stringify([]));
  }
  if (!localStorage.getItem("contactos")) {
    localStorage.setItem("contactos", JSON.stringify([]));
  }  
  
  /* De la linea 6 a la 21, si es la primera vez que se carga la pagina: 
     Se va a crear un saldo de 1500
     Valida si el saldo guardado es un número válido, si no lo es, lo resetea a 1500
     Se va a crear una lista vacia de movimientos
     Se va a crear una lista vacia de contactos. 
     Posterior, si entro de nuevo ya va a quedar guardado los datos*/



  // Función para actualizar saldo en pantalla

  function actualizarSaldo() {
    const saldo = localStorage.getItem("saldo");
    $("#saldo").text(`$${saldo}`);
  }

  /* De la linea 34 a la 37 se obtiene: El saldo del localStorage
     Se muestra en el elemento con id "saldo", osea muestra el saldo en el menu.html */
 



  //  Función para registrar movimiento 

  function registrarMovimiento(texto) {
    let movimientos = JSON.parse(localStorage.getItem("movimientos"));
    movimientos.unshift(texto);
    localStorage.setItem("movimientos", JSON.stringify(movimientos));
  }

  /* De la linea 47 a la 51 se obtiene: La lista de movimientos (la va a leer)
     Se agrega el nuevo movimiento al inicio de la lista
     Se guarda la lista actualizada en el localStorage */



  //  Función para cargar contactos en select 

  function cargarContactos() {
    const contactoSelect = $("#contactSelect");
    if (contactoSelect.length) {
      contactoSelect.empty();
      let contactos = JSON.parse(localStorage.getItem("contactos"));
      contactos.forEach(c => {
        contactoSelect.append(
          $("<option></option>")
            .val(c.nombre)
            .text(`${c.nombre} (${c.alias} - ${c.banco})`)
        );
      });
    }
  }

  /* De la linea 61 a la 74 se obtiene: El elemento select para contactos
     Si existe el select, se vacía su contenido
     Se obtiene la lista de contactos del localStorage
     Se agrega cada contacto como una opción en el select */



  //  Actualizar saldo al cargar la página 

  actualizarSaldo();
  cargarContactos();

  // Estas 2 lineas hacen que al cargar la pagina se muestre el saldo y los contactos guardados en el select



  //  Manejo de depósito (formulario)

  $("#depositForm").on("submit", function(e) {
    e.preventDefault();
    const monto = parseFloat($("#amount").val());
    
    // Validar que el monto sea un número válido
    if (isNaN(monto) || monto <= 0) {
      alert("Por favor ingresa un monto válido mayor a 0");
      return;
    }
    
    let saldo = parseFloat(localStorage.getItem("saldo"));
    saldo += monto;
    localStorage.setItem("saldo", saldo);
    registrarMovimiento(`Depósito: +$${monto}`);
    window.location.href = "menu.html";
  });

  /* De la linea 94 a la 109 se obtiene: Al enviar el formulario de deposito
     Se obtiene el monto ingresado por el usuario
     Si el monto es inválido, se muestra una alerta y se detiene la ejecución
     Se actualiza el saldo sumando el monto
     Se guarda el nuevo saldo en el localStorage
     Se registra el movimiento del deposito
     Se redirige al menu.html */



  //  Manejo de envío de dinero (formulario)

  $("#sendForm").on("submit", function(e) {
    e.preventDefault();
    const destinatario = $("#recipient").val();
    const monto = parseFloat($("#amountSend").val());
    
    // Validar que el monto sea un número válido
    if (isNaN(monto) || monto <= 0) {
      alert("Por favor ingresa un monto válido mayor a 0");
      return;
    }
    
    let saldo = parseFloat(localStorage.getItem("saldo"));

    if (monto > saldo) {
      alert("Saldo insuficiente");
      return;
    }

    saldo -= monto;
    localStorage.setItem("saldo", saldo);
    registrarMovimiento(`Transferencia a ${destinatario}: -$${monto}`);
    window.location.href = "menu.html";
  });

  /*  De la linea 123 a la 145 se obtiene: Al enviar el formulario de envío de dinero
      Se obtiene el destinatario y el monto ingresado por el usuario
      Si el monto es inválido o mayor al saldo, se muestra una alerta y se detiene la ejecución
      Si todo es válido, se actualiza el saldo restando el monto
      Se guarda el nuevo saldo en el localStorage
      Se registra el movimiento de la transferencia
      Se redirige al menu.html */



  //  Mostrar movimientos en transactions.html 

  const listaMovimientos = $("#movimientosLista");
  if (listaMovimientos.length) {
    listaMovimientos.empty();
    let movimientos = JSON.parse(localStorage.getItem("movimientos"));
    movimientos.forEach(mov => {
      listaMovimientos.append(
        $("<li></li>")
          .addClass("list-group-item")
          .text(mov)
      );
    });
  }

  /* De la linea 159 a la 170 se obtiene: El elemento ul para la lista de movimientos
     Si existe la lista, se vacía su contenido
     Se obtiene la lista de movimientos del localStorage
     Se agrega cada movimiento como un elemento li dentro del ul en la lista */



  //  Interceptar clics en botones del menú 

  $(".redir-btn").on("click", function(e) {
    e.preventDefault();
    const destino = $(this).data("destino");
    const href = $(this).attr("href");
    
    $("#mensajeRedir").text(`Redirigiendo a ${destino}...`);
    
    setTimeout(() => {
      window.location.href = href;
    }, 1000);
  });

  /*  De la linea 181 a la 191 se obtiene: Al hacer clic en un botón con la clase redir-btn
      Obtiene el destino y la URL del botón
      Muestra un mensaje de redirección
      Después de 1 segundo, redirige a la URL correspondiente */



  //  Enviar dinero (con contactos) 

  $("#sendMoneyBtn").on("click", function() {
    const contactoSelect = $("#contactSelect");
    const monto = parseFloat($("#amountSend").val());
    let saldo = parseFloat(localStorage.getItem("saldo"));

    if (!contactoSelect.val()) {
      alert("Selecciona un contacto");
      return;
    }
    
    // Validar que el monto sea un número válido
    if (isNaN(monto) || monto <= 0) {
      alert("Por favor ingresa un monto válido mayor a 0");
      return;
    }
    
    if (monto > saldo) {
      alert("Saldo insuficiente");
      return;
    }

    saldo -= monto;
    localStorage.setItem("saldo", saldo);
    registrarMovimiento(`Transferencia a ${contactoSelect.val()}: -$${monto}`);
    alert(`✅ Envío realizado a ${contactoSelect.val()} por $${monto}`);
    window.location.href = "menu.html";
  });

  /* De la linea 202 a la 228 se obtiene: Al hacer clic en el botón de enviar dinero
     Se obtiene el contacto seleccionado y el monto ingresado
     Si no hay contacto seleccionado, se muestra una alerta y se detiene la ejecución
     Si el monto es inválido o mayor al saldo, se muestra una alerta y se detiene la ejecución
     Si todo es válido, se actualiza el saldo restando el monto
     Se registra el movimiento de la transferencia
     Se muestra una alerta de éxito
     Se redirige al menu.html */



  //  Autocompletar búsqueda de contactos

  $("#buscarContacto").on("keyup", function() {
    const busqueda = $(this).val().toLowerCase();
    const sugerencias = $("#sugerenciasContactos");
    
    if (busqueda.length === 0) {
      sugerencias.hide();
      return;
    }
    
    let contactos = [];
    try {
      contactos = JSON.parse(localStorage.getItem("contactos")) || [];
    } catch(e) {
      contactos = [];
    }
    
    // Filtrar contactos que coincidan con la búsqueda

    const filtrados = contactos.filter(c => 
      c.nombre.toLowerCase().includes(busqueda) || 
      c.alias.toLowerCase().includes(busqueda)
    );
    
    sugerencias.empty();
    
    if (filtrados.length === 0) {
      sugerencias.hide();
      return;
    }
    
    // Mostrar sugerencias

    filtrados.forEach(c => {
      const item = $("<li></li>")
        .addClass("list-group-item")
        .css("cursor", "pointer")
        .text(`${c.nombre} (${c.alias})`)
        .on("click", function() {
          // Al hacer clic, selecciona el contacto
          $("#contactSelect").val(c.nombre);
          $("#buscarContacto").val("");
          sugerencias.hide();
        });
      sugerencias.append(item);
    });
    
    sugerencias.show();
  });

  /* De la linea 243 a la 290 se obtiene: Al escribir en el campo de búsqueda de contactos
     Si el campo está vacío, oculta las sugerencias y detiene la ejecución
     Caso contrario, bbtiene la lista de contactos del localStorage
     Filtra los contactos que coincidan con la búsqueda
     Muestra las sugerencias en una lista debajo del campo
     Al hacer clic en una sugerencia, se selecciona el contacto correspondiente */



  //  Modal de nuevo contacto

  $("#addContactBtn").on("click", function() {
    const modal = new bootstrap.Modal(document.querySelector("#contactModal"));
    modal.show();
  });

  // Estas lineas hacen que al hacer clic en el botón de agregar contacto, se muestre el modal correspondiente



  //  Guardar contacto 

  $("#contactForm").on("submit", function(e) {
    e.preventDefault();
    const nombre = $("#nombre").val();
    const cbu = $("#rut").val();
    const alias = $("#alias").val();
    const banco = $("#banco").val();

    let contactos = JSON.parse(localStorage.getItem("contactos"));
    contactos.push({ nombre, cbu, alias, banco });
    localStorage.setItem("contactos", JSON.stringify(contactos));

    cargarContactos();
    alert("✅ Contacto agregado correctamente");
    const modal = bootstrap.Modal.getInstance(document.querySelector("#contactModal"));
    modal.hide();
    $(this).trigger("reset");
  });
});

/* De la linea 314 a la 331 se obtiene: Al enviar el formulario de nuevo contacto
   Se obtienen los datos ingresados por el usuario
   Se agrega el nuevo contacto a la lista de contactos
   Se guarda la lista actualizada en el localStorage
   Se recarga el select de contactos
   Se muestra una alerta de éxito
   Se cierra el modal
   Se resetea el formulario */

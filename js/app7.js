class Numero {
  constructor(numero) {
    this.numero = numero;
  }

  construirFila() {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${this.numero}</td>
      <td class="borrar_numero btn btn-outline-danger text-danger px-3 ms-3"><i class="fa-solid fa-power-off"></i></td>
    `;

    const btn_borrarNumero = fila.querySelector(".borrar_numero");
    btn_borrarNumero.addEventListener("click", () => this.eliminarNumero(fila));

    return fila;
  }

  eliminarNumero(fila) {
    fila.remove();
  }

  generarNumeroAleatorio() {
    const minimo = 1;
    const maximo = 100;
    this.numero = Math.floor(Math.random() * (maximo - minimo + 1) + minimo);

    const inputNumero = document.querySelector("#numero_azar");
    inputNumero.value = this.numero;
  }
}

const tabla_cuerpo = document.querySelector("#tabla_cuerpo");

function agregar_numero(event) {
  event.preventDefault();

  const numero1 = new Numero(document.querySelector("#numero_azar").value);
  const fila = numero1.construirFila();
  tabla_cuerpo.appendChild(fila);
}

function generar_numero(event) {
  event.preventDefault();
  const numero1 = new Numero();
  numero1.generarNumeroAleatorio();
}

function calcular_y_mostrar_resultados() {
  const filas = document.querySelectorAll("#tabla_cuerpo tr");
  let suma = 0;

  filas.forEach((fila) => {
    suma += parseInt(fila.querySelector("td").innerText);
  });

  const cantidadNumeros = filas.length;
  const promedio = suma / cantidadNumeros;
  const numeroMaximo = Math.max(
    ...Array.from(filas, (fila) => parseInt(fila.querySelector("td").innerText))
  );
  const numeroMinimo = Math.min(
    ...Array.from(filas, (fila) => parseInt(fila.querySelector("td").innerText))
  );

  // Mostrar resultados en los párrafos correspondientes
  document.querySelector("#promedio").innerText = `Promedio: ${promedio.toFixed(2)}`;
  document.querySelector("#total").innerText = `Total: ${suma}`;
  document.querySelector("#maximo").innerText = `Número máximo: ${numeroMaximo}`;
  document.querySelector("#minimo").innerText = `Número mínimo: ${numeroMinimo}`;
  document.querySelector("#cantidad").innerText = `Cantidad de números: ${cantidadNumeros}`;
}

document.querySelector("#formulario_generarNumero").addEventListener("submit", agregar_numero);
document.querySelector("#btn_generador").addEventListener("click", generar_numero);
document.querySelector("#btn_agregar").addEventListener("click", agregar_numero);
document.querySelector("#btn_calcular").addEventListener("click", calcular_y_mostrar_resultados);

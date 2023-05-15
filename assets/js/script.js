let presupuesto = 0;
let gastos = 0;
let saldo = 0;
let id = 0;
let arrayGasto = [];

const getId = () => {
    id ++;
    return id;
}

//crea un objeto de gastos
const creaObjeto = (descripcion, valor) => {
    const newObjeto = { id : getId(), nombre: descripcion, monto: valor }
    return JSON.parse(JSON.stringify(newObjeto));
}

//crea y agrega una fila con la información de un gasto
const addGasto = (Gasto) => {
    const tbody = document.getElementById('tcontenido');
    tbody.innerHTML += `<tr id="elemento${Gasto.id}">
        <td>${Gasto.nombre}</td>
        <td>${Gasto.monto}</td> 
        <td><i onclick=borrarGasto(${Gasto.id}) class="bi-trash trash"></i></td>
    </tr> `;
    arrayGasto.push(Gasto); //se agrega un objeto Gasto al arreglo arrayGasto
    gastos += Gasto.monto; //se actualiza el total de gastos
    document.getElementById("gastoGral").innerText = "$" + gastos;
    document.getElementById("inputGasto").value = "";
    document.getElementById("inputValor").value = "";
    saldo = presupuesto - gastos; //se actualiza el saldo
    document.getElementById("saldoGral").innerText = "$" + saldo;
}

//elimina una fila con información de un gasto
const borrarGasto = (id) => {
    gastos = 0;
    arrayGasto = arrayGasto.filter(function(objetoGasto){
        if (objetoGasto.id == id){
            let fila = document.getElementById("elemento" + id);
            fila.remove();
            return false;
        }
        gastos += objetoGasto.monto;
        return true;
    });
    saldo = presupuesto - gastos;
    document.getElementById("gastoGral").innerText = "$" + gastos;
    document.getElementById("saldoGral").innerText = "$" + saldo;
}

$(document).ready(function(){

    let form = document.getElementById("formulario");
    let btnGasto= document.getElementById("btnG")
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        if (presupuesto > 0) {
            document.querySelector(".error").innerHTML = "* Ya tiene un presupuesto asignado.*"
            document.getElementById("inputPresupuesto").value = "";
        }
        else{
            presupuesto = parseInt(document.getElementById("inputPresupuesto").value);
            document.getElementById("presupuestoGral").innerText = "$" + presupuesto;
            saldo = presupuesto - gastos;
            document.getElementById("saldoGral").innerText = "$" + saldo;
            document.getElementById("inputPresupuesto").value = "";
            document.querySelector(".error").innerText = "";
        }
    })

    btnGasto.addEventListener("click", function(){
        descGasto = document.getElementById("inputGasto").value;
        valorGasto = document.getElementById("inputValor").value;
        if ((descGasto == "") || (valorGasto == "")){
            document.querySelector(".errorG").innerHTML = "* Debe ingresar descripción y monto del gasto.*"
        }
        else{
            gasto = creaObjeto(descGasto, parseInt(valorGasto));
            document.getElementById("inputGasto").value = "";
            document.getElementById("inputValor").value = "";
            document.querySelector(".errorG").innerText = "";
            addGasto(gasto);
        }
    })
    
}) 

//Variáveis
const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');

//UI
const formulario = document.querySelector('#nueva-cita');
const contenedorCitas = document.querySelector('#citas');

class Citas {
  constructor(){
    this.citas = [];
  }

  adicionarCita(cita){
    this.citas = [...this.citas, cita];
    // console.log(this.citas);
  }
}

class UI {

  imprimirAlerta(mensagem, tipo){
    //criar o div
    const divMensagem = document.createElement('div');
    divMensagem.classList.add('text-center', 'alert', 'd-block', 'col-12');

    //adicionar clase dependendo do tipo de erro
    if(tipo === "error"){
      divMensagem.classList.add('alert-danger');
    } else {
      divMensagem.classList.add('alert-seccess');
    }
  
    //mensagemd de erro
    divMensagem.textContent = mensagem;
  
    //adicionar ao DOM
    document.querySelector('#contenido').insertBefore(divMensagem, document.querySelector('.agregar-cita'));
  
    //apagar a alerta depois de 3s
    setTimeout(() => {
      divMensagem.remove();
    }, 3000);
  }

  imprimirCitas({citas}){

    this.limparHTML();
    
    citas.forEach((cita)=>{
      const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

      const divCita = document.createElement('div');
      divCita.classList.add('cita', 'p-3');
      divCita.dataset.id = id;

      //Scripting dos elementos da cita
      const mascotaParrafo = document.createElement('h2');
      mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
      mascotaParrafo.textContent = mascota;

      const propietarioParrafo = document.createElement('p');
      propietarioParrafo.innerHTML = `
        <span class='font-weight-bolder'>Propietario: </span> ${propietario}
      `;

      const telefonoParrafo = document.createElement('p');
      telefonoParrafo.innerHTML = `
        <span class='font-weight-bolder'>Telefono: </span> ${telefono}
      `;

      const fechaParrafo = document.createElement('p');
      fechaParrafo.innerHTML = `
        <span class='font-weight-bolder'>Fecha: </span> ${fecha}
      `;

      const horaParrafo = document.createElement('p');
      horaParrafo.innerHTML = `
        <span class='font-weight-bolder'>Hora: </span> ${hora}
      `;

      const sintomasParrafo = document.createElement('p');
      sintomasParrafo.innerHTML = `
        <span class='font-weight-bolder'>Sintomas: </span> ${sintomas}
      `;

      //adicionar os parrafos ao divCita
      divCita.appendChild(mascotaParrafo);
      divCita.appendChild(propietarioParrafo);
      divCita.appendChild(telefonoParrafo);
      divCita.appendChild(fechaParrafo);
      divCita.appendChild(horaParrafo);
      divCita.appendChild(sintomasParrafo);

      //adicionar as citas ao HTML
      contenedorCitas.appendChild(divCita);
    })
  }

  limparHTML(){
    while(contenedorCitas.firstChild){
      contenedorCitas.removeChild(contenedorCitas.firstChild);
    }
  }
}

//instnciar as clases
const ui = new UI();
const administrarCitas = new Citas();

//Eventos
addEventlisteners();
function addEventlisteners(){
  mascotaInput.addEventListener('input', datosCita);
  propietarioInput.addEventListener('input', datosCita);
  telefonoInput.addEventListener('input', datosCita);
  fechaInput.addEventListener('input', datosCita);
  horaInput.addEventListener('input', datosCita);
  sintomasInput.addEventListener('input', datosCita);

  formulario.addEventListener('submit', nuevaCita)
}

//objeto com a informação da cita
const citaObj = {
  mascota: '',
  propietario: '',
  telefono: '',
  fecha: '',
  hora: '',
  sintomas: '',
}

//adiciona dados ao objeto de cita
function datosCita(e){
  citaObj[e.target.name] = e.target.value
}

//valida e adiciona uma nova cita à clase de citas
function nuevaCita(e){
  e.preventDefault();

  //extrair a informação do objeto de cita
  const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;

  //validar
  if(mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === ''){
    ui.imprimirAlerta("Todos os campos são obrigatórios", "error");
    return;
  }

  //gerar um id único
  citaObj.id = Date.now();

  //criando uma nova cita
  administrarCitas.adicionarCita({...citaObj});

  //reiniciar o objeto
  reiniciarObjeto();

  //reiniciar o formulário
  formulario.reset();

  //mostrar o HTML das citas
  ui.imprimirCitas(administrarCitas);
}

//reiniciar o objeto
function reiniciarObjeto(){
  citaObj.mascota = '';
  citaObj.propietario = '';
  citaObj.telefono = '';
  citaObj.fecha = '';
  citaObj.hora = '';
  citaObj.sintomas = '';

}
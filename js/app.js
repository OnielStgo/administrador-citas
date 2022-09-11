//Variáveis
const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');

let editando;

//UI
const formulario = document.querySelector('#nueva-cita');
const contenedorCitas = document.querySelector('#citas');

//clases
class Citas {
  constructor(){
    this.citas = [];
  }

  adicionarCita(cita){
    this.citas = [...this.citas, cita];
    // console.log(this.citas);
  }

  eliminarCita(id){
    this.citas = this.citas.filter(cita => cita.id !== id);
  }

  editarCita(citaAtualizada){
    this.citas = this.citas.map(cita => cita.id === citaAtualizada.id ? citaAtualizada : cita)
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
      divMensagem.classList.add('alert-success');
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

      //boton para eliminar esta cita
      const btnEliminar = document.createElement('button');
      btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
      btnEliminar.innerHTML = `Deletar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`;
      btnEliminar.onclick = () => eliminarCita(id);


      //boton para editar a esta cita
      const btnEditar = document.createElement('button');
      btnEditar.classList.add('btn', 'btn-info');
      btnEditar.innerHTML = `Editar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" /></svg>`;
      btnEditar.onclick = () => carregarEdicao(cita);
      

      
      //adicionar os parrafos ao divCita
      divCita.appendChild(mascotaParrafo);
      divCita.appendChild(propietarioParrafo);
      divCita.appendChild(telefonoParrafo);
      divCita.appendChild(fechaParrafo);
      divCita.appendChild(horaParrafo);
      divCita.appendChild(sintomasParrafo);
      divCita.appendChild(btnEliminar);
      divCita.appendChild(btnEditar);

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

  //validar
  if(editando){

    ui.imprimirAlerta('Cita editada corretamente');

    //envir o objeto da cita para a edição
    administrarCitas.editarCita({...citaObj})

    //mudar o texto do boton
    formulario.querySelector('button[type="submit"]').textContent = "CRIAR CITA";

    //sair do modo edição
    editando = false;

  } else {
    //gerar um id único
    citaObj.id = Date.now();

    //criando uma nova cita
    administrarCitas.adicionarCita({...citaObj});

    ui.imprimirAlerta('Cita adicionada corretamente');
  }

  

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

//eliminar cita
function eliminarCita(id){
  //elimianr a cita
  administrarCitas.eliminarCita(id)

  //mostrar mensagem
  ui.imprimirAlerta("Cita deletada corretamente");

  //atualizar as citas
  ui.imprimirCitas(administrarCitas);
}

//carregar os dados e o modo edicao
function carregarEdicao(cita){
  
  const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

  //preencher os inputs
  mascotaInput.value = mascota; 
  propietarioInput.value = propietario;
  telefonoInput.value = telefono;
  fechaInput.value = fecha;
  horaInput.value = hora;
  sintomasInput.value = sintomas;

  citaObj.mascota = mascota;
  citaObj.propietario = propietario;
  citaObj.telefono = telefono;
  citaObj.fecha = fecha;
  citaObj.hora = hora;
  citaObj.sintomas = sintomas;
  citaObj.id = id;

  //mudar o texto do boton
  formulario.querySelector('button[type="submit"]').textContent = "Salvar";

  editando = true;
}
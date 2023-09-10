import { Tarefa } from "./tarefa.js";
programa();

function programa() {

  const criarTarefa = (nome = "") => {
    const novaTarefa = new Tarefa(nome.split(" ").join("_"));
    console.log(novaTarefa);
    salvarTarefa(novaTarefa);
    return novaTarefa
  }

  const criaListaElemento = () => {
    const li = document.createElement('li');
    return li;
  }

  const criaBtnElemento = () => {
    const btn = document.createElement('button');
    return btn;
  }

  const lerEventosEntrada = () => {
    const textoEntrada = document.querySelector('#textoEntrada');
    const btnAdicionar = document.querySelector('#adicionar');

    btnAdicionar.addEventListener('click', () => {
      if (!textoEntrada.value) return
      console.log(criarTarefa(textoEntrada.value));
      location.reload();
    });
  }

  const salvarTarefa = (tar = Tarefa) => {
    localStorage.setItem(tar.nome, tar.nome);
  }

  const criaBtnApagar = (li = document, tarefaNome = "") => {
    const btnApagar = criaBtnElemento();
    btnApagar.innerText = 'Apagar';
    btnApagar.setAttribute('class', `apagar ${tarefaNome} btn py-1 px-2 bg-slate-300 border-slate-400 border hover:border-slate-800 rounded-none text-slate-800 m-1`);
    btnApagar.setAttribute('title', 'Apagar esta tarefa');
    li.appendChild(btnApagar);
    apagarTarefa(tarefaNome);
  }

  const apagarTarefa = (tarefaNome = "") => {
    document.addEventListener('click', function (e) {
      const el = e.target;

      if (el.classList.contains('apagar') && el.classList.contains(tarefaNome)) {
        el.parentElement.remove();
        localStorage.removeItem(tarefaNome);
      }
    })
  }

  const criaBtnAlterar = (li = document, tarefaNome = "") => {
    const btnAlterar = criaBtnElemento();
    btnAlterar.innerText = 'Alterar';
    btnAlterar.setAttribute('class', `alterar ${tarefaNome} btn py-1 px-2 bg-slate-300 border-slate-400 border hover:border-slate-800 rounded-none text-slate-800`);
    btnAlterar.setAttribute('title', 'Alterar esta tarefa');
    li.appendChild(btnAlterar);
    alterarTarefa(tarefaNome);
  }

  const alterarTarefa = (tarefaNome = "") => {
    document.addEventListener('click', function (e) {
      const el = e.target;

      if (el.classList.contains('alterar') && el.classList.contains(tarefaNome)) {
        let novoNome = prompt("Insira o nome da tarefa").split(" ").join("_");
        while(novoNome == null || novoNome.length < 1){
          novoNome = prompt("Insira o nome da tarefa").split(" ").join("_");
        }
        localStorage.removeItem(tarefaNome);
        localStorage.setItem(novoNome, novoNome);
        location.reload();
      }
    })
  }

  const mostrarTarefa = () => {
    const seguraLista = document.querySelector("#seguraLista");
    let listaDeTarefas = new Array("");
    Object.values(localStorage).forEach(function (valor) {
      listaDeTarefas.push(localStorage.getItem(valor));
    })
    listaDeTarefas = listaDeTarefas.sort();
    for(let item of listaDeTarefas){
      if (item != "") {
        const li = criaListaElemento();
        seguraLista.appendChild(li);
        li.setAttribute('class', 'text-slate-800')
        li.innerText = localStorage.getItem(item).split("_").join(" ");
        criaBtnAlterar(li, item);
        criaBtnApagar(li, item);
      }
    }
  }

    mostrarTarefa();
    apagarTarefa();
    lerEventosEntrada();
  }
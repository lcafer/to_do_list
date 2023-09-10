export class Tarefa {
  #nome = "";
  
  constructor(nome = "") {
    this.#nome = nome;
  }

  get nome() {
    return this.#nome;
  }

  set nome(novoNome = ""){
    this.#nome = novoNome;
  }
}
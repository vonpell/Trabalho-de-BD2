import Logger from "./logger/Logger.js";
import {  
  insertNoArray,
  updateNoArray,
  deleteDoArray,
} from "./metodosManipulacaoDeDados.js";
import { readArray } from "./readAndWriteFile.js";
import readline from "readline";

export default class Menu {
  constructor() {
    this.logger = new Logger();
    this.userInterface = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  displayOptions() {
    console.log("--------------------------------------");
    console.log("1 - Inserir novo objeto no array");
    console.log("2 - Atualizar objeto no array");
    console.log("3 - Deletar item do array");
    console.log("4 - Mostrar todos os objetos do array");
    console.log("5 - Sair");
  }

  async handleOption(opcao) {
    const arrayDeObjetos = await readArray();
    
    switch (opcao) {
      case "1":
          this.userInterface.question("Digite o nome do novo funcionário: ", (nome) => {
            this.userInterface.question("Digite o departamento do novo funcionário: ", (departamento) => {
              this.userInterface.question("Digite o cargo do novo funcionário: ", (cargo) => {
                this.userInterface.question("Digite o salário do novo funcionário: ", async (salario) => {
                  const novoObjeto = {
                    id: arrayDeObjetos[arrayDeObjetos.length - 1].id + 1, // Gera um novo id baseado no último objeto
                    nome,
                    departamento,
                    cargo,
                    salario,
                  };
                  await insertNoArray(novoObjeto);
                  this.logger.info("Processo de inserção finalizado. Retornando ao menu principal.");                  
                  this.start();
                });
              });
            });
          });
          break;

      case "2":        
      this.userInterface.question("Digite o id do objeto a ser atualizado: ", async (id) => {
        id = parseInt(id, 10);

        this.userInterface.question("Digite o novo nome do funcionário: ", (nome) => {
          this.userInterface.question("Digite o novo departamento do funcionário: ", (departamento) => {
            this.userInterface.question("Digite o novo cargo do funcionário: ", (cargo) => {
              this.userInterface.question("Digite o novo salário do funcionário: ", async (salario) => {
                const objetoModificado = {
                  id: id, // Mantém o id original
                  nome,
                  departamento,
                  cargo,
                  salario,
                };
                await updateNoArray(id, objetoModificado);
                this.logger.info("Processo de update finalizado. Retornando ao menu principal.");
                this.start();
              });
            });
          });
        });
      });

      case "3": 
      this.userInterface.question("Digite o id do objeto a ser removido: ", async (id) => {
        id = parseInt(id, 10);   

        await deleteDoArray(id);
        this.logger.info("Processo de remoção finalizado. Retornando ao menu principal.");
        this.start();
      });
      break;

      case "4":
        console.log("Objetos no array: ");
        arrayDeObjetos.forEach((objeto) => {
          console.log(objeto);
        });
        this.logger.info("Todos os itens foram impressos. Retornando ao menu principal.");
        this.start();
        break;

      case "5":
        console.log("Saindo...");
        process.exit(0);

      default:
        console.log("Opção inválida");
        this.start();
    }
  }

  start() {
    this.displayOptions();
    this.userInterface.question("Escolha uma opção: ", (opcao) => {      
      this.handleOption(opcao);
    });
  }
}

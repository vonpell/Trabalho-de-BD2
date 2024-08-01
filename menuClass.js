import { read } from "fs";
import {
  readArray,
  insertNoArray,
  updateNoArray,
  deleteFromArray,
} from "./metodos.js";
import readline from "readline";

export default class Menu {
  constructor() {
    this.userInterface = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  displayOptions() {
    console.log("1 - Inserir novo objeto no array");
    console.log("2 - Atualizar objeto no array");
    console.log("3 - Deletar item do array");
    console.log("4 - Mostrar todos os objetos do array");
    console.log("5 - Sair");
  }

  async handleOption(opcao) {
    switch (opcao) {
      case "1":
        let novoObjeto = {};
        const tamanhoArray = await readArray();
        console.log("Tamanho do array: ", tamanhoArray.length);
        this.userInterface.question(
          "Digite o nome do novo funcionário: ",
          (nome) => {
            this.userInterface.question(
              "Digite o departamento do novo funcionário: ",
              (departamento) => {
                this.userInterface.question(
                  "Digite o cargo do novo funcionário: ",
                  (cargo) => {
                    this.userInterface.question(
                      "Digite salário do novo funcionário: ",
                      async (salario) => {
                        novoObjeto = {
                          id: tamanhoArray,
                          nome: nome,
                          departamento: departamento,
                          cargo: cargo,
                          salario: salario,
                        };
                        await insertNoArray(novoObjeto);
                        this.userInterface.close();
                      }
                    );
                  }
                );
              }
            );
          }
        );
        break;

      case "2":
        tamanhoArray = this.data.length;
        console.log("Tamanho do array:", tamanhoArray);
        this.userInterface.question(
          "Digite o índice do objeto a ser atualizado: ",
          (indice) => {
            if (indice < 0 || indice >= tamanhoArray) {
              console.log("Índice inválido");
              this.menu().start();
              return;
            }
            this.userInterface.question(
              "Digite o novo nome do funcionário: ",
              (nome) => {
                this.userInterface.question(
                  "Digite o novo departamento do funcionário: ",
                  (departamento) => {
                    this.userInterface.question(
                      "Digite o novo cargo do funcionário: ",
                      (cargo) => {
                        this.userInterface.question(
                          "Digite o novo salário do funcionário: ",
                          (salario) => {
                            const objetoModificado = {
                              id: indice,
                              nome: nome,
                              departamento: departamento,
                              cargo: cargo,
                              salario: salario,
                            };
                            updateNoArray(indice, objetoModificado);
                            this.userInterface.close();
                          }
                        );
                      }
                    );
                  }
                );
              }
            );
          }
        );
        break;

      case "3":
        tamanhoArray = this.data.length;
        console.log("Tamanho do array:", tamanhoArray);
        this.userInterface.question(
          "Digite o índice do objeto a ser deletado: ",
          (indice) => {
            if (indice < 0 || indice >= tamanhoArray) {
              console.log("Índice inválido");
              this.start();
              return;
            }
            deleteFromArray(indice);
            this.userInterface.close();
          }
        );
        break;

      case "4":
        const arrayDeObjetos = this.data;
        console.log("Objetos no array:");
        arrayDeObjetos.forEach((objeto) => {
          console.log(objeto);
        });
        this.userInterface.close();
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

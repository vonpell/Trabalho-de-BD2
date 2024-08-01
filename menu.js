const menu = () => {
    const userInterface = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    console.log("1 - Inserir novo objeto no array");
    console.log("2 - Atualizar objeto no array");
    console.log("3 - Mostrar todos os objetos do array");
    console.log("4 - Sair");
    const data = readArray();  
  
    userInterface.question("Escolha uma opção: ", (opcao) => {
      switch (opcao) {
        case "1":
          const tamanhoDoArray = JSON.parse(data).length;
          console.log("Tamanho do array:", tamanhoDoArray);
          userInterface.question(
            "Digite o nome do novo funcionário: ",
            (nome) => {
              userInterface.question(
                "Digite o departamento do novo funcionário: ",
                (departamento) => {
                  userInterface.question(
                    "Digite o cargo do novo funcionário: ",
                    (cargo) => {
                      userInterface.question(
                        "Digite salário do novo funcionário: ",
                        (salario) => {
                          const novoObjeto = {
                            id: tamanhoDoArray,
                            nome: nome,
                            departamento: departamento,
                            cargo: cargo,
                            salario: salario,
                          };
                          insertNoArray(novoObjeto);
                          userInterface.close();
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
          tamanhoDoArray = JSON.parse(data).length;
          console.log("Tamanho do array:", tamanhoDoArray);
          userInterface.question(
            "Digite o índice do objeto a ser atualizado: ",
            (indice) => {
              if (indice < 0 || indice >= tamanhoDoArray) {
                console.log("Índice inválido");
                menu();
                return;
              }
              userInterface.question(
                "Digite o novo nome do funcionário: ",
                (nome) => {
                  userInterface.question(
                    "Digite o novo departamento do funcionário: ",
                    (departamento) => {
                      userInterface.question(
                        "Digite o novo cargo do funcionário: ",
                        (cargo) => {
                          userInterface.question(
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
                              userInterface.close();
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
          const arrayDeObjetos = JSON.parse(data);
          console.log("Objetos no array:");
          arrayDeObjetos.forEach((objeto) => {
            console.log(objeto);
          });
          break;
  
        case "4":
          console.log("Saindo...");
          process.exit(0);
  
        default:
          console.log("Opção inválida");
          menu();
      }
    });
  };
  
  menu();
  
  // quando chamar a função updateNoArray, passar o indice do objeto (-1) que
  // deseja atualizar e o objeto com as informações atualizadas

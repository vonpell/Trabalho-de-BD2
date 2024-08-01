import { readFile, writeFile } from "fs";
import Logger from "./logger/Logger.js";

export const readArray = () => {
  return new Promise((resolve, reject) => {
    readFile("dados.json", "utf8", (err, data) => {
      if (err) {
        console.log("Erro ao ler o arquivo JSON: ", err);
        reject(err);
        return;
      }
      const jsonArray = JSON.parse(data);
      resolve(jsonArray);
    });
  });
};

export const writeArray = async (path, data) => {
  try {
    await writeFile(path, JSON.stringify(data, null, 2));
    console.log("Arquivo JSON atualizado com sucesso!");
  } catch (err) {
    console.log("Erro ao escrever no arquivo JSON: ", err);
  }
};

const redo = async (x) => {
  Logger.info("Refazendo ação");
  try {
    await x();
    Logger.info("Ação refeita com sucesso!");
  } catch (error) {
    Logger.error("Erro ao refazer a ação:", error);
  }
};

const undo = async (array) => {
  Logger.info("Desfazendo ação");
  try {
    await writeArray("dados.json", array);
    Logger.info("Ação desfeita com sucesso!");
  } catch (error) {
    Logger.error("Erro ao desfazer a ação: ", error);
  }
};

export const insertNoArray = async (novoObjeto) => {
  const data = await readArray();
  const arrayOriginal = JSON.parse(data);
  const flag = 1;
  try {
    // Converter o conteúdo para um objeto JavaScript
    const arrayDeObjetos = JSON.parse(data);
    const arrayIds = arrayDeObjetos.map((objeto) => objeto.id);

    if (arrayIds.contains(novoObjeto.id)) {
      Logger.info("errou rude, faça a cadeira de banco de dados de novo");
      flag = 0;
      throw new Error("O ID informado já existe no arquivo JSON");
    }

    // Adicionar um novo objeto ao array
    arrayDeObjetos.push(novoObjeto);

    // Escrever o objeto atualizado de volta ao arquivo JSON
    writeArray("dados.json", arrayDeObjetos);
    Logger.info("Novo objeto foi adicionado ao arquivo JSON com sucesso!");
  } catch (error) {
    Logger.error("Erro ao processar o arquivo JSON:", error);
    if (flag != 0) await redo(await insertNoArray(novoObjeto));
    await undo(arrayOriginal);
  }
};

export const updateNoArray = async (indice, objetoModificado) => {
  //mudar para typscript e adicionar tipagem ? nas funções
  const data = await readArray();
  const arrayOriginal = JSON.parse(data);
  try {
    // Converter o conteúdo para um objeto JavaScript
    const arrayDeObjetos = JSON.parse(data);

    // Atualizar o objeto no array
    arrayDeObjetos[indice] = objetoModificado;

    // Escrever o objeto atualizado de volta ao arquivo JSON
    await writeArray("dados.json", arrayDeObjetos);
    Logger.info("Objeto foi atualizado no arquivo JSON com sucesso!");
  } catch (error) {
    Logger.error("Erro ao processar o arquivo JSON: ", error);
    await redo(updateNoArray(indice, objetoModificado));
    await undo(arrayOriginal);
  }
};

export const deleteFromArray = async (index) => {
  const data = await readArray();
  const arrayOriginal = JSON.parse(data);
  try {
    // Convert the content to a JavaScript object
    const arrayDeObjetos = JSON.parse(data);

    // Remove the object at the specified index
    arrayDeObjetos.splice(index, 1);

    // Write the updated object back to the JSON file
    await writeArray("dados.json", arrayDeObjetos);
    Logger.info("Objeto remo com sucesso!");
  } catch (error) {
    Logger.error("Erro ao processar o arquivo JSON: ", error);
    await redo(deleteFromArray(index));
    await undo(arrayOriginal);
  }
};

import { readFile, writeFile } from "fs/promises";
import Logger from "./logger/Logger.js";

const filePath = "dados.json";
const logger = new Logger();

export const readArray = async () => {
  try {
    const data = await readFile(filePath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    logger.info("Erro ao ler o arquivo JSON: ", err);
    throw err;
  }
};

export const writeArray = async (path, data) => {
  try {
    await writeFile(path, JSON.stringify(data, null, 2));
    logger.info("Arquivo JSON atualizado com sucesso!");
  } catch (err) {
    logger.info("Erro ao escrever no arquivo JSON: ", err);
  }
};

export const insertNoArray = async (novoObjeto) => {
  let flag = 1;
  const arrayOriginal = await readArray();
  try {
    if (arrayOriginal.some((objeto) => objeto.id === novoObjeto.id)) {
      flag = 0;
      logger.info(
        "ID já existe no arquivo JSON, por favor, insira um ID diferente."
      );
      throw new Error("O ID informado já existe no arquivo JSON");
    }

    arrayOriginal.push(novoObjeto);
    await writeArray(filePath, arrayOriginal);
    logger.info("Novo objeto foi adicionado ao arquivo JSON com sucesso!");
  } catch (error) {
    logger.error(`Erro ao inserir objeto no array: ${error.message}`);
    if (flag != 0) {
      flag = 0;
      return await redo(() => insertNoArray(novoObjeto));
    }
    // await undo(arrayOriginal); acho que não precisa desse undo
  }
};

export const updateNoArray = async (id, objetoModificado) => {
  let arrayDeObjetos = await readArray();
  const arrayOriginal = await readArray();
  try {
    const index = arrayDeObjetos.findIndex(objeto => objeto.id === id);

    if (index === -1) {      
      throw new Error(`Objeto com ID ${id} não encontrado.`);
    }
    
    arrayDeObjetos[index-1] = { ...arrayDeObjetos[index-1], ...objetoModificado };

    await writeArray(filePath, arrayDeObjetos);
    logger.info("Objeto foi atualizado no arquivo JSON com sucesso!");
  } catch (error) {
    logger.error(`Erro ao processar o arquivo JSON: ${error.message}`);
    await redo(() => updateNoArray((id), objetoModificado));
    await undo(arrayOriginal);
  }
};

export const deleteDoArray = async (id) => {
  const arrayOriginal = await readArray();
  try {
    const index = arrayOriginal.findIndex(objeto => objeto.id === id);
    if (index === -1) {      
      throw new Error(`Objeto com ID ${id} não encontrado.`);
    }    
    arrayOriginal.splice(index, 1);
    await writeArray(filePath, arrayOriginal);
    logger.info("Objeto removido com sucesso!");
  } catch (error) {
    logger.error(`Erro ao remover objeto do array: ${error.message}`);
    await undo(arrayOriginal);
  }
};


const redo = async (action) => {
  logger.info("Refazendo ação...");
  try {
    await action();
    logger.info("Ação refeita com sucesso!");
  } catch (error) {
    logger.error("Erro ao refazer a ação: ", error);
  }
};

const undo = async (array) => {
  logger.info("Desfazendo ação...");
  try {
    await writeArray(filePath, array);
    logger.info("Ação desfeita com sucesso!");
  } catch (error) {
    logger.error("Erro ao desfazer a ação: ", error);
  }
};

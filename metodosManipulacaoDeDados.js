import Logger from "./logger/Logger.js";
import { readArray, writeArray } from "./readAndWriteFile.js";
import TransactionManager from "./transactionManager.js";

const dataFilePath = "dados.json";
const logger = new Logger();

export const insertNoArray = async (novoObjeto) => {
  let isIdDuplicated = false;
  let isRetry = 0;
  const transaction = new TransactionManager();
  const data = await readArray();
  const arrayOriginal = await readArray();
  try {   

    if (data.some((objeto) => objeto.id === novoObjeto.id)) {
      isIdDuplicated = true;
      logger.info("ID já existente, por favor, insira um ID diferente.");
      throw new Error("O ID informado já existe!");
    }

    data.push(novoObjeto);
    await writeArray(dataFilePath, data);

    // Simula um erro para testar a funcionalidade de undo no insert
    // if (isRetry === 0) {
    //   console.log(data);
    //   throw new Error("Erro teste redo!");
    // }

    transaction.commit(true);    

    // Simula um erro para testar a funcionalidade de redo no insert
    // if (isRetry === 0) {
    //   console.log(data);
    //   throw new Error("Erro teste redo!");
    // }

    logger.info("Novo objeto foi adicionado ao arquivo com sucesso!");
  } catch (error) {
    logger.error(
      `Erro ao inserir dados do objeto no arquivo: ${error.message}`
    );

    if (isIdDuplicated === false && transaction.isCommit === true && isRetry < 2) {
      isRetry++;
      await redo(() => insertNoArray(novoObjeto));
    }

    if (isIdDuplicated === false && transaction.isCommit === false) {      
      await undo(arrayOriginal);
    }
  }
};

export const updateNoArray = async (id, objetoModificado) => {
  let isIdExistent = true;
  let isRetry = 0;
  const transaction = new TransactionManager();
  const data = await readArray();
  const arrayOriginal = await readArray();
  try { 
    const index = data.findIndex((objeto) => objeto.id === id);  

    if (index === -1) {
      isIdExistent = false;
      throw new Error(`Objeto com ID ${id} não encontrado.`);
    }

    data[index] = { ...data[index], ...objetoModificado };

    await writeArray(dataFilePath, data);

    // Simula um erro para testar a funcionalidade de undo no update
    // if (isRetry === 0) {
    //   throw new Error("Erro teste redo!");
    // }

    transaction.commit(true);    

    // Simula um erro para testar a funcionalidade de redo no update
    // if (isRetry === 0) {
    //   console.log(data);
    //   throw new Error("Erro teste redo!");
    // }

    logger.info("Objeto foi atualizado no arquivo com sucesso!");
  } catch (error) {
    logger.error(`Erro ao atualizar os dados no arquivo: ${error.message}`);

    if (isIdExistent === true && transaction.isCommit === true && isRetry < 2) {
      isRetry++;
      await redo(() => updateNoArray(id, objetoModificado));
    }
    if (isIdExistent === true && transaction.isCommit === false) {      
      await undo(arrayOriginal);
    }
  }
};

export const deleteDoArray = async (id) => {
  let isIdExistent = true;
  let isRetry = 0;
  const transaction = new TransactionManager();
  const data = await readArray();
  const arrayOriginal = await readArray();
  try {
    const index = data.findIndex((objeto) => objeto.id === id);

    if (index === -1) {
      isIdExistent = false;
      throw new Error(`Objeto com ID ${id} não encontrado.`);
    }
    data.splice(index, 1);
    await writeArray(dataFilePath, data);

    // Simula um erro para testar a funcionalidade de undo no delete
    // if (isRetry === 0) {
    //   console.log(data);
    //   throw new Error("Erro teste redo!");
    // }

    transaction.commit(true);    

    // Simula um erro para testar a funcionalidade de redo no delete
    // if (isRetry === 0) {
    //   console.log(data);
    //   throw new Error("Erro teste redo!");
    // }

    logger.info("Objeto removido com sucesso!");
  } catch (error) {
    logger.error(`Erro ao remover objeto do arquivo: ${error.message}`);

    if (isIdExistent === true && transaction.isCommit === true && isRetry < 2) {
      isRetry++;
      await redo(() => deleteDoArray(id));
    }

    if (isIdExistent === true && transaction.isCommit === false) {
      isRetry++;
      await undo(arrayOriginal);

    }
  }
};

const redo = async (action) => {
  logger.info("Refazendo ação...");
  try {
    await action();
    logger.info("Tentativa de refazer a ação bem-sucedida.");
  } catch (error) {
    logger.error(`Erro ao refazer a ação: ${error.message}`);
  }
};

const undo = async (array) => {
  logger.info("Desfazendo ação...");
  try {
    await writeArray(dataFilePath, array);
    logger.info("Ação desfeita com sucesso!");
  } catch (error) {
    logger.error(`Erro ao desfazer a ação: ${error.message}`);
  }
};

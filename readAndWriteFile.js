import { readFile, writeFile } from "fs/promises";
import Logger from "./logger/Logger.js";

const dataFilePath = "dados.json";
const logger = new Logger();

export const readArray = async () => {
    try {
      const data = await readFile(dataFilePath, "utf8");
      return JSON.parse(data);
    } catch (err) {
      logger.info(`Erro ao ler o arquivo: ${err}`);
      throw err;
    }
  };
  
  export const writeArray = async (path, data) => {
    try {
      await writeFile(path, JSON.stringify(data, null, 2));
      logger.info("Dados escritos no arquivo com sucesso.");
    } catch (error) {
      logger.info(`Erro ao atualizar os dados no arquivo: ${error.message}`);
    }
  };
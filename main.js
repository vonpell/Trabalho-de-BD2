import Menu from './menuClass.js';
import { readFile } from "fs";
import { readArray } from './metodos.js';

// Função para ler o arquivo JSON e armazenar o array de objetos em uma variável
// readFile("dados.json", "utf8", (err, data) => {
//   if (err) {
//     console.log("Erro ao ler o arquivo JSON: ", err);
//     return;
//   }

//   try {
//     // Fazer o parsing do conteúdo JSON
//     const jsonArray = JSON.parse(data);
//     console.log(jsonArray.length);

//     // Verificar se o conteúdo é um array
//     if (Array.isArray(jsonArray)) {
//       // Armazenar o array de objetos em uma variável
//       console.log("Array de objetos: ", jsonArray);
//     } else {
//       console.log("O conteúdo do arquivo JSON não é um array.");
//     }
//   } catch (parseError) {
//     console.log("Erro ao fazer o parsing do JSON: ", parseError);
//   }
// });

// let data = await readArray();
// console.log(data);
// console.log(data.length);

const menu = new Menu();
menu.start();
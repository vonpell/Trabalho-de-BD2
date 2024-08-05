Passos para rodar o programa:

1. Instale o node através do seguinte comando no terminal:
npm install -g npm

2. (Opcional) Instale o nvm (nesse projeto foi usado o node 20):
    1. Abra o seu terminal.
    2. Execute o seguinte comando para instalar o nvm:
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash    
    3. Feche e reabra o seu terminal, ou execute o seguinte comando para aplicar as alterações:
    source ~/.bashrc    
    4. Verifique se o nvm foi instalado corretamente executando:
    nvm --version    
    5. Instale a versão 20 do Node.js usando o nvm:
    nvm install 20    
    6. Verifique se a versão 20 do Node.js foi instalada executando:
    node --version    

3. Clone este repositório em alguma pasta do seu computador usando o comando: git clone https://github.com/vonpell/Trabalho-de-BD2.git

4. Dê um npm install na pasta root do projeto

5. Dê um npm start para iniciar o projeto

6. Para testar os métodos de undo e redo, descomente as linhas no arquivo metodosManipulacaoDeDados.js
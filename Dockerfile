FROM node:20-alpine

# Diretório de trabalho
WORKDIR /usr/src/app

# Copiar package.json e instalar dependências
COPY package*.json ./
RUN npm install

# Copiar o restante do código
COPY . .

# Compilar o projeto
RUN npm run build

# Expor porta
EXPOSE 3000

# Rodar o servidor
CMD ["npm", "run", "start:dev"]

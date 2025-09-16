FROM node:20-alpine

# Diretório de trabalho
WORKDIR /usr/src/app

# Copiar package.json e instalar dependências
COPY package*.json ./
RUN npm install

# Copiar o restante do código
COPY . .

# Expor porta
EXPOSE 8080

# Rodar o servidor em modo desenvolvimento
CMD ["npm", "run", "start:dev"]

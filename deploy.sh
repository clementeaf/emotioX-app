#!/bin/bash

echo "Instalando dependencias..."
npm install

echo "Compilando TypeScript..."
npm run build

echo "Desplegando con Serverless Framework..."
npx serverless deploy

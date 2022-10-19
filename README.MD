# NodeJs

for start in javascript serverside, need nodejs, npm.

Start with command: npm init in CLI for generate an package.json, inside this contains commands manager for use in the proyect.

## CommandLine:

in the property "scripts" we can add commands for execute in CLI, the most common is: "start": "node index.js",
los scripts siempre buscan en la carpeta /bin sus ejecutables. sintaxys: npm run

En package.json tenemos una seccion de versiones, que contienen semantic versions, ejemplo: "^1.0.2" el simbolo "caret: ^" instala dependencias nuevas si existen.

## Eslint:

Es una herramienta de desarrollo que permite detectar y estructurar nuestra sintaxis en proyectos.
Para instalarlo usamos: npm install eslint -D

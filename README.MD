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

npm init @eslint/config'.

## MiddleWare

es una función que intercepta una petición

## CORS

Es una dependencia de produccion se instala: npm install cors express

## DotEnv

Libreria usada para gestionar variables de entorno, las variables de entorno tienen información sensible, por lo cual deberia ser agregado en git a gitignore.

## Testing: Jest

Jest es un framework para el testing, pensando principalmente para el frontend, pero ha estado adaptandose a backend
Usage:

`npm install jest`

### Podemos usar scripts en package.json para automatizar la ejecución de nuestros tests:

Los test contienen hooks que podemos usar al principio del flujo del test o al final para evaluar ejecucion de codigo necesaria para el test.

para ejecutar un test:
`"test": "jest test/notes.test.js",`

Para ejecutar un test y este a la escucha:

`"test:watch": "npm run test -- --watch"`

Podemos ejecutar un unico test por consola, el nombre del test puede contener solo una parte y buscara sus coincidencias:

`"npm run test -- -t "name of test"`

## Seguridad a tus contraseñas!

Las bases de datos deben almacenar una cadena encriptada para evitar filtraciones

`"npm install bcrypt"`

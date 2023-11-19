# equipo3
Pruebas E2E - Semana 5 - Equipo 3

* En este repositorio va a encontrar las siguientes carpetas.
     * La carpeta "cypress" para ejecutar los escenarios de pruebas en cypress
     * La carpet kraken_tests_ghost_vanterior_5_73_2 para los escenarios de prueba en kraken con la version 5.73.2 (version inicial)
     * La carpeta kraken_tests_ghost_vnueva_4_72_2 para os escenarios de prueba en Kraken con la version 4.72.2 (version nueva)
     * La carpeta backstopjs con el codigo para realizar regresion visual usando la herramienta backstopjs
     * La carpeta resemblejs con el codigo para realizar regresion visual usando la herramienta resemblejs
* Los escenerios de prueba se describen en la wiki.
* Las pruebas se realizaron con Ghost version 5.73.2 en el equipo local por lo que esta es la versión que se debe utilizar. Para correr las pruebas debe tener ghost corriendo y funcionando en su equipo local con el comando ghost start tal y como enseñaron en el tutorial del curso.

## Instrucciones para ejecución de escenarios de pruebas con Cypress:
1. Descargue el repositorio en su equipo local utilizando el comando git clone. Esta carpeta local puede ser compartida entre Cypress y Kraken.
2. Instale globalmente en su computador cypress version 13.4.0 de acuerdo con el tutorial del curso. La instancia de ghost debera estar sin contenido existente.
3. En el folder llamado cypress, cree un archivo llamado 'cypress.env.json', tome como ejemplo el archivo 'cypress.env.example.json', en el cual tiene el formato esperado. Debe ingresar sus credenciales de administrador de ghost y la url de ghost, una url tipica puede ser http://localhost:2368/ghost.
4. Para correr las pruebas vaya a la carpeta cypress del repositorio en el cmd y ejecute las pruebas con cypress run. Este comando le deberia correr las 20 pruebas y mostrar al final el reporte resumen de la corrida.
5. Alternativamente puede usar el comando cypress open para correr las pruebas manualmente y ver su ejecución en vivo y en directo en la herramienta de cypress.

## Instrucciones para la instalacion de Ghost con la version 5.73.2: TBD 

## Instrucciones para la instalacion de Ghost con la version 4.72.2: TBD

## Instrucciones para ejecución de escenarios de pruebas con Kraken version 5.73.2:
1. Descargue el repositorio en su equipo local utilizando el comando git clone. Esta carpeta local puede ser compartida entre Cypress y Kraken.
2. Instale y use la version de node 16.16.0. (nosotros usamos nvm para manejar las versiones de node)
3. Sobre la carpeta kraken-test corra el comando "npm install" para instalar las dependendicas del proyecto.
4. Se debe modificar un archivo llamado properties.json que se encuentra en la carpeta kraken_tests el cual debe especificar las credenciales de administrador de Ghost y la URL en la que Ghost esta corriendo.
5. Sobre la carpeta de kraken-tests corra el comando "npx kraken-node run" para correr el archivo .feature habilitado con todas las pruebas. Alternativamente va a encontrar un archivo Escenario{n}.feature.txt en la carpeta features por cada escenario. Si desea correr un escenario individual puede remover el .txt del archivo del escenario deseado cerciorandose que este archivo sea el unico .features en la carpeta features y finalmente corriendo el comando "npx kraken-node run" sobre la carpeta "kraken-tests".

## Instrucciones para ejecución de escenarios de pruebas con Kraken version 4.72.2:
1. Descargue el repositorio en su equipo local utilizando el comando git clone. Esta carpeta local puede ser compartida entre Cypress y Kraken.
2. Instale y use la version de node 16.16.0. (nosotros usamos nvm para manejar las versiones de node)
3. Sobre la carpeta kraken-test corra el comando "npm install" para instalar las dependendicas del proyecto.
4. Se debe modificar un archivo llamado properties.json que se encuentra en la carpeta kraken_tests el cual debe especificar las credenciales de administrador de Ghost y la URL en la que Ghost esta corriendo.
5. Sobre la carpeta de kraken-tests corra el comando "npx kraken-node run" para correr el archivo .feature habilitado con todas las pruebas. Alternativamente va a encontrar un archivo Escenario{n}.feature.txt en la carpeta features por cada escenario. Si desea correr un escenario individual puede remover el .txt del archivo del escenario deseado cerciorandose que este archivo sea el unico .features en la carpeta features y finalmente corriendo el comando "npx kraken-node run" sobre la carpeta "kraken-tests".


## Instrucciones para ejecutar reportes con resemblejs:
1. Ingrese a la carpeta de resemblejs y ejecute el siguiente comando: npm install
2. En la carpeta de resemblejs ejecute el siguiente comando: node index.js
3. Ingrese a la carpeta de repots y abra el archivo report.html con algun browser. (ruta seria equipo03/resemblejs/reports/report.html)

## Instrucciones para ejecutar los escenarios con backstopjs:
1. Instalar backstopjs con el siguiente comando: npm install -g backstopjs
2. Ingrese a la carpeta backstopjs y ejecute el siguiente comando: npm install
3. Se abrira un browser con el reporte

## Integrantes del equipo:
- Maria Alas - m.alas@uniandes.edu.co
- Daniel Gamez - da.gamez96@uniandes.edu.co
- Jhon Puentes - j.puentesn@uniandes.edu.co
- Robert Castro - ra.castro2@uniandes.edu.co

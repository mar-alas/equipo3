# equipo3
Pruebas E2E

* En este repositorio va a encontrar dos carpetas. La carpeta "cypress" para ejecutar los escenarios de pruebas en cypress y la carpeta kraken-tests para los escenarios de prueba en kraken. 
* Los escenerios de prueba se describen en la wiki.
* Las pruebas se realizaron con Ghost version 5.72.2 en el equipo local por lo que esta es la versión que se debe utilizar. Para correr las pruebas debe tener ghost corriendo y funcionando en su equipo local con el comando ghost start tal y como enseñaron en el tutorial del curso. Además se deben ejecutar en Windows 11.

## Instrucciones para ejecución de escenarios de pruebas con Cypress:
1. Descargue el repositorio en su equipo local utilizando el comando git clone. Esta carpeta local puede ser compartida entre Cypress y Kraken.
2. Instale globalmente en su computador cypress version 13.4.0 de acuerdo con el tutorial del curso. La instancia de ghost debera estar sin contenido existente. 
3. Instale la version de nodeJs Node 18.18.1 (nosotros usamos nvm para manejar las versiones de node)
4. En el folder llamado cypress, cree un archivo llamado 'cypress.env.json', tome como ejemplo el archivo 'cypress.env.example.json', en el cual tiene el formato esperado. Debe ingresar sus credenciales de administrador de ghost y la url de ghost, una url tipica puede ser http://localhost:2368/ghost.
5. Para correr las pruebas vaya a la carpeta cypress del repositorio en el cmd y ejecute las pruebas con cypress run. Este comando le deberia correr las 20 pruebas y mostrar al final el reporte resumen de la corrida.
6. Alternativamente puede usar el comando cypress open para correr las pruebas manualmente y ver su ejecución en vivo y en directo en la herramienta de cypress.

## Instrucciones para ejecución de escenarios de pruebas con Kraken:
1. Descargue el repositorio en su equipo local utilizando el comando git clone. Esta carpeta local puede ser compartida entre Cypress y Kraken.
2. Instale y use la version de node 16.16.0. (nosotros usamos nvm para manejar las versiones de node)
3. Sobre la carpeta kraken-test corra el comando "npm install" para instalar las dependendicas del proyecto.
4. Se debe modificar un archivo llamado properties.json que se encuentra en la carpeta kraken_tests el cual debe especificar las credenciales de administrador de Ghost y la URL en la que Ghost esta corriendo.
5. Sobre la carpeta de kraken-tests corra el comando "npx kraken-node run" para correr el archivo .feature habilitado con todas las pruebas. Alternativamente va a encontrar un archivo Escenario{n}.feature.txt en la carpeta features por cada escenario. Si desea correr un escenario individual puede remover el .txt del archivo del escenario deseado cerciorandose que este archivo sea el unico .features en la carpeta features y finalmente corriendo el comando "npx kraken-node run" sobre la carpeta "kraken-tests".


## Integrantes del equipo:
- Maria Alas - m.alas@uniandes.edu.co
- Daniel Gamez - da.gamez96@uniandes.edu.co
- Jhon Puentes - j.puentesn@uniandes.edu.co
- Robert Castro - ra.castro2@uniandes.edu.co

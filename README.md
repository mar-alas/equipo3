<h1 align="center">Automatización de pruebas Ghost - Equipo03</h1>

<p align="center">
  <br>
  <i>Este repositorio busca automatizar las pruebas de software end-to-end, encontrar bugs y aumentar la productividad del ingeniero automatizador de pruebas
      haciendo uso de tecnologias, tecnicas y practicas modernas. La aplicacion bajo pruebas usada para este desarrollo es <a href="https://ghost.org">Ghost</a>, una plataforma open source para gestion y publicacion de contenido.
    </i>
  <br>
  
  <p align="center">
       <a href="">
      <img src="https://img.shields.io/badge/test-passing-blue"/>
    </a>
      
      
  <a href="">
      <img src="https://img.shields.io/badge/release-semana7-brightgreen"/>
    </a>
  </p>
  
  <p align="center">
    <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/mar-alas/equipo3?style=social">
  </p>
</p>

<hr>

## Indice
- [Indice](#indice)
- [Entrega Semana 5](#pruebas-e2e-semana-5)
  - [Ejecutar con ghost local](#utilizando-ghost-localmente)
  - [Instrucciones ejecutar pruebas con crypress localmente](#instrucciones-para-ejecución-de-escenarios-de-pruebas-con-cypress-localmente)
  - [Instrucciones ejecutar pruebas con Kraken y ghost 5.73 localmente](#instrucciones-para-ejecución-de-escenarios-de-pruebas-con-Kraken-y-ghost-5-73-2-en-local)
  - [Instrucciones ejecutar pruebas con Kraken y ghost 5.72 en AWS](#instrucciones-para-ejecución-de-escenarios-de-pruebas-con-Kraken-y-ghost-5-72-1-hosteado-en-Amazon-Web-Services)
  - [Instrucciones ejecutar pruebas con Kraken y ghost 4.72.2 en localhost](#instrucciones-para-ejecución-de-escenarios-de-pruebas-con-Kraken-con-ghost-4-72-2-en-local)
  - [Instrucciones ejecutar pruebas con Kraken y ghost 4.48.9 en Google Cloud](#instrucciones-para-ejecución-de-escenarios-de-pruebas-con-Kraken-con-ghost-4-48-9-hosteado-en-Google-Cloud)
  - [Instrucciones para ejecutar reportes con Resemble.js](#instrucciones-para-ejecutar-reportes-con-resemblejs)
  - [Instrucciones para ejecutar los escenarios con Backstop.js](#instrucciones-para-ejecutar-los-escenarios-con-backstopjs)
- [Contribuidorxs](#contribuidorxs)
- [Contacto](#Integrantes-del-equipo)

<hr>

## Pruebas E2E Semana 5
* En este repositorio va a encontrar las siguientes carpetas.
     * La carpeta "cypress" para ejecutar los escenarios de pruebas en cypress. Estos escenarios se ejecutaron en la versión 5.73.2.
     * La carpet kraken_tests_ghost_vanterior_5_73_2 para los escenarios de prueba en kraken con la version 5.73.2 (version inicial desarrollado para host local)
     * La carpet kraken_tests_ghost_vanterior_5_72_1 para los escenarios de prueba en kraken con la version 5.73.2 (version inicial desarrollado para host web)
     * La carpeta kraken_tests_ghost_vnueva_4_72_2 para os escenarios de prueba en Kraken con la version 4.72.2 (version nueva desarrollado para version local y funciona en version web con ghost 4.48.9)
     * La carpeta backstopjs con el codigo para realizar regresion visual usando la herramienta backstopjs. Este desarrollo se puede correr con la version de node 16.16.0 o la version 16.13.0.
     * La carpeta resemblejs con el codigo para realizar regresion visual usando la herramienta resemblejs. Este desarrollo se puede correr con la version de node 16.16.0 o la version 16.13.0.
* Los escenerios de prueba se describen en la wiki.

## Se tendran 2 opciones para la ejecucion de las pruebas, primera con ghosts locales y la segunda con ghost hosteados

### Utilizando ghost localmente:

#### Herramientas necesarias para la instalacion de Ghost con la version 5.73.2:
Utilizar Ghost CLI Version - 1.25.3 y Node 18.18.1

#### Herramientas necesarias para la instalacion de Ghost con la version 4.72.2:
Utilizar Ghost CLI Version - 1.20.0 y Node 16.13.0

#### Instrucciones para ejecución de escenarios de pruebas con Cypress localmente:
1. Descargue el repositorio en su equipo local utilizando el comando git clone. Esta carpeta local puede ser compartida entre Cypress y Kraken.
2. Instale globalmente en su computador cypress version 13.4.0 de acuerdo con el tutorial del curso. La instancia de ghost debera estar sin contenido existente y debe ser la version local de ghost con version 5.73.2.
3. En el folder llamado cypress, cree un archivo llamado 'cypress.env.json', tome como ejemplo el archivo 'cypress.env.example.json', en el cual tiene el formato esperado. Debe ingresar sus credenciales de administrador de ghost y la url de ghost, una url tipica puede ser http://localhost:2368/ghost.
4. Para correr las pruebas vaya a la carpeta cypress del repositorio en el cmd y ejecute las pruebas con cypress run. Este comando le deberia correr las 20 pruebas y mostrar al final el reporte resumen de la corrida.
5. Alternativamente puede usar el comando cypress open para correr las pruebas manualmente y ver su ejecución en vivo y en directo en la herramienta de cypress.

#### Instrucciones para ejecución de escenarios de pruebas con Kraken y ghost 5-73-2 en local:
1. Descargue el repositorio en su equipo local utilizando el comando git clone.
2. Instale la version de ghost 5.73.2 (en la seccion anterior se puede ver las herramientas necesarias para su instalacion)
3. Sobre la carpeta kraken_tests_ghost_vanterior_5_73_2 corra los comandos "npm install" y ""npm install kraken-node" para instalar las dependendicas del proyecto.
4. Se debe modificar un archivo llamado properties.json que se encuentra en la carpeta kraken_tests_ghost_vanterior_5_73_2 el cual debe especificar las credenciales de administrador de Ghost y la URL en la que Ghost esta corriendo.
5. Dentro de la carpeta kraken_tests_ghost_vanterior_5_73_2 hay 2 archivos para ejecutar los escenarios uno para mac llamado ejecutar_escenarios.sh y uno para windows llamado ejecutar_escenarios.bat. Estos scripts se encargaran de ejecutar los 20 escenarios, se creera una carpeta llamada screenshots la cual tendra subcarpetas con nombres de cada escenario y screenshots de cada paso.
6. El archivo de windows utiliza el comando "npx kraken-node run" para correr las pruebas localmente, mientras que el archivo de mac utiliza el comando "./node_modules/kraken-node/bin/kraken-node run" para correr las pruebas utilizando el kraken local, para este escenariob es necesario tener la carpeta node_modules dentro de la carpeta kraken_tests_ghost_vanterior_5_73_2, que se genero gracias al paso 2 con el comando "npm install kraken-node".
7. Si desea una corrida limpia se recomienda borrar las carpetas escenario{n} que estén creados en la carpeta screenshots sin borrar la carpeta que dice "escenario".

#### Instrucciones para ejecución de escenarios de pruebas con Kraken y ghost 5-72-1 hosteado en Amazon Web Services:
1. Realicé la misma instalacion de kraken correspondiente a las instrucciones anteriores sin instalar ghost en local, es decir la correspondiente a la carpeta "kraken_tests_ghost_vnueva_4_72_2".
2. Cambie las credenciales del archivos properties.json para utilizar usuario: equipo3@uniandes.edu.co contraseña: Equipo3123# y host: http://44.200.235.109/ghost.

#### Instrucciones para ejecución de escenarios de pruebas con Kraken con ghost 4-72-2 en local:
1. Descargue el repositorio en su equipo local utilizando el comando git clone.
2. Instale la version de ghost 4.72.2 (en la seccion anterior se puede ver las herramientas necesarias para su instalacion)
3. Sobre la carpeta kraken_tests_ghost_vnueva_4_72_2 corra los comandos "npm install" y ""npm install kraken-node" para instalar las dependendicas del proyecto.
4. Se debe modificar un archivo llamado properties.json que se encuentra en la carpeta kraken_tests_ghost_vnueva_4_72_2 el cual debe especificar las credenciales de administrador de Ghost y la URL en la que Ghost esta corriendo.
5. Dentro de la carpeta kraken_tests_ghost_vnueva_4_72_2 hay 2 archivos para ejecutar los escenarios uno para mac llamado ejecutar_escenarios.sh y uno para windows llamado ejecutar_escenarios.bat. Estos scripts se encargaran de ejecutar los 20 escenarios, se creera una carpeta llamada screenshots la cual tendra subcarpetas con nombres de cada escenario y screenshots de cada paso. Estos scripts solamente corren los 10 escenarios escogidos para la semana:2,6,7,8,9,10,12,16,17,18.
6. El archivo de windows utiliza el comando "npx kraken-node run" para correr las pruebas localmente, mientras que el archivo de mac utiliza el comando "./node_modules/kraken-node/bin/kraken-node run" para correr las pruebas utilizando el kraken local, para este escenariob es necesario tener la carpeta node_modules dentro de la carpeta kraken_tests_ghost_vnueva_4_72_2, que se genero gracias al paso 2 con el comando "npm install kraken-node"
7. Si desea una corrida limpia se recomienda borrar las carpetas escenario{n} que estén creados en la carpeta screenshots sin borrar la carpeta que dice "escenario".
8. 
#### Instrucciones para ejecución de escenarios de pruebas con Kraken con ghost 4-48-9 hosteado en Google Cloud:
1. Realicé la misma instalacion e instrucciones de kraken correspondiente a las instrucciones anteriores sin instalar ghost en local, es decir la correspondiente a la carpeta "kraken_tests_ghost_vnueva_4_72_2".
2. Cambie las credenciales del archivos properties.json para utilizar usuario: equipo3@uniandes.edu.co contraseña: Equipo3123# y host: http://104.155.182.18:2368/ghost.

## Instrucciones para ejecutar reportes con resemblejs:
1. Ingrese a la carpeta de resemblejs y ejecute el siguiente comando: npm install
2. En la carpeta "resemblejs" guarde dos carpetas independientes llamadas "ghost_4_49_9" y "ghost_5_72_1" o las carpetas de ghost que vaya a usar. Copie de las carpetas screenshots de las carpetas "kraken_tests*" los 10 escenarios a probar: 2,6,7,8,9,10,12,16,17,18.
3. En la carpeta de resemblejs ejecute el siguiente comando: node index.js o npm start
4. Ingrese a la carpeta de reports y abra el archivo report.html con algun browser. (ruta seria equipo03/resemblejs/reports/report.html)
5. (Opcional) Puede configurar el porcentaje de diferencia con el cual solo se generará un reporte que mostrará los cambios más relevantes. Puede configurar este valor entre 0 y 100 en el archivo index.js línea 23 

## Instrucciones para ejecutar los escenarios con backstopjs:
1. Ingresar con el cmd a la carpeta "backstopjs" en la raiz del repositorio.
2. Instalar backstopjs con el siguiente comando: npm install -g backstopjs
3. En la carpeta "backstopjs" guarde dos carpetas independientes llamadas "ghost_4_49_9" y "ghost_5_72_1" o las carpetas de ghost que vaya a usar. Copie de las carpetas screenshots de las carpetas "kraken_tests*" los 10 escenarios a probar: 2,6,7,8,9,10,12,16,17,18.
3.Revise en la carpeta de backstojs el archivo "index.js" para que ahga referencia a las carpetas del paso anterior.
4. Ingrese a la carpeta backstopjs y ejecute el siguiente comando: npm install
5. Inicie backstop con el siguiente comando: npm start
6. Se abrira un browser con el reporte

## Integrantes del equipo:
- Maria Alas - m.alas@uniandes.edu.co
- Daniel Gamez - da.gamez96@uniandes.edu.co
- Jhon Puentes - j.puentesn@uniandes.edu.co
- Robert Castro - ra.castro2@uniandes.edu.co

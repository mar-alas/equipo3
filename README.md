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
- [Entrega Semana 8 - Estrategia Final](#entrega-semana-8-estrategia-final)
  - [Consideraciones importantes](#consideraciones-importantes)
  - [Recursos y accesos directos](#recursos-y-accesos-directos)
  - [Semana 1 Pruebas Exploracion Manuales ](#semana-1-pruebas-exploracion-manuales)
  - []()
  - []()
  - []()
- [Entrega Semana 7](#pruebas-e2e-semana-7)
  - [Estructura de carpetas](#estructura-de-carpetas)
  - [Stack elegido para las pruebas](#stack-elegido-para-las-pruebas)
  - [Clonar el repositorio](#clonar-el-repositorio)
  - [Ejecucion de pruebas con Cypress](#ejecucion-de-pruebas-con-cypress)
  - [Ejecucion de pruebas con Kraken](#ejecucion-de-pruebas-con-kraken)
  - [Como limpiar ghost](#como-limpiar-ghost)
- [Entrega Semana 5](#pruebas-e2e-semana-5)
  - [Ejecutar con ghost local](#utilizando-ghost-localmente)
  - [Instrucciones ejecutar pruebas con crypress localmente](#instrucciones-para-ejecución-de-escenarios-de-pruebas-con-cypress-localmente)
  - [Instrucciones ejecutar pruebas con Kraken y ghost 5.73 localmente](#instrucciones-para-ejecución-de-escenarios-de-pruebas-con-Kraken-y-ghost-5-73-2-en-local)
  - [Instrucciones ejecutar pruebas con Kraken y ghost 5.72 en AWS](#instrucciones-para-ejecución-de-escenarios-de-pruebas-con-Kraken-y-ghost-5-72-1-hosteado-en-Amazon-Web-Services)
  - [Instrucciones ejecutar pruebas con Kraken y ghost 4.72.2 en localhost](#instrucciones-para-ejecución-de-escenarios-de-pruebas-con-Kraken-con-ghost-4-72-2-en-local)
  - [Instrucciones ejecutar pruebas con Kraken y ghost 4.48.9 en Google Cloud](#instrucciones-para-ejecución-de-escenarios-de-pruebas-con-Kraken-con-ghost-4-48-9-hosteado-en-Google-Cloud)
  - [Como limpiar ghost](#como-limpiar-ghost)
  - [Instrucciones para ejecutar reportes con Resemble.js](#instrucciones-para-ejecutar-reportes-con-resemblejs)
  - [Instrucciones para ejecutar los escenarios con Backstop.js](#instrucciones-para-ejecutar-los-escenarios-con-backstopjs)
- [Como limpiar ghost](#como-limpiar-ghost)
- [Integrante del Equipo](#Integrantes-del-equipo)

<hr>

## Entrega semana 8 estrategia final

### Consideraciones importantes
- La presente estrategia está diseñada para ejecutarse en 7 semanas.
- El equipo necesario para ejecutar esta estrategia  es de minimo 4 ingenieros seniors automatizadores de pruebas.
- Revisa el stack tecnologico con que fue pensado esta estrategia para su correcta ejecucion.
- Revisa la estructura de carpetas de forma general, ya que en cada carpeta se encuentra una estrategia de pruebas distinta.
- En la carpeta de **Semana_8_Entrega_Final** se encuentran todos los codigos fuentes que se deben ejecutar para completar esta estrategia.


### Recursos y accesos directos

| Recurso      | Acceso                |
|--------------|----------------------------|
| Estrategia de pruebas para el CTO    | [Ver estrategia](https://uniandes-my.sharepoint.com/:w:/r/personal/j_puentesn_uniandes_edu_co/Documents/Pruebas%20automatizadas%20de%20software%20-%20Carpeta%20central%20del%20equipo/Proyecto%20Semana%208%20(FINAL)/estrategia-pruebas.docx?d=wd10f00e19cca4bf2ab873980cdd1e4fa&csf=1&web=1&e=yj2qV3) |
| Incidencias encontradas semana 1    | [Ver en Jira](https://uniandes-miso-pruebas-automatizadas-equipo-01.atlassian.net/jira/software/projects/TSDC/boards/1/backlog)  |
| Inventario de pruebas exploratorias semana 1    | [ver Inventario](https://uniandes-my.sharepoint.com/:x:/r/personal/j_puentesn_uniandes_edu_co/Documents/Pruebas%20automatizadas%20de%20software%20-%20Carpeta%20central%20del%20equipo/Proyecto%20Semana%208%20(FINAL)/inventario-pruebas-exploratorias%20Semana%208.xlsx?d=wafd9aff191b04ca98e1d8605cf22079b&csf=1&web=1&e=DWlMg5)  |
| Listado de escenarios  semana 1  | [Ver Documento](https://uniandes-my.sharepoint.com/:x:/r/personal/j_puentesn_uniandes_edu_co/Documents/Pruebas%20automatizadas%20de%20software%20-%20Carpeta%20central%20del%20equipo/Proyecto%20Semana%208%20(FINAL)/Listado%20Escenarios%20Semana%208.xlsx?d=w1f11bb30c9fd4559b59a689a330d276a&csf=1&web=1&e=kaju7x)  |
| Análisis de los pros/contras de las herramientas usadas    | [Ver Analisis]()  |
| Limitaciones, costos adicionales al presupuesto, ventajas, y desventajas del proceso de pruebas propuesto para las 8 semanas    | [](https://uniandes-my.sharepoint.com/:w:/r/personal/j_puentesn_uniandes_edu_co/Documents/Pruebas%20automatizadas%20de%20software%20-%20Carpeta%20central%20del%20equipo/Proyecto%20Semana%208%20(FINAL)/estrategia-pruebas.docx?d=wd10f00e19cca4bf2ab873980cdd1e4fa&csf=1&web=1&e=yj2qV3)  |
| Video y descripción de la estrategia    | [Ver video]()  |

### Semana 1 Pruebas Exploracion Manuales 
Para la semana 1 de esta [estrategia](https://uniandes-my.sharepoint.com/:w:/r/personal/j_puentesn_uniandes_edu_co/Documents/Pruebas%20automatizadas%20de%20software%20-%20Carpeta%20central%20del%20equipo/Proyecto%20Semana%208%20(FINAL)/estrategia-pruebas.docx?d=wd10f00e19cca4bf2ab873980cdd1e4fa&csf=1&web=1&e=yj2qV3), decidimos como equipo realizar más pruebas exploratorias de las que ya teniamos. Esto con el objetivo de entregar a la empresa un inventario de pruebas más completo y que abarque mas features de ghost. Ya que inicialmente nos enfocamos en las funcionalidades core y dejamos por fuera funcionalidades para el usuario como:

- Gestion de perfil
- Miembros
- Configuraciones
- Dashboard
- Invitaciones
- Entre otras

Ademas de esto, decidimos probar en otros navegadores y jugar con el modo oscuro. Haberlo hecho asi, nos permitió encontrar mas de 36 incidencias nuevas, lo cual es muy bueno. Estamos seguros que con esta informacion, junto con el equipo de desarrollo lograremos mejorar la calidad del producto.

- Las 36 incidencias las puedes [VER AQUI en JIRA](https://uniandes-miso-pruebas-automatizadas-equipo-01.atlassian.net/jira/software/projects/TSDC/boards/1/backlog).
- El inventario de pruebas exploratias las puedes [VER AQUI](https://uniandes-my.sharepoint.com/:x:/r/personal/j_puentesn_uniandes_edu_co/Documents/Pruebas%20automatizadas%20de%20software%20-%20Carpeta%20central%20del%20equipo/Proyecto%20Semana%208%20(FINAL)/inventario-pruebas-exploratorias%20Semana%208.xlsx?d=wafd9aff191b04ca98e1d8605cf22079b&csf=1&web=1&e=DWlMg5).
- El listado de escenarios que probamos las puedes [VER AQUI](https://uniandes-my.sharepoint.com/:x:/r/personal/j_puentesn_uniandes_edu_co/Documents/Pruebas%20automatizadas%20de%20software%20-%20Carpeta%20central%20del%20equipo/Proyecto%20Semana%208%20(FINAL)/Listado%20Escenarios%20Semana%208.xlsx?d=w1f11bb30c9fd4559b59a689a330d276a&csf=1&web=1&e=kaju7x).

### Semana 2 Escenarios de Validacion de Datos

- **Descripción**
  Las pruebas de validación de datos y datos aleatorios se trata de no usar los mismos datos para probar un software. Tipicamente un tester usará datos limitados; Introducir aleatoriedad aumenta la probabilidad de exito para encontrar posibles fallas. Y como sabemos, es mejor y mas economico encontrar fallas a temprana edad y no en producción. Ya que en producción si vamos a tener usuarios especiales que ingresan datos bien raros. Por eso está pruebas la tienes que ejecutar.
  
- **Instrucciones para su ejecucion**
  A continuacion, ingresa a [este readme](https://github.com/mar-alas/equipo3/tree/develop/Semana_8_Entrega_Final/1%20Pruebas%20Exploracion%20Manuales#readme) donde encontrarás documentación que sentará las bases que implementes las pruebas de validación de datos y datos aleatorios y ademas instrucciones para ejecutar el software que ya implementamos.

  **Nota:** Es muy posible que tengas problemas con algunas APIS externas como Mockaroo. Si ejecutas esta estratgia en los tiempos definidos, te garantizamos el fucnionamiento. Si ejecutas despues de Enero de 2024, te recomendamos revisar el modelo de dominio, requrest y repsonse de las pruebas que fallen, luego de esto implementa tu propia API en [mockaroo](https://www.mockaroo.com/) para que siga funcionando todo. 

### Semana 3 Pruebas de reconocimiento con Ripper

- **Descripción**
  Las pruebas de exploración de interfaz gráfica, también conocidas como GUI ripping, son un tipo de pruebas que consisten en explorar cada vista, funcionalidad y aspecto de una aplicación o sistema de software por medio de la interfaz ofrecida al usuario. Estas simulan el comportamiento de un usuario y buscan reconstruir el flujo de interacción y experiencia de usuario para comprobar que está correctamente construido y que las funcionalidades requeridas para la aplicación son satisfechas. Y como tambien cometemos errores en UI, entonces es muy importante ejecutarlas.
  
- **Instrucciones para su ejecucion**
  A continuacion, ingresa a [este readme](https://github.com/mar-alas/equipo3/blob/develop/Semana_8_Entrega_Final/3%20Pruebas%20de%20reconocimiento%20con%20Ripper/README.md) donde encontraras el código fuente y las instrucciones para ejecutar las pruebas con Rippers.

### Semana 4 Pruebas de reconocimiento con Monkeys

- **Descripción**
  Las pruebas con monkeys se hacen para realizar pruebas sobre todos los caminos de los flujos de trabajo de los usuarios, universo de entradas y estados, de principio a fin, imitando las condiciones de los usuarios. Verifican la interacción correcta de la aplicación y el intercambio de datos con otros componentes fuera del sistema. Por esa integralidad y completitud, estas pruebas son muy buenas.
  
- **Instrucciones para su ejecucion**
  A continuacion, ingresa a [este readme](https://github.com/mar-alas/equipo3/tree/develop/Semana_8_Entrega_Final/4%20Pruebas%20de%20reconocimiento%20con%20Monkeys#readme) donde encontraras el codigo fuente y las instrucciones para ejecutar las pruebas con monkeys.

### Semana 5 Pruebas E2E

- **Descripción**
  Las pruebas end-to-end se hacen para realizar pruebas sobre todos los caminos de los flujos de trabajo de los usuarios, universo de entradas y estados, de principio a fin, imitando las condiciones de los usuarios. Verifican la interacción correcta de la aplicación y el intercambio de datos con otros componentes fuera del sistema. Por esa integralidad y completitud, estas pruebas son muy buenas.
  
- **Instrucciones para su ejecucion**
  A continuacion, ingresa a [este readme](https://github.com/mar-alas/equipo3/blob/develop/Semana_8_Entrega_Final/5%20Pruebas%20E2E/README.md) donde encontraras el codigo fuente y las instrucciones para ejecutar las pruebas end-to-end

### Semana 6 Pruebas de Regresion Visual
- **Descripción**
  Las pruebas de regresión visual se havcen para que detectes diferencias y errores entre imagenes que representan pantallas de tu software. Asi qeu, si estan pribando la nueva version de ghsot pueden encontrar diferencias de forma automatizada y no a ojo.
  
- **Instrucciones para su ejecucion**
  A continuacion, ingresa a [este readme](https://github.com/mar-alas/equipo3/blob/develop/Semana_8_Entrega_Final/6%20Pruebas%20de%20Regresion%20Visual/README.md) donde encontrarás el codigo fuente y las instrucciones para ejecutar las pruebas de regresion visual o VRT.


### Semana 7 Reporte Final
  En este punto, ya tendras mucha información (_un poco distribuida_) pero tienes datos! Es hora de que hagas un reporte formal, te sugerimos que incluyas en tu reporte lo siguiente:
  
  1. Muestra la estrategia que ejecutaste.
  2. Haz un resumen ejecutivo con el conexto de donde estabas y a donde estas hoy.
  3. Muestra la tecnologia que usaste (_solo si la audiencia es tecnica_).
  4. Problemas y Defectos encontrados. Entre más, mejor.
  5. Logros complidos.
  6. Resumen de como esto mejora la calidad del producto.

## Pruebas E2E Semana 7
Para la semana 7, decidimos como equipo, crear una nueva carpeta llamada "Semana_7_Escenarios_Datos_Aleatorios".
Esta carpeta contiene las estructuras de Cypress y de Kraken necesarias para ejecutar las pruebas con la nueva funcionalidad de generación de datos aleatorios, pool a priori y pool dinamico.

### Estructura de carpetas
| Carpeta      | Descripción                |
|--------------|----------------------------|
| Semana_7_Escenarios_Datos_Aleatorios    | Carpeta raiz/principal de la entrega semana 7. |
| Cypress    | Carpeta principal de Cypress.  |
| Cypress/data   |  Carpeta donde almacenamos las fuentes de datos a priori para cypress. |
| Cypress/e2e    |  Contiene los scripts de los 105 escenarios de pruebas.  |
| Cypress/support |  Contiene los comandos personalizados usados para obtener datos externos y comandos frecuentes.  |
| Kraken/data    | Carpeta donde almacenamos las fuentes de datos a priori para Kraken.  |
| Kraken/features    | Contiene los scripts de los 15 escenarios de pruebas con kraken.  |


### Stack elegido para las pruebas
Para la implementacion de los 120 escenarios de pruebas decidimos abordarlos asi:

1. La version de ghost es la version 5.73.2
2. La version de Ghost CLI es 1.25.3
3. La version de NodeJS es Node 18.18.1
4. Desarrollamos 105 escenarios en cypress.
5. Desarrollamos 15 escenarios en Kraken.
6. 2 personas trabajamos en Windows.
7. 2 personas trabajamos en MacOS.
8. Jira como sistema de gestion y reporte de incidentes.

[Volver al indice](#indice)

### Iniciar Ghost
Si no ha instalado ghost en su computador, siga [estas instrucciones](https://ghost.org/docs/install/).

Una vez instalado ghost, acceda a la ruta donde los instaló a tarves de la terminal y ejecute:

Para inciarlo:
```
sudo ghost start
```

Para detenerlo:
```
sudo ghost stop
```

[Volver al indice](#indice)

### Clonar el repositorio
Para clonar el repositorio siga las siguientes instrucciones:

1. Abra una terminal en su computador.
2. Clone este repositorio en su maquina local en la ruta que desee. 

Para clonarlo a traves de HTTPS ejecute:
```
git clone https://github.com/mar-alas/equipo3.git
```

para clonarlo a traves de SSH (_Asegurate de que la clave SSH asociada con tu cuenta de GitHub está configurada correctamente en tu máquina._)
```
git clone git@github.com:mar-alas/equipo3.git
```

Para clonarlo a traves de GitHub CLI:
```
gh repo clone mar-alas/equipo3
```

[Volver al indice](#indice)

### Ejecucion de pruebas con Cypress
⚠️ **Recomendacion:** para una completa y correcta ejecucion de las pruebas, recomendamos tener ghost limpio, sin data previa. [Ver como limpiar ghost](#como-limpiar-ghost)

Para ejecutar las pruebas de cypress siga las siguientes instrucciones:

1. Abra su editor de codigo favorito. Recomendado: [Visual Studio Code](https://code.visualstudio.com/)
2. Desde el editor de codigo abra la carpeta que clonó llamada **equipo3**
3. Ubique la terminal en la ruta: "equipo3/Semana_7_Escenarios_Datos_Aleatorios/cypress"
4. Cambie en el archivo _cypress.env.json_ sus credenciales de ghost que tenga creadas en su ghost local. Si no está creado puede crear este archivo a partir de "cypress.env.example.json" y ajustar segun sus credenciales.
5. Ejecute el siguiente comando para ejecutar un escenario:
```
npx cypress run --spec cypress/e2e/escXYZ.cy.js
```
o si esta en linux o MacOs:

```
sudo npx cypress run --spec cypress/e2e/escXYZ.cy.js
```
XYZ es el numero de esceario a ejecutar.

5. Ejecute el siguiente comando para ejecutar todos los escenarios
```
npx cypress run
```
o si esta en linux o MacOs

```
sudo npx cypress run
```

[Volver al indice](#indice)

### Ejecucion de pruebas con Kraken
⚠️ **Recomendacion:** para una completa y correcta ejecucion de las pruebas, recomendamos tener ghost limpio, sin data previa. [Ver como limpiar ghost](#como-limpiar-ghost)

Antes de iniciar la ejecuion configure un archivo "properties.json" en la carpeta de kraken. Puede utilizar el ejemplo "properties.example.json" y quitarle el ".example" y ajustar segun sus credenciales y host de ghost.
Adicionalmente dentro de la carpeta de kraken hay un README con los paquetes que debe instalar para que las pruebas funcionen. Recomendamos ejecutar kraken con node version V16.16.0.

Para la ejecucion de las pruebas con Kraken siga las siguientes instrucciones:

1. Abra su editor de codigo favorito. Recomendado: [Visual Studio Code](https://code.visualstudio.com/)
2. Desde el editor de codigo abra la carpeta que clonó llamada **equipo3**
3. Ubique la terminal en la ruta: "equipo3/Semana_7_Escenarios_Datos_Aleatorios/kraken"
4. Elija el escenario a ejecutar y cambie el txt para que el escenario quede llamado como .feature
5. Ejecute el siguiente comando para ejecutar el escenario o escenarios que ternminan en .feature:
```
npx kraken-node run
```
6. Si desea ejecutar todos los escenarios, ejecute el script llamado _ejecutar_escenarios.sh_ en ios o con ejecutar_escenarios.bat en windows.

[Volver al indice](#indice)

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

[Volver al indice](#indice)

#### Instrucciones para ejecución de escenarios de pruebas con Kraken y ghost 5-73-2 en local:
1. Descargue el repositorio en su equipo local utilizando el comando git clone.
2. Instale la version de ghost 5.73.2 (en la seccion anterior se puede ver las herramientas necesarias para su instalacion)
3. Sobre la carpeta kraken_tests_ghost_vanterior_5_73_2 corra los comandos "npm install" y ""npm install kraken-node" para instalar las dependendicas del proyecto.
4. Se debe modificar un archivo llamado properties.json que se encuentra en la carpeta kraken_tests_ghost_vanterior_5_73_2 el cual debe especificar las credenciales de administrador de Ghost y la URL en la que Ghost esta corriendo.
5. Dentro de la carpeta kraken_tests_ghost_vanterior_5_73_2 hay 2 archivos para ejecutar los escenarios uno para mac llamado ejecutar_escenarios.sh y uno para windows llamado ejecutar_escenarios.bat. Estos scripts se encargaran de ejecutar los 20 escenarios, se creera una carpeta llamada screenshots la cual tendra subcarpetas con nombres de cada escenario y screenshots de cada paso.
6. El archivo de windows utiliza el comando "npx kraken-node run" para correr las pruebas localmente, mientras que el archivo de mac utiliza el comando "./node_modules/kraken-node/bin/kraken-node run" para correr las pruebas utilizando el kraken local, para este escenariob es necesario tener la carpeta node_modules dentro de la carpeta kraken_tests_ghost_vanterior_5_73_2, que se genero gracias al paso 2 con el comando "npm install kraken-node".
7. Si desea una corrida limpia se recomienda borrar las carpetas escenario{n} que estén creados en la carpeta screenshots sin borrar la carpeta que dice "escenario".

[Volver al indice](#indice)

#### Instrucciones para ejecución de escenarios de pruebas con Kraken y ghost 5-72-1 hosteado en Amazon Web Services:
1. Realicé la misma instalacion de kraken correspondiente a las instrucciones anteriores sin instalar ghost en local, es decir la correspondiente a la carpeta "kraken_tests_ghost_vnueva_4_72_2".
2. Cambie las credenciales del archivos properties.json para utilizar usuario: equipo3@uniandes.edu.co contraseña: Equipo3123# y host: http://44.200.235.109/ghost.

[Volver al indice](#indice)

#### Instrucciones para ejecución de escenarios de pruebas con Kraken con ghost 4-72-2 en local:
1. Descargue el repositorio en su equipo local utilizando el comando git clone.
2. Instale la version de ghost 4.72.2 (en la seccion anterior se puede ver las herramientas necesarias para su instalacion)
3. Sobre la carpeta kraken_tests_ghost_vnueva_4_72_2 corra los comandos "npm install" y ""npm install kraken-node" para instalar las dependendicas del proyecto.
4. Se debe modificar un archivo llamado properties.json que se encuentra en la carpeta kraken_tests_ghost_vnueva_4_72_2 el cual debe especificar las credenciales de administrador de Ghost y la URL en la que Ghost esta corriendo.
5. Dentro de la carpeta kraken_tests_ghost_vnueva_4_72_2 hay 2 archivos para ejecutar los escenarios uno para mac llamado ejecutar_escenarios.sh y uno para windows llamado ejecutar_escenarios.bat. Estos scripts se encargaran de ejecutar los 20 escenarios, se creera una carpeta llamada screenshots la cual tendra subcarpetas con nombres de cada escenario y screenshots de cada paso. Estos scripts solamente corren los 10 escenarios escogidos para la semana:2,6,7,8,9,10,12,16,17,18.
6. El archivo de windows utiliza el comando "npx kraken-node run" para correr las pruebas localmente, mientras que el archivo de mac utiliza el comando "./node_modules/kraken-node/bin/kraken-node run" para correr las pruebas utilizando el kraken local, para este escenariob es necesario tener la carpeta node_modules dentro de la carpeta kraken_tests_ghost_vnueva_4_72_2, que se genero gracias al paso 2 con el comando "npm install kraken-node"
7. Si desea una corrida limpia se recomienda borrar las carpetas escenario{n} que estén creados en la carpeta screenshots sin borrar la carpeta que dice "escenario".

[Volver al indice](#indice)

#### Instrucciones para ejecución de escenarios de pruebas con Kraken con ghost 4-48-9 hosteado en Google Cloud:
1. Realicé la misma instalacion e instrucciones de kraken correspondiente a las instrucciones anteriores sin instalar ghost en local, es decir la correspondiente a la carpeta "kraken_tests_ghost_vnueva_4_72_2".
2. Cambie las credenciales del archivos properties.json para utilizar usuario: equipo3@uniandes.edu.co contraseña: Equipo3123# y host: http://104.155.182.18:2368/ghost.

[Volver al indice](#indice)

## Instrucciones para ejecutar reportes con resemblejs:
1. Ingrese a la carpeta de resemblejs y ejecute el siguiente comando: npm install
2. En la carpeta "resemblejs" guarde dos carpetas independientes llamadas "ghost_4_49_9" y "ghost_5_72_1" o las carpetas de ghost que vaya a usar. Copie de las carpetas screenshots de las carpetas "kraken_tests*" los 10 escenarios a probar: 2,6,7,8,9,10,12,16,17,18.
3. En la carpeta de resemblejs ejecute el siguiente comando: node index.js o npm start
4. Ingrese a la carpeta de reports y abra el archivo report.html con algun browser. (ruta seria equipo03/resemblejs/reports/report.html)
5. (Opcional) Puede configurar el porcentaje de diferencia con el cual solo se generará un reporte que mostrará los cambios más relevantes. Puede configurar este valor entre 0 y 100 en el archivo index.js línea 23 

[Volver al indice](#indice)

## Instrucciones para ejecutar los escenarios con backstopjs:
1. Ingresar con el cmd a la carpeta "backstopjs" en la raiz del repositorio.
2. Instalar backstopjs con el siguiente comando: npm install -g backstopjs
3. En la carpeta "backstopjs" guarde dos carpetas independientes llamadas "ghost_4_49_9" y "ghost_5_72_1" o las carpetas de ghost que vaya a usar. Copie de las carpetas screenshots de las carpetas "kraken_tests*" los 10 escenarios a probar: 2,6,7,8,9,10,12,16,17,18.
3.Revise en la carpeta de backstojs el archivo "index.js" para que ahga referencia a las carpetas del paso anterior.
4. Ingrese a la carpeta backstopjs y ejecute el siguiente comando: npm install
5. Inicie backstop con el siguiente comando: npm start
6. Se abrira un browser con el reporte

[Volver al indice](#indice)

## Como Limpiar Ghost
Para limpiar ghost siga las siguientes instrucciones:
1. Inicie sesion en su instancia de ghost.
2. De click en el engranaje ⚙️ de settings que aparece en el menu inferior izquierdo.
3. En el campo de busqueda en el lado superior izquierdo, escriba la palabra "labs".
4. Aparecerá un resultado a la derecha, de click en la opcion "Open"
5. Luego de click en el boton Delete de la seccion "Delete all content" y confirme.

<img width="1068" alt="imagen" src="https://github.com/mar-alas/equipo3/assets/142593813/f013e33a-6e5a-4f93-a053-8c8ea0b852e9">

[Volver al indice](#indice)

## Integrantes del equipo:
- Maria Alas - m.alas@uniandes.edu.co
- Daniel Gamez - da.gamez96@uniandes.edu.co
- Jhon Puentes - j.puentesn@uniandes.edu.co
- Robert Castro - ra.castro2@uniandes.edu.co

[Volver al indice](#indice)

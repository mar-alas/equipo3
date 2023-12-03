### Ejecucion de pruebas con Cypress
⚠️ **Recomendacion:** para una completa y correcta ejecucion de las pruebas, recomendamos tener ghost limpio, sin data previa. [Ver como limpiar ghost](#como-limpiar-ghost)

Para ejecutar las pruebas de cypress siga las siguientes instrucciones:

1. Abra su editor de codigo favorito. Recomendado: [Visual Studio Code](https://code.visualstudio.com/)
2. Desde el editor de codigo abra la carpeta que clonó llamada **equipo3**
3. Ubique la terminal en la ruta: "equipo3\Semana_8_Entrega_Final\2 Escenarios de Validacion de Datos"
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

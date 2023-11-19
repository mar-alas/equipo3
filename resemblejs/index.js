const resemble = require('resemblejs');
const fs = require('fs');
const path = require('path');

const options = {
  "output": {
      "errorColor": {
          "red": 255,
          "green": 0,
          "blue": 255
      },
      "errorType": "movement",
      "transparency": 0.3,
      "largeImageThreshold": 1200,
      "useCrossOrigin": false,
      "outputDiff": true
  },
  "scaleToSameSize": true,
  "ignore": "antialiasing"
};
resemble.outputSettings(options.output);

const threshold = 0; // Umbral de porcentaje

// Función para obtener directorios
const getDirectories = (source) =>
  fs.readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

// Función para obtener imágenes PNG de una carpeta
const getImages = (source) =>
  fs.readdirSync(source)
    .filter(file => file.endsWith('.png'))
    .sort((a, b) => {
      // Extrae los números de los nombres de los archivos para el ordenamiento
      const numA = parseInt(a.match(/paso(\d+)/i)[1], 10);
      const numB = parseInt(b.match(/paso(\d+)/i)[1], 10);
      return numA - numB;
    });

// Función de comparación de imágenes que devuelve una promesa
const compareImages = (image1, image2, diffImageName) => {
  return new Promise((resolve, reject) => {
    resemble(image1)
      .compareTo(image2)
      .ignoreAntialiasing()
      .scaleToSameSize()
      .onComplete((data) => {
        if (parseFloat(data.misMatchPercentage) >= threshold) {
          const diffImagePath = path.join('./reports', diffImageName);
          fs.writeFileSync(diffImagePath, data.getBuffer());
          resolve({ data, diffImagePath });
        } else {
          resolve(null);
        }
      });
  });
};

// Función principal para procesar versiones y escenarios
const processVersionsAndScenarios = async () => {
  let reportHtml = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="UTF-8">
  <title>Image Comparison Report Grupo 3</title>
  <style>
    body { margin: 0; padding: 40px; }
    table { margin-bottom: 40px; }
  </style>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
  </head>
  <body>
  <h1>Image Comparison Report</h1>
  <p> <strong>Porcentaje de desajuste:</strong> >= ${threshold}</p>`;

  const versions = getDirectories('.');

  for (let i = 0; i < versions.length - 1; i++) {
    const version1 = versions[i];
    const version2 = versions[i + 1];
    const scenarios = getDirectories(version1);

    for (const scenario of scenarios) {
      if (!fs.existsSync(path.join(version2, scenario))) {
        continue; // Si el escenario no existe en ambas versiones, lo omite
      }

      const imagesVersion1 = getImages(path.join(version1, scenario));
      const imagesVersion2 = getImages(path.join(version2, scenario));

      if (imagesVersion1.length > 0 && imagesVersion2.length > 0) {
        reportHtml += `<h2 class="scenario-header">Scenario: ${scenario}</h2>`;
      }


      for (let j = 0; j < imagesVersion1.length; j++) {
        const image1Path = path.join(version1, scenario, imagesVersion1[j]);
        const image2Path = path.join(version2, scenario, imagesVersion2[j]);
        const diffImageName = `${scenario}_${imagesVersion1[j].replace('.png', '')}_diff.png`;

        const result = await compareImages(image1Path, image2Path, diffImageName);
        if (result) {
          const firstImageName = imagesVersion1[j].split('.')[0];
          reportHtml += `<h3 class="step-header">Step: ${firstImageName}</h3>`;
          reportHtml += `
          <table class="table table-bordered">
            <thead class="table-dark">
              <tr>
                <th scope="col">${version1} Image</th>
                <th scope="col">${version2} Image</th>
                <th scope="col">Diff Image</th>
                <th scope="col">Diff %</th>
              </tr>
            <thead>
            <tbody>
              <tr>
                <td class="image-container"><img src="../${image1Path}" alt="${version1} Image" class="img-fluid"/></td>
                <td class="image-container"><img src="../${image2Path}" alt="${version2} Image" class="img-fluid"/></td>
                <td class="image-container"><img src="../${result.diffImagePath}" alt="Diff Image" class="img-fluid"/></td>
                <td>${result.data.misMatchPercentage}</td>
              </tr>
            </tbody>
          </table>
          `;
        }
      }
    }
  }

  reportHtml += `
  </body>
  </html>
  `;

  fs.writeFileSync('./reports/report.html', reportHtml);
};

processVersionsAndScenarios();

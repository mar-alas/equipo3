const resemble = require('resemblejs');
const fs = require('fs');
const path = require('path');

const options = {
  output: {
    errorColor: {
      red: 255,
      green: 0,
      blue: 255,
    },
    errorType: 'movement',
    transparency: 0.3,
    largeImageThreshold: 1200,
    useCrossOrigin: false,
    outputDiff: true,
  },
  scaleToSameSize: true,
  ignore: 'antialiasing',
};
resemble.outputSettings(options.output);

const threshold = 0; // Umbral de porcentaje de desajuste

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
      const matchA = a.match(/paso(\d+)/i);
      const matchB = b.match(/paso(\d+)/i);
      const numA = matchA ? parseInt(matchA[1], 10) : 0;
      const numB = matchB ? parseInt(matchB[1], 10) : 0;
      return numA - numB;
    });

// Función de comparación de imágenes
const compareImages = (image1, image2, diffImageName) => {
  return new Promise((resolve, reject) => {
    resemble(image1)
      .compareTo(image2)
      .ignoreAntialiasing()
      .scaleToSameSize()
      .onComplete((data) => {
        if (parseFloat(data.misMatchPercentage) >= threshold) {
          const diffImagePath = path.join('reports', diffImageName);
          fs.writeFileSync(diffImagePath, data.getBuffer());
          resolve({ data, diffImagePath });
        } else {
          resolve(null);
        }
      });
  });
};

// Se comprueba si existe la carpeta de reportes, si no existe se crea
if (!fs.existsSync('reports')) {
  fs.mkdirSync('reports', { recursive: true });
}

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
    <p><strong>Threshold of mismatch:</strong> >= ${threshold}%</p>
  `;

  const baseDir = path.join(__dirname, '..'); // Ruta base relativa a las carpetas de versiones
  const versions = getDirectories(baseDir).filter(name => name.startsWith('kraken_tests_ghost_'));

  for (let i = 0; i < versions.length - 1; i++) {
    const version1 = versions[i];
    const version2 = versions[i + 1];
    const scenariosV1 = getDirectories(path.join(baseDir, version1, 'screenshots'));
    const scenariosV2 = getDirectories(path.join(baseDir, version2, 'screenshots'));

    for (const scenario of scenariosV1) {
      if (!scenariosV2.includes(scenario)) continue;

      const imagesVersion1 = getImages(path.join(baseDir, version1, 'screenshots', scenario));
      const imagesVersion2 = getImages(path.join(baseDir, version2, 'screenshots', scenario));

      if (imagesVersion1.length > 0 && imagesVersion2.length > 0) {
        reportHtml += `<h2 class="scenario-header">Scenario: ${scenario}</h2>`;
      }

      for (let j = 0; j < imagesVersion1.length; j++) {
        const image1 = imagesVersion1[j];
        const image2 = imagesVersion2[j] || image1;

        const image1Path = path.join(version1, 'screenshots', scenario, image1);
        const image2Path = path.join(version2, 'screenshots', scenario, image2);
        const diffImageName = `${scenario}_${image1.replace('.png', '')}_diff.png`;

        const result = await compareImages(path.join(baseDir, image1Path), path.join(baseDir, image2Path), diffImageName);
        if (result) {
          const stepName = image1.replace('.png', '').replace(/_/g, ' ');
          reportHtml += `<h3 class="step-header">${stepName}</h3>`;
          reportHtml += `
            <div>
              <table class="table table-bordered">
                <thead class="table-dark">
                  <tr>
                    <th scope="col">${version1} Image</th>
                    <th scope="col">${version2} Image</th>
                    <th scope="col">Diff Image</th>
                    <th scope="col">Diff %</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><img src="../${path.join('..', image1Path)}" alt="${version1} Image" class="img-fluid"/></td>
                    <td><img src="../${path.join('..', image2Path)}" alt="${version2} Image" class="img-fluid"/></td>
                    <td><img src="${path.join('..', 'reports', diffImageName)}" alt="Diff Image" class="img-fluid"/></td>
                    <td>${result.data.misMatchPercentage}%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          `;
        }
      }
    }
  }

  reportHtml += `
  </body>
  </html>
  `;

  fs.writeFileSync(path.join(__dirname, 'reports', 'report.html'), reportHtml);
};

processVersionsAndScenarios();

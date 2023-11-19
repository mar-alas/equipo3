const fileSystem = require('fs');
const { exec } = require("child_process");
const browserOpen = require('open');
const path = require('path');
const currentDateTime = new Date().toISOString().replace(/:/g,".");

const pathToOriginal = path.join(__dirname, '..', 'kraken_tests_ghost_vnueva_4_72_2', 'screenshots');
const pathToReference = path.join(__dirname, '..', 'kraken_tests_ghost_vanterior_5_73_2', 'screenshots');

console.log('pathToOriginalXX', pathToOriginal);

function readAndProcessConfig() {
    fileSystem.readFile('backstop-config.json', 'utf8', (error, data) => {
        if (error) {
            console.error('Error al leer el archivo de configuración:', error);
            return;
        }
        if (pathToOriginal && pathToReference) {
            generateTestConfigurations(JSON.parse(data));
        } else {
            console.error('Error');
        }
    });
}

setTimeout(readAndProcessConfig, 1000);

function generateTestConfigurations(baseConfig) {
    const originalScenarios = fileSystem.readdirSync(`./${pathToOriginal}`);
    const referenceConfig = baseConfig;
    const testConfig = JSON.parse(JSON.stringify(baseConfig));
  
    originalScenarios.forEach(scenario => {
      const steps = fileSystem.readdirSync(`./${pathToReference}/${scenario}`);
      steps.forEach(step => {
        appendScenarioToConfig(referenceConfig, scenario, step, pathToOriginal);
        appendScenarioToConfig(testConfig, scenario, step, pathToReference);
      });
    });
  
    const testConfigFilename = `${currentDateTime}-test.json`;
    const referenceConfigFilename = `${currentDateTime}-reference.json`;
  
    writeConfigurationsToFile(testConfigFilename, testConfig, () => {
      writeConfigurationsToFile(referenceConfigFilename, referenceConfig, () => {
        executeAllBackstopTests(referenceConfigFilename, testConfigFilename);
      });
    });
}

function appendScenarioToConfig(config, scenarioName, stepName, path, scenarioDefaults = {}) {
  const defaultConfig = {
      readyEvent: "",
      readySelector: "",
      delay: 0,
      hideSelectors: [],
      removeSelectors: [],
      hoverSelector: "",
      clickSelector: "",
      postInteractionWait: 1,
      selectors: [],
      selectorExpansion: true,
      expect: 0,
      misMatchThreshold: 0.1,
      requireSameDimensions: true,
      ...scenarioDefaults
  };

  const scenarioDetails = {
      label: `${scenarioName}-${stepName}`,
      url: `./${path}/${scenarioName}/${stepName}`,
      referenceUrl: `./${path}/${scenarioName}/${stepName}`,
      ...defaultConfig
  };

  config.scenarios.push(scenarioDetails);
}

function writeConfigurationsToFile(filename, configData, onComplete) {
    fileSystem.writeFile(filename, JSON.stringify(configData, null, 2), 'utf8', (error) => {
      if (error) {
        console.error(`Error al escribir el archivo ${filename}:`, error);
        return;
      }
      onComplete();
    });
}

function approveGeneratedBackstop(configFilename, alternateConfigFilename) {
    const command = `backstop approve --config="${configFilename}"`;
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error al aprobar con BackstopJS: ${error.message}`);
            return;
        }
        if (stderr) {
            console.warn(`Advertencia durante la aprobación de BackstopJS: ${stderr}`);
        }

        executeBackstopTest(configFilename, alternateConfigFilename);
    });
}


function removeFilePath(filePath){
  fileSystem.unlink(filePath, (error) => {
    if (error) {
      console.error(`Error al eliminar el archivo ${filePath}:`, error);
    }
  });
}

function executeBackstopTest(configFilename, alternateConfigFilename){
  exec(`backstop test --config="${alternateConfigFilename}"`, { maxBuffer: 1024 * 1000 }, (error, stdout, stderr) => {
    cleanUpAfterTest(configFilename, alternateConfigFilename);
    openBackstopReport();
    if (error) {
      console.error(`Error: ${error.message}`);
        return;
    }
    if (stderr) {
      console.warn(`Advertencia durante la prueba de BackstopJS: ${stderr}`);
        return;
    }
  });
}

function cleanUpAfterTest(configFilename, alternateConfigFilename) {
    removeFilePath(configFilename);
    removeFilePath(alternateConfigFilename);
    openBackstopReport();
}


function executeAllBackstopTests(configFilename, alternateConfigFilename){
    console.log(`Ejecutando: ${configFilename}`);
    exec(`backstop test --config="${configFilename}"`, { maxBuffer: 1024 * 1000 }, (error, stdout, stderr) => {
      approveGeneratedBackstop(configFilename, alternateConfigFilename);
      if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
    });
}

function openBackstopReport() {
  browserOpen(`${__dirname}/backstop_data/html_report/index.html`).catch(error => {
    console.error('Error al abrir el reporte BackstopJS:', error);
  });
}

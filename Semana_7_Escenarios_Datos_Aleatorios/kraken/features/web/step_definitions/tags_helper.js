
const fs = require('fs');
const { faker } = require('@faker-js/faker');
const fetch = require('node-fetch'); 
var Curl = require( 'node-libcurl' ).Curl;

// ________________________esto es usando a priori_____________________________
let tags_data = JSON.parse(fs.readFileSync("./data/tag_data.json", "utf8"));

function getRandomItem(data) {
    const randomIndex = Math.floor(Math.random() * data.length);
    return data[randomIndex];
  }
  
function use_apriori_crear_tag(tags) {
    console.log('Usando estrategia a-priori');
    const randomTag = getRandomItem(tags_data);
    const formattedTag = {
        name: randomTag.tag_name,
        body: randomTag.tag_body,
      };
      // Guardo el tags en el array que se recibe por parametros
      // para poder usarlo para validar
      tags.push(formattedTag);
      return formattedTag
}

// ________________________esto es usando a faker_____________________________

function use_aleatorio_crear_tag(tags) {
    console.log('Usando estrategia aleatorio');
    const faker_name = faker.lorem.words();
    const faker_body = faker.lorem.paragraphs();
  
    const formattedTag = {
      name: faker_name,
      body: faker_body,
    };
    // Guardo el tag en el array que se recibe por parametros
    // para poder usarlo para validar
    tags.push(formattedTag);
    return formattedTag;
}

// _______________________usando poli dinamico ________________

async function use_polidinamico_crear_tag(tags) {
    let formattedTag = await rest_request_crear_tag()
    console.log("Received formatted tag:", formattedTag);
    tags.push(formattedTag);
    return formattedTag
}
  
function rest_request_crear_tag() {
    let data = new Promise((resolve, reject) => {
        const curl = new Curl();
  
        curl.setOpt('URL', 'https://my.api.mockaroo.com/crear_tag.json');
        curl.setOpt('FOLLOWLOCATION', true);
        curl.setOpt(Curl.option.HTTPHEADER, ['X-API-Key: b560e3a0']);
  
        curl.on('end', function (statusCode, data, headers) {
            try {
                console.info(statusCode);
                const json_data = JSON.parse(data);
                const formattedTag = {
                    name: json_data["tag_name"],
                    body: json_data["tag_body"],
                };
                this.close();
  
                resolve(formattedTag);
            } catch (error) {
                reject(error);
            }
        });
        curl.on('error', function (error) {
            reject(error);
        });
  
        curl.perform();
    });
    return data;
}

module.exports = {
    use_apriori_crear_tag,
    use_aleatorio_crear_tag,
    use_polidinamico_crear_tag,
  };

const fs = require('fs');
const { faker } = require('@faker-js/faker');
const fetch = require('node-fetch'); 
var Curl = require( 'node-libcurl' ).Curl;


// ________________________esto es usando a priori_____________________________
let email_data = JSON.parse(fs.readFileSync("./data/email_data.json", "utf8"));

function getRandomItem(data) {
    const randomIndex = Math.floor(Math.random() * data.length);
    return data[randomIndex];
  }
  
function use_apriori_correo(login_info) {
    console.log('Usando estrategia a-priori');
    const randomPost = getRandomItem(email_data);
    const formattedEmail = {
        email: randomPost.email,
        password: randomPost.password,
      };
      login_info.push(formattedEmail)
      return formattedEmail
}

// ________________________esto es usando a faker_____________________________

function use_aleatorio_correo(login_info) {
    console.log('Usando estrategia aleatorio');
    // const faker_email = faker.lorem.words();
    // const faker_password = faker.lorem.paragraphs();
    const faker_email = faker.internet.email();
    const faker_password = faker.internet.password();

    const formattedEmail = {
        email: faker_email,
        password: faker_password,
    };
    login_info.push(formattedEmail)
    return formattedEmail;
}

// _______________________usando poli dinamico ________________

async function use_polidinamico_email_pass(login_info) {
    let formattedEmailPass = await rest_request_email_pass()
    console.log("Received formatted email & pass:", formattedEmailPass);
    login_info.push(formattedEmailPass);
    return formattedEmailPass
}
  
function rest_request_email_pass() {
    let data = new Promise((resolve, reject) => {
        const curl = new Curl();
  
        curl.setOpt('URL', 'https://my.api.mockaroo.com/email_pass.json');
        curl.setOpt('FOLLOWLOCATION', true);
        curl.setOpt(Curl.option.HTTPHEADER, ['X-API-Key: b560e3a0']);
  
        curl.on('end', function (statusCode, data, headers) {
            try {
                console.info(statusCode);
                const json_data = JSON.parse(data);
                const formattedPost = {
                    email: json_data["email"],
                    password: json_data["password"],
                };
                this.close();
  
                resolve(formattedPost);
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
    use_apriori_correo,
    use_aleatorio_correo,
    use_polidinamico_email_pass,
  };
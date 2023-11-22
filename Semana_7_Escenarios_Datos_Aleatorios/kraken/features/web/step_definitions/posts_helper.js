
const fs = require('fs');
const { faker } = require('@faker-js/faker');
const fetch = require('node-fetch'); 
var Curl = require( 'node-libcurl' ).Curl;

// ________________________esto es usando a priori_____________________________
let posts_data = JSON.parse(fs.readFileSync("./data/post_data.json", "utf8"));

function getRandomItem(data) {
    const randomIndex = Math.floor(Math.random() * data.length);
    return data[randomIndex];
  }
  
function use_apriori_crear_post(posts) {
    console.log('Usando estrategia a-priori');
    const randomPost = getRandomItem(posts_data);
    console.log(randomPost.title)
    const formattedPost = {
        title: randomPost.title,
        body: randomPost.content,
        date: randomPost.date,
      };
      // Guardo el post en el array que se recibe por parametros
      // para poder usarlo para validar
      posts.push(formattedPost);
      return formattedPost
}

// ________________________esto es usando a faker_____________________________
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function use_aleatorio_crear_post(posts) {
    console.log('Usando estrategia aleatorio');
    const faker_title = faker.lorem.words();
    const faker_body = faker.lorem.paragraphs();
    const faker_date = faker.date.future();
    const faker_formatted_date = formatDate(faker_date);
    const formattedPost = {
      title: faker_title,
      body: faker_body,
      date: faker_formatted_date,
    };
    // Guardo el post en el array que se recibe por parametros
    // para poder usarlo para validar
    posts.push(formattedPost);
    return formattedPost;
}

// _______________________usando poli dinamico ________________

async function use_polidinamico_crear_post(posts) {
    let formattedPost = await rest_request_crear_post()
    console.log("Received formatted post:", formattedPost);
    posts.push(formattedPost);
    return formattedPost
}
  
function rest_request_crear_post() {
    let data = new Promise((resolve, reject) => {
        const curl = new Curl();
  
        curl.setOpt('URL', 'https://my.api.mockaroo.com/crear_post.json');
        curl.setOpt('FOLLOWLOCATION', true);
        curl.setOpt(Curl.option.HTTPHEADER, ['X-API-Key: b560e3a0']);
  
        curl.on('end', function (statusCode, data, headers) {
            try {
                console.info(statusCode);
                const json_data = JSON.parse(data);
                const formattedPost = {
                    title: json_data["title"],
                    body: json_data["content"],
                    date: json_data["date"],
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
    use_apriori_crear_post,
    use_aleatorio_crear_post,
    use_polidinamico_crear_post,
  };
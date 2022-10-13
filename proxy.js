const request = require("request");
const cheerio = require("cheerio");

let ip_addresses = [];
let port_numbers = [];

let proxyGenerator = async () => {
  request("https://sslproxies.org/", (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);

      $("td:nth-child(1)").each(function (index, value) {
        ip_addresses[index] = $(this).text();
      });

      $("td:nth-child(2)").each(function (index, value) {
        port_numbers[index] = $(this).text();
      });
    } else {
      console.log("Error loading proxy, please try again");
    }
    let random_number = Math.floor(Math.random() * 100);
    console.log("Random Number:", random_number);
    // console.log(proxy);
    if (
      ip_addresses[random_number] == undefined ||
      port_numbers[random_number] == undefined
    ) {
      setTimeout(() => {
        proxyGenerator();
      }, 500);
    }else{
      let proxy = `${ip_addresses[random_number]}:${port_numbers[random_number]}`;
      console.log(proxy);
      return proxy;
    }
  });
};
module.exports = proxyGenerator;
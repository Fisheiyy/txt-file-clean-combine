const fs = require('fs-extra');
const config = require('.\\config.json')
const args = require('minimist')(process.argv.slice(2))


const exp_clean = `${args["clean"]}`
const exp_asked = `${args["asked"]}`
const remove = `${args["remove"]}`
if (remove == 'undefined') {
    config['experimental-cleaning'] = exp_clean
    config['experimental-asked'] = exp_asked
    config_string = JSON.stringify(config, null, 4)
    fs.writeFile(__dirname + "\\config.json", config_string, (err) => {
        if (err) {console.log("error"), err}
    })
    console.log("config updated")
}
else {
config['experimental-cleaning'] = exp_clean
config['experimental-asked'] = exp_asked
config['to-remove'] = remove
config_string = JSON.stringify(config, null, 4)
fs.writeFile(__dirname + "\\config.json", config_string, (err) => {
    if (err) {console.log("error"), err}
})
console.log("config updated")
}
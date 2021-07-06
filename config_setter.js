const exit = require('exit')
const fs = require('fs-extra')
const config = require('.\\config.json')
const args = require('minimist')(process.argv.slice(2))
const config_dir = __dirname + "\\config.json"
const debug = config['debug']


const exp_clean = `${args["clean"]}`
const exp_asked = `${args["asked"]}`
const remove = `${args["remove"]}`
const debug_arg = `${args["debug"]}`
const reset = `${args["reset"]}`
// if (debug == "true") {console.log()}
if (reset == "true") {
    config['experimental-cleaning'] = "false"
    config['experimental-asked'] = "false"
    config['to-remove'] = ""
    config['debug'] = "false"
    config_string = JSON.stringify(config, null, 4)
    fs.writeFile(config_dir, config_string, (err) => {
        if (err) {console.log("error"), err}
    })
}
else {
    if (debug_arg == "undefined") {
        if (remove == "undefined") {
            config['experimental-cleaning'] = exp_clean
            config['experimental-asked'] = exp_asked
            config_string = JSON.stringify(config, null, 4)
            fs.writeFile(config_dir, config_string, (err) => {
                if (err) {console.log("error"), err}
            })
            console.log("config updated")
            exit
        }
        else {
        config['experimental-cleaning'] = exp_clean
        config['experimental-asked'] = exp_asked
        config['to-remove'] = remove
        config_string = JSON.stringify(config, null, 4)
        fs.writeFile(config_dir, config_string, (err) => {
            if (err) {console.log("error"), err}
        })
        console.log("config updated")
        exit
        }
    }
    if (debug_arg !== undefined) {
        if (exp_asked !== undefined) {
            config['experimental-cleaning'] = exp_clean
            config['experimental-asked'] = exp_asked
            config['debug'] = debug_arg
            config_string = JSON.stringify(config, null, 4)
            fs.writeFile(config_dir, config_string, (err) => {
                if (err) {console.log("error"), err}
            })
        }
        else {
        config['debug'] = debug_arg
        config_string = JSON.stringify(config, null, 4)
        fs.writeFile(config_dir, config_string, (err) => {
            if (err) {console.log("error"), err}
        })
        if (debug_arg == "true") {
            console.log("debug enabled")
        }
        if (debug_arg == "false") {
            console.log("debug disabled")
        }}
        exit
    }
}
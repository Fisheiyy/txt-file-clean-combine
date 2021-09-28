const prompt = require('prompt-sync')()
const exit = require('exit')
const sizeof = require('file-bytes')
const fs = require('fs-extra')


function wait(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

if (sizeof.sync("config.json") == 0) {
    console.log("config.json is corrupted, rewriting default config settings...")
    var config_args = {
        "experimental-cleaning": "false",
        "experimental-asked": "false",
        "debug": "false",
        "to-remove": ""
    }
    fs.writeFileSync(".\\config.json", JSON.stringify(config_args, null, 4))
    wait(250)
    console.log("config.json has been rewritten, please restart this program")
    exit()
}

const config = require('.\\config.json')
const debug = config['debug']

if (debug == "true") {
    var debug_on = prompt("debug mode is on, would you like to turn it off? ")
    if (debug_on == "yes") {
        console.log("debug has been disabled")
        require('child_process').execSync('node config_setter --debug=false', {stdio: 'inherit'})
    }
    if (debug_on == "no") {
        console.log("debug will stay enabled")
    }
}

if (config['experimental-asked'] == "false") {
    var exp_clean = prompt("do you want to try experimental cleaning? ")
    if (exp_clean == "yes") {
        require('child_process').execSync('node config_setter --clean=true --asked=true', {stdio: 'inherit'})
    }
    if (exp_clean == "no") {
        console.log("as you wish")
        require('child_process').execSync('node config_setter --clean=false --asked=true', {stdio: 'inherit'})
    }
    if (exp_clean == "debug") {
        console.log("debug enabled, this enables cleaning also")
        require('child_process').execSync('node config_setter --clean=true --asked=true --debug=true', {stdio: 'inherit'})
    }  
}

if (config['experimental-cleaning'] == "true") {
    var clean_combine = prompt("are you cleaning or combining files, or both? ")
    var clean_combine = clean_combine.toLowerCase()
    if (clean_combine == "cleaning") {
        // var set_clean = prompt("please enter what you want to clean from files ")
        var set_clean = prompt("how many lines do you want to remove from the start of the files? ")
        require('child_process').execSync('node config_setter --clean=true --asked=true --remove=' + set_clean, {stdio: 'inherit'})
        wait(500)
        require('child_process').execSync('node cleaner', {stdio: 'inherit'})
        wait(1500)
        exit()
    }
    if (clean_combine == "both") {
        // var set_clean = prompt("please enter what you want to clean from files ")
        var set_clean = prompt("how many lines do you want to remove from the start of the files? ")
        require('child_process').execSync('node config_setter --clean=true --asked=true --remove=' + set_clean, {stdio: 'inherit'})
        wait(500)
        require('child_process').execSync('node cleaner', {stdio: 'inherit'})
        wait(1500)
        require('child_process').execSync('node combiner', {stdio: 'inherit'})
        wait(1500)
        exit()
    }
    if (clean_combine == "combining") {
        require('child_process').execSync('node combiner', {stdio: 'inherit'})
        wait(1500)
        exit()
    }
    if (clean_combine == "reset") {
        console.log("resetting config")
        require('child_process').execSync('node config_setter --reset=true', {stdio: 'inherit'})
        
    }
    if (clean_combine == "debug") {
        console.log("debug has been enabled")
        require('child_process').execSync('node config_setter --debug=true', {stdio: 'inherit'})
    }
}
else {
    var combine = prompt("do you want to combine files? ")
    if (combine == "yes") {
        require('child_process').execSync('node combiner', {stdio: 'inherit'})
        exit()
    }
    if (combine == "no") {
        console.log("as you wish")
        exit()
    }
    if (combine == "reset") {
        console.log("resetting config")
        require('child_process').execSync('node config_setter --reset=true', {stdio: 'inherit'})
        exit()
    }
    if (combine == "debug") {
        console.log("debug enabled, this enables cleaning also")
        require('child_process').execSync('node config_setter --clean=true --asked=true --debug=true', {stdio: 'inherit'})
        exit()
    }
}
const prompt = require('prompt-sync')()
const exit = require('exit')
const config = require('.\\config.json')
const debug = config['debug']
const fs = require('fs-extra')


function wait(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms)
    })
}
// if (debug == "true") {console.log()}
if (debug == "true") {
    var debug_on = prompt("debug mode is on, would you like to turn it off? ")
    if (debug_on == "yes") {
        console.log("debug has been disabled")
        require('child_process').execSync('node config_setter.js --debug=false', {stdio: 'inherit'})
    }
    if (debug_on == "no") {
        console.log("debug will stay enabled")
    }
}

if (config['experimental-asked'] == "false") {
    var exp_clean = prompt("do you want to try experimental cleaning? ")
    if (exp_clean == "yes") {
        require('child_process').execSync('node config_setter.js --clean=true --asked=true', {stdio: 'inherit'})
    }
    if (exp_clean == "no") {
        console.log("as you wish")
        require('child_process').execSync('node config_setter.js --clean=false --asked=true', {stdio: 'inherit'})
    }
    if (exp_clean == "debug") {
        console.log("debug enabled, this enables cleaning also")
        require('child_process').execSync('node config_setter.js --clean=true --asked=true --debug=true', {stdio: 'inherit'})
    }  
}

if (config['experimental-cleaning'] == "true") {
    var clean_combine = prompt("are you cleaning or combining files, or both? ")
    var clean_combine = clean_combine.toLowerCase()
    if (clean_combine == "cleaning") {
        var set_clean = prompt("please enter what you want to clean from files ")
        require('child_process').execSync('node config_setter.js --clean=true --asked=true --remove=' + set_clean, {stdio: 'inherit'})
        wait(650)
        console.log("cleaning")
        require('child_process').execSync('node cleaner.js', {stdio: 'inherit'})
        wait(1500)
        exit
    }
if (clean_combine == "both") {
    var set_clean = prompt("please enter what you want to clean from files ")
    require('child_process').execSync('node config_setter.js --clean=true --asked=true --remove=' + set_clean, {stdio: 'inherit'})
     
    wait(650)
    console.log("cleaning")
    require('child_process').execSync('node cleaner.js', {stdio: 'inherit'})
    wait(1500)
    console.log("combining")
    require('child_process').execSync('node combiner.js', {stdio: 'inherit'})
    wait(3500)
    exit
}
if (clean_combine == "combining") {
    console.log("combining")
    require('child_process').execSync('node combiner.js', {stdio: 'inherit'})
    wait(3500)
    exit
}
if (clean_combine == "reset") {
    console.log("resetting config")
    require('child_process').execSync('node config_setter.js --reset=true', {stdio: 'inherit'})
     
}
if (clean_combine == "debug") {
    console.log("debug has been enabled")
    require('child_process').execSync('node config_setter.js --debug=true', {stdio: 'inherit'})
}
}
else {
    var combine = prompt("do you want to combine files? ")
    if (combine == "yes") {
        console.log("combining")
        require('child_process').execSync('node combiner.js', {stdio: 'inherit'})
        exit
    }
    if (combine == "no") {
        console.log("as you wish, my lord")
        exit
    }
    if (combine == "reset") {
        console.log("resetting config")
        require('child_process').execSync('node config_setter.js --reset=true', {stdio: 'inherit'})
        exit
    }
    if (combine == "debug") {
        console.log("debug enabled, this enables cleaning also")
        require('child_process').execSync('node config_setter.js --clean=true --asked=true --debug=true', {stdio: 'inherit'})
        exit
    }
}
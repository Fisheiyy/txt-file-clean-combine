const prompt = require('prompt-sync')()
const exit = require('exit');
const fs = require('fs-extra');
const config = require('.\\config.json')
const config_json  = __dirname + "\\config.json"


function wait(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

if (config['experimental-asked'] == "false") {
    var exp_clean = prompt("do you want to try experimental cleaning? ")
    if (exp_clean == "yes") {
        var set = require('child_process').exec('node config_setter.js --clean=true --asked=true')
        set.stdout.pipe(process.stdout)
    }
    if (config['experimental-asked'] == "true") {
        var set = require('child_process').exec('node config_setter.js --clean=false --asked=true')
        set.stdout.pipe(process.stdout)
    }
}

if (config['experimental-cleaning'] == "true") {
    var clean_combine = prompt("are you cleaning or combining files, or both? ")
    var clean_combine = clean_combine.toLowerCase()
    if (clean_combine == "cleaning") {
        var set_clean = prompt("please enter what you want to clean from files ")
        var set = require('child_process').exec('node config_setter.js --clean=true --asked=true --remove=' + set_clean)
        set.stdout.pipe(process.stdout)
        wait(650)
        console.log("cleaning")
        var clean = require('child_process').exec('node cleaner.js')
        wait(1500)
        clean.stdout.pipe(process.stdout)
        exit
    }
if (clean_combine == "both") {
    var set_clean = prompt("please enter what you want to clean from files ")
    var obj = {
        "experimental-cleaning": "true",
        "experimental-asked": "true",
        "to-remove": set_clean
    }
    var stringified = JSON.stringify(obj, null, 4)
    fs.writeFile(config_json, stringified, (err) => {
        if (err) {console.log("error", err)}
    })
    wait(650)
    console.log("cleaning")
    var clean = require('child_process').exec('node cleaner.js')
    clean.stdout.pipe(process.stdout)
    console.log("combining")
    var combine = require('child_process').exec('node combiner.js')
    combine.stdout.pipe(process.stdout)
    wait(3500)
    exit
}
if (clean_combine == "combining") {
    console.log("combining")
    var combine = require('child_process').exec('node combiner.js')
    combine.stdout.pipe(process.stdout)
    wait(3500)
    exit
}
}
else {
    var combine = prompt("do you want to combine files? ")
    if (combine == "yes") {
        console.log("combining")
        var combine = require('child_process').exec('node combiner.js')
        combine.stdout.pipe(process.stdout)
        wait(3500)
        exit
    }
}
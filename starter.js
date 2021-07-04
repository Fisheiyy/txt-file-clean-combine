const prompt = require('prompt-sync')()
const exit = require('exit');
const config = require('.\\config.json')
const debug = config['debug']


function wait(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
// if (debug == "true") {console.log()}
if (debug == "true") {
    var debug_on = prompt("debug mode is on, would you like to turn it off? ")
    if (debug_on == "yes") {
        console.log("debug has been disabled")
        var set = require('child_process').exec('node config_setter.js --debug=false')
        set.stdout.pipe(process.stdout)
    }
    if (debug_on == "no") {
        console.log("debug shall stay enabled")
    }
}
else {
    console.log("invalid answer")
}

if (config['experimental-asked'] == "false") {
    var exp_clean = prompt("do you want to try experimental cleaning? ")
    if (exp_clean == "yes") {
        var set = require('child_process').exec('node config_setter.js --clean=true --asked=true')
        set.stdout.pipe(process.stdout)
    }
    if (exp_clean == "no") {
        var set = require('child_process').exec('node config_setter.js --clean=false --asked=true')
        set.stdout.pipe(process.stdout)
    }
    if (exp_clean == "debug") {
        console.log("debug has been enabled")
        var set = require('child_process').exec('node config_setter.js --debug=true')
        set.stdout.pipe(process.stdout)
    }
    else {console.log("invalid answer")}
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
    var set = require('child_process').exec('node config_setter.js --clean=true --asked=true --remove=' + set_clean)
    set.stdout.pipe(process.stdout)
    wait(650)
    console.log("cleaning")
    var clean = require('child_process').exec('node cleaner.js')
    wait(1500)
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
if (clean_combine == "reset") {
    console.log("resetting config")
    var set = require('child_process').exec('node config_setter.js --clean=false --asked=false --remove=""')
    set.stdout.pipe(process.stdout)
}
if (combine == "debug") {
    console.log("debug has been enabled")
    var set = require('child_process').exec('node config_setter.js --debug=true')
    set.stdout.pipe(process.stdout)
}
else {console.log("invalid answer")}
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
    if (combine == "no") {
        console.log("okay")
        wait(500)
        exit
    }
    if (combine == "reset") {
        console.log("resetting config")
        var set = require('child_process').exec('node config_setter.js --clean=false --asked=false')
        set.stdout.pipe(process.stdout)
    }
    if (combine == "debug") {
        console.log("debug has been enabled")
        var set = require('child_process').exec('node config_setter.js --debug=true')
        set.stdout.pipe(process.stdout)
    }
    else {console.log("invalid answer")}
}
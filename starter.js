const prompt = require('prompt-sync')()
const exit = require('exit')


function wait(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
var clean_combine = prompt("are you cleaning or combining files, or both? ")
var clean_combine = clean_combine.toLowerCase()
if (clean_combine == "cleaning") {
    console.log("cleaning")
    var clean = require('child_process').exec('node cleaner.js')
    wait(1500)
    clean.stdout.pipe(process.stdout);
    exit
}
if (clean_combine == "both") {
    console.log("cleaning")
    var clean = require('child_process').exec('node cleaner.js')
    clean.stdout.pipe(process.stdout);
    console.log("combining")
    var combine = require('child_process').exec('node combiner.js')
    combine.stdout.pipe(process.stdout);
    wait(3500)
    exit
}
if (clean_combine == "combining") {
    console.log("combining")
    var combine = require('child_process').exec('node combiner.js')
    combine.stdout.pipe(process.stdout);
    wait(3500)
    exit
}
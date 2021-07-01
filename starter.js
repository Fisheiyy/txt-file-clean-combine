const prompt = require('prompt-sync')()
const exit = require('exit')
const wait = require('wait')
var loop = 0


while (loop == 1) {
    var clean_combine = prompt("are you cleaning or combining files, or both? ")
    var clean_combine = clean_combine.toLowerCase
    if (clean_combine == "cleaning") {
        console.log("starting cleaner")
        require('child_process').exec('node cleaner.js')
        wait(7500)
        console.log("ending process")
        exit
    }
    if (clean_combine == "both") {
        console.log("starting cleaner")
        require('child_process').exec('node cleaner.js')
        console.log("waiting to start combiner")
        wait(30000)
        console.log("starting combiner")
        require('child_process').exec('node combiner.js')
        wait(7500)
        console.log("ending process")
        exit
    }
    if (clean_combine == "combining") {
        console.log("starting combiner")
        require('child_process').exec('node combiner.js')
        wait(7500)
        console.log("ending process")
        exit
    }
    else {console.log("error invalid syntax")}
}
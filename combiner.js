const fs = require('fs-extra')
const wait = require('wait')
const exit = require('exit')
const dir = __dirname + '\\to combine\\'
const combined = __dirname + '\\COMBINED.txt'


fs.ensureFile(combined, (err) => {
    if (err) {console.log("error", err)}
    fs.writeFile(combined, '', (err) => {
        if (err) {console.log("error", err)}
        console.log("cleared COMBINED.txt")
        wait(2500)
        fs.readdir(dir, (err, files) => {
            if (err) {console.log("error", err)}
            if (files.length < 2) {console.log("not enough files found"), exit}
            else {console.log("discovering files")}
            wait(1250)
            files.forEach(files => {
                console.log("reading contents of " + files)
                var file = dir + files
                wait(1000)
                fs.readFile(file, 'utf8', (err, data) => {
                    if (err) {console.log("error", err)}
                    console.log("contents of " + file + " has been read")
                    wait(1000)
                    fs.appendFile(combined, data, (err) => {
                        if (err) {console.log("error", err)}
                        console.log("contents of " + file + " has been combined")
                    })
                })
            })
        })
    })
})
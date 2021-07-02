const fs = require('fs-extra')
const exit = require('exit')
const dir = __dirname + '\\to clean or combine\\'
const combined = __dirname + '\\COMBINED.txt'


function wait(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

fs.readdir(dir, (err, files) => {
    if (err) {console.log("error", err)}
    if (files.length < 2) {console.log("not enough files found, 2 files required at least"), exit}
    else {console.log("discovering files")}
    wait(750)
    fs.ensureFile(combined, (err) => {
        if (err) {console.log("error", err)}
        fs.writeFile(combined, '', (err) => {
            if (err) {console.log("error", err)}
            console.log("cleared and ensured COMBINED.txt")
            files.forEach(files => {
                console.log("reading contents of " + files)
                var file = dir + files
                wait(750)
                fs.readFile(file, 'utf8', (err, data) => {
                    if (err) {console.log("error", err)}
                    console.log("contents of " + file + " has been read")
                    wait(750)
                    fs.appendFile(combined, data, (err) => {
                        if (err) {console.log("error", err)}
                        console.log("contents of " + file + " has been combined")
                    })
                })
            })
        })
    })
})
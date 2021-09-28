const neek = require('neek')
const fs = require('fs-extra')
const sizeof = require('file-bytes')
const dir = __dirname + '\\to clean or combine\\'
const config = require(".\\config.json")
const humanize = require('pretty-bytes')
// const removewords = require('@stdlib/string-remove-words')
const striplines = require('strip-lines')
const exit = require('exit')


function wait(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

// if (config['to-remove'] == "") {console.log("please give a valid string of words to remove"), exit()}
if (config['to-remove'] == "") {console.log("please give a valid number of lines to remove"), exit()}
fs.ensureDir(dir, (err) => {
    if (err) {console.log("error", err)}
    console.log("ensured .\\to clean or combine")
    fs.readdir(dir, (err, files) => {
        if (err) {console.log("error", err)}
        if (files.length < 1) {
            console.log("not enough files found, 1 file required at least")
            exit()
        }
        else {
            console.log("discovering files")
            wait(500)
            files.forEach(files => {
                var size = sizeof(dir + files)
                if (size > 536870000) {
                    humanized_size = humanize(size)
                    console.log("file is too large, " + humanized_size + " out of 536.87MB Maximum")
                    return
                }
                // NOTE FILE MAX SIZE IS 536.870888MB OR 0x1fffffe8 BYTES
                // THIS WILL STAY UNTIL I DECIDE TO CREATE READ STREAMS
                // AND WRITE STREAMS FOR THE FILES
                var file = dir + files
                fs.readFile(file, 'utf8', (err, data) => {
                    if (err) {console.log("error", err)}
                    neek.unique(file, file, (unique) => {
                        if (unique.total == unique.unique) {
                            wait(350)
                            console.log(files + " has no duplicates to remove")
                        }
                        else {
                            wait(350)
                            console.log(files + " file has " + unique.unique + " unique lines out of " + unique.total)
                        }
                        // var cleaned_ofwords = removewords(data, [config['to-remove']], true)
                        var cleaned_ofwords = striplines(data, config['to-remove'])
                        fs.writeFile(file, cleaned_ofwords, (err) => {
                            if (err) {console.log("error", err)}
                            exit()
                        })
                    })
                })
            })
        }
    })
})
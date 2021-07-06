const neek = require('neek')
const fs = require('fs-extra')
const dir = __dirname + '\\to clean or combine\\'
const config = require(".\\config.json")
const sizeof = require("file-sizeof")
const removewords = require('@stdlib/string-remove-words')
const debug = config['debug']
const lc = require('letter-count')
const exit = require('exit')


function wait(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms)
    })
}
// if (debug == "true") {console.log()}
if (config['to-remove'] == "") {console.log("please give a valid string of words to remove"), exit}
fs.ensureDir(dir, (err) => {
    if (err) {console.log("error", err)}
    console.log("ensured " + dir)
    fs.readdir(dir, (err, files) => {
        if (err) {console.log("error", err)}
        console.log("discovering files")
        wait(500)
        files.forEach(files => {
            var size = sizeof.SI(".\\" + files)
            if (size.MB > 536.87) {
                console.log("file is too large")
                return
            }
            // NOTE FILE MAX SIZE IS 536.870888MB OR 0x1fffffe8 BYTES
            // THIS WILL STAY UNTIL I DECIDE TO CREATE READ STREAMS
            // AND WRITE STREAMS FOR THE FILES
            var file = dir + files
            fs.readFile(file, 'utf8', (err, data) => {
                if (err) {console.log("error", err)}
                neek.unique(file, file, (unique) => {
                    console.log(unique + "lines found")
                    all_lines = lc.count('-ln', data)
                    if (all_lines[lines] == unique) {
                        console.log("no new duplicates found and removed")
                    }
                    else {
                        console.log("found " + unique + " unique lines out of " + all_lines[lines])
                    }
                    var cleaned_ofwords = removewords(data, [config['to-remove']], true)
                    console.log(file + " has been cleaned of " + config['to-remove'])
                    fs.writeFile(file, cleaned_ofwords, (err) => {
                        if (err) {console.log("error", err)}
                        exit
                    })
                })
            })
        })
    })
})
const neek = require('neek')
const fs = require('fs-extra')
const dir = __dirname + '\\to clean or combine\\'
const remove = require(".\\config.json")
const sizeof = require("file-sizeof")
const removewords = require('@stdlib/string-remove-words')
const debug = config['debug']


function wait(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms)
    })
}
// if (debug == "true") {console.log()}
fs.ensureDir(dir, (err) => {
    if (err) {console.log("error", err)}
    console.log("ensured " + dir)
    fs.readdir(dir, (err, files) => {
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
                var included = data.includes(remove['to-remove'])
                if (included == true) {
                    // TODO ADD TO NEEK DUPE REMOVE
                    // TODO CHANGE TO STRING-REMOVE-WORDS
                    fs.writeFile(file, stripped, (err) => {
                        if (err) {console.log("error", err)}
                        console.log("file cleaned")
                    })
                }
                else {console.log("file does not need cleaning")}
            })
        })
    })
})
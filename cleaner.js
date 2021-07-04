const neek = require('neek')
const fs = require('fs-extra')
const dir = __dirname + '\\to clean or combine\\'
const remove = require(".\\config.json")
const filesize = require('file-size');
const removewords = require('@stdlib/string-remove-words');
const debug = config['debug']


function wait(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
// if (debug == "true") {console.log()}
fs.ensureDir(dir, (err) => {
    if (err) {console.log("error", err)}
    console.log("ensured " + dir)
    fs.readdir(dir, (err, files) => {
        console.log("discovering files")
        wait(500)
        // TODO ADD FILESIZE CHECK
        files.forEach(files => {
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
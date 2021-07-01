const strip = require('strip-lines')
const fs = require('fs-extra')
const dir = __dirname + '\\to clean\\'
const equals = "========================================================"


fs.readdir(dir, (err, files) => {
    console.log("discovering files")
    files.forEach(files => {
        var file = dir + files
        fs.readFile(file, 'utf8', (err, data) => {
            if (err) {console.log("error", err)}
            var included = data.includes(equals)
            if (included == true) {
                var stripped = strip(data, 8)
                fs.writeFile(file, stripped, (err) => {
                    if (err) {console.log("error", err)}
                    console.log("file cleaned")
                })
            }
            else {console.log("file does not need cleaning")}
        })
    })
})
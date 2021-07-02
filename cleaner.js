const neek = require('neek')
const fs = require('fs-extra')
const dir = __dirname + '\\to clean or combine\\'
const remove = require(".\\config.json")


function wait(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

fs.ensureDir(dir, (err) => {
    if (err) {console.log("error", err)}
    console.log("ensured " + dir)
    fs.readdir(dir, (err, files) => {
        console.log("discovering files")
        wait(500)
        files.forEach(files => {
            var file = dir + files
            fs.readFile(file, 'utf8', (err, data) => {
                if (err) {console.log("error", err)}
                var included = data.includes(remove['to-remove'])
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
})
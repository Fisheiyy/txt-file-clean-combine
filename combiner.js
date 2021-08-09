const fs = require('fs-extra')
const exit = require('exit')
const dir = __dirname + '\\to clean or combine\\'
const combined = __dirname + '\\COMBINED.txt'
const sizeof = require('file-bytes')
const humanize = require('pretty-bytes')


function wait(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

fs.readdir(dir, (err, files) => {
    if (err) {console.log("error", err)}
    if (files.length < 2) {
        console.log("not enough files, 2 files required")
        exit
    }
    else {
    console.log("discovering files")
    wait(350)
    fs.ensureFile(combined, (err) => {
        if (err) {console.log("error", err)}
        fs.writeFile(combined, '', (err) => {
            if (err) {console.log("error", err)}
            wait(200)
            console.log("cleared/ensured COMBINED.txt")
            files.forEach(files => {
                var size = sizeof.sync(dir + files)
                if (size > 536870000) {
                    humanized_size = humanize(size)
                    console.log("file is too large, " + humanized_size + " /536.87MB Maximum")
                    return
                }
                // MAX FILE SIZE IS 536.870888MB OR 0x1fffffe8 BYTES
                // THIS WILL STAY UNTIL I DECIDE TO CREATE READ STREAMS
                // AND WRITE STREAMS FOR THE FILES
                console.log("reading " + files)
                var file = dir + files
                wait(250)
                fs.readFile(file, 'utf8', (err, data) => {
                    if (err) {console.log("error", err)}
                    console.log(files + " was read")
                    wait(250)
                    fs.appendFile(combined, data, (err) => {
                        if (err) {console.log("error", err)}
                        wait(250)
                        console.log(files + " was combined")
                    })
                })
            })
        })
    })
    }
})
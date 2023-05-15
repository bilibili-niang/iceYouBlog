const markdownFile = require('../schema/markdownFile');
markdownFile.findAll({}, function (err, result) {
    if (err) {
        console.log("err:")
        console.log(err)
    } else {
        console.log("result:")
        console.log(result)
    }
})

const markdownFile = require("../schema/markdownFile");

async function run(ids, attr = ['id', 'title', 'createdAt', 'description', 'tag1', 'tag2', 'tag3']) {
    await markdownFile.findAll({
        attributes: attr,
        where: {
            id: ids,
        },
        paranoid: false,
        raw: true
    })

        .then(res => {
            console.log("res:")
            console.log(res)
        })
        .catch(e => {
            console.log("e:")
            console.log(e)
        })
}

// run([171, 199, 200])
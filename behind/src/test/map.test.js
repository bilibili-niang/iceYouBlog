let list = [{
    id: 1,
    name: 'zs'
},
    {
        id: 2,
        name: 'asfuad'
    }, {
        id: 3,
        name: 'ls'
    }
]
list.map(item => {
    item.grade = '大四'
})
console.log("list:")
console.log(list)
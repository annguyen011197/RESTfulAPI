function test(value) {
    return new Promise((res, rej) => {
        if (value > 10) rej("ngu")
        res("hong ngu")
    })
}

function test1(value) {
    return test(value).then("hoi hoi ngu")
}

test1(20).then((value) => {
    console.log(value)
}).catch((msg) => {
    console.log(msg)
})

// test(5).then((value) => {
//     console.log(value)
// }).catch((msg) => {
//     console.log(msg)
// })

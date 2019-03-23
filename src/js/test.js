// function a() {
//     return new Promise(function(resolve, reject) {
//         // let n = 100000000;
//         // while (n > 0) {
//         //     n = n / 2;
//         // }
//         setTimeout(function(){ resolve("a")}, 3000);
//         // resolve(n);
//     })
// }
//
// a().then(function() {console.log("ready")}).catch(function() {console.log("some error")});
// console.log("wow");


// async function b() {
//     let res = "_";
//     return (new Promise(function (resolve, reject)
//     {
//         setTimeout(function() { res = "b"; resolve(res)}, 3000)
//     }).then(function(result) {return result}));
// }
//
// (async function () {
//     let result = await b();
//     console.log(result);
// })();
//
// console.log("wow");


// async function b() {
//     let res = "_";
//     res = await (async function () {return new Promise((resolve, reject) => {
//         setTimeout(function () {
//                 res = "b";
//                 resolve(res);
//             }, 3000);
//         })})();
//     return res;
// }
//
// (async function () {
//     let result = await b();
//     console.log(result);
// })();
//
// console.log("wow");

cleanText = '<br>"some text"<br>'.replace(/<\/?[^>]+(>|$)/g, "");
console.log(cleanText);
console.log('first')
console.log('second')
console.log('third')
setTimeout(() => {
    console.log('Call Back Queue');
}, 0);
Promise.resolve().then(()=>{
    console.log('Micro Task Queue');
})
console.log('fourth')
console.log('fifth')


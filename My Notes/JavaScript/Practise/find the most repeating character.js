var str = 'abcoefoxyzzopp'
var o = {}
for(let i = 0; i<str.length; i++){
    let char = str.charAt(i)
    if(o[char]){
        o[char]++
    }
    else{
        o[char] = 1
    }
}

let max = 0
for(let k in o){
    if(o[k] > max)
    max = o[k]
}
console.log(max)
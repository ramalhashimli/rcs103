let arr=[3,8,2,5,4,10,7,6]

let a = prompt('Bir rəqəm daxil et:');
if (a in arr){
    console.log(`${a} ədədi arrayın içindədir.`)
}
else {
    console.log(`${a} ədədi arrayın içində deyil.`)
}
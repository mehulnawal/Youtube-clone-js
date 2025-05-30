// sum of 1-10 using recursion 
let sum = 0;
function f1(end) {

    if (end == 1) {
        return 1;
    }
    else {
        return end + f1(end--);
    }
}
console.log(f1(10));

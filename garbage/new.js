// two varibales = sum 
// 7 + 9 = 16

let arr = [1, 4, 7, 3, 9, 41, 2];
let ans = 5;


// two pointer
function f1(arr, ans) {
    let count = 0;
    let start = 0;
    let end = arr.length - 1;

    arr.sort((a, b) => a - b)

    while (start < end) {
        if (arr[start] + arr[end] == ans) {
            count++;
        }

        if (arr[start] + arr[end] > ans) {
            end--;
        }
        else {
            start++;
        }
    };

    return count;
};

console.log(f1(arr, ans));
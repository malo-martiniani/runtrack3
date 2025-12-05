function fizzbuzz () {
    let number = 1;
    while (number <= 151){
        if (number % 3 === 0 && number % 5 === 0){
            console.log("Fizzbuzz");
            number++;
        }
        else if (number % 3 === 0) {
            console.log("Fizz");
            number++;
        }
        else if (number % 5 ===0) {
            console.log("Buzz");
            number++;
        }
        else {
            console.log(number);
            number++;
        }
    }
}
fizzbuzz();
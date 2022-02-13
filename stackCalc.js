const stack = ["3", "2", "5", "*", "+"];
const operator_level = {
    "+": 0,
    "-": 0,
    "*": 1,
    "/": 1,
    "%": 1,
    "(": 0,
    ")": 0
};

function eval(string){
    let stack = toS(string);
    return calc(stack);
}

function calc(stack){
    const stack_num = [];
    stack.forEach(i => {
        if(i === "*" || i === "/" || i === "+" || i === "-" || i === "%"){
            let num1 = parseFloat(stack_num.pop());
            let num2 = parseFloat(stack_num.pop());
            switch(i){
                case "*":
                    stack_num.push(num2 * num1);
                    break;
                case "/":
                    stack_num.push(num2 / num1);
                    break;
                case "%":
                    stack_num.push(num2 % num1);
                    break;
                case "+":
                    stack_num.push(num2 + num1);
                    break;
                case "-":
                    stack_num.push(num2 - num1);
                    break;
            }
        }
        else
            stack_num.push(i);
    });
    return stack_num[0];
}

function toS(string){
    string = string.replaceAll(" ", "");
    
    let stack = [];
    let stack_token = [];
    let num = "";

    for(let i = 0; i < string.length; i++){

        if(string[i] === "*" || string[i] === "/" || string[i] === "+" || string[i] === "-" || string[i] === "%" || string[i] === "(" || string[i] === ")"){
            if(num !== ""){
                stack.push(num);
                num = "";
            }

            if(operator_level[stack_token[stack_token.length -1]] > operator_level[string[i]] && string[i] !== "(" || string[i] === ")"){
                let length = stack_token.length;
                for(let i = 0; i < length; i++){
                    let token = stack_token.pop();
                    if(token === "(")
                        break;
                    stack.push(token);
                }
            }

            if(string[i] !== ")")
                stack_token.push(string[i]);
        }

        else{
            num += string[i];
        }
    }

    if(num !== ""){
        stack.push(num);
        num = "";
    }

    let length = stack_token.length;
    for(let i = 0; i < length; i++){
        let token = stack_token.pop();
        if(token === "(")
            break;
        stack.push(token);
    }


    return stack;
}

console.log(eval("(3 + (1 + 3 * 2) * 2) * (2 + 1)"));


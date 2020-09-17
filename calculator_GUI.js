// JS calculator
//도전과제: 우선순위 반영하고 괄호를 처리할 수 있게

//input object
// 입력을 담당하는 객체
var input = {'array':[]};
    //input.array= [];
    //입력받은 수식을 문자열로 리턴
    input.getInput = function() { 
        return this.array.join(""); 
    };
    // 입력 배열을 초기화
    input.removeAll = function(value) {
        this.array = [];
        this.array.push(value);
    };
    // 수식이 비었는지 검사
    input.empty = function() {
        return this.array.length == 0;
    };
    //첫번째 수식에서 값을 읽어옴
    input.getValue = function() {
        var str = this.array.shift();
        var n = Number(str);
        return n;
    };
    //계산을 실행하기 전 준비단계
    //getValue()를 호춣하기 전 반드시 수행되어야 함
    input.prepareCalculate = function() {
        this.array = this.array.join("").split(" ");
    }
    //수식에서 연산자를 읽어옴
     input.getOperator = function(){
        var op = this.array.shift();
        if (op === '+' || op === "-" || op == "*" || op == "/"){
            return op;
            }else {
                return "$";
            }
                              
    };

// output 객체
// 출력을 담당
var output = {};
    output.text = document.getElementById('output');
    //계산결과를 출력
    output.print = function(str){
    this.text.innerHTML = str;
    };
    //수식을 출력
    output.display = function() {
        this.text.innerHTML = input.getInput();
    };

//calculator 객체
//계산을 담당
var calculator = {};
    calculator.calculate = function(first, second, op) {
     var ret;
        switch(op){
            case "+":
                ret = first + second;
                break;
            case "-":
                ret = first - second;
                break;
            case "*":
                ret = first * second;
                break; 
            case "/":
                ret = first / second;
                break; 
            default:
                return NaN;
        }
        return ret;
};


// 숫자버튼의 이벤트 핸들러
var clickNumbers = function(event) {
    var str = event.target.innerHTML;
    console.log(str);

    if (str == 'D'){
        input.array.pop();
    } else if (str == '+' || str == '-' || str == '*' || str == '/'){
        input.array.push(' ' + str + ' ');
    } else {
        input.array.push(str);
    }
    
    // switch (str) {
        //     case 'D':
    //         input.array.pop();
    //     break;
    //     case '+':
    //     case '-':
    //     case '*':
    //     case '/':
    //         input.array.push(' '+ str + ' ');
    //     break;
    //     default:
    //         input.array.push(str);
    
    if(input.empty()){
        output.text.innerHTML = "Empty";
    } else {
        output.display();
    }
}
// '=' 버튼의 핸들러 함수
var showResult = function(event){
        input.prepareCalculate();
        var result = input.getValue();
        console.log("show"+result);
        while(!input.empty()) {
            var op = input.getOperator();
            var second = input.getValue();
            result = calculator.calculate(result, second, op);
            console.log("show2"+op, second, result);
        }
        output.print(result);
        input.removeAll(result);


}
    









// <!-- function print()-->

// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Document</title>
// </head>


// <body>
//     <h2>calculator</h2>

//     <input type = "text" id = "input"><br>
//     <button onclick = "calc()">확인</button>

//     <div id = "output"> your results here </div>
//     <script>






//     </script>

// </body>
// </html>       
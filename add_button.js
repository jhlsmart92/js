var readInput = function() {
    var input = document.getElementById('input1'); //input1 아이디 가진 요소 불러와 input에 저장
    console.log(input.value); // input 값 출력
};

var btn2 = document.createElement('button'); // 버튼 속성의 요소 생성
btn2.innerHTML = "button2"; //버튼 글자
btn2.onclick =  readInput; // 클릭시 시행하는 행동
var test = document.getElementById('test');
//test.appendChild(document.createElement('br'));
test.appendChild(btn2);

var btn3 = document.createElement('button'); // 버튼 속성의 요소 생성
btn3.innerHTML = "button3"; //버튼 글자
btn3.onclick =  readInput; // 클릭시 시행하는 행동
var test = document.getElementById('test'); // test id 받아옴
test.appendChild(document.createElement('br')); // 받아온 test id에 br 태그 추가
test.appendChild(btn3); // btn3 추가
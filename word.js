//html element
var word1 = document.getElementById('word1'); // answer. word1의 id를 가진 요소를 word1 변수에 할당
var word2 = document.getElementById('word2'); // 버튼들. word2라는 id를 가진 요소를 word2 변수에 할당
var check = document.getElementById('check'); //word1 == word2의 확인여부.  word3의 id를 가진 요소를 word3 변수에 할당

var progress = document.getElementById('progress') // progress check
var time = document.getElementById('time'); //진행 시간체크


// game 객체 
var game = {
    btns: [], // 버튼을 넣을 배열
    maxplay: 3, // 최대 플레이 횟수
    current: 0 // 정답맞힌 횟수
};
game.startTime = Date.now(); // 게임객체 만든후 바로 스타트시간 기록

game.words = 'apple,linux,javascript,tutorial,codesquad,baby,girlfriend'.split(',');
//, 기준으로 문자열을 쪼개어 배열로 저장

//choose 1 words from words;
game.choose = function () {
    var idx = Math.floor(Math.random() * this.words.length); // words 배열의 길이 이하의 랜덤 한 숫자를 idx에 저장
    this.answer = this.words[idx]; // idx번째 문자열을 answer에 할당
    this.letters = this.answer.split(''); //answer를 쪼개어 letters 배열에 에 할당
    word1.innerHTML = this.answer; // answer 문자열을 word1 id 의 innerHTML에 표시
};


//문자로 이루어진 버튼 생성(answer 변수 기반)
game.addButtons = function () {
    for (var i = 0; i < this.letters.length; i++) { // 문자열 길이만큼 반복
        var btn = document.createElement('button'); // btn 버튼을 만듬
        btn.innerHTML = this.letters[i]; // 버튼의 innerHTML에 문자를 하나씩 대입
        word2.appendChild(btn); // word2 div에 하나씩 버튼을 추가해줌.
        this.btns.push(btn); // game.btns 배열에 버튼을 뒤에서 하나씩 넣음.(버튼들로 이루어진 배열)
    }
};

game.removeButtons = function() {
    for (var i = 0; i < this.btns.length; i++){
        word2.removeChild(this.btns[i]); // 기존에 있던 버튼 없앰(없애지 않으면 기존버튼 뒤에 새 버튼 추가됨)
        console.log(word2)
        console.log(game.btns); 
    }
    this.btns = []; // 새로운 버튼 배열 생성 (주석처리 하면 버튼 키 안먹히고 셔플 안됨)
    console.log(game.btns);
}

// game.letters의 문자열을 버튼에 할당
game.copyBtnText = function () { // 바뀐 배열을 버튼의 innerHTML에 넣어주는 함수
    for (var i = 0; i < this.letters.length; i++) { //배열의 길이만큼 반복
        this.btns[i].innerHTML = this.letters[i]; // btns 버튼 내용에 word배열의 문자들을 할당
    }
}

//letters와 answer이 동일한지 확인하여 결과 내보냄
game.updateDisplay = function () {
    if (this.checkGood()) { //answer와 gameStr 문자가 동일한지 확인
        check.innerHTML = '일치합니다.';
    } else {
        check.innerHTML = '일치하지 않습니다.';
    }
};
//letters와 answer이 동일한지 확인
game.checkGood = function() {
    return this.answer === this.letters.join(''); // 원래 문자열 answer과 swap, rshift, lshift로 바뀐 문자열인 letters 비교
};

game.swap = function() {
    console.log('swap');
    var temp = [];
    while (game.letters.length != 0) {
        var s = game.letters.pop();
        temp.push(s);
    }

    game.letters = temp;
    game.copyBtnText(); // game.letters의 문자열을 버튼에 할당
    game.updateDisplay(); //letters와 answer이 동일한지 확인하여 결과 내보냄
};

game.rshift = function() {
    console.log('rshift');
    var s = game.letters.pop(); //뒤에서 빼기
    game.letters.unshift(s); // 앞에서 추가
    game.copyBtnText(); // game.letters의 문자열을 버튼에 할당
    game.updateDisplay(); //letters와 answer이 동일한지 확인하여 결과 내보냄
};

game.lshift = function() {
    console.log('lshift');
    var s = game.letters.shift(); // 앞에서 빼기
    game.letters.push(s); // 뒤에서 추가
    game.copyBtnText(); // game.word의 문자열을 버튼에 할당
    game.updateDisplay(); //game.word 와 answer 이 동일한지 확인하여 결과 내보냄
};

//문자열 섞어주는 함수
game.shuffle = function () {
    var toggle = Math.floor(Math.random() * 2) == 0; //50%의 확률 생성
    if (toggle) {
        game.swap(); //50%의 확률 중 1일경우 뒤집음
    }
    var rmax = Math.max(game.answer.length -2,1); //
    var n = Math.floor(Math.random() * rmax) + 1; //1에서 length미만의 숫자를 랜덤으로 생성
    for (var i = 0; i < n; i++) { // 생성된 랜덤n 만큼 반복
        game.rshift(); // 생성된 랜덤n 만큼 rshift 실행
    }
};

//실행함수
game.init = function () {
    this.choose(); //문자열 선택
    this.addButtons(); //버튼추가
    this.shuffle(); // 섞어줌
    this.updateDisplay(); //일치하는지 확인
};
game.init();

//game의 로직으로서의 swap


game.progress = function(){
    if(this.checkGood()) { // 일치하는 경우
        this.current ++; // current 1더함
        this.removeButtons(); // 버튼제거
        this.init();
        var str = ""; 
        for (var i = 0; i < this.current; i++) {
            str +="O";
        }
        progress.innerHTML = str; 
    }
    if(this.current == this.maxplay) { // current 가 3됐을 때 
        var sec = Date.now() - game.startTime/1000;
        alert("Good! Thank you for playing! " + sec + "second");
        clearInterval(x);
    }

};

//event handler for buttons
//버튼을 눌렀을 때의 swap
var swap = function () {
    game.swap();
    game.progress()
};
//버튼을 눌렀을 때의 rshift
var rshift = function () {
    game.rshift();
    game.progress()
};
//버튼을 눌렀을 때의 lshift
var lshift = function () {
    game.lshift();
    game.progress()
};

game.shuffle();

var updateTime = function() {
    var now = Date.now() - game.startTime;
    time.innerHTML = (now/1000) + " s";   
}

var x = setInterval(updateTime, 50);
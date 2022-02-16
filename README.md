# node-woojin
node-woojin은 난해한 프로그래밍 언어로, 한글 키워드를 통하여 간단한 프로그램을 만들 수 있습니다

본 프로젝트는 엄랭을 보고 영감을 받아 시작된 프로젝트입니다.

# 문법
모든 node-woojin 코드는 `나는 신우진이다`로 시작하여, `저는 이만..`으로 끝나야 합니다. 이를 지키지 않을 경우, 스크립트를 실행할수 없습니다.

## 자료형
현재 구현된 자료형에는, `논리 자료형`과 `숫자 자료형`이 있습니다.

### 숫자 자료형
`:`과 `;`으로 숫자를 표현할수 있습니다. `:`는 +1을, `;`는 -1을 의미합니다.
```js
:::: => +4
;;;; => -4
:;:; => 0
```

### 논리 자료형
`uglyguri`와 `beautifulguri`로 논리 자료형을 표현할수 있습니다.<br>

`uglyguri` => guri는 현실에서 **못생겼으므로**, `true` 값을 가집니다.<br>
`beautifulguri` => guri는 현실에서 못생겼으므로, 예쁘다는 말은 거짓이 됩니다. 따라서 `false` 값을 가집니다.
```js
uglyguri => true
beautifulguri => false
```

## 변수

### 선언하기
`시`와 `인` 사이에 있는 `이`의 개수만큼, 인덱스가 정해집니다. 또한, 선언 후 바로 뒤에 오는 자료형을 변수에 대입합니다. 아무것도 없으면 0이 됩니다<br>
```js
시인 => 인덱스가 0인 변수 선언
시이인;;; => 인덱스가 1, 값이 +3인 변수 선언
시이이인uglyguri => 인덱스가 2, 값이 true인 변수 선언
```

### 가져오기
`우`의 개수를 세어, 해당하는 인덱스의 변수를 가져옵니다. 다만 해당하는 변수가 없을 경우, 에러가 반환됩니다.
```js
우 => 인덱스가 1인 변수 가져오기
우우우우우우우우우 => 이런 인덱스의 변수는 선언하지 않았기에, SyantaxError 발생
```
눈치 채신것처럼 인덱스가 0인 변수는 못가져오도록 프로그래밍 되어있습니다. (시인 키워드로 변수가 선언되는게 마음에 안들었습니다(?))

## 콘솔
### 출력
`진`과 `!` 사이에 변수를 넣어 콘솔에 표시할수 있습니다
```js
진우우! => 아까 선언한 true가 값인 변수가 콘솔에 표시됩니다.
```

## eval
자바스크립트의 각주인 `//`를 node-woojin에서 사용하지 마세요. `//` 뒤에 오는 문자열은 eval로 처리됩니다.
```js
// throw new Error("퍼킹 크레이지")
```
위 문법은 자바스크립트 이발로 다음과 같이 처리됩니다.
```js
throw new Error("퍼킹 크레이지")
```
못알아듣겠다면 한번 실행해 보세요

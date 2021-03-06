# node-woojin

node-woojin은 난해한 프로그래밍 언어로, 한글 키워드를 통하여 간단한 프로그램을 만들 수 있습니다

본 프로젝트는 엄랭을 보고 영감을 받아 시작된 프로젝트입니다.

node.js 환경에서는 다음 예시처럼 프로그램을 실행할수 있습니다. (코드) 부분에 node-woojin 코드를 넣어서 실행해 주세요.

```js
node_woojin = require("./dist/index");

node_woojin(`나는 신우진이다

(코드)

저는 이만..`);
```

# 문법

모든 node-woojin 코드는 `나는 신우진이다`로 시작하여, `저는 이만..`으로 끝나야 합니다. 이를 지키지 않을 경우, 스크립트를 실행할수 없습니다.

## 자료형

### 숫자 자료형

`:`과 `;`으로 숫자를 표현할수 있습니다. `:`는 +1을, `;`는 -1을 의미합니다.

```js
:::: => +4
;;;; => -4
:;:; => 0
```

### 문자열

`"`(큰따옴표)로 문자열을 표현할수 있습니다.

```js
"나는천재" => "나는천재" 라는 문자열이 됩니다.
```

문자열은 두개 이상을 중복해서 사용하면 첫번째 문자열을 모든 문자열은 무시됩니다.

```js
"나""는""천""재" => "나"
```

### 배열

`[]` 안에 요소를 넣어 배열을 표시할수 있습니다. 다중 배열도 포함할수 있습니다

```js
[;;;,::,"나는천재"] => [-4, 2, "나는천재"]
[:::,;;,::::,:,[::,;;,"나는천재"]] => [3,-2,4,1,[2,-2,"나는천재"]]
```

무조건 두개 이상의 요소를 사용하여야 합니다

### 논리 자료형

`uglyguri`와 `beautifulguri`로 논리 자료형을 표현할수 있습니다.<br>

`uglyguri` => guri는 현실에서 **못생겼으므로**, `true` 값을 가집니다.<br>
`beautifulguri` => guri는 현실에서 못생겼으므로, 예쁘다는 말은 거짓이 됩니다. 따라서 `false` 값을 가집니다.

```tsc
uglyguri => true;
beautifulguri => false;
```

## 변수

### 선언하기

### 이름없는 변수

`시`와 `인` 사이에 있는 `이`의 개수만큼, 인덱스가 정해집니다. 또한, 선언 후 바로 뒤에 오는 자료형을 변수에 대입합니다. 아무것도 없으면 0이 됩니다<br>

```js
시인 => 인덱스가 0인 변수 선언
시이인;;; => 인덱스가 1, 값이 +3인 변수 선언
시이이인uglyguri => 인덱스가 2, 값이 true인 변수 선언
```

### 이름있는 변수

`변수명:=대입값` 형식으로 변수를 선언할수 있습니다.

```js
우진 := "신우진"
```

### 가져오기

### 이름없는 변수

`우`의 개수를 세어, 해당하는 인덱스의 변수를 가져옵니다. 다만 해당하는 변수가 없을 경우, 에러가 반환됩니다.

```js
우 => 인덱스가 1인 변수 가져오기
우우우우우우우우우 => 이런 인덱스의 변수는 선언하지 않았기에, SyantaxError 발생
```

눈치 채신것처럼 인덱스가 0인 변수는 못가져오도록 프로그래밍 되어있습니다. (시인 키워드로 변수가 선언되는게 마음에 안들었습니다(?))

### 이름있는 변수

변수명을 그냥 쓰면 됩니다. 없는 변수를 가져오려 시도하면 에러가 발생합니다

```js
우진 => "신우진"
천재 => 이 변수는 선언하지 않았기에, SyantaxError 발생
```

## 콘솔

### 출력

`진`과 `!` 사이에 변수를 넣어 콘솔에 표시할수 있습니다

```js
진우우! => 아까 선언한 true가 값인 변수가 콘솔에 표시됩니다.
진우진! => 아까 선언한 우진 변수의 값인 "신우진"이 출력됩니다.
진[::,:::,;;,;;;]! => SyantaxError: 출력할수 없는 타입입니다.
```

`array` 타입은 출력할수 없습니다.

## 조건문

`만약(조건)이라면(실행할문자)` 형식으로 조건문을 실행할수 있습니다. 또한, 조건에는 숫자나, 논리 자료형을 대입할수 있습니다. 다음 예시를 참고해보세요

```js
만약uglyguri이라면진:::! => uglyguri는 true 이므로, 콘솔에 +3 이 출력됩니다.
```

## eval

자바스크립트의 각주인 `//`를 node-woojin에서 사용하지 마세요. `//` 뒤에 오는 문자열은 eval로 처리됩니다.

```js
// throw new Error("퍼킹 크레이지")
```

위 문법은 자바스크립트 이발로 다음과 같이 처리됩니다.

```js
throw new Error("퍼킹 크레이지");
```

못알아듣겠다면 한번 실행해 보세요

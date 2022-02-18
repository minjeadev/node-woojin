# node-woojin

한국인이신가요? 한국어 설명서를 보시려면 [여기를](https://github.com/minjeadev/node-woojin/blob/main/KO-README.md) 눌러 주세요!

This project is a esoteric programming language, and you can create a simple program through Korean keywords. (This project was inspired by [umjunsik-lang](https://github.com/rycont/umjunsik-lang/) and started. )

In the node.js environment, you can run the program as in the following example. Please insert the node-woojin code in the (code) part.

```js
node_woojin = require("node-woojin");

node_woojin(`나는 신우진이다

(code)

저는 이만..`);
```

# Grammer

All node-woojin codes must start with `나는 신우진이다` and end with `저는 이만..`. If you don't comply with this, you can't run the script.

## Data Type

### Number

We can express numbers with `:` and `;`. `:` stands for +1, and `;` stands for -1.

```js
:::: => +4
;;;; => -4
:;:; => 0
```

### String

You can express a character string with `"` (double quotation marks).

```js
"woojin" => string "woojin".
```

If two or more strings are used in duplicate, the entire string will be ignored except first.

```js
"나""는""천""재" => "나"
```

You can declare an arrangement by putting elements inside `[]`. You can also put an array in the array.

```js
[;;;,::] => [-4, 2]
[:::,;;,::::,:,[::,;;]] => [3,-2,4,1,[2,-2]]
```

At least two elements must be used unconditionally. If there is one element, or less, return an error.

### Boolean

You can express boolean with `uglyguri` and `beautifulguri`. (Guri is the younger brother of the developer.)<br>

`uglyguri` => Since guri is ugly in reality, it has a true value.<br>
`beautifulguri` => Since Guri is ugly in reality, the word pretty becomes false. Therefore, it has a false value.

```tsc
uglyguri => true;
beautifulguri => false;
```

## Variables

### Declare

### Non-name Variables

The index is determined by the length of `이` between `시` and `인`. In addition, the data type immediately after the declaration is substituted into the variable. If there's nothing, it's 0.

```js
시인 => Declare a variable with index 0
시이인;;; => Declare a variable with index 1 and value +3.
시이이인uglyguri => Declare a variable with index 2 and value true
```

### named Variables

Variables can be declared in the form of `variable name := value`.

```js
우진 := "woojin"
```

### Import

### Non-name Variables

Count the number of `우` to get the variable whose index is the number of `우`. However, if there is no corresponding variable, the error will be returned.

```js
우 => Get a variable with an index of 1
우우우우우우우우우 => Since variables with these indexes have not been declared, SyntaxError occurs.
```

As you noticed, it is programmed so that variables with index of 0 cannot be imported.

### named Variables

You can just write the variable name you declared. If you try to get a variable that doesn't exist, an error occurs.

```js
우진 => "woojin"
node_woojin => Since this variable has not been declared, SyantaxError occurred.
```

## Console

### Print

You can put a variable or data type between `진` and `!` and display it on the console.

```js
진우우! => The console displays a variable with the value is true declared earlier.
진우진! => The console displays a variable with the value is "woojin" declared earlier.
```

You can't print out `array` type.

## Conditional statements

You can execute conditional statements in the form of `만약(conditional)이라면(the grammar to be executed if the condition is true)`. Also, you can substitute numbers or boolean data types for conditions. Please refer to the next example.

```js
만약uglyguri이라면진:::! => uglyguri is a true So, +3 is output to the console.
```

## eval

Do not use the footnote of JavaScript, '//', in node-woojin, The string following a `//` is treated as eval.

```js
// throw new Error("wow You Can Really Dance.")
```

The above grammar is treated as follows with JavaScript eval.

```js
throw new Error("wow You Can Really Dance.");
```

If you don't understand, try it.

# JavaScriptUglifier

> This tool replaces all the English characters and numbers with punctuations. Like its name, uglifier, it makes codes ugly.

## How it works

It leverages [type coercion](https://developer.mozilla.org/en-US/docs/Glossary/Type_coercion) in JavaScript to implement the replacement of characters and numbers. Use character `a` for example:

First, if we execute `[]` in JavaScript, we get `[]`, obviously:
```
> []
[]
```

Second, we prepend previous `[]` with a exclamation mark `!` :
```
> ![]
false
```
> This is the first type coercion, **it coerces an array object into boolean type**.

Third, we append previous `![]` with a plus `+` and a pair of double quote `""` :
```
> ![]+""
'false'
```
> This is the second type coercion, **it coerces a boolean value into string type**.

Finally, we wrap previous `![]+""` with parentheses `()` and append it with `[1]` :
```
> (![]+"")[1]
'a'
```
**Hooray! 🥳 &nbsp;We get character `a` successfully! 🎉**

For other characters/numbers, you can see [here](https://github.com/ex860/JavaScriptUglifier/blob/main/src/jsUglifier.js).

Enjoy this tool and the world of type coercion in JavaScript 😃

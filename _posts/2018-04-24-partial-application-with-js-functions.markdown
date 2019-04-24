---
layout: post
title:  "Partial application in JavaScript"
date:   2018-04-24 20:06:00 +0200
categories: development
tags: javascript partialapplication
---

Partial application of functions means running a function, but with less parameters than it was defined before.
The result is a new function, which accepts the remaining parameters. The concept exists in various functional
programming languages, so I've wondered if there is a way of doing that in JavaScript.

The idea is as follows: 

```javascript
let fun = (a, x, y) => a * (x+y);
fun(4); // This would return a function fun' = (x, y) => 4 * (x+y)
```

The concept itself is not implemented in JavaScript, so the code above does not work like that out of the box.
But I have thought about how one could realize this concept, and the basic idea of partial application can
actually be implemented in a single line of code.

```javascript
const starve = (f, ...args) => args.length >= f.length ? f(...args) 
  : (...rest) => starve(f, ...args, ...rest);
```

Now, instead of directly running a function *f*, one can run the function *starve* with the function *f* as 
first parameters and all or a subset of the required parameters of *f* as following parameters.

```javascript
let fun = (a, x, y) => a * (x+y);

starve(fun, 1, 2, 3);
starve(fun)(1)(2, 3);
starve(fun)(1)(2)(3);
```

Of the three executions of *starve* above, all result the value 5. In the first line, all parameters are 
passed, the function is executed immediately and it returns the result directly. In the second line, only
the function is passed at first, then the first parameter (a) is passed, resulting in a function which requires
two more parameters, which are then passed in the next application. After this third application, the result, again 5,
is returned. In the last execution, the function is first modified by *starve*, and then all parameters are passed
in seperate applications.

Why *starve*? The concept is called "Unterversorgung" in german, which translates to *shortage* or *lack of nourishment*.
So I've called it *starve*.
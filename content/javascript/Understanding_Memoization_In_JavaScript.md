---
title: Understanding Memoization In JavaScript
date: "2020-05-22"
description: "A deep dive into memoization in JavaScript, the principles surrounding it and practical applications."
permalink: "memoization-in-javascript"
author: worldclassdev
---

As our applications grow and begin to carry out heavier computations, there comes an increasing **need for speed ( 🏎️** **)** and optimization becomes a necessity. When we ignore this concern, we end up with programs that take a lot of time and consume a monstrous chunk of system resources during execution.

**Memoization** is an optimization technique that speeds up applications by storing the results of expensive function calls and returning the cached result when the same inputs occur again.

If this doesn’t make much sense to you yet, that’s okay. This article provides an in-depth explanation of why memoization is necessary, what it is, how it can be implemented and when it should be used.

## What is memoization?

> **Memoization** is an optimization technique that speeds up applications by storing the results of expensive function calls and returning the cached result when the same inputs occur again.

Same definition again? 🙈 Let’s break it down this time.

It is clear to us at this point that the aim of memoization is to reduce the time taken and amount of resources consumed in the execution of “expensive function calls”.

**What is an expensive function call?**
Don’t get confused, we aren’t spending money here. In the context of computer programs, the two major resources we have are time and memory. Thus, an expensive function call is a function call that **consumes huge chunks of these two resources** during execution due to heavy computation.

However, as with money, we need to be economical. For this, memoization uses caching to store the results of our function calls for quick and easy access at a later time.

> **A cache** is simply a temporary data store that holds data so that future requests for that data can be served faster.

Thus, when an **expensive function** has been called once, the result is stored in a cache such that whenever the function is called again within our application, the result would be returned very quickly from the cache without redoing any calculations.

## Why is memoization important?

Here is a practical example that shows the importance of memoization:

Imagine you were reading a new novel with a pretty attractive cover at the park. Each time a person passes by, they are drawn by the cover, so they ask for the name of the book and its author. The first time the question is asked, you turn the cover and read out the title and the name of the author. Now more and more people keep stopping by and asking the same question. You’re a very nice person 🙂 , so you answer them all.

> Would you turn the cover and read out the title and author’s name to each one of them, or would you begin to provide the response from memory? Which saves you more time?

Notice the similarity? With memoization, when a function is provided an input, it does the required computation and stores the result to cache before returning the value. If this same input is ever received in the future, it wouldn't have to do it over and over again. It would simply provide the answer from cache(memory).

**Pretty simple, right? Now you want to know how it works? Let’s see!**

## How does memoization work?

The concept of memoization in JavaScript is built majorly on two concepts. They are:

- Closures
- Higher Order Functions(returning functions from functions)

**Closures**

> A closure is the combination of a function and the lexical environment within which that function was declared.

Not quite clear? I think so too.

To gain a clearer understanding, let us quickly examine the concept of lexical scope in JavaScript. Lexical scope simply refers to the physical location of variables and blocks as specified by the programmer while writing code.

Take a look at this very popular code snippet adapted from Kyle Simpson’s book; ”You Don’t Know JS”:

```javascript
function foo(a) {
  var b = a + 2
  function bar(c) {
    console.log(a, b, c)
  }
  bar(b * 2)
}

foo(3) // 3, 5, 10
```

From this code snippet we can identify three scopes:

- a global scope(which contains `foo` as the only identifier)
- a `foo` scope which has identifiers `a`, `b` and `bar`
- a `bar` scope which contains the identifier `c`

Looking carefully at the code above, we notice that the function `bar` has access to the variable `a` and `b` by virtue of the fact that it is nested inside of `foo`. Notice that we successfully store the function `bar` along with its environment. Thus, we say that `bar` has a closure over the scope of `foo`.

You may understand this in the context of hereditary, in that an individual will have access to and exhibit inherited traits even outside of their immediate environment. This logic highlights another factor about closures, which leads into our second main concept.

**Returning functions from functions**

> Functions that operate on other functions, either by taking them as arguments or by returning them, are called **higher-order functions\*\***.\*\*

Closures allow us to invoke an inner function outside its enclosing function while maintaining access to the enclosing function’s lexical scope(i.e identifiers in its enclosing function).

Let’s make a little adjustment to the code in our previous example to explain this.

    function foo(){
      var a = 2;

      function bar() {
        console.log(a);
      }
      return bar;
    }
    var baz = foo();
    baz();//2

**Ahaaa!!! Interesting, don’t you think?**

Notice how the function `foo` returns another function `bar`. Observe that we execute the function `foo` and assign the returned value to `baz`. In this case however, we have a return function. Thus, `baz` now holds a reference to the `bar` function defined inside of `foo`.

What’s most interesting about this is that when we execute the function `baz` outside the lexical scope of `foo` we still get the value of `a` i.e `2` logged to our console. How is this possible? 😕

Remember that ‘bar’ would always have access to variables in `foo`(inherited traits) even if it is executed outside of `foo`'s scope (is far away from home).

Now let’s see how memoization utilizes these concept using some more code samples. 💪🏾

## Case Study: The Fibonacci Sequence

**What is the Fibonacci sequence?**

> The Fibonacci sequence is a set of numbers that starts with a one or a zero, followed by a one, and proceeds based on the rule that each number (called a Fibonacci number) is equal to the sum of the preceding two numbers. E.g

    0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, …

OR

    1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, …

**The Challenge: Write a function to return the** `**nth**` **element in the Fibonacci sequence, where the sequence is:**

    [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, …]

Knowing that each value is a sum of the previous two, a recursive solution to this problem will be:

    function fibonacci(n) {
        if (n <= 1) {
            return 1
        }
        return fibonacci(n - 1) + fibonacci(n - 2);
    }

Concise and accurate indeed! But, there’s a problem. Notice that in consistently reducing the size of the problem(value of `n` ) until the terminating case is reached, a lot more work is done and time consumed to arrive at our solution because there is a repetitive evaluation of certain values in the sequence. Looking at the diagram below, when we try to evaluate `fib(5)`, we notice that we repeatedly try to find the Fibonacci number at indices `0`, `1`, `2` and `3` on different branches. This is known as **redundant computation** and is exactly what **memoization stands to eliminate**.

![(Diagram from Stephen Grider’s “The Coding Interview Bootcamp“ course on Udemy.com)](https://www.dropbox.com/temp_thumb_from_token/s/sw32jvy17dtxfuf?preserve_transparency=False&size=750x200&size_mode=4)

Now let’s fix this with memoization.

    function fibonacci(n,memo) {
        memo = memo || {}
        if (memo[n]) {
            return memo[n]
        }
        if (n <= 1) {
            return 1
        }
        return memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo)
    }

In the code snippet above, we adjust the function to accept an optional parameter known as `memo`. We use the `memo` object as a **cache** to store the Fibonacci numbers with their respective indices as key to be retrieved whenever they are required later in the course of execution.

    memo = memo || {}

Here, we check if `memo` was received as an argument when the function was called. If it was, we initialize it for use, but if it wasn't, we set it to an empty object.

    if (memo[n]) {
            return memo[n]
        }

Next, we check if there's a cached value for the current key `n` and we return its value if there is.

As in the solution before, we specify a terminating case for when `n` is less than or equal to `1`.

At the end we recursively call the function with a smaller value of `n`, while passing in the cached values(`memo`) into each function, for use during computation. This ensures that when the value has been evaluated before and cached, we do not perform such expensive computation a second time. We simply retrieve the value from cache `memo`.

Notice that we add the final result to the cache before returning it.

Wheeew!!! Let’s celebrate the good work so far! 🙂

![](http://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif)

Lets see how much better we’ve made things!

**Testing performance with JSPerf**
Follow [this link to the performance test on JSPerf](https://jsperf.com/scotch-memoization-test). There, we run a test to evaluate the time it’d take to execute `fibonacci(20)` using both methods. See the results below:

![](https://d2mxuefqeaa7sj.cloudfront.net/s_663C19FBEBF5C40174705FFED0DE5FBF14BF1F3E2DE251F46C6FC51CD989D79A_1548732327687_image.png)

😲 Wow!!! This is super impressive. The memoized fibonacci function is the fastest as expected. However, by how much is quite astonishing. It executes **126,762 ops/sec** which is far greater than the purely recursive solution which executes 1,751 **ops/sec** and is approximately **99%** slower.

> Note: “`ops/sec`" stands for operations per second. That is how many times a test is projected to execute in a second.

Now we’ve seen just how much memoization can impact the performance of our applications on a functional level. Does this mean that for every expensive function within our application, we would have to create a variation that is modified to maintain an internal cache?

No. Recall that we learnt that by returning functions from functions, we cause them to inherit the scope of their parent function even when executed outside? This makes it possible to transfer certain features and properties(traits) from the enclosing function to the function that is returned.

Let’s apply this to memoization as we write our own memoizer function.

## A Functional Approach

In the code snippet below, we create a higher order function called `memoizer`. With this function, we will be able to easily apply memoization to any function.

    function memoizer(fun){
        let cache = {}
        return function (n){
            if (cache[n]) {
              return cache[n]
            } else {
              let result = fun(n)
              cache[n] = result
              return result
            }
        }
    }

Above, we simply create a new function called `memoizer` which accepts the function `fun` to be memoized as a parameter. Within the function we create a `cache` object for storing the results of our function executions for future use.

From the `memoizer` function, we return a new function which can access the `cache` no matter where it is executed due to the principle of closure as discussed above.

Within the returned function, we use an `if..else` statement to check if there is already a cached value for the specified key(parameter) `n`. If there is, we retrieve it and return it. If there isn’t, we calculate the `result` using the function to be memoized `fun` . Afterwards, we add the `result` to the `cache` using the appropriate key `n` , so that it may be accessed from there on future occasions. At the end, we return the calculated `result`.

Pretty smooth!

To apply the memoizer function to the recursive fibonacci function initially considered, we call the `memoizer` function passing the function as an argument.

    const fibonacciMemoFunction = memoizer(fibonacciRecursive)

**Testing our memoizer function**
When we compare our memoizer function with the sample case above, here’s the result:

![](https://d2mxuefqeaa7sj.cloudfront.net/s_663C19FBEBF5C40174705FFED0DE5FBF14BF1F3E2DE251F46C6FC51CD989D79A_1548735781269_image.png)

😲 😲 😲 No way!!!! Our memoizer function produced the fastest solution with **42,982,762 ops/sec.** The previous solutions considered are 100% slower.

How's that for optimization!

As regards memoization, we have now considered the **what, why and how.** Now let's take a look at the **when**.

## When to memoize a function

Of course Memorization is amazing and you may now be tempted to memoize all your functions. That could turn out very unproductive. Here's three cases in which memoization would be beneficial:

- For **expensive function calls** i.e functions that carry out **heavy computations.**
- For functions with a limited and highly recurring input range such that cached values don't just sit there and do nothing.
- For recursive functions with recurring input values.
- For pure functions i.e functions that return the same output each time they are called with a particular input.

All done! You get it now don't you?

## Memoization Libraries

Here are some libraries that provide memoization functionality.

- [Lodash](https://lodash.com/docs/#memoize)
- [Memoizer](https://www.npmjs.com/package/memoizer)
- [Fastmemoize](https://www.npmjs.com/package/fast-memoize)
- [Moize](https://www.npmjs.com/package/moize)
- [Reselect for Redux](https://github.com/reduxjs/reselect)

## Conclusion

With memoization, we are able to prevent our function from calling functions that re-calculate the same results over and over again. It’s now time for you to put this knowledge to work.

You may go forth and memoize your entire codebase! 😅 (Just kidding)

## Further Reading

To learn more about the techniques and concepts discussed in this article, you may use the following links:

- [Memoization](https://en.wikipedia.org/wiki/Memoization)
- [Understanding the Underlying Processes of JavaScript’s Closures and Scope Chain](https://scotch.io/tutorials/understanding-the-underlying-processes-of-javascripts-closures-and-scope-chain#toc-closures)
- [Higher Order Functions](http://eloquentjavascript.net/05_higher_order.html#h_xxCc98lOBK)
- [Implementing Memoization in JavaScript](https://www.sitepoint.com/implementing-memoization-in-javascript/)

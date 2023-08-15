---
title: "Why 0.1+0.2 !== 0.3 in JavaScript?"
seoTitle: "Why 0.1+0.2 = 0.30000000000000004? Why 0.1+0.2 !== 0.3 in JavaScript?"
seoDescription: "Why 0.1+0.2 = 0.30000000000000004? Why 0.1+0.2 !== 0.3 in JavaScript? This article/blog clearly explains this behaviour in JS with example, theory, easy"
datePublished: Sun Apr 09 2023 10:01:34 GMT+0000 (Coordinated Universal Time)
cuid: clg98j9i1000709jsa1tugrdi
slug: why-float-doesnt-work-properly-in-js
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1687841827029/6e83f2be-c2b1-4dc4-9d12-8ce7186bbe61.jpeg
tags: javascript, error-handling, binary, floating-point-arithmetic, binary64

---

Is JS incapable of solving these simple math problems? 🧐

### Understanding the problem

All the number systems like decimal, binary, hexadecimal etc. have some limitations or edge cases. E.g.: The number of 3's after the decimal point in 1/3 is more than the number of atoms in the observable universe. When you divide 1 by 3, you'll always end up with 1 as the remainder. The no. of 3's in the quotient just keeps increasing, and we say that it is impossible to represent 1/3 exactly in decimal number system. We always use the approximate value of 1/3 in decimal number system.

Similarly, it is impossible to exactly represent 1/10 in binary system. 1/10 in binary number system is 0.0001100110011001100110011... (with the 0011 repeating infinitely).

### What happens in JS?

JavaScript uses IEEE 754 standard i.e., "Double-precision floating-point" also known as binary64 for its mathematical calculations, where it considers all decimal numbers as 64-bit binary floating numbers. In this, 1 bit is used for Sign bit, 11 bits for exponent and 53 bits (52 explicitly stored) for Significand precision.

When the code is interpreted, all the numbers are converted to closest floating point numbers with rounding off errors in some cases. When any mathematical operations are done on these interpreted numbers, the result may not be as expected.

As per our initial question, 0.1 can be closely represented by the following binary64 number:

```plaintext
0.00011001100110011001100110011001100110011001100110011010
```

and 0.2 can be closely represented in binary64 format by:

```plaintext
0.00110011001100110011001100110011001100110011001100110100
```

The real number sum of these two numbers is:

```plaintext
0.01001100110011001100110011001100110011001100110011001110
```

This number has 54 significant digits (56 digits are shown above, but leading 0 is for alignment and trailing 0 has no significance to the value). But binary64 can only store 53 digits for the significand value, so this number cannot be represented in binary64 format.

> This number is exactly between two binary64 representable numbers:
> 
> ```plaintext
> 0.01001100110011001100110011001100110011001100110011001100
> ```
> 
> and,
> 
> ```plaintext
> 0.01001100110011001100110011001100110011001100110011010000
> ```

In case of a tie, the number with an even digit in the lowest position is chosen.

> Therefore, our final answer in binary64 format is:
> 
> ```plaintext
> 0.01001100110011001100110011001100110011001100110011010000
> ```
> 
> and in the decimal number system, it is:
> 
> ```plaintext
> 0.3000000000000000444089209850062616169452667236328125
> ```

So, 0.1 + 0.2 = 0.3000000000000000444089209850062616169452667236328125. Let's call this value 'A'.

> But 0.3 is represented closely in binary64 format by:
> 
> ```plaintext
> 0.010011001100110011001100110011001100110011001100110011
> ```
> 
> which, in decimal number system, is:
> 
> ```plaintext
> 0.299999999999999988897769753748434595763683319091796875
> ```
> 
> Let's call this value 'B'.

Since, A !== B, 0.1+0.2 !== 0.3 returns true. Also, if you do 0.1 + 0.2, you will get 0.30000000000000004, which is the rounded-off value for 0.3000000000000000444089209850062616169452667236328125.

### Conclusion

It is the because of binary64 format, which is used by JavaScript internally, just like many other programming languages, that we get to see this behaviour working with numbers.

We should be careful when our program has complex calculations involving very large or very small, or combination of both numbers. The program should take into account of rounding off, truncation and precision of calculations required.

### References

* [Double-precision floating-point format](https://en.wikipedia.org/wiki/Double-precision_floating-point_format#JavaScript)
    
* [Floating point guide](https://floating-point-gui.de/)
    
* [stack overflow 1](https://stackoverflow.com/questions/588004/is-floating-point-math-broken), [stack overflow 2](https://stackoverflow.com/questions/63412727/0-1-is-an-approximation-but-why-not-round-up-behind-the-scenes-as-well-when-we)
    
* [explore binary](https://www.exploringbinary.com/why-0-point-1-does-not-exist-in-floating-point/)
    
* [Very detailed article](https://docs.oracle.com/cd/E19957-01/806-3568/ncg_goldberg.html) (I didn't go through it completely)
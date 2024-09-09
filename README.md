
# Stock Algorithms... an Exploration


<img width="1142" alt="image" src="https://github.com/user-attachments/assets/b02eb091-0ee0-4202-ae1d-fd3bbb43bc3d">


### Overview
This project explores the performance of two different trading algorithms—a perfect foresight algorithm and a simple greedy algorithm—on various stocks and cryptocurrencies over the course of a month.


### Introduction
In my computer systems class, I learned about cache eviction policies, which use simple heuristics to make decisions under uncertainty. This led me to wonder: can similar heuristics apply to stock trading?

I wanted to answer the following questions:

- How much money could you make if you traded Apple stock perfectly, buying every time it was about to rise and selling every time it was about to fall?
- How would a greedy algorithm, which buys on an upward trend and sells on a downward trend at every minute, perform on Apple stock?
- How would these two algorithms compare when applied to different stocks and cryptocurrencies over a month?


### Results:

<img width="1142" alt="image" src="https://github.com/user-attachments/assets/630e3f2e-19cb-4828-a832-3444a21daf0d">

The first interesting takeaway: if you could trade Apple stock perfectly for one day—knowing exactly when to buy and sell—you’d average around 10% returns. But if you applied the same strategy to a more volatile asset like Dogecoin, you'd see returns jump to 35%.

Then, I tried a more realistic approach: a simple greedy algorithm that looks at the trend every minute. This algorithm averaged consistent returns of 4% each day when trading Apple stock and a solid 25% daily return on cryptocurrencies like Dogecoin.

But here’s the catch—the one thing I didn’t account for at first: trading fees. Cryptocurrency platforms typically charge about 0.1% per trade. My algorithm was making trades every minute, which meant around 600 trades a day. Those 0.1% fees added up quickly, eating away at my profits and ultimately causing me to lose money.

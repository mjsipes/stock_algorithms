# Stock Algorithms... an Exploration

### Introduction

<div style="display: flex; justify-content: space-between;">
  <img src="https://github.com/user-attachments/assets/b02eb091-0ee0-4202-ae1d-fd3bbb43bc3d" alt="ScreenRecording2024-08-04at12 03 42PM-ezgif com-crop-2" style="width: 100%;">
  <img src="https://github.com/user-attachments/assets/c97566bd-ff69-44cb-8d20-612819b984ad" alt="image" style="width: 32%;">
</div>

It would be really fun if I had a successful stock trading algorithm. If I could find just one algorithm that looks at a special part of the stock market in a special way that can better predict the future of a stock than the market, I would be rich! I understand that it is not really possible to win in the stockmarket algorithmicly trading. People spend their whole careers doing it. Never the less, I thought it would be interesting to applying simple algorithms to different stocks to see how they perform.


Typically, stocks fluctuate between 1-4 percent in a day, but the intra-day fluctuations can be much larger. This led me to wonder: if you knew the exact price movements of Apple stock for a given day and traded perfectly, what kind of returns could you achieve? To explore this, I wrote a greedy algorithm. At every minute interval, if the stock was set to rise in the next minute and I had cash available, I would buy. Conversely, if the stock was going to decline and I had shares, I would sell.

Of course, in reality, predicting future stock prices accurately is impossible. This got me thinking about alternative strategies. One concept I considered was cache eviction policies, specifically the Least Recently Used (LRU) policy, which is known to be effective for managing caches. I wondered how a simple greedy algorithm, inspired by such policies, would perform in the stock market.

The greedy algorithm I devised examines a day's trading activity. At each minute interval, it checks whether the stock price increased or decreased compared to the previous minute. If the stock price rose and there were funds available, it bought shares. If the stock price fell and there were shares to sell, it sold them.

The caveat: what I did not know about which I had to learn about was trading fees. Every cryptocaurrency trading platform takes about 0.1% trading fees. While i was making money at 1 minute intervals on cryptocurrencies, the algorithms was making about 600 trades a day, at the 0.1% rate, the fees ate away at my profits and I ended up loosing money.

### Results:
<img width="1142" alt="image" src="https://github.com/user-attachments/assets/630e3f2e-19cb-4828-a832-3444a21daf0d">


### Exploration

### Example Output


### Interesting Takeaways
If a genie came to you and said they would give you tomorrows trading stats of any stock/market things you wanted. Pick a cryptocurrency, or something volatile. You will make more money!

### Conclusion
You can not predict the future. I believe this in a practical and also philosophical level. 








<!--
![ScreenRecording2024-08-04at12 03 42PM-ezgif com-crop-2](https://github.com/user-attachments/assets/b02eb091-0ee0-4202-ae1d-fd3bbb43bc3d)
<img width="600" alt="image" src="https://github.com/user-attachments/assets/c97566bd-ff69-44cb-8d20-612819b984ad">
--!>


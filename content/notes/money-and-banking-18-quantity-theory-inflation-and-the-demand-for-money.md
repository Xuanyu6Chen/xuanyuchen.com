---
title: 'Money and Banking (18): Quantity Theory, Inflation, and the Demand for Money'
description: 'From Frederic S. Mishkin, *The Economics of Money, Banking, and Financial Markets* — Chapter 19'
pubDate: 2026-11-27
series:
  id: money-and-banking
  order: 18
draft: false
---
We have already understood the conduct of monetary policy and its role, so let's move on to explore the role of the money supply and monetary policy in determining inflation and total production of goods and services. 

## Quantity Theory of Money 
The quantity theory of money was developed by classical economists and stated most clearly by *Irving Fisher* in the early 1900s. **It is a theory of how nominal income and the price level are determined**. 

### Velocity of Money
The starting point is the **velocity of money**, the average number of times per year that a dollar is spent buying the final goods and services produced in the economy. 

$$V = \frac{P \times Y}{M}$$

where $P$ is the price level, $Y$ is real output (so $P \times Y$ is nominal GDP), and $M$ is the quantity of money (for example, M1 or M2, see [[money-and-banking-2-what-is-money|What Is Money]]).

> [!example]
> Suppose nominal GDP is \$25 trillion and the money supply is \$5 trillion. Then $V = 25 / 5 = 5$: each dollar is spent on final goods and services five times a year on average.

### Equation of Exchange 
Multiplying both sides of the velocity formula by $M$ gives the **equation of exchange**:

$$M \times V = P \times Y$$

### Demand for Money 
Fisher believed **velocity is fairly constant in the short run**, so $V$ can be treated as a constant $\bar{V}$.

Dividing the equation of exchange by $V$ turns it into a statement about **how much money people want to hold**. When the money market is in equilibrium, the money people hold equals the money demanded, $M = M^d$:

$$M^d = \frac{1}{V} \times P \times Y = k \times P \times Y, \qquad k = \frac{1}{V}$$

Since $k$ is a constant, **the demand for money depends only on nominal income** $P \times Y$. 

**Interest rates have no effect on the demand for money** in Fisher's theory. 

### Quantity Theory of Money 
Fisher turned the equation of exchange into a theory by adding a second assumption: **output is at full employment.** 

With velocity fixed, the equation of exchange becomes a theory of nominal income:

$$M \times \bar{V} = P \times Y$$

**The quantity theory of money says nominal income is determined only by movements in the quantity of money**: if $M$ doubles, $P \times Y$ doubles too.

### Quantity Theory and the Price Level 
Because both $\bar{V}$ and $Y$ are constant, solving the equation of exchange for $P$ gives:

$$P = \frac{M \times \bar{V}}{Y}$$

**A change in the quantity of money causes a proportional change in the price level.** 

### Quantity Theory and Inflation 
We can write the equation of exchange in percentage changes: 

$$\%\Delta M + \%\Delta V = \%\Delta P + \%\Delta Y$$

The inflation rate is $\pi = \%\Delta P$, and velocity is constant ($\%\Delta V = 0$), so:

$$\pi = \%\Delta M - \%\Delta Y$$

**The inflation rate equals the growth rate of the money supply minus the growth rate of real output.**

In the long run, the evidence supports the theory. In the short run, it does not hold well, because velocity is not constant in the short run: it moves with interest rates and the business cycle. 

## Budget Deficits and Inflation 
**Budget deficits can be an important source of inflationary monetary policy**. The government, like us, has to pay its bills. Unlike us, who can only raise revenue or go into debt, the government has an additional option: to **create money** and use it to pay. 

Methods of financing government spending are described by the *government budget constraint*, with the following equation: 

$$DEF = G - T = \Delta MB + \Delta B$$

$DEF$ = budget deficit · $G$ = government spending · $T$ = tax revenue · $\Delta MB$ = change in the monetary base · $\Delta B$ = change in government bonds held by the public

So the government can deal with a deficit in three ways: **increase tax revenue** ($T$), **increase bond holdings by the public** ($\Delta B$), or **increase the monetary base** ($\Delta MB$). 

If the government deficit is **financed by an increase in bond holdings by the public**, there is no effect on the monetary base and hence on the money supply. But if the deficit is not financed by increased bond holdings by the public, the **monetary base and the money supply increase**. 

### Monetizing the Debt
In many countries, including the United States, the government does not have the right to issue currency to pay its bills. The government must finance its deficit by first issuing bonds to the public to acquire the extra funds to pay its bills. If these bonds do not end up with the public, the only alternative is that they are purchased by the central bank, which means the central bank **must conduct an open market purchase**, leading to an increase in the monetary base and in the money supply. This method is called *monetizing the debt*, and it is often inaccurately referred to as printing money. 

### Hyperinflation
Financing a persistent deficit by money creation will **lead to a sustained inflation**. 

One example of hyperinflation caused by money creation is Zimbabwe in the 2000s. After output and tax revenue collapsed, the Zimbabwean government could no longer pay its bills with taxes or borrowing, so it had the central bank print money to finance its spending. The money supply grew so fast that prices rose by the day, and by 2009 the Zimbabwean dollar was abandoned for foreign currencies such as the U.S. dollar. 


## Keynesian Theories of Money Demand 
John Maynard Keynes, in his 1936 book *The General Theory of Employment, Interest, and Money*, **abandoned the quantity theory view of constant velocity of money** and developed a theory of money demand that **emphasized the importance of interest rates**.  

His theory, called *liquidity preference theory*, asks why people hold money and finds three motives:

- **Transactions motive**: people hold money to pay for everyday purchases, so this demand rises with income.
- **Precautionary motive**: people hold extra money for unexpected needs, which also rises with income.
- **Speculative motive**: people also hold money as a store of wealth. When interest rates rise, holding bonds pays more, so people hold less money.

Putting the three motives together, the demand for real money balances depends **negatively on interest rates and positively on income**:

$$\frac{M^d}{P} = L(\underset{-}{i}, \underset{+}{Y})$$

$\frac{M^d}{P}$ = demand for real money balances · $i$ = interest rate · $Y$ = real income · $L(i, Y)$ = liquidity preference function

Rearranging gives velocity:

$$V = \frac{P \times Y}{M} = \frac{Y}{L(i, Y)}$$

When interest rates rise, $L(i, Y)$ falls, so **velocity rises**. Because interest rates move a lot, **velocity is not constant**, which is the key difference from the quantity theory.

## Portfolio Theories of Money Demand 
Portfolio theories treat money as **one asset in a portfolio**, alongside bonds, stocks, and other assets. People hold more money when its **return, risk, and liquidity** look better *relative to other assets*. Like Keynes, these theories find that money demand depends on **interest rates and income**, but they add other factors such as **wealth**:

$$\frac{M^d}{P} = f(\underset{-}{i}, \underset{+}{Y}, \underset{+}{W}, \ldots)$$

$W$ = wealth

| Factor ↑ | Money demand | Why |
|---|---|---|
| Interest rates | ↓ | Other assets pay more than money |
| Income | ↑ | More spending needs more money |
| Payment technology | ↓ | Easier to pay without holding money |
| Wealth | ↑ | More wealth to hold in every asset, money included |
| Riskiness of other assets | ↑ | Money looks safer |
| Inflation risk | ↓ | Money loses value when prices rise |
| Liquidity of other assets | ↓ | Other assets become as easy to use as money |

## Summary
This chapter compares the **two most important theories of the demand for money**, and they disagree on one question: **does money demand depend on interest rates?**

| | Quantity Theory (Fisher) | Liquidity Preference (Keynes) |
|---|---|---|
| Money demand | $M^d = k \times P \times Y$ | $\frac{M^d}{P} = L(\underset{-}{i}, \underset{+}{Y})$ |
| Interest rates matter? | **No** | **Yes** |
| Velocity | Constant | Moves with interest rates |
| What money does | Changes in $M$ change $P$ proportionally | The link from $M$ to $P$ is loose in the short run |
| When it works | Long run | Short run |


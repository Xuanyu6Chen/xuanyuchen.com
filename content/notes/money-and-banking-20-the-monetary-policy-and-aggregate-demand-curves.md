---
title: 'Money and Banking (20): The Monetary Policy and Aggregate Demand Curves'
description: 'From Frederic S. Mishkin, *The Economics of Money, Banking, and Financial Markets* — Chapter 21'
pubDate: 2026-11-28
series:
  id: money-and-banking
  order: 20
draft: false
---
In [[money-and-banking-19-the-is-curve|The IS Curve]], we saw that **the real interest rate determines aggregate output** in the goods market. The monetary policy (MP) curve shows how the central bank sets the real interest rate in response to inflation. 

Combining the MP curve with the IS curve, we can derive **the aggregate demand (AD) curve**, which shows the relationship between **inflation and aggregate output**.

## The Federal Reserve
The Fed conducts monetary policy by setting the federal funds rate, which is a *nominal interest rate*. However, as we learned in [[money-and-banking-19-the-is-curve|The IS Curve]], it is the real interest rate that affects net exports and business spending, and so determines the level of equilibrium output. 

$$i_r = i - \pi^e$$

The **real interest rate** is the nominal interest rate adjusted for expected inflation, so it measures **the true cost of borrowing**. In the short run, prices are sticky and expected inflation changes slowly. So when the Fed raises the nominal federal funds rate, **the real interest rate rises by about the same amount**. This is how the Fed controls the real interest rate in the short run.

## The Monetary Policy Curve 
The **monetary policy (MP) curve** shows how the Fed sets the real interest rate in response to inflation:

$$i_r = \bar{i}_r + \lambda \times \pi$$

- $i_r$ = *real interest rate* set by the Fed
- $\bar{i}_r$ = *autonomous component of the real interest rate*, the part the Fed sets regardless of inflation
- $\lambda$ = *how strongly the Fed responds to inflation*: each 1 percentage point rise in inflation raises the real interest rate by $\lambda$ points ($\lambda > 0$)
- $\pi$ = *inflation rate*

Because $\lambda > 0$, **the MP curve slopes upward**: when inflation rises, the Fed raises the real interest rate. To do so, the Fed must raise the nominal rate by more than the rise in inflation, which is the **Taylor principle** (see [[money-and-banking-10-the-conduct-of-monetary-policy#The Taylor Rule|The Taylor Rule]]).

![The MP curve](/images/money-and-banking/mp-the-mp-curve.png)
*The Monetary Policy Curve*

### Shifts in the MP Curve 
When the Fed changes the real interest rate **because inflation changed**, the economy moves **along** the MP curve. When the Fed changes the real interest rate **at every level of inflation**, it changes the autonomous component $\bar{i}_r$, and **the whole MP curve shifts**:

- *Autonomous tightening* ($\bar{i}_r \uparrow$): the Fed raises the real interest rate at every inflation rate, for example to cool an overheating economy. **The MP curve shifts up.**
- *Autonomous easing* ($\bar{i}_r \downarrow$): the Fed lowers the real interest rate at every inflation rate, for example to fight a recession. **The MP curve shifts down.**

## The Aggregate Demand Curve 
With both the IS and MP curves, let's derive the aggregate demand curve. 

The *aggregate demand (AD) curve* shows the relationship between **inflation and aggregate output** when the goods market is in equilibrium. We derive it by linking the two curves:

$$\pi \uparrow \;\xrightarrow{\text{MP}}\; i_r \uparrow \;\xrightarrow{\text{IS}}\; I \downarrow,\ NX \downarrow \;\rightarrow\; Y \downarrow$$

To get the AD curve as a formula, write the IS curve in short form and put the MP curve into it:

$$\text{IS: } Y = A - B \times i_r, \qquad A = \left[\bar{C} + \bar{I} - d \times \bar{f} + \bar{G} + \overline{NX} - mpc \times \bar{T}\right] \times \frac{1}{1 - mpc}, \qquad B = \frac{d + x}{1 - mpc}$$

$$\text{AD: } Y = A - B \times (\bar{i}_r + \lambda \times \pi)$$

> [!example]
> MP: $i_r = 1 + 0.5 \times \pi$ and IS: $Y = 12 - i_r$. Then AD: $Y = 12 - (1 + 0.5 \times \pi) = 11 - 0.5 \times \pi$.
> At $\pi = 2\%$, $i_r = 2\%$ and $Y = 10$ (point A). At $\pi = 4\%$, $i_r = 3\%$ and $Y = 9$ (point B). At $\pi = 6\%$, $i_r = 4\%$ and $Y = 8$ (point C).

![Deriving the AD curve](/images/money-and-banking/ad-deriving-the-ad-curve.png)
*The Aggregate Demand Curve*

### Shifts in the AD Curve 
A change in inflation is a **movement along** the AD curve. Anything that changes output **at every inflation rate** shifts the AD curve. These are the factors that shift the IS curve, plus autonomous monetary policy:

| Factor ↑ | AD curve | Why |
|---|---|---|
| Autonomous monetary policy $\bar{i}_r$ (tightening) | Left | MP shifts up, higher $i_r$ at every $\pi$, so lower $Y$ |
| Government purchases $\bar{G}$ | Right | IS shifts right |
| Taxes $\bar{T}$ | Left | IS shifts left |
| Autonomous consumption $\bar{C}$ | Right | IS shifts right |
| Autonomous investment $\bar{I}$ | Right | IS shifts right |
| Autonomous net exports $\overline{NX}$ | Right | IS shifts right |
| Financial frictions $\bar{f}$ | Left | IS shifts left |

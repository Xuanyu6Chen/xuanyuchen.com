---
title: 'Money and Banking (10): The Conduct of Monetary Policy'
description: 'From Frederic S. Mishkin, *The Economics of Money, Banking, and Financial Markets* — Chapter 16'
pubDate: 2026-10-15
series:
  id: money-and-banking
  order: 10
draft: false
---
Overly expansionary monetary policy leads to high inflation, which decreases the efficiency of the economy. Monetary policy that is too tight can produce serious recessions. 

Since we already know all the tools and mechanics of monetary policy, strategy and tactics are very important. 

## The Price Stability Goal and the Nominal Anchor
**Price stability** is increasingly viewed as the most important goal of monetary policy. 

A central element in successful monetary policy is the use of a **nominal anchor**, a nominal variable that ties down the price level to achieve price stability. A nominal anchor limits the time-inconsistency problem and anchors expectations. 

## Hierarchical Versus Dual Mandates
Many countries have decided that price stability should be the primary, long-run goal for central banks. Mandates that put the **goal of price stability first** are known as **hierarchical mandates**. 

In contrast, the Fed has a **dual mandate**: to achieve **price stability and maximum employment (output stability)**. 

## Inflation Targeting
*Inflation targeting* is a monetary policy strategy in which the central bank publicly announces a numerical target for inflation and commits to price stability as its primary long-run goal.

It has five elements:
1. A **public announcement** of a medium-term **numerical target** (e.g., 2%).
2. An **institutional commitment** to price stability as the **primary long-run goal**.
3. An **information-inclusive** approach: many variables, not just the money supply, are used to set policy.
4. **Increased transparency**: the central bank explains its plans and decisions to the public.
5. **Increased accountability**: the central bank is responsible for hitting the target.

## The Taylor Rule
The **Taylor rule** is a simple formula that gives the federal funds rate target from two numbers: **how far inflation is from its target** and **how far output is from its potential**.

Inflation targeting and the dual mandate say *what* the Fed wants, but not *how high* the rate should be. **The Taylor rule turns both goals into one number**, so the rate rises when inflation or output is too high and falls when they are too low.

$$
i_{ff} = \pi + r^* + \frac{1}{2}(\pi - \pi^*) + \frac{1}{2}\,(\text{output gap})
$$

| Term | Meaning | Formula | Taylor's value |
| --- | --- | --- | --- |
| $i_{ff}$ | Federal funds rate target | | |
| $\pi$ | Inflation rate: % change in the price level over the past year | $\frac{P_t - P_{t-1}}{P_{t-1}} \times 100$ | |
| $\pi^*$ | Target inflation rate | | 2% |
| $\pi - \pi^*$ | Inflation gap: inflation above (+) or below (−) the target | $\pi - \pi^*$ | |
| Output gap | Real GDP $Y$ above (+) or below (−) potential GDP $Y^P$ (output at full employment) | $\frac{Y - Y^P}{Y^P} \times 100$ | |
| $r_{ff}$ | Real federal funds rate: nominal rate minus inflation | $i_{ff} - \pi$ | |
| $r^*$ | Equilibrium real federal funds rate: the $r_{ff}$ that neither stimulates nor slows the economy; estimated, not observed | | 2% |

With $r^* = \pi^* = 2\%$, the rule simplifies to

$$
i_{ff} = 1 + 1.5\,\pi + 0.5\,(\text{output gap})
$$

*Taylor principle:* when inflation rises by 1 percentage point, the federal funds rate rises by more than 1 point and the real interest rate rises.

![](/images/money-and-banking/fed-taylor-rule-vs-federal-funds-rate.png)
*The Taylor rule vs. the actual federal funds rate, 1990 to now*

---
title: 'Money and Banking (19): The IS Curve'
description: 'From Frederic S. Mishkin, *The Economics of Money, Banking, and Financial Markets* — Chapter 20'
pubDate: 2026-11-28
series:
  id: money-and-banking
  order: 19
draft: false
---
The aggregate demand–aggregate supply (AD/AS) model is the basic macroeconomic model for explaining short-run fluctuations in aggregate output. 

Let's first develop the building block for understanding aggregate demand, *the IS curve*, which describes the relationship between **real interest rates and aggregate output** when the market for goods and services is in equilibrium. 

## Aggregate Demand 
Aggregate demand, in Keynes's view, is the total amount of output demanded in the economy. It equals **planned expenditure**, the total amount of spending that households, businesses, the government, and foreigners *want* to make. 

Aggregate demand has four components: 

$$Y^{ad} = C + I + G + NX$$

$Y^{ad}$ = aggregate demand · $C$ = consumption expenditure · $I$ = planned investment spending · $G$ = government purchases · $NX$ = net exports

These are the same four components as GDP. The difference is that **GDP measures actual spending, while aggregate demand measures planned spending**. 

## The Components of Aggregate Demand 
Let's look at each of its components to understand what determines aggregate demand. 

### Consumption Expenditure 
*Consumption expenditure* is the total demand for consumer goods and services. It depends mainly on **disposable income**, the income left after taxes.

$$C = \bar{C} + mpc \times Y_D, \qquad Y_D = Y - T$$

- $\bar{C}$ = **autonomous consumption**, spending that does not depend on income (set by things like consumer confidence and wealth)
- $mpc$ = **marginal propensity to consume**, the share of each extra dollar of disposable income that is spent ($0 < mpc < 1$)
- $Y_D$ = disposable income · $Y$ = income · $T$ = taxes

### Planned Investment Spending 
*Planned investment* is spending by businesses on new equipment and buildings (*fixed investment*), plus the inventories they plan to hold (*planned inventory investment*). Firms usually borrow to invest, so investment falls when **the real cost of borrowing** rises.

$$I = \bar{I} - d \times (i_r + \bar{f})$$

- $\bar{I}$ = **autonomous investment**, investment that does not depend on interest rates (set by things like business confidence)
- $d$ = how sensitive investment is to the real cost of borrowing
- $i_r$ = **real interest rate**, the cost of borrowing after inflation
- $\bar{f}$ = **financial frictions**, the extra cost of borrowing caused by asymmetric information

### Net Exports 
*Net exports* are exports minus imports. A higher real interest rate makes domestic assets more attractive, so **the dollar appreciates**. Domestic goods become more expensive abroad, and net exports fall.

$$NX = \overline{NX} - x \times i_r$$

- $\overline{NX}$ = **autonomous net exports**, the part that does not depend on interest rates (set by things like foreign demand and trade policy)
- $x$ = how sensitive net exports are to the real interest rate

### Government Purchases and Taxes 
*Government purchases and taxes* are set by **fiscal policy**, so both are treated as autonomous. Government purchases add to aggregate demand directly, and taxes affect it through disposable income.

$$G = \bar{G}, \qquad T = \bar{T}$$

- $\bar{G}$ = government purchases · $\bar{T}$ = taxes, both fixed by the government


## Goods Market Equilibrium 
Keynes recognized that equilibrium occurs in the economy when the total quantity of output equals the total amount of aggregate demand. 

$$Y = Y^{ad}$$

$$Y = C + I + G + NX$$

$$Y = \bar{C} + mpc \times (Y - \bar{T}) + \bar{I} - d \times (i_r + \bar{f}) + \bar{G} + \overline{NX} - x \times i_r$$

$$Y = \bar{C} + mpc \times Y - mpc \times \bar{T} + \bar{I} - d \times i_r - d \times \bar{f} + \bar{G} + \overline{NX} - x \times i_r$$

$$Y - mpc \times Y = \bar{C} - mpc \times \bar{T} + \bar{I} - d \times \bar{f} + \bar{G} + \overline{NX} - d \times i_r - x \times i_r$$

$$(1 - mpc) \times Y = \left[\bar{C} + \bar{I} - d \times \bar{f} + \bar{G} + \overline{NX} - mpc \times \bar{T}\right] - (d + x) \times i_r$$

$$Y = \left[\bar{C} + \bar{I} - d \times \bar{f} + \bar{G} + \overline{NX} - mpc \times \bar{T}\right] \times \frac{1}{1 - mpc} - \frac{d + x}{1 - mpc} \times i_r$$

The result has two parts:
- **The bracket is total autonomous spending**, and $\frac{1}{1 - mpc}$ is the **expenditure multiplier**. Together they set **where the IS curve sits**. Any change in an autonomous term shifts the curve.

- **The last term shows how output responds to the real interest rate.** Since $d$, $x$, and $1 - mpc$ are all positive, a higher $i_r$ means lower $Y$. This sets **the slope of the IS curve**.

> [!example]
> If $mpc = 0.75$, the multiplier is $\frac{1}{1 - 0.75} = 4$. A \$100 billion rise in autonomous spending raises output by \$400 billion.

## The IS Curve 
The equation from goods market equilibrium is the **IS curve**. It **slopes downward**.


> [!example]
> Suppose $\bar{C} = 1.4$, $\bar{I} = 1.2$, $\bar{G} = 3.9$, $\bar{T} = 3.0$, $\overline{NX} = 1.3$, $\bar{f} = 1$ (in \$ trillions, rates in %), with $mpc = 0.5$, $d = 0.3$, and $x = 0.2$. Then:
> $$Y = \left[1.4 + 1.2 - 0.3 + 3.9 + 1.3 - 1.5\right] \times \frac{1}{1 - 0.5} - \frac{0.3 + 0.2}{1 - 0.5} \times i_r = 12 - i_r$$
> At $i_r = 5\%$, $Y = 7$ (point A). At $i_r = 3\%$, $Y = 9$ (point B). At $i_r = 1\%$, $Y = 11$ (point C).

![The IS curve](/images/money-and-banking/is-the-is-curve.png)
*The IS Curve*

**Points off the IS curve have a strong tendency to move back toward equilibrium.** 

A change in $i_r$ is a **movement along** the IS curve. A change in any **autonomous** factor **shifts** the whole curve.

### Changes in Government Purchases 
A rise in government purchases adds directly to aggregate demand, so **the IS curve shifts right** by $\frac{1}{1 - mpc} \times \Delta\bar{G}$ at every real interest rate.

### Changes in Taxes 
A rise in taxes lowers disposable income and therefore consumption, so **the IS curve shifts left** by $\frac{mpc}{1 - mpc} \times \Delta\bar{T}$. 

### Changes in Autonomous Spending 
Any rise in autonomous spending works like a rise in government purchases: **the IS curve shifts right** by the multiplier $\frac{1}{1 - mpc}$ times the change.

#### Autonomous Consumption 
When consumers become more optimistic or wealthier (for example, after a stock market boom), $\bar{C}$ rises and **the IS curve shifts right**.

#### Autonomous Investment Spending 
When businesses become more optimistic about future profits, $\bar{I}$ rises and **the IS curve shifts right**. 

#### Autonomous Net Exports 
When foreign demand for domestic goods rises (for example, a boom abroad), $\overline{NX}$ rises and **the IS curve shifts right**.

### Changes in Financial Frictions 
A rise in financial frictions raises the real cost of borrowing for firms, so investment falls and **the IS curve shifts left** by $\frac{d}{1 - mpc} \times \Delta\bar{f}$. 

## Summary 
The IS curve shows how **the real interest rate determines aggregate output** through the goods market. We will add the MP curve, and combine it with the IS curve to derive the aggregate demand curve in the next note.
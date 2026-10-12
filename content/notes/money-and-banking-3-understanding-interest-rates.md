---
title: 'Money and Banking (3): Understanding Interest Rates'
description: 'From Frederic S. Mishkin, The Economics of Money, Banking, and Financial Markets — Chapter 4'
pubDate: 2026-09-19
series:
  id: money-and-banking
  order: 3
draft: false
---

**Interest rates are among the most closely watched variables in the economy**. They influence personal decisions such as whether to consume or save. They also affect the economic decisions of businesses and households. 

Different debt instruments have very different streams of cash payments to the holder with very different timing. Thus, **understanding how we can compare the value of one kind of debt instrument with another is very important**, and we do it with present value. 

## Present Value
==Present value measures what a future sum of money is worth in today's dollars.==

$$PV = \frac{CF}{(1+i)^n}$$
PV is present value and CF is cash flow. 

Intuitively, **the equation tells us that if you are promised \$1 of cash flow $n$ years from now, this dollar would not be as valuable as \$1 today**. 

> [!example] \$1,000 received in 5 years, $i = 6\%$
> $$PV = \frac{1000}{(1.06)^5} = \$747.26$$
> Equivalently, $\$747.26$ invested today at 6% grows to $\$1{,}000$ in 5 years.

## Types of Credit Market Instruments
There are four basic types of credit market instruments. 

### Simple Loan
The lender provides the borrower with an amount of funds, which must be repaid to the lender at the maturity date along *with an additional payment for the interest*. For example, **commercial loans to businesses**.

$$CF = LV\,(1+i)^n$$

> [!example] $LV = \$100$, $i = 10\%$, $n = 1 \;\Rightarrow\; CF = 100(1.10) = \$110$.

### Fixed-Payment Loan
The lender provides the borrower with an amount of funds, which must be repaid by *making the same payment every period*, consisting of part of the principal and interest for a set number of years. For example, **mortgages, auto loans, student loans.**

$$LV = \sum_{t=1}^{n} \frac{FP}{(1+i)^t}$$

> [!example] $LV = \$1{,}000$, $FP = \$127.50$, $n = 25$ — each payment part interest, part principal; nothing owed at maturity.

### Coupon Bond
A *coupon bond* pays the owner of the bond a fixed interest payment every year until the maturity date, when the face value is repaid. For example, **Treasury notes and bonds, corporate bonds.**

$$P = \sum_{t=1}^{n} \frac{C}{(1+i)^t} + \frac{F}{(1+i)^n}$$

> [!example] $F = \$1{,}000$, coupon rate $C/F = 10\% \Rightarrow C = \$100$, $n = 10$, $P = \$900$.
> $C/F$ is fixed at issue, $P$ is not — so the return actually earned is a separate number (→ Yield to Maturity).

### Discount Bond (Zero-Coupon Bond)
A *discount bond* is bought at a price *below its face value,* and the face value is repaid at the maturity date. For example, **Treasury bills, zero-coupon bonds, U.S. savings bonds.**

$$P = \frac{F}{(1+i)^n}$$

> [!example] $F = \$1{,}000$, $P = \$900$, $n = 1$ — no coupons; the whole return is the $\$100$ discount.

## Yield to Maturity (YTM)
The most important way of calculating interest rates is the yield to maturity. 

*Yield to maturity (YTM)* is the total annual return you can expect from a bond if you buy it at the current market price and hold it until maturity. 

$$\underbrace{P}_{\text{known}} = \sum_{t=1}^{n} \frac{\overbrace{CF_t}^{\text{known}}}{(1+\underbrace{i}_{\text{solve}})^t}$$
**YTM is always quoted as an annualized rate, never as a cumulative return.**

### Simple Loan
**For simple loans, the simple interest rate equals the yield to maturity**. 

$$LV = \frac{CF}{(1+i)^n}$$

> [!example] $LV = \$100$, $CF = \$110$, $n = 1$: $\;100 = \dfrac{110}{1+i} \Rightarrow i = 10\%$.

### Fixed-Payment Loan

$$LV = \frac{FP}{1+i} + \frac{FP}{(1+i)^2} + \cdots + \frac{FP}{(1+i)^n}$$

> [!example] $LV = \$1{,}000$, $FP = \$127.50$, $n = 25$:
> $$1{,}000 = \frac{127.50}{1+i} + \cdots + \frac{127.50}{(1+i)^{25}} \;\Rightarrow\; i = 12\%$$

### Coupon Bond

$$P = \frac{C}{1+i} + \frac{C}{(1+i)^2} + \cdots + \frac{C}{(1+i)^n} + \frac{F}{(1+i)^n}$$

> [!example] $P = \$900$, $C = \$100$, $F = \$1{,}000$, $n = 10$ — solve for $i$.

![Bond price against yield to maturity](/images/money-and-banking/price-vs-yield.png)
*Yield to Maturity: Coupon Bond*

### Discount Bond

$$i = \frac{F-P}{P} \quad (n = 1) \qquad\qquad i = \left(\frac{F}{P}\right)^{1/n} - 1 \quad (\text{any } n)$$

> [!example] $P = \$900$, $F = \$1{,}000$, $n = 1$: $\;i = \dfrac{1{,}000-900}{900} = 11.1\%$.

**Current bond prices and interest rates are negatively related.** 

![TLT price against the 10-year Treasury yield](/images/money-and-banking/bond-prices-vs-yields-market.png)
*Bond Prices and Interest Rates*

#### Case: the 10-yr Treasury at 5% — Sep 18, 2026

**The yield quoted in the news is a YTM**, solved out of the note's market price — nobody sets it. (≠ **fed funds**, which the FOMC does set: hiked 25 bp to 3.75–4% on Sep 16, 2026.)

$$P_{\text{market}} = \sum_{t=1}^{10}\frac{C}{(1+i)^t} + \frac{1{,}000}{(1+i)^{10}} \;\Rightarrow\; i = 5.00\%$$

| $i: 4\% \rightarrow 5\%$                   | Effect                                                        |
| ------------------------------------------ | ------------------------------------------------------------- |
| 10-yr note, $C = \$40$                     | $\$1{,}000 \rightarrow \$922.78$ (−7.7%)                      |
| 30-yr issued 2020, $C = \$15$, 24 yrs left | $\approx \$517$ (−48% vs. face)                               |
| 30-yr mortgage                             | 6.76% → 6.95% in a week (tracks the 10-yr, not fed funds)     |
| Payment on a $\$400$k loan                 | $\$2{,}597 \rightarrow \$2{,}648$/mo (+$\$18$k over 30 yrs)   |
| Equities                                   | higher discount rate on future earnings → valuations compress |
| New savers                                 | 5% locked risk-free for 10 yrs                                |

$$i \uparrow \;\Rightarrow\; \text{bad for bonds held, good for money not yet invested.}$$

![Price-yield curves for 1, 10 and 30-year bonds](/images/money-and-banking/maturity-and-interest-rate-risk.png)
*Maturity and the Volatility of Bond Returns*


## Rate of Return
What you actually earn over the time you **hold** the instrument: cash collected $+$ change in value, over what you paid. It is different from YTM. 

$$R = \frac{\text{cash received} + \text{change in value}}{\text{what you paid}}$$

### Coupon Bond
$C$ is the year's coupon, $P_{t+1}$ the price you could sell at:
$$R = \frac{C + P_{t+1} - P_t}{P_t} = \underbrace{\frac{C}{P_t}}_{i_c\text{ (current yield)}} + \underbrace{\frac{P_{t+1}-P_t}{P_t}}_{g\text{ (capital gain)}}$$
> [!example] Held 1 year — buy at $P_t = \$1{,}000$ (10% coupon), rates rise, sell at $P_{t+1} = \$900$.
> $$R = \frac{100 + 900 - 1{,}000}{1{,}000} = 0\% \quad\text{— the } \$100 \text{ coupon exactly cancels the } \$100 \text{ capital loss.}$$

> [!example] Held 3 years — same bond, sold at $P_3 = \$952.88$ after collecting three coupons.
> $$R_{\text{total}} = \frac{3(100) + 952.88 - 1{,}000}{1{,}000} = 25.3\% \;\text{ over the three years — annualized below.}$$

### Fixed-Payment Loan
From the **lender's** side: $m\,FP$ is the payments collected over the year ($m = 12$ monthly), $V_t$ the loan's market value — the PV of the payments still to come, discounted at today's rate.
$$R = \frac{m\,FP + V_{t+1} - V_t}{V_t}$$
> [!example] A bank holds a $\$400$k 30-yr mortgage at 6.2%; a year later market rates are 6.95%.
> **1 — the payment**, fixed at origination, $r = 0.062/12$, $n = 360$:
> $$FP = \frac{L\,r}{1-(1+r)^{-n}} = \frac{400{,}000(0.0051667)}{1-(1.0051667)^{-360}} = \$2{,}449.88\text{/mo}$$
> **2 — cash collected** over the year: $\;12 \times 2{,}449.88 = \$29{,}398$
> **3 — value of the 348 payments still to come**, discounted at the *new* rate $r' = 0.0695/12 = 0.0057917$:
> $$V_{t+1} = FP\,\frac{1-(1+r')^{-348}}{r'} = 2{,}449.88 \times 149.520 = \$366{,}305$$
> (Market value $=$ balance only while the discount rate equals the loan's own rate.)
> **4 — the return:**
> $$R = \frac{29{,}398 + 366{,}305 - 400{,}000}{400{,}000} = -1.07\% \qquad (+6.17\% \text{ had rates not moved})$$
> **The borrower's payment never changed — the lender's return did.** 

## Annualized Return
Hold $n$ years and $R$ is **cumulative** — 25.3% over 3 years is not 25.3% a year. *Annualizing turns it into the constant yearly rate that reaches the same ending value*:
$$R_{\text{ann}} = (1 + R_{\text{total}})^{1/n} - 1$$
> [!example] $R_{\text{total}} = 25.3\%$ over 3 years $\;\Rightarrow\; R_{\text{ann}} = (1.253)^{1/3} - 1 = 7.8\%$/yr.

- Compounds, so it is a **geometric** mean: $-10\%,\, +5\%,\, +8\%$ give $(0.90)(1.05)(1.08) - 1 = 2.06\%$ total and $0.68\%$/yr. 
- Periods shorter than a year: $R_{\text{ann}} = (1+R)^m - 1$, $m$ = periods per year.

## The Fisher Equation
The interest rate we have been discussing so far is the *nominal interest rate*, which makes no allowance for inflation. 

The *real interest rate* (adjusted for inflation) is more accurately defined by the *Fisher equation*. 

$$i = i_r + \pi^e \quad\Longleftrightarrow\quad i_r = i - \pi^e$$
> [!example] $i = 8\%$, $\pi^e = 6\% \;\Rightarrow\; i_r = 2\%$.

**When the real interest rate $i_r$ is low, there are greater incentives to borrow and fewer incentives to lend.** 
The lender is paid back in dollars that buy less because of inflation. 

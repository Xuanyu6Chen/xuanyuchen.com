---
title: 'Money and Banking (5): The Risk and Term Structure of Interest Rates'
description: 'From Frederic S. Mishkin, The Economics of Money, Banking, and Financial Markets — Chapter 6'
pubDate: 2026-09-27
series:
  id: money-and-banking
  order: 5
draft: false
---

We look at why bonds with **the same term to maturity have different interest rates**, and **how a bond's term to maturity affects its interest rate**. 

## Risk Structure of Interest Rates 

### Default risk 
*Default* occurs when the issuer of the bond is unable or unwilling to make interest payments when promised or pay off the face value when the bond matures. 

Bonds with no default risk are called **default-free bonds**, like U.S. Treasury bonds. 

**Risk premium** indicates how much additional interest people must earn to be willing to hold the risky bond. A bond with default risk will always have a positive risk premium, and **an increase in its default risk will raise the risk premium**. 

![Default risk and the risk premium](/images/money-and-banking/default-risk-and-risk-premium.png)
*Default Risk*

*Credit-rating agencies* provide information for the probability of default. The yields on junk bonds are always higher than those on higher-rated bonds. 

### Liquidity 
**The more liquid an asset is, the more desirable it is.** 

U.S. Treasury bonds are the most liquid of all long-term bonds. 

### Income Tax Considerations
Interest rates on state and local government bonds have often been lower than those on U.S. Treasury bonds, because **those bonds are exempt from federal income taxes**.

## Term Structure of Interest Rates
Bonds with identical risk, liquidity, and tax characteristics may have different interest rates because their time remaining to maturity is different. 

![U.S. Treasury yield curve, July 11, 2011 and September 25, 2026](/images/money-and-banking/yield-curve.png)
*Term Structure of Interest Rates*

Important Facts: 
- Interest rates on bonds of different maturities **move together over time**. 
- When short-term interest rates are low, yield curves are more likely to have an upward slope; when short-term interest rates are high, yield curves are more likely to slope downward and be inverted. 
- **Yield curves almost always slope upward**. 

There are three theories to explain the facts. The first two can explain only some of the facts; the last theory explains all of them and builds on the first two. 

### Expectations Theory 
The **interest rate on a long-term bond will equal an average of the short-term interest rates** that people expect to occur over the life of the long-term bond. 

$$i_{nt} = \frac{i_{t} + i^e_{t+1} + i^e_{t+2} + \dots + i^e_{t+(n-1)}}{n}$$
where $i_{t}$ is today's interest rate on a one-period bond, $i^e_{t+1}$ is the interest rate on a one-period bond expected for next period. 

> [!example] Expected one-year rates for the next 5 years: **5%, 6%, 7%, 8%, 9%**.
> We can get the two year rate of $\frac{5\%+6\%}{2} = 5.5\%$ and a 5-year rate of $\frac{5\%+6\%+7\%+8\%+9\%}{5} = 7\%$.

When short-term rates are low, people generally expect them to rise to the normal level in the future, so upward sloping. 

### Segmented Markets Theory 
The segmented markets theory **sees markets for different maturity bonds as completely separate and segmented**. 

It explains why yield curves almost always slope upward through supply and demand: investors usually prefer short-term bonds, so their prices are higher and their interest rates lower. 

### Liquidity Premium and Preferred Habitat Theories 
Liquidity premium theory states that the interest rate on a long-term bond will equal an **average of short-term interest rates expected to occur** over the life of the long-term bond **plus a liquidity premium**. 

$$i_{nt} = \frac{i_{t} + i^e_{t+1} + i^e_{t+2} + \dots + i^e_{t+(n-1)}}{n} + l_{nt}$$
where $l_{nt}$ is the liquidity premium for the n-period bond at time t. 

Preferred habitat theory **assumes investors have a preference for bonds of one maturity over another**. Because investors are likely to prefer the habitat of short-term bonds over that of longer-term bonds, they are willing to hold long-term bonds only if they have higher expected returns. 

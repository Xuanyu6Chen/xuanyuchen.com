---
title: 'AI Industry (1): Compute Chips'
description: ''
pubDate: 2026-10-08
series:
  id: ai-industry
  order: 1
draft: false
---

AI is now the main force in the chip industry, and compute chips are at its center. 

## Chip Types
There are four main types of compute chip, running from the most general to the most specialized. The more a chip is built for one task, the more efficient it is and the less flexible. 

### CPU
A *Central Processing Unit (CPU)* is the general-purpose processor that runs a computer’s programs. It has a small number of complex cores (tens to hundreds), each built to **execute instructions in sequence** and handle work where every step depends on the one before.

- CPUs **do everything** but are best at operating systems and logic. 
- CPUs are slow at massively parallel math (what AI is). 
- Every computer uses CPUs.
- In an AI server, the CPU runs the operating system, prepares and loads data, and coordinates the GPUs.
- *x86 vs Arm:* the two main instruction sets. x86 is owned by Intel, and AMD makes x86 CPUs under license. Anyone can build an Arm CPU with a license from Arm.
- Data centers use *server CPUs*, while PCs and laptops use *client CPUs*. 

| Design | Company | Server | Client (PC, laptop, phone) |
| --- | --- | --- | --- |
| x86 | Intel | Xeon | Core |
| x86 | AMD | EPYC | Ryzen |
| Arm | Amazon | Graviton | |
| Arm | Google | Axion | |
| Arm | Microsoft | Cobalt | |
| Arm | Nvidia | Vera, Grace | |
| Arm | Ampere (SoftBank) | AmpereOne, Altra | |
| Arm | Apple | | M-series, A-series |
| Arm | Qualcomm | | Snapdragon |

(Amazon, Google and Microsoft use their chips in their own clouds and do not sell them.)

### GPU
A *Graphics Processing Unit (GPU)* is a processor with thousands of small, simple cores that run the same operation on many pieces of data at once. Software splits a problem into identical chunks and the GPU **executes them in parallel**.

- GPUs were built for graphics. 
- GPUs are **extremely fast at massively parallel math** and are programmable. 
- GPUs are **power-hungry and expensive**, and always need a CPU to direct them. 
- Data centers use GPUs for AI training and inference; gaming PCs for graphics; cars for driver assistance and self-driving.
- *Discrete vs integrated GPU:* a separate chip, versus a small GPU built into a CPU or SoC (System on a Chip). AI GPUs are all discrete.
- *CUDA* is Nvidia’s software layer for programming its GPUs.

| Company | Data center | Client (PC, gaming) |
| --- | --- | --- |
| Nvidia | Rubin, Blackwell (B200), Hopper (H100) | GeForce RTX |
| AMD | Instinct (MI400, MI350, MI300) | Radeon |
| Intel | | Arc |

> [!note] Heads-up: two kinds of chip
> **CPU and GPU:** the hardware is fixed and general, so **software** tells it what to do.
>
> **FPGA and ASIC:** the task is built into the **circuit**. An FPGA's circuit can be redone, an ASIC's cannot.

### FPGA
A *Field Programmable Gate Array (FPGA)* is a chip whose internal circuit can be **rewired after it is manufactured**. It can be set up as a circuit for one task and later reloaded for another.

- FPGAs are much harder to design for than CPUs and GPUs. 
- FPGAs **give the speed of a custom circuit without a factory** -- ready in days and changeable after they are deployed.
- FPGAs are a small part of AI. Their main uses are *telecom, networking equipment, defense, and high-frequency trading*.

### ASIC
An *Application-Specific Integrated Circuit (ASIC)* is a chip whose circuit is custom-designed for one task and **fixed permanently when it is manufactured**. 

- ASICs deliver **maximum performance** and **energy efficiency** on one task, and the lowest cost per chip at huge volumes.
- ASICs **give up flexibility** and require a huge upfront bill.
- *Hyperscalers*, the largest cloud companies (Google, Amazon, Microsoft, Meta), build ASICs. 

#### AI accelerators
| Company      | Chip                         | Design partner  |
| ------------ | ---------------------------- | --------------- |
| Google       | TPU (Tensor Processing Unit) | Broadcom        |
| Amazon (AWS) | Trainium                     | Marvell, Alchip |
| Microsoft    | Maia                         | Global Unichip (reported) |
| Meta         | MTIA                         | Broadcom        |

#### NPU
A *Neural Processing Unit (NPU)* is a small, low-power accelerator for neural-network math. It runs AI models on the device itself instead of in a data center.

- NPUs run inside phones, laptops, cars, and cameras. 
- NPUs **cannot do training, only inference**. 
- NPUs **run on the local device**, so no internet connection to a data center is needed. 

| Company  | Chip               | Its name for the NPU | Used in                         |
| -------- | ------------------ | -------------------- | ------------------------------- |
| Apple    | A-series, M-series | Neural Engine        | iPhone, iPad, Mac               |
| Qualcomm | Snapdragon         | Hexagon NPU          | Android phones, Windows laptops |
| Intel    | Core Ultra         | Intel AI Boost       | Windows laptops and PCs         |
| AMD      | Ryzen AI           | XDNA                 | Windows laptops and PCs         |
| MediaTek | Dimensity          | MediaTek NPU         | Android phones                  |
| Google   | Tensor             | TPU                  | Pixel phones                    |

#### DPU
A *Data Processing Unit (DPU)* is a chip that combines fixed circuits for networking, storage and security with a few CPU cores of its own.

- DPUs **take those tasks off the server's main CPU**. 
- DPUs are commonly found in data centers.
- In AI servers, DPUs keep data flowing so that the expensive GPUs do not sit waiting for it.

| Company | Product   |
| ------- | --------- |
| Nvidia  | BlueField |
| AMD     | Pensando  |
| Marvell | OCTEON    |
| Intel   | IPU       |
| Amazon  | Nitro     |

## How a GPU Works
Of the four types, the GPU does most of the AI work today, because it is very good at matrix multiplication, the math that AI runs on. 

![Inside an AI GPU](/images/ai-industry/gpu-layout-en.png)

### Cores -- SMs and tensor cores
A *Streaming Multiprocessor (SM)* is the fundamental processing unit of a GPU.

- A GPU has over a hundred SMs. Each SM works independently, in parallel with the others.
- Each SM contains ordinary cores, tensor cores, and a small pool of fast memory (its L1 cache).
- **Ordinary cores do general parallel math**.
- **Tensor cores do only matrix multiplication**. Most of a GPU's AI speed comes from them.
- More SMs mean more computing power, but only if memory can feed them fast enough.

### Memory and memory bandwidth
*Memory bandwidth* is how fast data moves between a GPU's memory and its cores.

- *Capacity* (gigabytes) decides how large a model fits. 
- *Bandwidth* (gigabytes per second) decides how fast the model runs.
- *High-bandwidth memory (HBM)* is memory chips stacked on top of each other and wired straight through the stack, placed right next to the GPU. See [[03 Memory 存储芯片]].

## The Workload
Knowing what a GPU can do, the next question is what it is asked to do. 

An AI model is a huge set of numbers, called *weights*. **Training finds those numbers, and inference uses them.**

| Workload  | Where         | Chips          |
| --------- | ------------- | -------------- |
| Training  | Data center   | GPUs           |
| Inference | Data center   | GPUs and ASICs |
| Inference | On the device | NPUs           |

### Training
*Training* is finding a model's weights -- the model is shown data, its errors are measured, and every weight is adjusted slightly, trillions of times over.

- Training needs maximum computing power. One model is trained on thousands of GPUs linked together.
- Training **needs more memory than the model itself**. 

### Inference
*Inference* is running a finished model to answer a request. The weights are fixed, and the data passes through the model once.

- Inference runs for every request from every user, so its cost is a running cost that grows with usage.
- Inference chips **compete on cost per token and response time**.
- Every token reads the whole model out of memory, so memory bandwidth is the main limit.

## Software
AI training and inference both need software to run on a chip. Each chip maker supplies its own, and Nvidia's is leading now. 

### CUDA
*CUDA* is Nvidia's platform for programming its GPUs. It is free, but it runs only on Nvidia GPUs.

Code written for CUDA has to be rewritten to run on another company's chip, and that cost locks customers in. The lock-in is strongest in research and training, where designs keep changing. It is weakest for hyperscalers running fixed models on their own chips.

### Alternatives

| Company         | Software                                 | Position                                                         |
| --------------- | ---------------------------------------- | ---------------------------------------------------------------- |
| AMD             | ROCm                                     | Open source. The direct rival to CUDA, still behind in coverage. |
| Intel           | oneAPI                                   | Small in AI.                                                     |
| Google          | Its own stack for TPUs (JAX, TensorFlow) | Strong, but serves Google's own chips.                           |
| Amazon          | Its own toolkit for Trainium             | Serves Amazon's own chips.                                       |
| Meta and others | PyTorch, a framework                     | Neutral: runs on many chips.                                     |

## How It Is Made and Sold
The companies in this sector design chips but mostly do not make them. They bring out a new generation every year, and sell most of them to a handful of very large buyers.

### Fabless model
A *fabless* company designs chips and owns no factory (a chip factory is called a *fab*). A *foundry* manufactures chips that other companies designed.

| Model      | Does                     | Examples                       |
| ---------- | ------------------------ | ------------------------------ |
| Fabless    | Designs only             | Nvidia, AMD, Broadcom, Marvell |
| Foundry    | Manufactures only        | TSMC                           |
| Integrated | Designs and manufactures | Intel, Samsung                 |

### Design cycle and yearly cadence
The *design cycle* is how long one chip takes from first idea to shipping, about two to three years. The *cadence* is how often a new generation ships -- **one year for Nvidia and AMD**.

- The yearly cadence takes very high R&D spending.

### Who buys

| Buyer        | Who                                     | Role                                     |
| ------------ | --------------------------------------- | ---------------------------------------- |
| Hyperscalers | Amazon, Microsoft, Google, Meta, Oracle | The largest share by far                 |
| Neoclouds    | CoreWeave and similar                   | Rent out GPUs; smaller, growing fast     |
| AI labs      | OpenAI, Anthropic, xAI                  | Buy mostly through the clouds            |
| Enterprises  | Ordinary companies                      | A smaller share, usually through a cloud |
| Governments  | National AI projects (sovereign AI)     | A newer category                         |

- A handful of buyers make up a large share of revenue.
- **The hyperscalers' capital spending (capex) on data centers is the best single indicator of demand for AI chips.**
- The biggest customers are **also competitors**. They are the companies building their own ASICs.

## Measuring Performance
Those buyers judge a chip by what its work costs, not by its specifications.

| Metric                          | What it measures                                                                                              | Why it matters for the business                                      |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| *Performance per watt*          | Work done per unit of electricity                                                                             | A data center's power is fixed, so this sets how much it can produce |
| *Total cost of ownership (TCO)* | Everything it costs to own and run a chip over its life: the chip, electricity, cooling, building, networking | **A chip that costs more to buy can cost less to own**               |
| *Cost per token*                | What one unit of output finally costs                                                                         | The number inference chips compete on                                |
| *Gigawatts (GW)*                | The power capacity of the chips deployed                                                                      | How large orders and data centers are now sized                      |

- A data center's power supply is fixed, so its revenue is roughly its power times the tokens it produces per watt. This is **why performance per watt matters more than the price of a chip**.
- Chip makers sell on total cost of ownership and cost per token, so a more expensive chip can be the cheaper choice.

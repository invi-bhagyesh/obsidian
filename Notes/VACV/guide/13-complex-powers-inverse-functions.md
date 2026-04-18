# 13. Complex Powers & Inverse Functions

---

## 13.1 Complex Exponents

### Definition
For $z \neq 0$ and any complex number $c$:

$$\boxed{z^c = e^{c\log z}}$$

Since $\log z$ is multi-valued, $z^c$ is generally multi-valued.

### How Many Values?

| Type of $c$ | Number of values |
|-------------|-----------------|
| $c = n$ (integer) | 1 value (single-valued) |
| $c = p/q$ (rational, reduced) | $q$ distinct values |
| $c$ irrational or complex | Infinitely many values |

### Why?
$z^c = e^{c\log z} = e^{c(\ln|z|+i\arg z)} = e^{c\ln|z|}\cdot e^{ic(\text{Arg}\,z+2n\pi)}$

The values differ by the factor $e^{2\pi i cn}$:
- If $c = n$ integer: $e^{2\pi i n^2} = 1$ for all $n$ — one value
- If $c = p/q$: $e^{2\pi i pn/q}$ cycles through $q$ values
- Otherwise: $e^{2\pi i cn}$ is distinct for each $n$ — infinitely many values

---

## 13.2 Principal Value of $z^c$

Using the principal logarithm:
$$\text{p.v.}\;z^c = e^{c\,\text{Log}\,z}$$

This is a single-valued function, analytic on $\mathbb{C}\setminus(-\infty,0]$.

### Derivative
$$\frac{d}{dz}z^c = cz^{c-1}$$

(using the principal branch, on the cut plane).

---

## 13.3 Examples of Complex Powers

### Rational Powers
$z^{1/2} = e^{\frac{1}{2}\log z} = |z|^{1/2}e^{i(\text{Arg}\,z+2n\pi)/2}$ gives 2 values.

**Example:** $i^{1/2} = e^{\frac{1}{2}\log i} = e^{\frac{1}{2}(i\pi/2+2n\pi i)}$
- $n=0$: $e^{i\pi/4} = \frac{\sqrt{2}}{2}(1+i)$
- $n=1$: $e^{i5\pi/4} = -\frac{\sqrt{2}}{2}(1+i)$

### Irrational Powers
$2^i = e^{i\log 2} = e^{i(\ln 2 + 2n\pi i)} = e^{-2n\pi}\cdot e^{i\ln 2}$

Infinitely many values. Principal value ($n=0$): $2^i = e^{i\ln 2} = \cos(\ln 2)+i\sin(\ln 2)$.

Note: $|2^i| = e^{-2n\pi}$, which varies with $n$.

### Complex Powers
$i^i = e^{i\log i} = e^{i\cdot i(\pi/2+2n\pi)} = e^{-(\pi/2+2n\pi)}$

**All values are real!**

Principal value: $i^i = e^{-\pi/2} \approx 0.2079$.

### Powers of $e$

When the base is $e$, we use the definition $e^z = e^{x+iy}$ (the standard exponential), which is already single-valued. But $e^c = e^{c\log e} = e^{c(1+2n\pi i)}$ in the multi-valued sense.

---

## 13.4 Inverse Trigonometric Functions

### Inverse Sine
$$\sin^{-1}z = -i\log\left(iz + \sqrt{1-z^2}\right)$$

**Derivation:** Set $\sin w = z$, i.e., $\frac{e^{iw}-e^{-iw}}{2i} = z$. Let $\zeta = e^{iw}$: $\zeta - 1/\zeta = 2iz$, so $\zeta^2 - 2iz\zeta - 1 = 0$. By quadratic formula: $\zeta = iz + \sqrt{1-z^2}$. Then $w = -i\log\zeta$.

The square root and logarithm make this multi-valued.

### Inverse Cosine
$$\cos^{-1}z = -i\log\left(z + \sqrt{z^2-1}\right)$$

### Inverse Tangent
$$\tan^{-1}z = \frac{i}{2}\log\frac{1-iz}{1+iz} = \frac{i}{2}\log\frac{i+z}{i-z}$$

### Derivatives (on appropriate branches)
$$\frac{d}{dz}\sin^{-1}z = \frac{1}{\sqrt{1-z^2}}, \qquad \frac{d}{dz}\cos^{-1}z = \frac{-1}{\sqrt{1-z^2}}, \qquad \frac{d}{dz}\tan^{-1}z = \frac{1}{1+z^2}$$

---

## 13.5 Inverse Hyperbolic Functions

$$\sinh^{-1}z = \log\left(z + \sqrt{z^2+1}\right)$$
$$\cosh^{-1}z = \log\left(z + \sqrt{z^2-1}\right)$$
$$\tanh^{-1}z = \frac{1}{2}\log\frac{1+z}{1-z}$$

### Derivatives
$$(\sinh^{-1}z)' = \frac{1}{\sqrt{z^2+1}}, \qquad (\cosh^{-1}z)' = \frac{1}{\sqrt{z^2-1}}, \qquad (\tanh^{-1}z)' = \frac{1}{1-z^2}$$

---

## Worked Examples

**Example 1:** Find all values of $(1+i)^{2+i}$.

*Solution:*
$\log(1+i) = \ln\sqrt{2} + i(\pi/4+2n\pi) = \frac{1}{2}\ln 2 + i(\pi/4+2n\pi)$.

$(1+i)^{2+i} = e^{(2+i)\log(1+i)} = e^{(2+i)[\frac{1}{2}\ln 2+i(\pi/4+2n\pi)]}$

$= e^{\ln 2 + i(\pi/4+2n\pi)\cdot 2 + i\frac{\ln 2}{2} - (\pi/4+2n\pi)}$

$= e^{\ln 2 - \pi/4 - 2n\pi}\cdot e^{i[\pi/2+4n\pi+\frac{\ln 2}{2}]}$

$= 2e^{-\pi/4-2n\pi}\cdot e^{i(\pi/2+4n\pi+\frac{\ln 2}{2})}$

Infinitely many values (since $c = 2+i$ is not rational).

**Example 2:** Find all values of $i^{1/3}$.

*Solution:*
$\log i = i(\pi/2+2n\pi)$.

$i^{1/3} = e^{\frac{1}{3}\cdot i(\pi/2+2n\pi)} = e^{i(\pi/6+2n\pi/3)}$.

Three distinct values ($n=0,1,2$):
- $n=0$: $e^{i\pi/6} = \frac{\sqrt{3}}{2}+\frac{i}{2}$
- $n=1$: $e^{i5\pi/6} = -\frac{\sqrt{3}}{2}+\frac{i}{2}$
- $n=2$: $e^{i3\pi/2} = -i$

**Example 3:** Find $\sin^{-1}(i)$.

*Solution:*
$\sin^{-1}(i) = -i\log(i\cdot i + \sqrt{1-i^2}) = -i\log(-1+\sqrt{2})$

$\sqrt{1-(-1)} = \sqrt{2}$. So $iz+\sqrt{1-z^2} = -1+\sqrt{2}$.

Since $\sqrt{2}-1 > 0$ (real positive), $\log(\sqrt{2}-1) = \ln(\sqrt{2}-1)+2n\pi i$.

$\sin^{-1}(i) = -i[\ln(\sqrt{2}-1)+2n\pi i] = 2n\pi - i\ln(\sqrt{2}-1) = 2n\pi + i\ln(\sqrt{2}+1)$.

(Using $-\ln(\sqrt{2}-1) = \ln\frac{1}{\sqrt{2}-1} = \ln(\sqrt{2}+1)$.)

**Example 4:** Show $|i^i| = e^{-\pi/2}$ (principal value).

*Solution:*
$i^i = e^{i\,\text{Log}\,i} = e^{i\cdot i\pi/2} = e^{-\pi/2}$.

$|i^i| = |e^{-\pi/2}| = e^{-\pi/2}$ (since $e^{-\pi/2}$ is real and positive). $\checkmark$

---

## Practice Problems

1. Find all values of $(-1)^{1/\pi}$.

2. Compute the principal value of $(1-i)^{4i}$.

3. Find all values of $\cos^{-1}(2)$ (note: $2$ is outside $[-1,1]$, but the complex inverse is defined).

4. Show that for integer $n$, $z^n = e^{n\log z}$ gives the usual single-valued power.

5. Find all values of $i^{-i}$.

### Solutions

**1.** Find all values of $(-1)^{1/\pi}$.

**Step 1.** Compute $\log(-1) = \ln|-1| + i\arg(-1) = i(2n+1)\pi$, $n \in \mathbb{Z}$.

**Step 2.** Apply the definition $z^c = e^{c\log z}$:

$$(-1)^{1/\pi} = e^{\frac{1}{\pi}\cdot i(2n+1)\pi} = e^{i(2n+1)}, \quad n \in \mathbb{Z}$$

**Step 3.** Since $c = 1/\pi$ is irrational, the values $e^{i(2n+1)}$ are distinct for each $n$, giving **infinitely many values**:

$$(-1)^{1/\pi} = \cos(2n+1) + i\sin(2n+1), \quad n \in \mathbb{Z}$$

All values lie on the unit circle $|z| = 1$.

---

**2.** Compute the principal value of $(1-i)^{4i}$.

**Step 1.** Compute $\text{Log}(1-i) = \frac{1}{2}\ln 2 + i\!\left(-\frac{\pi}{4}\right) = \frac{1}{2}\ln 2 - \frac{\pi}{4}i$.

**Step 2.** Compute $4i \cdot \text{Log}(1-i)$:

$$4i\!\left(\frac{1}{2}\ln 2 - \frac{\pi}{4}i\right) = 2i\ln 2 - \pi i^2 = \pi + 2i\ln 2$$

**Step 3.** Therefore:

$$(1-i)^{4i} = e^{\pi + 2i\ln 2} = e^{\pi}\!\left[\cos(2\ln 2) + i\sin(2\ln 2)\right]$$

$$|(1-i)^{4i}| = e^{\pi} \approx 23.14$$

---

**3.** Find all values of $\cos^{-1}(2)$.

**Step 1.** Use the formula $\cos^{-1}z = -i\log(z + \sqrt{z^2-1})$:

$$\cos^{-1}(2) = -i\log\!\left(2 + \sqrt{4-1}\right) = -i\log(2+\sqrt{3})$$

**Step 2.** Since $2+\sqrt{3} > 0$ (real and positive):

$$\log(2+\sqrt{3}) = \ln(2+\sqrt{3}) + 2n\pi i, \quad n \in \mathbb{Z}$$

**Step 3.** Therefore:

$$\cos^{-1}(2) = -i\!\left[\ln(2+\sqrt{3}) + 2n\pi i\right] = -i\ln(2+\sqrt{3}) + 2n\pi$$

$$= 2n\pi - i\ln(2+\sqrt{3}), \quad n \in \mathbb{Z}$$

The principal value ($n = 0$) is $-i\ln(2+\sqrt{3}) \approx -1.317i$ (purely imaginary).

---

**4.** Show that for integer $n$, $z^n = e^{n\log z}$ gives the usual single-valued power.

**Proof.** By definition:

$$z^n = e^{n\log z} = e^{n[\ln|z| + i(\text{Arg}\,z + 2k\pi)]} = |z|^n \cdot e^{in\,\text{Arg}\,z} \cdot e^{2\pi ink}$$

Since $n$ and $k$ are both integers, $e^{2\pi ink} = 1$ for every $k$.

Therefore $z^n = |z|^n e^{in\,\text{Arg}\,z}$ — a single value, independent of $k$. This is precisely the standard power $z^n = (re^{i\theta})^n = r^n e^{in\theta}$. $\blacksquare$

---

**5.** Find all values of $i^{-i}$.

**Step 1.** Compute $\log i = i\!\left(\frac{\pi}{2}+2n\pi\right)$, $n \in \mathbb{Z}$.

**Step 2.** Apply $z^c = e^{c\log z}$ with $c = -i$:

$$i^{-i} = e^{-i\log i} = e^{-i\cdot i(\pi/2 + 2n\pi)} = e^{-i^2(\pi/2+2n\pi)} = e^{\pi/2+2n\pi}$$

**Step 3.** All values are **real and positive**:

$$i^{-i} = e^{\pi/2+2n\pi}, \quad n \in \mathbb{Z}$$

**Step 4.** The principal value ($n = 0$): $i^{-i} = e^{\pi/2} \approx 4.8105$.

Note: this is consistent with $i^{-i} = \frac{1}{i^i} = \frac{1}{e^{-\pi/2-2n\pi}} = e^{\pi/2+2n\pi}$.

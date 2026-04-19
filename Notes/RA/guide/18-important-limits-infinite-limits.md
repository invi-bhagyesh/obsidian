# 18. Important Limits, Limits at Infinity, and Infinite Limits

> **The goal.** Analysis produces a large dictionary of *standard limits* — values of $\sin x / x$, $(e^x - 1)/x$, $(1 + 1/x)^x$, ratios of powers, logs and exponentials — that form the building blocks of every later computation in differentiation, integration, asymptotics, and series. In parallel, we must extend the $\varepsilon$-$\delta$ grammar to two new settings where one of the quantities runs to infinity:
>
> - **Limits at infinity**: $\lim_{x \to \infty} f(x)$ and $\lim_{x \to -\infty} f(x)$ — functional analogues of $\lim_{n \to \infty} a_n$.
> - **Infinite limits**: $\lim_{x \to a} f(x) = \pm\infty$ — functions blowing up at finite points.
>
> This lesson catalogues the standard limits every analyst needs at their fingertips, proves them from first principles, and sets up the asymptotic machinery (rate comparisons, asymptotic notation, asymptotes) that bridges sequence limits, function limits, and the theory of growth.

---

## 18.1 Limits at Infinity

The sequential limit $\lim_{n \to \infty} a_n = L$ encodes the idea that "$a_n$ is arbitrarily close to $L$ for all large $n$". The same idea makes sense for a real variable $x$ running continuously to $\infty$: we replace "for all $n \geq N$" by "for all $x > M$".

> **Definition 18.1 ($\lim_{x\to\infty} f(x) = L$).**
> Let $f$ be defined on some interval $(M_0, \infty)$. We say
> $$\lim_{x \to \infty} f(x) = L \ \in \mathbb{R}$$
> if for every $\varepsilon > 0$ there exists $M = M(\varepsilon) \in \mathbb{R}$ such that
> $$x > M \ \Longrightarrow\ |f(x) - L| < \varepsilon.$$

> **Definition 18.2 ($\lim_{x \to -\infty} f(x) = L$).**
> Analogously, if $f$ is defined on $(-\infty, M_0)$, we say $\lim_{x \to -\infty} f(x) = L$ iff for every $\varepsilon > 0$ there exists $M$ such that
> $$x < M \ \Longrightarrow\ |f(x) - L| < \varepsilon.$$

**Interpretation.** "$\lim_{x \to \infty} f(x) = L$" says: no matter how small an error tolerance $\varepsilon$ you demand around $L$, there is a threshold $M$ beyond which $f$ stays within $\varepsilon$ of $L$ forever. The symbol $\infty$ is not a point of $\mathbb{R}$ — it is shorthand for the behaviour "$x$ sufficiently large".

> **Theorem 18.A (Heine's theorem at infinity).** $\lim_{x \to \infty} f(x) = L$ iff for every sequence $x_n$ with $x_n \to \infty$ (meaning: for all $K$, eventually $x_n > K$), one has $f(x_n) \to L$.

**Proof sketch.**

*($\Rightarrow$).* Assume $\lim_{x \to \infty} f = L$ and fix $x_n \to \infty$. Given $\varepsilon > 0$, pick $M$ from Def. 18.1. Since $x_n \to \infty$, there is $N$ with $x_n > M$ for $n \geq N$. Hence $|f(x_n) - L| < \varepsilon$ for $n \geq N$, i.e. $f(x_n) \to L$.

*($\Leftarrow$).* Contrapositive. If $\lim_{x \to \infty} f \neq L$, there is $\varepsilon_0 > 0$ such that for every $M$ there exists $x_M > M$ with $|f(x_M) - L| \geq \varepsilon_0$. Take $M = n$ to produce a sequence $x_n \to \infty$ with $f(x_n) \not\to L$. $\blacksquare$

This bridge lets us transfer every result about sequence limits (Cauchy's criterion, algebra of limits, squeeze, monotone convergence) to limits at infinity for free.

---

**Theorem 18.B (Standard limits at infinity).**

$$\lim_{x \to \infty} \frac{1}{x} = 0, \qquad \lim_{x \to \infty} \frac{1}{x^p} = 0 \ (p > 0), \qquad \lim_{x \to \infty} \frac{\ln x}{x} = 0.$$

$$\lim_{x \to -\infty} e^x = 0, \qquad \lim_{x \to \infty} e^{-x} = 0, \qquad \lim_{x \to \infty} \left(1 + \frac{a}{x}\right)^x = e^a.$$

**Proof of $\lim_{x \to \infty} 1/x = 0$ (full $\varepsilon$-$M$).**

1. Let $\varepsilon > 0$.
2. Choose $M = 1/\varepsilon > 0$.
3. If $x > M$, then $x > 1/\varepsilon > 0$, so $1/x < \varepsilon$ and $1/x > 0 > -\varepsilon$. Hence $|1/x - 0| = 1/x < \varepsilon$.
4. By Def. 18.1, $\lim_{x\to\infty} 1/x = 0$. $\blacksquare$

**Proof of $\lim_{x \to \infty} 1/x^p = 0$ for $p > 0$.**

Given $\varepsilon > 0$, set $M = \varepsilon^{-1/p}$. For $x > M > 0$ we have $x^p > M^p = 1/\varepsilon$ (since $t \mapsto t^p$ is strictly increasing on $(0, \infty)$ for $p > 0$), hence $1/x^p < \varepsilon$. The argument that $1/x^p > 0$ is immediate. $\blacksquare$

**Proof of $\lim_{x \to \infty} e^{-x} = 0$ (and the equivalent $\lim_{x\to-\infty} e^x = 0$).**

We use the elementary inequality $e^x \geq 1 + x$ for all $x \in \mathbb{R}$ (proved from convexity or the series $e^x = 1 + x + x^2/2 + \cdots \geq 1 + x$ for $x \geq 0$; for $x \leq 0$ it follows from $e^{-y}(1+y) \leq 1$ for $y \geq 0$). Consequently for $x > 0$:
$$e^x \geq 1 + x \geq x \quad\Longrightarrow\quad 0 < e^{-x} \leq \frac{1}{x}.$$
Given $\varepsilon > 0$, pick $M = 1/\varepsilon$. Then $x > M \Rightarrow e^{-x} < 1/x < \varepsilon$. The claim follows. Substituting $x \to -x$ gives $\lim_{x \to -\infty} e^x = 0$. $\blacksquare$

**Proof of $\lim_{x \to \infty} (\ln x)/x = 0$.**

We exploit the elementary inequality $\ln t \leq 2\sqrt{t}$ for all $t \geq 1$. (Proof: let $\phi(t) = 2\sqrt t - \ln t$. Then $\phi(1) = 2 > 0$ and $\phi'(t) = 1/\sqrt t - 1/t = (\sqrt t - 1)/t \geq 0$ for $t \geq 1$, so $\phi$ is non-decreasing on $[1, \infty)$; hence $\phi(t) \geq \phi(1) > 0$.) Therefore for $x \geq 1$,
$$0 \leq \frac{\ln x}{x} \leq \frac{2\sqrt x}{x} = \frac{2}{\sqrt x}.$$
Given $\varepsilon > 0$, choose $M = \max(1, 4/\varepsilon^2)$. Then $x > M$ forces $2/\sqrt x < \varepsilon$, so $(\ln x)/x < \varepsilon$. The squeeze gives the limit. $\blacksquare$

A more refined proof using $\ln x = \int_1^x dt/t$ will appear in §18.3.

**Proof that $(1 + a/x)^x \to e^a$** is deferred to §18.3 where it sits naturally with the definition of $e$.

---

## 18.2 Infinite Limits

Now we let the *value* $f(x)$ grow without bound as $x$ approaches a finite point. The analog to sequence divergence to $+\infty$.

> **Definition 18.3 ($\lim_{x\to a} f(x) = +\infty$).**
> Let $f$ be defined on a deleted neighbourhood $(a - r, a + r) \setminus \{a\}$ of $a$. We say $\lim_{x \to a} f(x) = +\infty$ if for every $M > 0$ there exists $\delta = \delta(M) > 0$ such that
> $$0 < |x - a| < \delta \ \Longrightarrow\ f(x) > M.$$

> **Definition 18.4 ($\lim_{x\to a} f(x) = -\infty$).**
> $\lim_{x \to a} f(x) = -\infty$ iff for every $M > 0$ there exists $\delta > 0$ such that
> $$0 < |x - a| < \delta \ \Longrightarrow\ f(x) < -M.$$

Analogously one defines $\lim_{x \to a^+} f = \pm\infty$ (requiring $0 < x - a < \delta$), $\lim_{x \to a^-} f = \pm\infty$ (requiring $-\delta < x - a < 0$), and $\lim_{x \to \pm\infty} f = \pm\infty$ (combining both $M$-style definitions: for every $K > 0$ there is $M$ such that $x > M \Rightarrow f(x) > K$, etc.).

**Dictionary of $\varepsilon$-$M$/$M$-$\delta$/$M$-$K$ conditions.**

| Statement | Condition on $x$ | Condition on $f(x)$ |
|-----------|----------------|-----------|
| $\lim_{x \to a} f = L$ | $0 < |x - a| < \delta$ | $|f(x) - L| < \varepsilon$ |
| $\lim_{x \to \infty} f = L$ | $x > M$ | $|f(x) - L| < \varepsilon$ |
| $\lim_{x \to a} f = +\infty$ | $0 < |x - a| < \delta$ | $f(x) > K$ |
| $\lim_{x \to \infty} f = +\infty$ | $x > M$ | $f(x) > K$ |

The pattern: replace "$|\cdot - L| < \varepsilon$" by "$> K$" when the target is $+\infty$; replace "$|x - a| < \delta$" by "$x > M$" when the source is $+\infty$.

**Examples.**

- $\lim_{x \to 0} \frac{1}{x^2} = +\infty$. *Verification:* given $K > 0$, take $\delta = 1/\sqrt K$; then $0 < |x| < \delta \Rightarrow x^2 < 1/K \Rightarrow 1/x^2 > K$.
- $\lim_{x \to 0^+} \frac{1}{x} = +\infty$: take $\delta = 1/K$; $0 < x < \delta \Rightarrow 1/x > K$.
- $\lim_{x \to 0^-} \frac{1}{x} = -\infty$: take $\delta = 1/K$; $-\delta < x < 0 \Rightarrow 1/x < -K$.
- $\lim_{x \to 0} \frac{1}{x}$: does **not** exist as a two-sided infinite limit because the one-sided values disagree ($+\infty$ from the right, $-\infty$ from the left). One can write $\lim_{x \to 0} |1/x| = +\infty$.
- $\lim_{x \to \infty} \ln x = +\infty$: given $K > 0$, take $M = e^K$; $x > M \Rightarrow \ln x > K$.
- $\lim_{x \to \infty} e^x = +\infty$: from $e^x \geq 1 + x \geq x$, given $K > 0$ take $M = K$; $x > M \Rightarrow e^x > K$.

> **Important philosophical point.** "$\lim f = +\infty$" is a **statement that the limit does not exist in $\mathbb{R}$**. It gives *extra* information: not only does $f$ fail to converge, but it does so by escaping above every finite bound. By the classification in [[17-types-of-discontinuity-monotonic]], if $\lim_{x \to a} f(x) = \pm\infty$ with $f$ defined on a deleted neighbourhood of $a$, we have an **essential (type II) discontinuity** at $a$; the function cannot be made continuous by redefining $f(a)$.

*Extended real line.* In many contexts it is convenient to work in $\overline{\mathbb{R}} = \mathbb{R} \cup \{-\infty, +\infty\}$, where $\pm\infty$ are bona fide points; then "$\lim f = +\infty$" genuinely asserts convergence in $\overline{\mathbb{R}}$. This viewpoint is standard in measure theory.

---

## 18.3 Catalogue of Important Limits

These limits appear again and again. Most can be proved by $\varepsilon$-$\delta$, by sequence methods, by the squeeze theorem, or by Taylor expansion. Below we prove each with full rigor.

### Trigonometric limits

$$\boxed{\ \lim_{x \to 0} \frac{\sin x}{x} = 1\ }$$

**Proof (geometric, via the squeeze).**

**Setup.** Place the unit circle $\{(u, v) : u^2 + v^2 = 1\}$ in the plane. For $0 < x < \pi/2$, let $O = (0,0)$, $A = (1, 0)$, $B = (\cos x, \sin x)$, and let $T = (1, \tan x)$ be the point where the vertical tangent at $A$ meets the ray from $O$ through $B$.

**Step 1: Compare three areas.**

Observe the geometric inclusion:
$$\triangle OAB \ \subseteq\ \text{Sector } OAB \ \subseteq\ \triangle OAT.$$

Compute each area:

- $\operatorname{area}(\triangle OAB) = \tfrac{1}{2} \cdot \text{base} \cdot \text{height} = \tfrac{1}{2} \cdot 1 \cdot \sin x = \tfrac{\sin x}{2}.$
- $\operatorname{area}(\text{Sector } OAB) = \tfrac{1}{2} r^2 \theta = \tfrac{x}{2}$ (with $r = 1$, $\theta = x$).
- $\operatorname{area}(\triangle OAT) = \tfrac{1}{2} \cdot 1 \cdot \tan x = \tfrac{\tan x}{2}.$

Hence
$$\tfrac{\sin x}{2} \leq \tfrac{x}{2} \leq \tfrac{\tan x}{2} \quad\Longrightarrow\quad \sin x \leq x \leq \tan x.$$

**Step 2: Rearrange.**

For $0 < x < \pi/2$ we have $\sin x > 0$, so dividing the inequality $\sin x \leq x \leq \tan x = \sin x / \cos x$ by $\sin x$:
$$1 \leq \frac{x}{\sin x} \leq \frac{1}{\cos x}.$$
Taking reciprocals (which reverses inequalities for positive quantities):
$$\cos x \leq \frac{\sin x}{x} \leq 1. \tag{$\ast$}$$

**Step 3: Pass to the limit.**

Since $\cos$ is continuous at $0$ with $\cos 0 = 1$, we have $\lim_{x \to 0^+} \cos x = 1$. The constant function $1$ trivially has limit $1$. By the squeeze theorem (Theorem 18.5 below), $\lim_{x \to 0^+} (\sin x)/x = 1$.

**Step 4: Left-hand limit.**

The function $g(x) = (\sin x)/x$ is **even**: $g(-x) = \sin(-x)/(-x) = (-\sin x)/(-x) = (\sin x)/x = g(x)$. So $\lim_{x \to 0^-} g(x) = \lim_{x \to 0^+} g(x) = 1$, giving the two-sided limit.

**Verification.** We used only: (i) the continuity of $\cos$ at $0$; (ii) the geometric area inequality, which in turn rests on the definition of radian measure as arc length. These are the classical foundations; all trigonometric limits follow from this one via algebra. $\blacksquare$

**Interpretive remark.** The limit $\sin x/x \to 1$ is geometrically equivalent to the statement that **arc length $\approx$ chord length** for small angles — a fundamental fact connecting the synthetic (arc) and analytic (chord $= 2\sin(x/2)$) definitions of length on the circle. It is also equivalent to $\sin'(0) = 1$, which justifies the derivative formula $(\sin x)' = \cos x$.

---

$$\lim_{x \to 0} \frac{1 - \cos x}{x^2} = \frac{1}{2}.$$

**Proof.**

**Setup.** Use the half-angle identity $1 - \cos\theta = 2\sin^2(\theta/2)$ with $\theta = x$.

**Computation.**

$$\frac{1 - \cos x}{x^2} \ =\ \frac{2\sin^2(x/2)}{x^2} \ =\ \frac{2\sin^2(x/2)}{4 \cdot (x/2)^2} \ =\ \frac{1}{2}\left(\frac{\sin(x/2)}{x/2}\right)^2.$$

**Pass to the limit.** Let $u = x/2$; as $x \to 0$, $u \to 0$. Substituting:
$$\frac{1 - \cos x}{x^2} \to \tfrac{1}{2} \left(\lim_{u \to 0}\tfrac{\sin u}{u}\right)^2 = \tfrac{1}{2} \cdot 1^2 = \tfrac{1}{2}. \ \blacksquare$$

**Verification.** The squaring is continuous, so the limit of a square equals the square of the limit — this is a non-trivial step that requires continuity of $z \mapsto z^2$ at $z = 1$.

**Interpretation.** This is the second-order Taylor coefficient of $\cos$: $\cos x = 1 - x^2/2 + O(x^4)$, so $(1 - \cos x)/x^2 \to 1/2$. Equivalently, $\cos''(0) = -1$.

---

$$\lim_{x \to 0} \frac{\tan x}{x} = 1.$$

**Proof.**

Since $\tan x = \sin x / \cos x$:
$$\frac{\tan x}{x} = \frac{\sin x}{x} \cdot \frac{1}{\cos x} \to 1 \cdot \frac{1}{1} = 1,$$
using continuity of $1/\cos x$ at $x = 0$. $\blacksquare$

---

$$\lim_{x \to 0} \frac{\arcsin x}{x} = 1.$$

**Proof.**

Substitute $y = \arcsin x$, so $x = \sin y$. Since $\arcsin$ is continuous at $0$ with $\arcsin(0) = 0$, as $x \to 0$ we have $y \to 0$. Therefore:
$$\frac{\arcsin x}{x} = \frac{y}{\sin y} = \left(\frac{\sin y}{y}\right)^{-1} \to 1^{-1} = 1. \ \blacksquare$$

*Similarly* $\lim_{x \to 0}(\arctan x)/x = 1$ by substituting $y = \arctan x$ and $x = \tan y$.

### Exponential and Logarithmic limits

$$\boxed{\ \lim_{x \to 0} \frac{e^x - 1}{x} = 1\ }$$

**Proof (from the series definition).**

**Setup.** We adopt the power series definition $e^x = \sum_{n=0}^{\infty} \frac{x^n}{n!} = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \cdots$, valid for all $x \in \mathbb{R}$ (the series has infinite radius of convergence, by the ratio test).

**Computation.** For $x \neq 0$:
$$\frac{e^x - 1}{x} = \frac{1}{x}\left(\sum_{n=1}^\infty \frac{x^n}{n!}\right) = \sum_{n=1}^\infty \frac{x^{n-1}}{n!} = 1 + \frac{x}{2!} + \frac{x^2}{3!} + \frac{x^3}{4!} + \cdots$$

**Bound the tail.** For $|x| \leq 1$:
$$\left|\frac{e^x - 1}{x} - 1\right| = \left|\sum_{n=2}^\infty \frac{x^{n-1}}{n!}\right| \leq \sum_{n=2}^\infty \frac{|x|^{n-1}}{n!} \leq |x| \sum_{n=2}^\infty \frac{1}{n!} \leq |x|(e - 2).$$

**$\varepsilon$-$\delta$ finish.** Given $\varepsilon > 0$, take $\delta = \min(1, \varepsilon/(e-2))$ (or just $\varepsilon$ — the exact constant doesn't matter). Then for $0 < |x| < \delta$:
$$\left|\frac{e^x - 1}{x} - 1\right| < \varepsilon. \ \blacksquare$$

**Verification.** Alternatively, the series $1 + x/2! + x^2/3! + \cdots$ has infinite radius of convergence and hence defines a continuous function of $x$; evaluating at $x = 0$ gives $1$. The limit thus equals $1$.

**Interpretation.** This is exactly $\exp'(0) = 1$ — the defining property that distinguishes $e$ from other bases. Using other definitions:
- **Limit definition:** $e = \lim_{n\to\infty}(1 + 1/n)^n$.
- **Series definition:** $e = \sum_{n=0}^{\infty} 1/n!$.
- **ODE definition:** $y = e^x$ is the unique solution to $y' = y$, $y(0) = 1$.

All three are equivalent, and each makes $\lim (e^x - 1)/x = 1$ either a consequence or a definition.

---

$$\boxed{\ \lim_{x \to 0} \frac{\ln(1+x)}{x} = 1\ }$$

**Proof (via inversion).**

**Setup.** $\ln$ is the inverse of $\exp$. Substitute $y = \ln(1 + x)$, i.e., $x = e^y - 1$.

**Continuity of the substitution.** Since $\ln$ is continuous at $1$ with $\ln(1) = 0$, we have $x \to 0 \Leftrightarrow y \to 0$. (Injectivity of $\ln$ on $(0, \infty)$ ensures the biconditional.)

**Computation.**
$$\frac{\ln(1+x)}{x} = \frac{y}{e^y - 1} = \left(\frac{e^y - 1}{y}\right)^{-1} \xrightarrow{y \to 0} \left(1\right)^{-1} = 1. \ \blacksquare$$

**Verification.** We used continuity of $z \mapsto 1/z$ at $z = 1$, allowing the reciprocal to pass through the limit.

---

$$\lim_{x \to \infty} \left(1 + \frac{1}{x}\right)^x = e, \qquad \lim_{x \to 0} (1 + x)^{1/x} = e.$$

**Proof.**

**Step 1 (sequence version, Bernoulli).** Define $a_n = (1 + 1/n)^n$. By the monotone convergence theorem applied to $(a_n)$ (one proves $a_n$ is increasing, bounded above by $3$), the limit $\lim a_n$ exists; call it $e$. [Standard argument; see [[09-convergence-and-limits]].]

**Step 2 (from sequence to function).** We show $\lim_{x \to \infty} (1 + 1/x)^x = e$. For $x > 1$, let $n = \lfloor x \rfloor$ so $n \leq x < n + 1$ and $n \to \infty$ as $x \to \infty$. Then:
$$\left(1 + \frac{1}{n+1}\right)^n \leq \left(1 + \frac{1}{x}\right)^x \leq \left(1 + \frac{1}{n}\right)^{n+1}.$$
*Justification.* $1 + 1/x$ is decreasing in $x$, and $x \mapsto t^x$ is increasing for $t > 1$; combining:
- $1 + 1/(n+1) \leq 1 + 1/x \leq 1 + 1/n$, so raising to $x \in [n, n+1]$:
  - Upper: $(1+1/x)^x \leq (1+1/n)^x \leq (1+1/n)^{n+1}$.
  - Lower: $(1+1/x)^x \geq (1+1/(n+1))^x \geq (1+1/(n+1))^n$.

**Step 3 (squeeze).** As $n \to \infty$:
$$\left(1 + \frac{1}{n+1}\right)^n = \frac{(1 + 1/(n+1))^{n+1}}{1 + 1/(n+1)} \to \frac{e}{1} = e.$$
$$\left(1 + \frac{1}{n}\right)^{n+1} = \left(1 + \frac{1}{n}\right)^n \cdot \left(1 + \frac{1}{n}\right) \to e \cdot 1 = e.$$

By the squeeze theorem, $\lim_{x \to \infty}(1+1/x)^x = e$.

**Step 4 (the reciprocal form).** Substitute $u = 1/x$: as $x \to 0^+$, $u \to \infty$, so
$$(1 + x)^{1/x} = \left(1 + \frac{1}{u}\right)^u \to e.$$
For the left limit, $(1+x)^{1/x}$ as $x \to 0^-$ requires $x > -1$ (so the base is positive); substitute $u = 1/x \to -\infty$, and a parallel argument gives $e$. $\blacksquare$

**Corollary 18.C.** $\lim_{x \to \infty}(1 + a/x)^x = e^a$ for any $a \in \mathbb{R}$.

**Proof.** If $a = 0$, trivial. If $a \neq 0$, substitute $u = x/a$ so $x = au$:
$$\left(1 + \frac{a}{x}\right)^x = \left(1 + \frac{1}{u}\right)^{au} = \left[\left(1 + \frac{1}{u}\right)^u\right]^a.$$
As $x \to \infty$, $u \to \infty$ if $a > 0$ (or $u \to -\infty$ if $a < 0$; the limit $(1+1/u)^u \to e$ holds in both cases by the same monotonicity). The inner bracket $\to e$, and the continuous map $z \mapsto z^a$ gives the limit $e^a$. $\blacksquare$

### Power-Exponential Rate Comparisons

$$\lim_{x \to \infty} \frac{x^p}{e^x} = 0 \quad (\text{any } p > 0).$$

**Proof.**

**Setup.** We exploit that the exponential series $e^x = \sum_{k \geq 0} x^k / k!$ dominates each individual term.

**Step 1.** Fix $p > 0$. Choose an integer $n$ with $n + 1 > p$, i.e. $n > p - 1$; for instance $n = \lceil p \rceil$.

**Step 2 (term bound).** For $x > 0$, all terms of the series are positive, so in particular keeping only the $(n+1)$-st term:
$$e^x \ \geq\ \frac{x^{n+1}}{(n+1)!}.$$

**Step 3 (ratio bound).** Divide:
$$0 \ <\ \frac{x^p}{e^x} \ \leq\ \frac{x^p (n+1)!}{x^{n+1}} \ =\ (n+1)! \cdot x^{p - n - 1}.$$

**Step 4 (to zero).** Since $n + 1 > p$, the exponent $p - n - 1 < 0$, hence $x^{p-n-1} \to 0$ as $x \to \infty$ (by $\lim 1/x^q = 0$ for $q > 0$, proven above). Multiplying by the constant $(n+1)!$ preserves this.

**Step 5 (squeeze).** By squeeze with $0 \leq x^p/e^x \leq (n+1)! x^{p-n-1}$, we get $x^p/e^x \to 0$. $\blacksquare$

---

$$\lim_{x \to \infty} \frac{\ln x}{x^p} = 0 \quad (\text{any } p > 0).$$

**Proof.**

**Strategy.** Substitute to reduce to the previous result.

Let $y = \ln x$, so $x = e^y$ and $y \to \infty$ as $x \to \infty$ (this is the content of $\lim_{x \to \infty} \ln x = +\infty$). Then:
$$\frac{\ln x}{x^p} = \frac{y}{e^{py}} = \frac{1}{p} \cdot \frac{py}{e^{py}}.$$
Let $z = py \to \infty$. So
$$\frac{\ln x}{x^p} = \frac{1}{p} \cdot \frac{z}{e^z} \to \frac{1}{p} \cdot 0 = 0,$$
using the case $p = 1$ of $\lim x^p/e^x = 0$. $\blacksquare$

**Alternative direct proof.** Use $\ln t \leq 2\sqrt{t}$ (proven in §18.1). For any $p > 0$, pick $q = \min(p/2, 1/2) > 0$. Then $\ln x \leq 2 x^q / q$ for large $x$ (after adjusting the constant — we sketch: apply the $\sqrt{}$-bound to $x^{p/(2q)}$, yielding $\ln x \leq \frac{1}{q}\ln(x^q) \leq \frac{2}{q}\sqrt{x^q} \cdot \frac{1}{q} = \frac{2}{q^2} x^{q/2}$ which we can absorb). Thus $\ln x / x^p \leq (\text{const}) \cdot x^{q - p} \to 0$ because $q < p$.

---

> **Theorem 18.D (Rate hierarchy at infinity).** As $x \to \infty$:
> $$\ln x \ \ll\ x^p \ \ll\ e^{qx} \ \ll\ x!$$
> for any $p > 0$, $q > 0$ (where $x!$ means $\Gamma(x+1)$ or restricted to integers), and "$f \ll g$" means $f(x)/g(x) \to 0$.

This single hierarchy captures why L'Hôpital so often evaluates indeterminate forms: in a quotient of two such functions, the denominator "eats" the numerator.

### Power Rules

$$\lim_{x \to 0} \frac{(1+x)^\alpha - 1}{x} = \alpha \quad (\text{any } \alpha \in \mathbb{R}).$$

**Proof.**

**Setup.** Write $(1 + x)^\alpha = \exp(\alpha \ln(1 + x))$. This is valid for $x > -1$.

**Computation.** For $x \neq 0$:
$$\frac{(1+x)^\alpha - 1}{x} = \frac{e^{\alpha \ln(1+x)} - 1}{x}.$$
Let $y = \alpha \ln(1 + x)$. As $x \to 0$, $\ln(1+x) \to 0$, so $y \to 0$. Writing
$$\frac{e^y - 1}{x} = \frac{e^y - 1}{y} \cdot \frac{y}{x} = \frac{e^y - 1}{y} \cdot \alpha \cdot \frac{\ln(1 + x)}{x}.$$

**Pass to limits.** Each factor has a known limit:
- $(e^y - 1)/y \to 1$ as $y \to 0$.
- $\alpha$ is constant.
- $\ln(1 + x)/x \to 1$ as $x \to 0$.

Product rule (for finite limits): $\frac{(1+x)^\alpha - 1}{x} \to 1 \cdot \alpha \cdot 1 = \alpha. \ \blacksquare$

**Interpretation.** This encodes the derivative $((1+x)^\alpha)'|_{x=0} = \alpha$. Equivalently, the binomial expansion $(1 + x)^\alpha = 1 + \alpha x + \binom{\alpha}{2} x^2 + \cdots$ is first-order $1 + \alpha x + O(x^2)$.

---

## 18.4 Algebra of Limits — Infinity Version

For limits that are $\pm\infty$, careful case analysis is needed. The *algebra of limits* theorem (sums, products, quotients) continues to hold when all limits are finite and denominators are nonzero. For infinite limits, there are definite rules and indeterminate forms.

> **Theorem 18.E (Rules for infinite limits).** Let $\lim f = \alpha$ and $\lim g = \beta$ in the extended sense. Then whenever the result is well-defined:
>
> | Operation | Value | Condition |
> |---|---|---|
> | $\alpha + \beta$ | $+\infty$ | $\alpha = +\infty, \beta \in \mathbb{R} \cup \{+\infty\}$ |
> | $\alpha + \beta$ | $-\infty$ | $\alpha = -\infty, \beta \in \mathbb{R} \cup \{-\infty\}$ |
> | $\alpha \cdot \beta$ | $+\infty$ | $\alpha = +\infty$, $\beta > 0$ (or $\alpha > 0$, $\beta = +\infty$) |
> | $\alpha \cdot \beta$ | $-\infty$ | $\alpha = +\infty$, $\beta < 0$ |
> | $\alpha / \beta$ | $0$ | $\alpha \in \mathbb{R}$, $\beta = \pm\infty$ |
> | $\alpha / \beta$ | $+\infty$ | $\alpha > 0$, $\beta = 0^+$ |
> | $\alpha / \beta$ | $-\infty$ | $\alpha > 0$, $\beta = 0^-$ |

*Here $0^+$ means $f(x) \to 0$ through positive values.*

> **Indeterminate forms.** The following forms **cannot** be evaluated from the limit forms alone:
> $$\infty - \infty,\quad 0 \cdot \infty,\quad \frac{\infty}{\infty},\quad \frac{0}{0},\quad 1^\infty,\quad 0^0,\quad \infty^0.$$
> The limit depends on *how fast* the factors approach their limit values. L'Hôpital's rule (see [[24-lhopital-vector-derivatives]]) and the standard limits of §18.3 handle most of these.

**Example: why $\infty - \infty$ is indeterminate.**
- $f(x) = x + 1$, $g(x) = x$: $f - g \to 1$.
- $f(x) = 2x$, $g(x) = x$: $f - g = x \to \infty$.
- $f(x) = x$, $g(x) = x + \sin x$: $f - g = -\sin x$, no limit.

Same form, any answer. Indeterminacy is real.

**Conversion between indeterminate forms.** Many indeterminate forms convert to others:
- $0 \cdot \infty$: write $f \cdot g = f / (1/g)$, now $\frac{0}{0}$ (or $\frac{\infty}{\infty}$).
- $\infty - \infty$: factor out, or find common denominator.
- $1^\infty, 0^0, \infty^0$: take $\ln$, getting $\infty \cdot 0$ or $0 \cdot \infty$, then $0/0$ or $\infty/\infty$.

---

## 18.5 The Squeeze (Sandwich) Theorem

The single most-used technique for establishing limits, especially those involving trigonometric functions where the variable appears inside a bounded oscillation.

> **Theorem 18.5 (Squeeze theorem for function limits).** Let $f, g, h$ be defined on a deleted neighbourhood of $a$ with
> $$f(x) \leq g(x) \leq h(x)$$
> on that neighbourhood. If $\lim_{x \to a} f(x) = \lim_{x \to a} h(x) = L$, then $\lim_{x \to a} g(x) = L$.

**Proof.**

1. Let $\varepsilon > 0$ be given.
2. Since $\lim_{x \to a} f = L$, there exists $\delta_1 > 0$ with $0 < |x-a| < \delta_1 \Rightarrow |f(x) - L| < \varepsilon$, i.e. $L - \varepsilon < f(x) < L + \varepsilon$.
3. Since $\lim_{x \to a} h = L$, there exists $\delta_2 > 0$ with $0 < |x - a| < \delta_2 \Rightarrow L - \varepsilon < h(x) < L + \varepsilon$.
4. Let $\delta = \min(\delta_1, \delta_2, \delta_0)$ where $\delta_0$ is a positive radius on which $f \leq g \leq h$ holds. Then for $0 < |x - a| < \delta$:
   $$L - \varepsilon < f(x) \leq g(x) \leq h(x) < L + \varepsilon,$$
   so $|g(x) - L| < \varepsilon$.
5. By definition, $\lim_{x \to a} g(x) = L$. $\blacksquare$

**Variants.** The squeeze theorem holds equally for:

- $a = \pm\infty$: replace "$0 < |x - a| < \delta$" with "$x > M$" or "$x < M$"; all else is identical.
- $L = +\infty$: reduces to "$f \leq g$ with $f \to +\infty$ implies $g \to +\infty$". Proof: given $K > 0$, find $\delta$ so that $0 < |x - a| < \delta \Rightarrow f(x) > K$; then $g(x) \geq f(x) > K$.
- $L = -\infty$: symmetric, using upper bound $h \to -\infty$.

**Worked example of squeeze.** Show $\lim_{x \to 0} x^2 \sin(1/x) = 0$.

*Setup.* $\sin$ is bounded: $|\sin(1/x)| \leq 1$ for $x \neq 0$.

*Bound.* $|x^2 \sin(1/x)| \leq x^2 \cdot 1 = x^2$, so
$$-x^2 \leq x^2 \sin(1/x) \leq x^2.$$

*Squeeze.* Both $\pm x^2 \to 0$ as $x \to 0$, hence $x^2 \sin(1/x) \to 0$. $\blacksquare$

This example shows how squeeze tames oscillation: $\sin(1/x)$ itself has *no* limit at $0$ (it oscillates densely in $[-1, 1]$), but multiplied by a factor going to $0$ it is forced to $0$.

---

## 18.6 Continuity and Asymptotics

> **Definition 18.6 (Asymptotes).** Let $f: D \to \mathbb{R}$ be a real-valued function.
> - $y = L$ is a **horizontal asymptote** of $y = f(x)$ if $\lim_{x \to \infty} f(x) = L$ or $\lim_{x \to -\infty} f(x) = L$.
> - $x = a$ is a **vertical asymptote** of $y = f(x)$ if at least one of $\lim_{x \to a^+} f(x)$ or $\lim_{x \to a^-} f(x)$ is $\pm\infty$.
> - $y = mx + b$ is a **slant (oblique) asymptote** at $+\infty$ if $\lim_{x \to \infty} [f(x) - (mx + b)] = 0$ with $m \neq 0$; similarly at $-\infty$.

**Algorithm to find a slant asymptote.**

Suppose $f(x) - (mx + b) \to 0$. Then:

1. $m = \lim_{x \to \infty} \frac{f(x)}{x}$. (*Proof:* $f(x)/x = m + b/x + (f(x) - mx - b)/x$; each of the last two terms $\to 0$, so $f(x)/x \to m$.)
2. $b = \lim_{x \to \infty} [f(x) - mx]$. (Once $m$ is known.)

Both limits must exist (as finite reals) for a slant asymptote to exist; if $m = 0$ the asymptote is horizontal instead.

**Remark on direction.** Asymptotes at $+\infty$ and $-\infty$ may differ. E.g. $f(x) = \sqrt{x^2 + 1}$ has slant asymptote $y = x$ as $x \to +\infty$ and $y = -x$ as $x \to -\infty$ (since for $x < 0$, $\sqrt{x^2 + 1} \sim |x| = -x$).

**Geometric meaning.** An asymptote is a line (or, more generally, a curve) that the graph of $f$ approaches: the vertical distance between $(x, f(x))$ and the asymptote goes to zero as $x$ tends to the relevant infinity (or the graph blows up vertically at a vertical asymptote).

---

## 18.7 Worked Examples

**Example 1.** Compute $\displaystyle\lim_{x \to 0} \frac{\tan x - \sin x}{x^3}$.

**Setup.** Form is $0/0$. We rewrite to exhibit standard limits.

**Strategy.** Factor $\sin x$ out of the numerator:
$$\tan x - \sin x = \frac{\sin x}{\cos x} - \sin x = \sin x \left(\frac{1}{\cos x} - 1\right) = \sin x \cdot \frac{1 - \cos x}{\cos x}.$$

**Computation.**
$$\frac{\tan x - \sin x}{x^3} = \frac{\sin x}{x} \cdot \frac{1 - \cos x}{x^2} \cdot \frac{1}{\cos x}.$$

Each factor is a known limit as $x \to 0$:
- $\sin x / x \to 1$,
- $(1 - \cos x)/x^2 \to 1/2$,
- $1/\cos x \to 1$ (continuity at $0$).

Multiplying:
$$\lim_{x \to 0} \frac{\tan x - \sin x}{x^3} = 1 \cdot \frac{1}{2} \cdot 1 = \frac{1}{2}.$$

**Verification.** Taylor expansion: $\tan x = x + x^3/3 + O(x^5)$, $\sin x = x - x^3/6 + O(x^5)$, difference $= x^3/3 + x^3/6 = x^3/2 + O(x^5)$, divide by $x^3$: $1/2 + O(x^2) \to 1/2$. Matches.

**Interpretation.** The leading difference $\tan x - \sin x$ is **cubic** at $0$; the coefficient $1/2$ quantifies how fast $\tan$ "pulls away" from $\sin$ near zero. $\blacksquare$

---

**Example 2.** Compute $\displaystyle\lim_{x \to \infty} \left(\frac{x+1}{x-1}\right)^x$.

**Setup.** Form is $1^\infty$ — indeterminate. Rewrite the base in the form $1 + \text{small}$ and match to $(1 + a/n)^n \to e^a$.

**Rewriting the base.**
$$\frac{x + 1}{x - 1} = \frac{(x - 1) + 2}{x - 1} = 1 + \frac{2}{x - 1}.$$

**Strategy.** Raise to a power matching the denominator $(x-1)/2$, which is the standard form:
$$\left(1 + \frac{2}{x-1}\right)^x = \left[\left(1 + \frac{2}{x-1}\right)^{(x-1)/2}\right]^{2x/(x-1)}.$$

**Computation of the inner limit.** Let $u = (x-1)/2$; as $x \to \infty$, $u \to \infty$. Then
$$\left(1 + \frac{2}{x-1}\right)^{(x-1)/2} = \left(1 + \frac{1}{u}\right)^u \to e.$$

**Computation of the outer exponent.**
$$\frac{2x}{x - 1} = \frac{2}{1 - 1/x} \to \frac{2}{1 - 0} = 2.$$

**Combining.** The map $(z, w) \mapsto z^w$ is continuous at $(e, 2)$ (since $e > 0$), so the iterated limit equals $e^2$.

**Verification.** Take logs: $x \ln((x+1)/(x-1)) = x \cdot \ln(1 + 2/(x-1))$. Using $\ln(1 + y) = y - y^2/2 + O(y^3)$ with $y = 2/(x-1)$:
$$x \cdot \left(\frac{2}{x-1} - \frac{2}{(x-1)^2} + O(1/x^3)\right) = \frac{2x}{x-1} - \frac{2x}{(x-1)^2} + O(1/x^2).$$
First term $\to 2$, second term $\to 0$, rest $\to 0$. So the log of the expression $\to 2$, and the expression $\to e^2$. $\blacksquare$

---

**Example 3.** Compute $\displaystyle\lim_{x \to \infty} \left(\sqrt{x^2 + x + 1} - x\right)$.

**Setup.** Form $\infty - \infty$. Rationalise by multiplying by the conjugate.

**Computation.**
$$\sqrt{x^2 + x + 1} - x = \frac{(\sqrt{x^2 + x + 1} - x)(\sqrt{x^2+x+1} + x)}{\sqrt{x^2+x+1} + x} = \frac{(x^2 + x + 1) - x^2}{\sqrt{x^2+x+1} + x} = \frac{x + 1}{\sqrt{x^2+x+1} + x}.$$

**Normalise.** For $x > 0$, divide numerator and denominator by $x$ (note $\sqrt{x^2+x+1}/x = \sqrt{1 + 1/x + 1/x^2}$ since $x > 0$ means $|x| = x$):
$$\frac{x+1}{\sqrt{x^2+x+1} + x} = \frac{1 + 1/x}{\sqrt{1 + 1/x + 1/x^2} + 1}.$$

**Pass to the limit.** As $x \to \infty$:
$$\frac{1 + 0}{\sqrt{1 + 0 + 0} + 1} = \frac{1}{2}. \ \blacksquare$$

**Interpretation.** $\sqrt{x^2 + x + 1} \approx x\sqrt{1 + 1/x} \approx x(1 + 1/(2x)) = x + 1/2$ for large $x$ (via $\sqrt{1+u} \approx 1 + u/2$). So $\sqrt{x^2 + x + 1} - x \to 1/2$; the $+1$ under the root contributes to higher order and disappears.

---

**Example 4.** Find all asymptotes of $\displaystyle f(x) = \frac{x^2 + 1}{x - 1}$.

**Setup.** Rational function; domain $\mathbb{R} \setminus \{1\}$.

**Step 1 (vertical asymptotes).** Vertical asymptotes occur where the denominator vanishes and the numerator does not (so the function genuinely blows up, rather than reducing to a removable singularity). $x - 1 = 0 \Leftrightarrow x = 1$; at $x = 1$ the numerator is $1^2 + 1 = 2 \neq 0$.

*Left-hand limit.* As $x \to 1^-$: numerator $\to 2 > 0$, denominator $\to 0^-$ (negative values), so $f(x) \to -\infty$.

*Right-hand limit.* As $x \to 1^+$: numerator $\to 2 > 0$, denominator $\to 0^+$, so $f(x) \to +\infty$.

Hence $x = 1$ is a vertical asymptote (two-sided, with opposite signs).

**Step 2 (horizontal/slant asymptotes).** Polynomial division:
$$\frac{x^2 + 1}{x - 1}.$$
Divide $x^2 + 1$ by $x - 1$: $x^2 \div x = x$, remainder $x^2 - x(x-1) = x$. Now $x + 1 \div x - 1$: $x \div x = 1$, remainder $x + 1 - (x - 1) = 2$. So:
$$\frac{x^2 + 1}{x - 1} = x + 1 + \frac{2}{x - 1}.$$

As $x \to \pm\infty$, $2/(x-1) \to 0$. Hence:
$$f(x) - (x + 1) \to 0 \quad \text{as } x \to \pm\infty.$$

So $y = x + 1$ is a **slant asymptote** at both $+\infty$ and $-\infty$.

*No horizontal asymptote:* since the slant has slope $1 \neq 0$, $f \to \pm\infty$ as $x \to \pm\infty$.

**Summary.** Vertical: $x = 1$. Slant: $y = x + 1$ (both directions). No horizontal. $\blacksquare$

**Verification.** Sketch: as $x \to +\infty$, $f(x) = x + 1 + (\text{small positive})$, so the graph lies slightly above $y = x + 1$; as $x \to -\infty$, $2/(x-1) < 0$, graph lies slightly below. Consistent with a hyperbola.

---

**Example 5.** Show $\displaystyle \lim_{x \to 0^+} x \ln x = 0$.

**Setup.** Form $0 \cdot (-\infty)$ (since $\ln x \to -\infty$ as $x \to 0^+$).

**Strategy.** Substitute $u = 1/x$ to convert to a known rate comparison.

**Computation.** Let $u = 1/x$. As $x \to 0^+$, $u \to +\infty$. Then
$$x \ln x = \frac{1}{u} \ln\left(\frac{1}{u}\right) = \frac{1}{u} \cdot (- \ln u) = -\frac{\ln u}{u}.$$

**Known limit.** $\lim_{u \to \infty} (\ln u)/u = 0$ (Theorem 18.B).

**Conclusion.** $\lim_{x \to 0^+} x \ln x = -\lim_{u \to \infty} (\ln u)/u = -0 = 0$. $\blacksquare$

**Consequence: $0^0$ convention.** For $x > 0$ one has $x^x = e^{x \ln x}$. Therefore
$$\lim_{x \to 0^+} x^x = \lim_{x \to 0^+} e^{x \ln x} = e^0 = 1$$
(using continuity of $\exp$). This justifies the convention $0^0 = 1$ in calculus and combinatorics, where it makes many formulas uniform (e.g. the empty product). Note: as an indeterminate form in limits, $0^0$ can take other values; the convention refers to the specific case where *both* base and exponent approach $0$ in the simplest way.

---

## 18.8 Practice Problems

1. Compute $\lim_{x \to 0} \dfrac{\sin(ax)}{\sin(bx)}$ for $a, b \in \mathbb{R}$, $b \neq 0$.
2. Compute $\lim_{x \to \infty} x\left(\sqrt{x^2 + 1} - \sqrt{x^2 - 1}\right)$.
3. Compute $\lim_{x \to 0} \dfrac{a^x - 1}{x}$ for $a > 0$.
4. Find all asymptotes of $g(x) = \sqrt{x^2 + 2x}$.
5. Prove that $\lim_{x \to 0^+} x^\alpha \ln x = 0$ for every $\alpha > 0$.

---

### Solutions

**Solution 1.** Evaluate $\displaystyle \lim_{x \to 0} \frac{\sin(ax)}{\sin(bx)}$.

**Setup.** Both numerator and denominator $\to 0$, so form $0/0$.

**Case $a = 0$:** numerator $\equiv 0$, so the limit is $0$ (for $b \neq 0$).

**Case $a \neq 0$ (and $b \neq 0$).** Insert factors of $ax$ and $bx$ to invoke $\sin u / u \to 1$:
$$\frac{\sin(ax)}{\sin(bx)} = \frac{\sin(ax)}{ax} \cdot \frac{bx}{\sin(bx)} \cdot \frac{ax}{bx} = \underbrace{\frac{\sin(ax)}{ax}}_{\to 1} \cdot \underbrace{\frac{bx}{\sin(bx)}}_{\to 1} \cdot \frac{a}{b}.$$

**Verification of each factor.** As $x \to 0$:
- $ax \to 0$, so $\sin(ax)/(ax) \to 1$ (by $\sin u/u \to 1$ with $u = ax$).
- $bx \to 0$, so $\sin(bx)/(bx) \to 1$, hence the reciprocal $bx / \sin(bx) \to 1$.
- $a/b$ is constant.

**Product.** $1 \cdot 1 \cdot (a/b) = a/b$.

**Conclusion.**
$$\lim_{x \to 0} \frac{\sin(ax)}{\sin(bx)} = \frac{a}{b} \qquad (\text{and } 0 \text{ if } a = 0). \ \blacksquare$$

**Interpretive remark.** For small $x$, $\sin(ax) \approx ax$ (first-order Taylor), so the ratio of sines equals the ratio of the arguments.

---

**Solution 2.** Evaluate $\displaystyle \lim_{x \to \infty} x(\sqrt{x^2 + 1} - \sqrt{x^2 - 1})$.

**Setup.** Form $\infty \cdot 0$, or equivalently after distributing $\infty - \infty$. Rationalise.

**Step 1 (conjugate).**
$$\sqrt{x^2+1} - \sqrt{x^2-1} = \frac{(x^2 + 1) - (x^2 - 1)}{\sqrt{x^2 + 1} + \sqrt{x^2 - 1}} = \frac{2}{\sqrt{x^2 + 1} + \sqrt{x^2 - 1}}.$$

**Step 2 (substitute back).**
$$x\bigl(\sqrt{x^2+1} - \sqrt{x^2-1}\bigr) = \frac{2x}{\sqrt{x^2 + 1} + \sqrt{x^2 - 1}}.$$

**Step 3 (normalise).** For $x > 0$, divide numerator and denominator by $x$ (note $\sqrt{x^2 \pm 1}/x = \sqrt{1 \pm 1/x^2}$ since $|x| = x$):
$$\frac{2x}{\sqrt{x^2 + 1} + \sqrt{x^2 - 1}} = \frac{2}{\sqrt{1 + 1/x^2} + \sqrt{1 - 1/x^2}}.$$

**Step 4 (pass to the limit).** As $x \to \infty$, $1/x^2 \to 0$, and the square roots are continuous at $1$:
$$\frac{2}{\sqrt{1 + 0} + \sqrt{1 - 0}} = \frac{2}{1 + 1} = 1.$$

**Conclusion.** $\lim_{x \to \infty} x(\sqrt{x^2+1} - \sqrt{x^2-1}) = 1$. $\blacksquare$

**Verification (Taylor).** For large $x$, $\sqrt{x^2 \pm 1} = x\sqrt{1 \pm 1/x^2} \approx x(1 \pm 1/(2x^2))$, difference $\approx x \cdot 1/x^2 = 1/x$, multiplied by $x$: $\to 1$. ✓

---

**Solution 3.** Evaluate $\displaystyle \lim_{x \to 0} \frac{a^x - 1}{x}$ for $a > 0$.

**Setup.** Form $0/0$. Reduce to $e$ via $a = e^{\ln a}$.

**Case $a = 1$:** numerator $\equiv 0$; limit is $0 = \ln 1$.

**Case $a \neq 1$ (so $\ln a \neq 0$).** Write
$$a^x = e^{x \ln a}.$$

Then, multiplying and dividing by $\ln a$:
$$\frac{a^x - 1}{x} = \frac{e^{x \ln a} - 1}{x} = \frac{e^{x \ln a} - 1}{x \ln a} \cdot \ln a.$$

**Substitution.** Let $y = x \ln a$; as $x \to 0$, $y \to 0$ (since $\ln a \neq 0$).
$$\frac{e^{x \ln a} - 1}{x \ln a} = \frac{e^y - 1}{y} \to 1.$$

**Product.** $\frac{a^x - 1}{x} \to 1 \cdot \ln a = \ln a$.

**Unified answer.** $\lim_{x \to 0} (a^x - 1)/x = \ln a$ for all $a > 0$ (the case $a = 1$ gives $\ln 1 = 0$). $\blacksquare$

**Interpretation.** This is $(a^x)'|_{x = 0} = a^0 \ln a = \ln a$, the general derivative formula for exponentials.

---

**Solution 4.** Find all asymptotes of $g(x) = \sqrt{x^2 + 2x}$.

**Setup.** Find the domain first. $x^2 + 2x = x(x + 2) \geq 0 \Leftrightarrow x \leq -2$ or $x \geq 0$. So
$$\operatorname{dom}(g) = (-\infty, -2] \cup [0, \infty).$$

**Step 1 (vertical asymptotes).** $g$ is continuous on its domain, and at the boundary points $g(-2) = 0$ and $g(0) = 0$ are finite. No vertical blow-up anywhere. **No vertical asymptotes.**

**Step 2 (horizontal?).** As $x \to \pm\infty$, $g(x) \to +\infty$ (the argument $x^2 + 2x \sim x^2$ is unbounded). **No horizontal asymptotes.**

**Step 3 (slant as $x \to +\infty$).**

*Slope.* For $x > 0$:
$$m = \lim_{x \to \infty} \frac{g(x)}{x} = \lim_{x \to \infty} \frac{\sqrt{x^2 + 2x}}{x} = \lim_{x \to \infty} \sqrt{\frac{x^2 + 2x}{x^2}} = \lim_{x \to \infty} \sqrt{1 + 2/x} = \sqrt{1} = 1.$$

*Intercept.*
$$b = \lim_{x \to \infty}\bigl(\sqrt{x^2+2x} - x\bigr).$$
Rationalise:
$$\sqrt{x^2+2x} - x = \frac{(x^2+2x) - x^2}{\sqrt{x^2+2x}+x} = \frac{2x}{\sqrt{x^2+2x}+x}.$$
Divide by $x$ (positive):
$$\frac{2}{\sqrt{1 + 2/x} + 1} \to \frac{2}{1 + 1} = 1.$$

**Slant asymptote as $x \to +\infty$:** $y = x + 1$.

**Step 4 (slant as $x \to -\infty$).** Care: for $x < 0$, $|x| = -x$, so $\sqrt{x^2} = |x| = -x$.

*Slope.* For $x < 0$:
$$\frac{\sqrt{x^2 + 2x}}{x} = \frac{|x|\sqrt{1 + 2/x}}{x} = \frac{-x \sqrt{1 + 2/x}}{x} = -\sqrt{1 + 2/x}.$$
As $x \to -\infty$, $2/x \to 0^-$, so $\sqrt{1 + 2/x} \to 1$. Hence $m = -1$.

*Intercept.* $b = \lim_{x \to -\infty}(\sqrt{x^2 + 2x} - (-x)) = \lim_{x \to -\infty}(\sqrt{x^2+2x} + x)$.

Rationalise — but here the conjugate is $\sqrt{x^2+2x} - x$, which for $x < 0$ is a *sum* of two quantities of the same sign ($\sqrt{\cdot} > 0, -x > 0$), so nonzero:
$$\sqrt{x^2+2x} + x = \frac{(x^2+2x) - x^2}{\sqrt{x^2+2x} - x} = \frac{2x}{\sqrt{x^2+2x} - x}.$$

For $x < 0$, divide by $x$ (negative), using $\sqrt{x^2+2x}/x = -\sqrt{1 + 2/x}$:
$$\frac{2x}{\sqrt{x^2+2x} - x} = \frac{2}{\sqrt{x^2+2x}/x - 1} = \frac{2}{-\sqrt{1 + 2/x} - 1}.$$
As $x \to -\infty$: $\to 2/(-1 - 1) = -1$. So $b = -1$.

**Slant asymptote as $x \to -\infty$:** $y = -x - 1$.

**Summary.** No vertical or horizontal asymptotes. Slant asymptote $y = x + 1$ at $+\infty$; slant $y = -x - 1$ at $-\infty$. $\blacksquare$

**Interpretation.** $g(x) = \sqrt{x(x+2)} = \sqrt{(x+1)^2 - 1}$. For $|x+1|$ large, $g \approx |x+1|$. So at $+\infty$, $g \approx x + 1$; at $-\infty$, $g \approx -(x+1) = -x - 1$. Matches.

---

**Solution 5.** Show $\displaystyle \lim_{x \to 0^+} x^\alpha \ln x = 0$ for every $\alpha > 0$.

**Setup.** Form $0 \cdot (-\infty)$ since $x^\alpha \to 0^+$ and $\ln x \to -\infty$.

**Substitution.** Let $u = 1/x$, so $u \to \infty$ as $x \to 0^+$. Then:
$$x^\alpha \ln x = \left(\frac{1}{u}\right)^\alpha \ln\left(\frac{1}{u}\right) = \frac{1}{u^\alpha} \cdot (-\ln u) = -\frac{\ln u}{u^\alpha}.$$

**Known limit (Theorem 18.B).** $\lim_{u \to \infty} (\ln u)/u^\alpha = 0$ for any $\alpha > 0$.

**Conclusion.**
$$\lim_{x \to 0^+} x^\alpha \ln x = -\lim_{u \to \infty} \frac{\ln u}{u^\alpha} = -0 = 0. \ \blacksquare$$

**Interpretation.** Polynomial decay at $0$ beats the logarithmic blow-up of $\ln x$; no matter how small $\alpha > 0$ is (however slowly $x^\alpha$ shrinks), $x^\alpha$ eventually overpowers $|\ln x|$. This is a dual to the hierarchy $\ln u \ll u^\alpha$ at infinity.

---

## 18.9 Asymptotic Notation

While computing limits gives exact values, **asymptotic notation** captures how functions compare *qualitatively* for large (or small) arguments. This is the language of analysis of algorithms, physics, and hard estimates.

> **Definition 18.F (Big-$O$, little-$o$, asymptotic equivalence).** Let $f, g$ be real-valued, with $g$ eventually nonzero on a neighbourhood of $a$ (where $a$ may be $\pm\infty$ or finite).
>
> - **Big-$O$:** $f(x) = O(g(x))$ as $x \to a$ iff there exist $C > 0$, $\delta > 0$ with $|f(x)| \leq C|g(x)|$ for $x$ near $a$ (with $0 < |x - a| < \delta$, or $x > M$ if $a = \infty$).
> - **Little-$o$:** $f(x) = o(g(x))$ as $x \to a$ iff $\lim_{x \to a} f(x)/g(x) = 0$.
> - **Asymptotic equivalence:** $f(x) \sim g(x)$ as $x \to a$ iff $\lim_{x \to a} f(x)/g(x) = 1$.

**Examples.**

- $\sin x = O(x)$ and $\sin x = x + O(x^3)$ as $x \to 0$.
- $\ln x = o(x^\alpha)$ for any $\alpha > 0$, as $x \to \infty$ (Thm 18.B).
- $(1 + 1/x)^x \sim e$ as $x \to \infty$. More precisely, $(1+1/x)^x = e(1 - 1/(2x) + O(1/x^2))$.
- $x + 1 \sim x$ as $x \to \infty$; $x + 1 \not\sim x$ as $x \to 0$ (the left side $\to 1$, right side $\to 0$, ratio $\to \infty$).

**Algebra of $O$ and $o$.**

- $O(g) + O(g) = O(g)$ (absorb into a larger constant).
- $O(g_1) \cdot O(g_2) = O(g_1 g_2)$.
- $o(g) + o(g) = o(g)$.
- $o(g) \subset O(g)$ (little-$o$ is strictly stronger).

**Relation to standard limits.** The catalogue of §18.3 can be rewritten asymptotically:
- $\sin x \sim x$ as $x \to 0$, more precisely $\sin x = x - x^3/6 + O(x^5)$.
- $1 - \cos x \sim x^2/2$ as $x \to 0$.
- $e^x - 1 \sim x$ as $x \to 0$.
- $\ln(1 + x) \sim x$ as $x \to 0$.
- $(1 + x)^\alpha \sim 1 + \alpha x$ in the sense $(1+x)^\alpha - 1 \sim \alpha x$.

These equivalences are precisely the standard limits, restated.

---

## 18.10 Summary Table of Key Limits

| Limit | Value | Technique |
|-------|-------|-----------|
| $\lim_{x \to 0} \sin x / x$ | $1$ | Geometric/sandwich |
| $\lim_{x \to 0} (1 - \cos x)/x^2$ | $1/2$ | $1-\cos = 2\sin^2(x/2)$ |
| $\lim_{x \to 0} \tan x / x$ | $1$ | $\tan = \sin/\cos$ |
| $\lim_{x \to 0} \arcsin x / x$ | $1$ | Inversion of $\sin$ |
| $\lim_{x \to 0} (e^x - 1)/x$ | $1$ | Power series / definition of $e$ |
| $\lim_{x \to 0} \ln(1+x)/x$ | $1$ | Inverse of $e^y - 1 \sim y$ |
| $\lim_{x \to \infty} (1 + 1/x)^x$ | $e$ | Monotone sequence + squeeze |
| $\lim_{x \to 0}(1 + x)^{1/x}$ | $e$ | Substitute $u = 1/x$ |
| $\lim_{x \to 0} ((1+x)^\alpha - 1)/x$ | $\alpha$ | $e^{\alpha \ln(1+x)}$ decomposition |
| $\lim_{x \to 0} (a^x - 1)/x$ | $\ln a$ | $a^x = e^{x \ln a}$ |
| $\lim_{x \to \infty} x^p / e^x$ | $0$ | Exp beats any polynomial |
| $\lim_{x \to \infty} \ln x / x^p$ | $0$ | Any polynomial beats log |
| $\lim_{x \to 0^+} x^\alpha \ln x$ | $0$ | Substitute $u = 1/x$ |
| $\lim_{x \to 0^+} x^x$ | $1$ | $x^x = e^{x \ln x}$, $x \ln x \to 0$ |

> **Universal technique.** Whenever you face an indeterminate form, the goal is to rearrange algebraically until you can apply one of these standard limits, a sandwich, or L'Hôpital's rule. **Memorise the values; learn to recognise them through disguises.** The most common disguises are:
> - Substitution ($u = $ something small/large);
> - Conjugate multiplication (for $\infty - \infty$ with radicals);
> - Logarithmic transformation (for $1^\infty$, $0^0$, $\infty^0$);
> - Factoring out the dominant term (for ratios as $x \to \pm\infty$);
> - Taylor expansion (for $0/0$ with analytic functions).

---

## Related Topics

- [[16-continuity]] — $\varepsilon$-$\delta$, sequential definition, algebra of finite limits.
- [[17-types-of-discontinuity-monotonic]] — classification of discontinuities; essential vs. jump vs. removable.
- [[20-ivt-and-connectedness]] — continuity on intervals; IVT.
- [[24-lhopital-vector-derivatives]] — L'Hôpital's rule for indeterminate forms; systematic treatment of $0/0$, $\infty/\infty$, and exponential indeterminacies.
- [[12-infinite-series-introduction]] — Taylor/power series underlying many limits; analyticity of $\exp$, $\sin$, $\cos$, $\ln$.
- [[09-convergence-and-limits]] — sequence analogs ($n \to \infty$ limits); monotone convergence; Cauchy criterion.
- [[08-supremum-infimum-completeness]] — completeness of $\mathbb{R}$, the foundation on which all these limits rest.

# 22. Differentiation

> **The central object.** The **derivative** converts a function at a point into its *instantaneous rate of change* — the limit of average rates of change over ever-shorter intervals. This single construction underpins differential calculus, ordinary and partial differential equations, dynamical systems, optimisation, and differential geometry.
>
> In this chapter we build the derivative rigorously as a limit of the **difference quotient**, prove that differentiability is strictly stronger than continuity, derive the algebra of derivatives (sum, constant-multiple, product, quotient), give a completely rigorous proof of the **chain rule** using Carathéodory's reformulation (handling the zero-denominator case carefully), compute the standard catalogue of derivatives, treat one-sided derivatives, prove **Fermat's interior-extremum theorem**, and establish **Darboux's theorem** — the striking fact that derivatives themselves satisfy an intermediate-value property even when they fail to be continuous.

---

## 22.1 The Definition of the Derivative

> **Definition 22.1 (Derivative at a point).**
> Let $E \subseteq \mathbb{R}$, let $f : E \to \mathbb{R}$, and let $a \in E$ be a **limit point** of $E$ (so that taking limits at $a$ through $E$ makes sense). We say that $f$ is **differentiable at $a$** if the limit
> $$f'(a) \;:=\; \lim_{h \to 0} \frac{f(a+h) - f(a)}{h}$$
> exists as a finite real number, where $h$ is restricted to nonzero real numbers with $a + h \in E$. The value $f'(a)$ is called the **derivative of $f$ at $a$**.
> If $f'(a)$ exists for every $a \in E$, the function $f' : E \to \mathbb{R}$ sending $a \mapsto f'(a)$ is called the **derivative function** (or simply the **derivative**) of $f$.

**Unpacking the definition (epsilon-delta form).** $f'(a) = L$ means:
$$\forall \varepsilon > 0,\; \exists \delta > 0 \;:\; 0 < |h| < \delta \text{ and } a + h \in E \;\Rightarrow\; \left|\frac{f(a+h)-f(a)}{h} - L\right| < \varepsilon.$$

That is, the **difference quotient** $\frac{f(a+h)-f(a)}{h}$ can be made arbitrarily close to $L$ by taking $h$ sufficiently small (but nonzero).

> **Equivalent form (substitution $x = a + h$).**
> $$f'(a) \;=\; \lim_{x \to a} \frac{f(x) - f(a)}{x - a}.$$
>
> The expression $\dfrac{f(x)-f(a)}{x-a}$ is the **slope of the secant line** through the points $(a, f(a))$ and $(x, f(x))$ on the graph of $f$. The derivative is the limit of these secant slopes as $x \to a$, which we interpret geometrically as the **slope of the tangent line** to the graph at $(a, f(a))$.

> **Linear approximation form.** $f$ is differentiable at $a$ with derivative $f'(a) = L$ if and only if there exists a function $r : E \to \mathbb{R}$ with $\lim_{x \to a} r(x) = 0$ and
> $$f(x) \;=\; f(a) + L\,(x - a) + r(x)(x - a) \qquad (x \in E).$$
> That is, the affine function $x \mapsto f(a) + L(x-a)$ approximates $f$ near $a$ with error $o(x - a)$.

*Proof of equivalence.* If $f'(a) = L$, set $r(x) := \frac{f(x)-f(a)}{x-a} - L$ for $x \neq a$ and $r(a) := 0$. Then $r(x) \to 0$ as $x \to a$ by definition, and a rearrangement gives the displayed formula. Conversely, if the displayed formula holds with $r(x) \to 0$, then for $x \neq a$:
$$\frac{f(x)-f(a)}{x-a} \;=\; L + r(x) \;\longrightarrow\; L \quad (x \to a). \qquad\blacksquare$$

> **Notation.** $f'(a)$ (Lagrange), $\dot f(a)$ (Newton, for time derivatives), $\dfrac{df}{dx}\Big|_a$ (Leibniz), $Df(a)$ (operator notation). All denote the same number.

---

## 22.2 Differentiability Implies Continuity

> **Theorem 22.2.** If $f : E \to \mathbb{R}$ is differentiable at $a \in E$ (with $a$ a limit point of $E$), then $f$ is continuous at $a$.

**Proof.** We must show $\lim_{x \to a} f(x) = f(a)$, equivalently $\lim_{x \to a}\bigl(f(x) - f(a)\bigr) = 0$.

*Step 1 (algebraic identity).* For $x \in E$ with $x \neq a$, multiply and divide by $x - a$:
$$f(x) - f(a) \;=\; \frac{f(x) - f(a)}{x - a} \cdot (x - a). \tag{$\ast$}$$

*Step 2 (factor-wise limits exist).*
- By hypothesis, $\displaystyle\lim_{x \to a} \frac{f(x) - f(a)}{x - a} = f'(a)$, a finite real number.
- Trivially, $\displaystyle\lim_{x \to a}(x - a) = 0$.

*Step 3 (product rule for limits).* Since both factors have finite limits, the algebra of limits applies:
$$\lim_{x \to a}\bigl(f(x) - f(a)\bigr) \;=\; \left(\lim_{x \to a} \frac{f(x)-f(a)}{x-a}\right) \cdot \left(\lim_{x \to a}(x - a)\right) \;=\; f'(a) \cdot 0 \;=\; 0.$$

*Step 4 (conclusion).* Hence $\lim_{x \to a} f(x) = f(a)$, which is exactly continuity of $f$ at $a$. $\blacksquare$

**Why this argument works — interpretation.** Differentiability controls the *rate* at which $f(x) - f(a) \to 0$: the identity $(\ast)$ shows that $f(x) - f(a)$ goes to zero *at least as fast as $x - a$* (times a bounded factor). Continuity merely requires it go to zero; differentiability is a strictly stronger condition.

> **The converse is false.** Continuous functions need not be differentiable.

**Canonical counterexample.** $f(x) = |x|$ is continuous on $\mathbb{R}$ (in particular at $0$), but not differentiable at $0$:
$$\lim_{h \to 0^+} \frac{|h| - 0}{h} = \lim_{h \to 0^+} \frac{h}{h} = 1, \qquad \lim_{h \to 0^-} \frac{|h| - 0}{h} = \lim_{h \to 0^-} \frac{-h}{h} = -1.$$
The two one-sided limits are unequal, so the two-sided limit does not exist, so $f'(0)$ does not exist. Geometrically, the graph of $|x|$ has a corner at the origin.

> **Weierstrass's pathology (1872).** There exist functions $W : \mathbb{R} \to \mathbb{R}$ that are continuous everywhere on $\mathbb{R}$ but differentiable **nowhere**. Weierstrass's original construction:
> $$W(x) \;=\; \sum_{n=0}^{\infty} a^n \cos(b^n \pi x), \qquad 0 < a < 1,\; b \text{ odd integer},\; ab > 1 + \tfrac{3\pi}{2}.$$
> The series converges uniformly by the Weierstrass $M$-test (majorised by $\sum a^n < \infty$), hence $W$ is continuous (uniform limit of continuous partial sums). One then shows that for every $x_0$ and every $n$, one can find $h$ as small as desired making the difference quotient larger in magnitude than $c \cdot (ab)^n \to \infty$. So no derivative can exist anywhere.

This shows that "most" continuous functions (in a precise Baire-category sense) are in fact nowhere differentiable — differentiability is a genuinely exceptional regularity condition.

---

## 22.3 The Algebra of Derivatives

> **Theorem 22.3 (Algebraic differentiation rules).** Let $f, g$ be differentiable at $a$, and let $c \in \mathbb{R}$. Then:
>
> **(i) Sum:** $f + g$ is differentiable at $a$ and $(f+g)'(a) = f'(a) + g'(a)$.
>
> **(ii) Constant multiple:** $cf$ is differentiable at $a$ and $(cf)'(a) = c f'(a)$.
>
> **(iii) Product (Leibniz rule):** $fg$ is differentiable at $a$ and $(fg)'(a) = f'(a)g(a) + f(a)g'(a)$.
>
> **(iv) Quotient rule:** if additionally $g(a) \neq 0$, then $f/g$ (defined on a neighbourhood of $a$ where $g \neq 0$) is differentiable at $a$ and
> $$\left(\frac{f}{g}\right)'(a) \;=\; \frac{f'(a) g(a) - f(a) g'(a)}{g(a)^2}.$$

### Proof of (i) — Sum rule

**Setup.** Compute the difference quotient of $f + g$ at $a$:
$$\frac{(f+g)(x) - (f+g)(a)}{x - a} \;=\; \frac{f(x) - f(a)}{x-a} \;+\; \frac{g(x) - g(a)}{x-a}.$$
This is a direct algebraic rearrangement.

**Limit.** As $x \to a$, each term has a limit by hypothesis: the first $\to f'(a)$, the second $\to g'(a)$. By linearity of limits (sum of limits equals limit of sums when both limits exist):
$$(f+g)'(a) \;=\; \lim_{x \to a}\frac{(f+g)(x)-(f+g)(a)}{x-a} \;=\; f'(a) + g'(a). \qquad\checkmark$$

### Proof of (ii) — Constant-multiple rule

$$\frac{(cf)(x) - (cf)(a)}{x-a} \;=\; c \cdot \frac{f(x) - f(a)}{x-a} \;\longrightarrow\; c f'(a) \quad (x \to a),$$
using that limits commute with scalar multiplication. $\checkmark$

### Proof of (iii) — Product rule (Leibniz)

**Setup.** We need the difference $(fg)(x) - (fg)(a) = f(x)g(x) - f(a)g(a)$. The "add-and-subtract" trick introduces a pivot term $f(a)g(x)$ (alternatively $f(x)g(a)$ — either works):
$$f(x)g(x) - f(a)g(a) \;=\; \underbrace{f(x)g(x) - f(a)g(x)}_{\text{same }g(x)} \;+\; \underbrace{f(a)g(x) - f(a)g(a)}_{\text{same }f(a)}.$$

**Dividing by $x - a$:**
$$\frac{(fg)(x) - (fg)(a)}{x - a} \;=\; \frac{f(x) - f(a)}{x - a}\,g(x) \;+\; f(a)\,\frac{g(x) - g(a)}{x - a}. \tag{$\dagger$}$$

**Limit analysis (factor by factor).**

- $\displaystyle\lim_{x \to a} \frac{f(x)-f(a)}{x-a} = f'(a)$ by hypothesis.
- $\displaystyle\lim_{x \to a} g(x) = g(a)$ because $g$, being differentiable at $a$, is continuous at $a$ by Theorem 22.2. *This step is essential* — without continuity of $g$, the product in the limit could fail.
- $\displaystyle\lim_{x \to a}\frac{g(x)-g(a)}{x-a} = g'(a)$ by hypothesis.
- $f(a)$ is a constant.

**Passing to the limit in $(\dagger)$** (product and sum of convergent limits):
$$(fg)'(a) \;=\; f'(a)\cdot g(a) \;+\; f(a)\cdot g'(a). \qquad\checkmark$$

**Remark (asymmetric bookkeeping).** Note that the final formula is symmetric in $f, g$, as it should be by commutativity of ordinary multiplication, even though the proof picked a specific pivot. Picking the other pivot $f(x)g(a)$ gives the same formula with the roles of $f$ and $g$ swapped.

### Proof of (iv) — Quotient rule

**Strategy.** Write $f/g = f \cdot (1/g)$ and combine the product rule with the derivative of $1/g$. Compute the latter first.

**Step 1: $g$ is nonzero near $a$.** Since $g(a) \neq 0$ and $g$ is continuous at $a$ (differentiability $\Rightarrow$ continuity), there is $\delta > 0$ such that $|g(x) - g(a)| < |g(a)|/2$ for all $x \in E$ with $|x - a| < \delta$. The reverse triangle inequality then gives $|g(x)| \geq |g(a)|/2 > 0$ for such $x$. So $1/g$ is well defined on $E \cap (a - \delta, a + \delta)$.

**Step 2: derivative of $1/g$ at $a$.** For $x \neq a$ in this neighbourhood:
$$\frac{1/g(x) - 1/g(a)}{x - a} \;=\; \frac{1}{x-a}\cdot\frac{g(a) - g(x)}{g(x)\,g(a)} \;=\; -\,\frac{g(x) - g(a)}{x - a}\cdot\frac{1}{g(x)\,g(a)}.$$
As $x \to a$:
- $\frac{g(x)-g(a)}{x-a} \to g'(a)$.
- $g(x) \to g(a)$ by continuity, so $\frac{1}{g(x)g(a)} \to \frac{1}{g(a)^2}$.

Therefore, by the product rule for limits,
$$\left(\frac{1}{g}\right)'(a) \;=\; -\,\frac{g'(a)}{g(a)^2}. \tag{$\ddagger$}$$

**Step 3: product rule combines (iii) and $(\ddagger)$.**
$$\left(\frac{f}{g}\right)'(a) \;=\; \bigl(f \cdot \tfrac{1}{g}\bigr)'(a) \;=\; f'(a)\cdot\frac{1}{g(a)} \;+\; f(a)\cdot\left(-\,\frac{g'(a)}{g(a)^2}\right).$$

**Step 4: clearing the denominator.**
$$\left(\frac{f}{g}\right)'(a) \;=\; \frac{f'(a) g(a)}{g(a)^2} - \frac{f(a) g'(a)}{g(a)^2} \;=\; \frac{f'(a) g(a) - f(a) g'(a)}{g(a)^2}. \qquad\blacksquare$$

**Mnemonic.** "Low d-high minus high d-low, over the square of what's below."

**Sanity check with $f = 1$.** $\left(\tfrac{1}{g}\right)' = \tfrac{0\cdot g - 1\cdot g'}{g^2} = -\tfrac{g'}{g^2}$, consistent with $(\ddagger)$.

---

## 22.4 The Chain Rule

> **Theorem 22.4 (Chain rule).** Let $f : E \to \mathbb{R}$ and $g : F \to \mathbb{R}$ with $f(E) \subseteq F$. Let $a \in E$ be a limit point of $E$, and suppose $f$ is differentiable at $a$, and $g$ is differentiable at $b := f(a)$ (also a limit point of $F$). Then $g \circ f : E \to \mathbb{R}$ is differentiable at $a$ and
> $$(g \circ f)'(a) \;=\; g'\bigl(f(a)\bigr)\cdot f'(a).$$

### The pitfall of the naive proof

The intuitive derivation writes
$$\frac{g(f(x)) - g(f(a))}{x - a} \;=\; \frac{g(f(x)) - g(f(a))}{f(x) - f(a)} \cdot \frac{f(x) - f(a)}{x - a}$$
and lets $x \to a$, invoking continuity $f(x) \to f(a)$ and differentiability of $g$ at $b$. This works when $f(x) \neq f(a)$ for all $x$ in a punctured neighbourhood of $a$, but **fails in general**: if $f$ takes the value $f(a)$ at points arbitrarily close to $a$ (as happens for e.g. $f(x) = x^2 \sin(1/x)$ near $0$, or any constant function restricted to a set), then the denominator $f(x) - f(a)$ is zero for such $x$ and the first factor is undefined. The Carathéodory reformulation below avoids this pitfall cleanly.

### Proof (Carathéodory's approach)

**Setup.** Let $b = f(a)$. Define auxiliary functions
$$\phi(x) \;=\; \begin{cases} \dfrac{f(x) - f(a)}{x - a}, & x \in E,\; x \neq a, \\[4pt] f'(a), & x = a, \end{cases} \qquad \psi(y) \;=\; \begin{cases} \dfrac{g(y) - g(b)}{y - b}, & y \in F,\; y \neq b, \\[4pt] g'(b), & y = b. \end{cases}$$

**Step 1 (continuity of $\phi$ at $a$ and of $\psi$ at $b$).** By construction:
$$\lim_{x \to a}\phi(x) \;=\; \lim_{x \to a}\frac{f(x)-f(a)}{x-a} \;=\; f'(a) \;=\; \phi(a),$$
so $\phi$ is continuous at $a$. Similarly $\psi$ is continuous at $b$.

**Step 2 (key identity, valid for all $x \in E$).** We claim that
$$f(x) - f(a) \;=\; \phi(x)\,(x - a) \qquad \text{for every } x \in E. \tag{A}$$
*Verification:* For $x \neq a$, $\phi(x) = \frac{f(x)-f(a)}{x-a}$, so $\phi(x)(x-a) = f(x) - f(a)$. For $x = a$, both sides are $0$. $\checkmark$

Analogously:
$$g(y) - g(b) \;=\; \psi(y)\,(y - b) \qquad \text{for every } y \in F. \tag{B}$$

**Step 3 (composition identity).** Apply (B) with $y = f(x)$ (which lies in $F$ since $f(E) \subseteq F$), and recall $b = f(a)$:
$$g(f(x)) - g(f(a)) \;=\; \psi(f(x))\,\bigl(f(x) - f(a)\bigr).$$
Substitute (A) for $f(x) - f(a)$:
$$g(f(x)) - g(f(a)) \;=\; \psi(f(x))\cdot\phi(x)\cdot(x - a). \tag{C}$$
Equation (C) holds for **every** $x \in E$ — including the pathological case $x \neq a$ with $f(x) = f(a)$, where the left side is $0$ and the right side is also $0$ (because $f(x) = f(a)$ forces $\phi(x)(x-a) = 0$ via (A), and then the whole right side vanishes — or because $\psi(f(x)) = \psi(b) = g'(b)$ is finite and $\phi(x) = \frac{f(x)-f(a)}{x-a} = 0$). This is the key point where Carathéodory's trick beats the naive approach.

**Step 4 (dividing by $x - a$ and passing to the limit).** For $x \neq a$:
$$\frac{g(f(x)) - g(f(a))}{x - a} \;=\; \psi(f(x))\cdot\phi(x). \tag{D}$$

Now take $x \to a$ in (D):
- $\phi(x) \to \phi(a) = f'(a)$ by continuity of $\phi$ at $a$.
- $f(x) \to f(a) = b$ because $f$ is continuous at $a$ (Theorem 22.2).
- Hence $\psi(f(x)) \to \psi(b) = g'(b)$ by continuity of $\psi$ at $b$ composed with $f$.

The right side of (D) therefore tends to $g'(b) \cdot f'(a) = g'(f(a)) \cdot f'(a)$. The left side by definition tends to $(g \circ f)'(a)$. Conclusion:
$$(g\circ f)'(a) \;=\; g'(f(a))\cdot f'(a). \qquad\blacksquare$$

**Interpretive remark.** Carathéodory's trick replaces the awkward quotient $\frac{f(x)-f(a)}{x-a}$ (undefined at $x = a$) by a function $\phi$ that is **defined and continuous** at $a$, with $\phi(a) = f'(a)$. Composition of continuous functions is then routine. The deep content of differentiability is precisely the existence of such a continuous $\phi$.

**Reformulation.** Differentiability of $f$ at $a$ with $f'(a) = L$ is equivalent to the existence of a function $\phi$ defined on $E$, continuous at $a$ with $\phi(a) = L$, such that $f(x) - f(a) = \phi(x)(x - a)$ for all $x \in E$. The chain rule is then just the statement that $(g \circ f)(x) - (g \circ f)(a) = \psi(f(x))\phi(x)(x - a)$, with the product of two continuous factors at $a$ giving the product of their values.

---

## 22.5 Standard Derivatives

Using the definition, the algebra of derivatives, and the chain rule, the following standard derivatives are established. (A representative proof is given for $\sin$.)

| $f(x)$                                        | $f'(x)$                 | Method                                     |
| --------------------------------------------- | ----------------------- | ------------------------------------------ |
| $c$ (constant)                                | $0$                     | $(c - c)/h = 0$                            |
| $x^n$ ($n \in \mathbb{N}$)                    | $n x^{n-1}$             | binomial / induction + product rule        |
| $x^\alpha$ ($\alpha \in \mathbb{R}$, $x > 0$) | $\alpha x^{\alpha - 1}$ | write $x^\alpha = e^{\alpha \ln x}$, chain |
| $e^x$                                         | $e^x$                   | power-series differentiation or limit      |
| $a^x$ ($a>0$)                                 | $a^x \ln a$             | $a^x = e^{x\ln a}$, chain                  |
| $\ln x$ ($x > 0$)                             | $1/x$                   | inverse of $e^x$ + chain rule              |
| $\log_a x$                                    | $1/(x \ln a)$           | change of base                             |
| $\sin x$                                      | $\cos x$                | angle-addition + $\sin h/h \to 1$          |
| $\cos x$                                      | $-\sin x$               | analogous, or chain via $\cos = \sin(\pi/2 - x)$ |
| $\tan x$                                      | $\sec^2 x$              | quotient rule on $\sin/\cos$              |
| $\arcsin x$                                   | $1/\sqrt{1-x^2}$        | inverse function rule                      |
| $\arccos x$                                   | $-1/\sqrt{1-x^2}$       | inverse function rule                      |
| $\arctan x$                                   | $1/(1+x^2)$             | inverse function rule                      |
| $\sinh x$                                     | $\cosh x$               | from $(e^x - e^{-x})/2$                    |
| $\cosh x$                                     | $\sinh x$               | from $(e^x + e^{-x})/2$                    |

### Proof that $(\sin x)' = \cos x$

**Setup.** We compute the difference quotient using the angle-addition formula $\sin(x+h) = \sin x\cos h + \cos x\sin h$:
$$\frac{\sin(x+h) - \sin x}{h} \;=\; \frac{\sin x\cos h + \cos x\sin h - \sin x}{h} \;=\; \sin x\cdot\frac{\cos h - 1}{h} \;+\; \cos x\cdot\frac{\sin h}{h}.$$

**Two standard limits.**
1. $\displaystyle\lim_{h \to 0}\frac{\sin h}{h} = 1$. *(Geometric / squeeze argument on the unit circle: $\sin h \leq h \leq \tan h$ for $h \in (0, \pi/2)$, giving $\cos h \leq \sin h / h \leq 1$, and $\cos h \to 1$.)*
2. $\displaystyle\lim_{h \to 0}\frac{\cos h - 1}{h} = 0$. *(Multiply top and bottom by $\cos h + 1$:*
$$\frac{\cos h - 1}{h} \;=\; \frac{(\cos h - 1)(\cos h + 1)}{h(\cos h + 1)} \;=\; \frac{\cos^2 h - 1}{h(\cos h + 1)} \;=\; -\frac{\sin^2 h}{h(\cos h + 1)} \;=\; -\frac{\sin h}{h}\cdot\frac{\sin h}{\cos h + 1}.$$
*As $h \to 0$: first factor $\to 1$, second factor $\to 0/2 = 0$. So the whole expression $\to 0$.)*

**Passing to the limit.**
$$\lim_{h\to 0}\frac{\sin(x+h) - \sin x}{h} \;=\; \sin x\cdot 0 \;+\; \cos x\cdot 1 \;=\; \cos x. \qquad\blacksquare$$

---

## 22.6 One-Sided Derivatives

> **Definition 22.5 (One-sided derivatives).** Let $a \in E$.
> - The **right-hand derivative** of $f$ at $a$ is
> $$f'_+(a) \;:=\; \lim_{h \to 0^+}\frac{f(a+h) - f(a)}{h},$$
> provided the limit exists and $a$ is a right-limit point of $E$.
> - The **left-hand derivative** is
> $$f'_-(a) \;:=\; \lim_{h \to 0^-}\frac{f(a+h) - f(a)}{h},$$
> provided the limit exists and $a$ is a left-limit point of $E$.

> **Proposition 22.6.** If $a$ is a two-sided limit point of $E$, then $f'(a)$ exists if and only if both $f'_+(a)$ and $f'_-(a)$ exist **and are equal**, in which case $f'(a) = f'_+(a) = f'_-(a)$.

This is just the analogous fact for limits: a two-sided limit exists iff both one-sided limits exist and coincide.

**Worked example.** $f(x) = |x|$:
$$f'_+(0) = \lim_{h \to 0^+}\frac{|h|}{h} = \lim_{h \to 0^+}\frac{h}{h} = 1, \qquad f'_-(0) = \lim_{h\to 0^-}\frac{|h|}{h} = \lim_{h\to 0^-}\frac{-h}{h} = -1.$$
Both one-sided derivatives exist but disagree, so $f'(0)$ does not exist.

**Endpoint convention.** For $f : [a, b] \to \mathbb{R}$, the derivative $f'(a)$ at the left endpoint means $f'_+(a)$ by default (since $f$ is undefined to the left of $a$), and similarly $f'(b) := f'_-(b)$.

---

## 22.7 Fermat's Interior-Extremum Theorem

> **Theorem 22.7 (Fermat).** Let $f : E \to \mathbb{R}$, let $a$ be an **interior** point of $E$, and suppose $f$ is differentiable at $a$. If $f$ has a local extremum (maximum or minimum) at $a$, then $f'(a) = 0$.

**Proof (local maximum case).** By "local maximum at $a$" we mean: there exists $\delta > 0$ with $(a - \delta, a + \delta) \subseteq E$ and $f(x) \leq f(a)$ for all $x \in (a - \delta, a + \delta)$. Equivalently, $f(a + h) - f(a) \leq 0$ for $|h| < \delta$.

*Right-hand analysis.* For $0 < h < \delta$:
$$\frac{f(a+h) - f(a)}{h} \;\leq\; 0 \qquad\text{(numerator $\leq 0$, denominator $> 0$)}.$$
Passing to the limit as $h \to 0^+$ (and using that the two-sided limit $f'(a)$ exists and equals both one-sided limits):
$$f'(a) \;=\; \lim_{h \to 0^+}\frac{f(a+h)-f(a)}{h} \;\leq\; 0. \tag{I}$$

*Left-hand analysis.* For $-\delta < h < 0$:
$$\frac{f(a+h) - f(a)}{h} \;\geq\; 0 \qquad\text{(numerator $\leq 0$, denominator $< 0$)}.$$
Passing to the limit as $h \to 0^-$:
$$f'(a) \;=\; \lim_{h \to 0^-}\frac{f(a+h)-f(a)}{h} \;\geq\; 0. \tag{II}$$

Combining (I) and (II): $f'(a) \leq 0 \leq f'(a)$, so $f'(a) = 0$. The local-minimum case is analogous (or apply the result to $-f$). $\blacksquare$

> **Terminology.** A point $a$ where $f'(a) = 0$ is called a **critical point** (or **stationary point**) of $f$. Fermat's theorem says: *interior local extrema are critical points.*

**Important caveats.**
1. **Interior hypothesis is essential.** $f(x) = x$ on $[0, 1]$ has maximum at $x = 1$ (an endpoint) with $f'(1) = 1 \neq 0$. No contradiction — $1$ is not an interior point.
2. **Differentiability hypothesis is essential.** $f(x) = |x|$ has minimum at $0$, but $f'(0)$ does not exist.
3. **The converse is false.** $f'(a) = 0$ does not imply a local extremum. Example: $f(x) = x^3$ has $f'(0) = 0$, but $x^3$ is strictly increasing through $0$ (no extremum there — an *inflection* point).

---

## 22.8 Darboux's Theorem

A striking fact: even though derivatives can be discontinuous, they still satisfy an intermediate-value property analogous to the IVT for continuous functions.

> **Theorem 22.8 (Darboux's intermediate-value theorem for derivatives).**
> Let $f : [a, b] \to \mathbb{R}$ be differentiable on $[a, b]$ (with $f'(a) := f'_+(a)$ and $f'(b) := f'_-(b)$ at the endpoints). For every real $c$ strictly between $f'(a)$ and $f'(b)$, there exists $\xi \in (a, b)$ with $f'(\xi) = c$.

**Proof.** Without loss of generality, $f'(a) < c < f'(b)$ (the reverse case is symmetric: apply the same argument to $-f$ with value $-c$).

*Step 1: auxiliary function.* Define $g : [a, b] \to \mathbb{R}$ by
$$g(x) \;=\; f(x) - c\,x.$$
Then $g$ is differentiable on $[a, b]$ with $g'(x) = f'(x) - c$ for $x \in [a, b]$. In particular
$$g'(a) = f'(a) - c < 0, \qquad g'(b) = f'(b) - c > 0.$$
The goal is to find $\xi \in (a, b)$ with $g'(\xi) = 0$, i.e., $f'(\xi) = c$.

*Step 2: $g$ attains its minimum on $[a, b]$.* $g$ is continuous on $[a, b]$ (being differentiable implies continuous by Theorem 22.2). By the Extreme Value Theorem (for continuous functions on a compact interval), $g$ attains its minimum at some $\xi \in [a, b]$.

*Step 3: the minimum is not at $x = a$.* Since $g'_+(a) = g'(a) < 0$, there exists $\delta_1 > 0$ such that for $0 < h < \delta_1$:
$$\frac{g(a + h) - g(a)}{h} \;<\; 0 \quad \Rightarrow\quad g(a + h) < g(a).$$
So $g$ takes a smaller value than $g(a)$ immediately to the right of $a$. The minimum is therefore not at $a$.

*Step 4: the minimum is not at $x = b$.* Since $g'_-(b) = g'(b) > 0$, there exists $\delta_2 > 0$ such that for $-\delta_2 < h < 0$:
$$\frac{g(b + h) - g(b)}{h} \;>\; 0 \quad \Rightarrow\quad g(b + h) - g(b) < 0 \quad \text{(numerator sign = denominator sign, denominator < 0 so numerator < 0)}.$$
So $g(b + h) < g(b)$ for small $h < 0$. The minimum is therefore not at $b$.

*Step 5: interior minimum and Fermat.* By Steps 2–4, $\xi \in (a, b)$, an interior minimum. By Theorem 22.7 (Fermat), $g'(\xi) = 0$, i.e., $f'(\xi) = c$. $\blacksquare$

> **Consequence: $f'$ cannot have a jump discontinuity.** Suppose, for contradiction, that $f'$ has a jump at $a$: both one-sided limits $L_- := \lim_{x \to a^-} f'(x)$ and $L_+ := \lim_{x \to a^+} f'(x)$ exist, finite, with $L_- \neq L_+$. Then one can find an interval $[a - \eta, a + \eta]$ on which $f'$ takes values near $L_-$ on the left and near $L_+$ on the right, but skips a gap of values in between — contradicting Darboux, which requires every intermediate value between $f'(a - \eta)$ and $f'(a + \eta)$ to be attained.

> **Derivatives can still have essential discontinuities.** "No jumps" does not mean "continuous". Derivatives may have wild *oscillatory* (essential) discontinuities, as the classical example $x^2 \sin(1/x)$ below shows.

---

## 22.9 Higher Derivatives

> **Definition 22.9.** Suppose $f$ is differentiable on a neighbourhood of $a$, so that $f'$ is defined on that neighbourhood. If $f'$ is itself differentiable at $a$, the **second derivative** of $f$ at $a$ is
> $$f''(a) \;:=\; (f')'(a).$$
> Inductively, the **$n$-th derivative** $f^{(n)}$ is defined by $f^{(n)} := (f^{(n-1)})'$ whenever the right side exists. Conventionally $f^{(0)} := f$.
>
> **Smoothness classes.** Write $C^n(E)$ for the set of functions $f : E \to \mathbb{R}$ whose derivatives $f, f', f'', \ldots, f^{(n)}$ all exist and are **continuous** on $E$. Write $C^\infty(E) := \bigcap_n C^n(E)$ for the infinitely differentiable (smooth) functions.

**Examples.**
- **Polynomials** are $C^\infty$ on $\mathbb{R}$. (After $\deg p$ differentiations they become zero.)
- $e^x$, $\sin x$, $\cos x$, $\sinh x$, $\cosh x$ are $C^\infty$ on $\mathbb{R}$.
- $\ln x$, $x^\alpha$ ($\alpha \in \mathbb{R}$) are $C^\infty$ on $(0, \infty)$.
- $|x|$ is $C^0$ on $\mathbb{R}$ but not $C^1$ (no derivative at $0$).
- $x|x|$ is $C^1$ with derivative $2|x|$, but not $C^2$.
- Inductively: for $k \geq 1$, $x^k |x|$ is $C^k$ but not $C^{k+1}$. This shows all smoothness classes are strictly nested: $C^0 \supsetneq C^1 \supsetneq C^2 \supsetneq \cdots \supsetneq C^\infty$.

---

## 22.10 Worked Examples

### Example 1. Derivative of $x^3$ from the definition.

*Setup.* Apply Definition 22.1 directly at a general point $a \in \mathbb{R}$.

*Strategy.* Expand $(a+h)^3$ by the binomial theorem and simplify.

*Computation.*
$$(a + h)^3 \;=\; a^3 + 3a^2 h + 3a h^2 + h^3.$$
Therefore
$$\frac{(a+h)^3 - a^3}{h} \;=\; \frac{3a^2 h + 3a h^2 + h^3}{h} \;=\; 3a^2 + 3 a h + h^2 \qquad (h \neq 0).$$
Passing to the limit $h \to 0$:
$$f'(a) \;=\; \lim_{h \to 0}(3a^2 + 3 a h + h^2) \;=\; 3 a^2 + 0 + 0 \;=\; 3 a^2.$$

*Verification.* The power rule $(x^n)' = n x^{n-1}$ with $n = 3$ gives $3 x^{3-1} = 3 x^2$. $\checkmark$

*Interpretation.* The cubic grows with slope $3 a^2 \geq 0$ everywhere, with equality only at $a = 0$ (where the tangent is horizontal — the point of inflection). $\blacksquare$

---

### Example 2. Derivative of $x^x$ for $x > 0$.

*Setup.* $x^x$ is neither a polynomial nor an exponential with constant base, so direct differentiation requires rewriting.

*Strategy.* Use $x^x = e^{x \ln x}$ (valid for $x > 0$) and apply the chain rule.

*Computation.* Let $u(x) := x \ln x$. Then
- By the product rule: $u'(x) = 1 \cdot \ln x + x \cdot \tfrac{1}{x} = \ln x + 1$.
- By the chain rule applied to $f(x) = e^{u(x)}$: $f'(x) = e^{u(x)}\cdot u'(x)$.

Therefore
$$\frac{d}{dx} x^x \;=\; e^{x \ln x}\cdot(\ln x + 1) \;=\; x^x(\ln x + 1).$$

*Verification (logarithmic differentiation alternative).* Write $y = x^x$, take logs: $\ln y = x \ln x$. Differentiate implicitly:
$$\frac{y'}{y} \;=\; \ln x + 1 \;\Rightarrow\; y' = y(\ln x + 1) = x^x(\ln x + 1). \quad\checkmark$$

*Interpretation.* $x^x$ has critical point at $\ln x + 1 = 0$, i.e., $x = e^{-1}$. Since $y'$ changes sign from negative to positive there, $x = 1/e$ is the global minimum of $x^x$ on $(0, \infty)$, with $y = (1/e)^{1/e}$. $\blacksquare$

---

### Example 3. $f(x) = x^2 \sin(1/x)$ with $f(0) = 0$: derivative exists but is discontinuous.

*Setup.*
$$f(x) \;=\; \begin{cases} x^2 \sin(1/x), & x \neq 0, \\ 0, & x = 0.\end{cases}$$

*Strategy.* Compute $f'(0)$ from the definition (the algebra-of-derivatives doesn't apply at $x = 0$ since the formula for $f$ is different there). For $x \neq 0$, use product + chain. Then examine $\lim_{x \to 0} f'(x)$.

*Computation of $f'(0)$.* From Definition 22.1:
$$f'(0) \;=\; \lim_{h \to 0}\frac{f(h) - f(0)}{h} \;=\; \lim_{h \to 0}\frac{h^2 \sin(1/h) - 0}{h} \;=\; \lim_{h \to 0} h \sin(1/h).$$
Since $|\sin(1/h)| \leq 1$, we have $|h \sin(1/h)| \leq |h| \to 0$. By the squeeze theorem:
$$f'(0) \;=\; 0.$$

*Computation of $f'(x)$ for $x \neq 0$.* By the product rule applied to $f(x) = x^2 \cdot \sin(1/x)$:
$$f'(x) \;=\; 2x\cdot\sin(1/x) \;+\; x^2\cdot\frac{d}{dx}\sin(1/x).$$
By the chain rule, $\frac{d}{dx}\sin(1/x) = \cos(1/x)\cdot\frac{d}{dx}(1/x) = \cos(1/x)\cdot(-1/x^2)$. Therefore
$$f'(x) \;=\; 2 x \sin(1/x) \;+\; x^2 \cdot\left(-\frac{\cos(1/x)}{x^2}\right) \;=\; 2x \sin(1/x) - \cos(1/x).$$

*Behaviour as $x \to 0$.*
- $2x \sin(1/x)$: bounded by $2|x| \to 0$. So $\to 0$.
- $\cos(1/x)$: as $x \to 0$, $1/x \to \pm\infty$ and $\cos$ oscillates between $-1$ and $+1$ infinitely often. No limit exists.

Hence $\lim_{x \to 0} f'(x)$ does **not** exist. Yet $f'(0) = 0$, so $f'$ is defined on all of $\mathbb{R}$ — it just fails to be continuous at $0$.

*Verification with Darboux.* The discontinuity of $f'$ at $0$ is **essential** (oscillatory), not a jump. This is consistent with Theorem 22.8: Darboux forbids jumps but permits essential discontinuities. Indeed, on any neighbourhood of $0$, $f'$ attains every value in $[-1, 1]$ (approximately), satisfying the intermediate-value property trivially.

*Interpretation.* This example illustrates three fundamental points:
1. Differentiable $\not\Rightarrow$ continuously differentiable ($C^1$).
2. $f'$ can fail to be continuous — and when it does, the discontinuity must be essential, never a jump.
3. The class of differentiable functions is strictly larger than $C^1$. $\blacksquare$

---

### Example 4. $f(x) = |x|^3$ is $C^2$ but not $C^3$ at $0$.

*Setup.* $|x|^3 = x^3$ for $x \geq 0$ and $|x|^3 = -x^3$ for $x < 0$. So
$$f(x) \;=\; \begin{cases} x^3, & x \geq 0, \\ -x^3, & x < 0.\end{cases}$$
Equivalently $f(x) = x^3 \operatorname{sgn}(x)\cdot\operatorname{sgn}(x) = x^2 \cdot |x|$, or $|x|^3 = (|x|)^3$.

*Strategy.* Compute derivatives piecewise and check agreement of one-sided values at $0$.

*First derivative.* For $x > 0$: $f(x) = x^3$, so $f'(x) = 3 x^2$. For $x < 0$: $f(x) = -x^3$, so $f'(x) = -3 x^2$.

At $x = 0$ (by definition):
$$f'_+(0) = \lim_{h\to 0^+}\frac{h^3 - 0}{h} = \lim_{h \to 0^+} h^2 = 0,$$
$$f'_-(0) = \lim_{h\to 0^-}\frac{-h^3 - 0}{h} = \lim_{h\to 0^-}(-h^2) = 0.$$
One-sided values agree, so $f'(0) = 0$. Combining all cases:
$$f'(x) \;=\; \begin{cases} 3 x^2, & x \geq 0, \\ -3 x^2, & x < 0,\end{cases} \qquad \text{or compactly } f'(x) = 3 x|x|.$$

$f'$ is continuous on $\mathbb{R}$ (polynomial pieces agree with $0$ at $0$), so $f \in C^1(\mathbb{R})$.

*Second derivative.* For $x > 0$: $f'(x) = 3 x^2$, so $f''(x) = 6 x$. For $x < 0$: $f'(x) = -3 x^2$, so $f''(x) = -6 x$. At $x = 0$:
$$f''(0) \;=\; \lim_{h\to 0}\frac{f'(h) - f'(0)}{h} \;=\; \lim_{h\to 0}\frac{3 h|h|}{h} \;=\; \lim_{h\to 0} 3 |h| \;=\; 0.$$
All together: $f''(x) = 6 |x|$.

$f''$ is continuous on $\mathbb{R}$, so $f \in C^2(\mathbb{R})$.

*Third derivative?* We need $(f'')'(0)$ to exist. But $f''(x) = 6|x|$, and $|x|$ has no derivative at $0$ (as shown in §22.2). So $f^{(3)}(0)$ does not exist, and $f \notin C^3(\mathbb{R})$.

*Verification.* The general pattern: $x^{k-1}|x|$ has continuous derivatives up to order $k-1$ but fails at order $k$. Taking $k = 3$ recovers this example; more generally, this gives a sequence of functions witnessing $C^k \supsetneq C^{k+1}$.

*Interpretation.* Even a very "smooth-looking" function like $|x|^3$ hides a non-smoothness at order $3$. This is typical: non-smoothness doesn't always show up at low orders. $\blacksquare$

---

### Example 5. Interior local max $\Rightarrow f'(a) = 0$ (Fermat restated).

*Setup.* Let $f : E \to \mathbb{R}$ with $a$ an interior point of $E$; $f$ differentiable at $a$; $f$ has a local maximum at $a$.

*Strategy.* Separately analyse the right and left difference quotients.

*Computation.* By hypothesis there exists $\delta > 0$ with $(a - \delta, a + \delta) \subseteq E$ and $f(a + h) \leq f(a)$ for $|h| < \delta$.

*Right side:* For $0 < h < \delta$:
$$\frac{f(a + h) - f(a)}{h} \;=\; \frac{\text{(non-positive)}}{\text{positive}} \;\leq\; 0.$$
Taking $h \to 0^+$ gives $f'(a) \leq 0$.

*Left side:* For $-\delta < h < 0$:
$$\frac{f(a + h) - f(a)}{h} \;=\; \frac{\text{(non-positive)}}{\text{negative}} \;\geq\; 0.$$
Taking $h \to 0^-$ gives $f'(a) \geq 0$.

Combining: $f'(a) \leq 0 \leq f'(a)$, forcing $f'(a) = 0$.

*Verification.* Same formal argument as Theorem 22.7; this example simply restates it in standalone form.

*Interpretation.* At an interior extremum, the graph of $f$ has neither a strict upward nor downward slope (any strict slope would contradict being locally extremal), so the tangent must be horizontal. $\blacksquare$

---

## 22.11 Practice Problems

1. Using the limit definition, show $(e^x)' = e^x$.
2. Compute $\dfrac{d}{dx}\bigl[\sin(\ln(1 + x^2))\bigr]$.
3. Let $f(x) = x^{1/3}$. Show $f$ is continuous at $0$ but not differentiable. Classify the type of failure.
4. Let $f : [0, 1] \to \mathbb{R}$ be differentiable with $f'(0) = 2$ and $f'(1) = -3$. Using Darboux's theorem, show there exists $\xi \in (0, 1)$ with $f'(\xi) = 0$.
5. Show that if $f : \mathbb{R} \to \mathbb{R}$ satisfies $|f(x) - f(y)| \leq (x - y)^2$ for all $x, y \in \mathbb{R}$, then $f$ is constant.

### Solutions

**Solution 1.** $(e^x)' = e^x$ from the definition.

*Setup.* Compute
$$\frac{e^{x + h} - e^x}{h} \;=\; e^x\cdot\frac{e^h - 1}{h} \qquad (h \neq 0),$$
using the exponential law $e^{x+h} = e^x \cdot e^h$.

*Strategy.* Reduce to the fundamental limit $\lim_{h \to 0}(e^h - 1)/h = 1$, which can be proved from:
- **Power series:** $e^h = \sum_{n=0}^{\infty} h^n/n! = 1 + h + h^2/2! + \cdots$, so $(e^h - 1)/h = 1 + h/2! + h^2/3! + \cdots$. The tail series $h/2! + h^2/3! + \cdots$ is bounded by $\sum_{n \geq 1} |h|^n / (n+1)! \leq |h|\sum_{n\geq 0} 1/n! = e|h|$ for $|h| \leq 1$, hence $\to 0$ as $h \to 0$. So $(e^h - 1)/h \to 1$.
- **Alternatively (from $e^x$ as inverse of $\ln$):** Use $\lim_{h \to 0}\ln(1 + h)/h = 1$ (derivative of $\ln$ at $1$ equals $1/1 = 1$) and $e^h - 1 = u \Leftrightarrow h = \ln(1 + u)$, so as $h \to 0$, $u \to 0$ and $(e^h - 1)/h = u/\ln(1 + u) \to 1$.

*Computation.* Taking $h \to 0$ in $\frac{e^{x+h} - e^x}{h} = e^x \cdot \frac{e^h - 1}{h}$:
$$\lim_{h \to 0}\frac{e^{x+h} - e^x}{h} \;=\; e^x\cdot 1 \;=\; e^x.$$

*Verification.* This matches the table in §22.5. $\checkmark$

*Interpretation.* $e^x$ is the unique (up to constant) solution to the ODE $y' = y$ with $y(0) = 1$ — the derivative being the function itself is the defining property of the natural exponential. $\blacksquare$

---

**Solution 2.** $\dfrac{d}{dx}\bigl[\sin(\ln(1 + x^2))\bigr]$.

*Setup.* Three-level composition: innermost $u = 1 + x^2$, middle $v = \ln u$, outermost $y = \sin v$.

*Strategy.* Chain rule twice (or once, applied to the triple composition).

*Computation.*
$$\frac{dy}{dx} \;=\; \frac{dy}{dv}\cdot\frac{dv}{du}\cdot\frac{du}{dx} \;=\; \cos v \cdot \frac{1}{u} \cdot 2 x.$$
Substitute back $v = \ln(1 + x^2)$, $u = 1 + x^2$:
$$\frac{dy}{dx} \;=\; \cos\bigl(\ln(1 + x^2)\bigr)\cdot\frac{1}{1 + x^2}\cdot 2x \;=\; \frac{2x\,\cos\bigl(\ln(1 + x^2)\bigr)}{1 + x^2}.$$

*Verification.* At $x = 0$: numerator $= 0$, so derivative $= 0$. Also $y(0) = \sin(\ln 1) = \sin 0 = 0$, and $y$ is an even function of $x$ (composition of $\sin$, $\ln$, and $x \mapsto 1 + x^2$), so its derivative at $0$ must vanish. $\checkmark$

*Interpretation.* Domain: all $x \in \mathbb{R}$ (since $1 + x^2 > 0$ always, so $\ln$ is defined). The derivative exists everywhere. $\blacksquare$

---

**Solution 3.** $f(x) = x^{1/3}$ at $0$.

*Setup.* We must check continuity and differentiability at $0$ separately.

*Strategy.* Apply definitions directly.

*Continuity.* For every $\varepsilon > 0$, take $\delta = \varepsilon^3$; then $|h| < \delta \Rightarrow |h^{1/3}| < \varepsilon$. So $\lim_{h \to 0} h^{1/3} = 0 = f(0)$, confirming continuity.

*Differentiability.* Compute the difference quotient at $0$:
$$\frac{f(h) - f(0)}{h} \;=\; \frac{h^{1/3}}{h} \;=\; h^{1/3 - 1} \;=\; h^{-2/3}.$$
As $h \to 0$ (from either side), $h^{-2/3} = 1/h^{2/3}$. Since $h^{2/3} = (h^{1/3})^2 \geq 0$ and tends to $0$, the reciprocal $h^{-2/3} \to +\infty$.

Both one-sided derivatives equal $+\infty$, so the difference quotient diverges (to $+\infty$) rather than converging to a finite limit. Hence $f'(0)$ does **not** exist (in the sense of Definition 22.1, which requires a finite limit).

*Classification of the failure.* The limit of the difference quotient is $+\infty$, i.e., the tangent line is **vertical**. Geometrically: the graph of $x^{1/3}$ passes through the origin with an infinite slope. This is called a **vertical tangent** or **cusp-like** failure, distinct from the "corner" failure of $|x|$ (where one-sided derivatives exist but disagree).

*Verification.* Writing $y = x^{1/3}$, the curve $x = y^3$ has $dx/dy = 3y^2 = 0$ at $y = 0$, confirming a vertical tangent to the $y$-vs-$x$ graph at the origin. $\checkmark$

*Interpretation.* A function can be continuous without being differentiable in two fundamentally different ways:
- **Corners** (finite unequal one-sided derivatives): $|x|$.
- **Vertical tangents** (infinite derivative): $x^{1/3}$.
Both fail Definition 22.1, but for different geometric reasons. $\blacksquare$

---

**Solution 4.** Interior zero of $f'$ by Darboux.

*Setup.* $f : [0, 1] \to \mathbb{R}$ differentiable, $f'(0) = 2$, $f'(1) = -3$. Seek $\xi \in (0, 1)$ with $f'(\xi) = 0$.

*Strategy.* Verify that $0$ lies strictly between $f'(0) = 2$ and $f'(1) = -3$, then apply Darboux.

*Computation.* Indeed $-3 < 0 < 2$, so $0$ is strictly between $f'(0)$ and $f'(1)$. By Theorem 22.8 (Darboux), there exists $\xi \in (0, 1)$ with $f'(\xi) = 0$.

*Verification.* The hypotheses of Darboux are exactly that $f$ is differentiable on the closed interval — which is given. $\checkmark$

*Interpretation.* This is a typical use of Darboux: we need a critical point of $f$ but cannot assume $f'$ is continuous (so we cannot invoke the ordinary IVT). Darboux bypasses the continuity requirement. $\blacksquare$

---

**Solution 5.** $|f(x) - f(y)| \leq (x - y)^2 \Rightarrow f$ constant.

*Setup.* Fix $a \in \mathbb{R}$. We show $f'(a) = 0$, hence $f' \equiv 0$, hence $f$ is constant (by MVT, or the direct argument below).

*Strategy.* Squeeze the difference quotient using the hypothesis.

*Computation.* For $x \neq a$:
$$\left|\frac{f(x) - f(a)}{x - a}\right| \;=\; \frac{|f(x) - f(a)|}{|x - a|} \;\leq\; \frac{(x - a)^2}{|x - a|} \;=\; |x - a|.$$
Taking $x \to a$, the right side $\to 0$, so by the squeeze principle:
$$f'(a) \;=\; \lim_{x \to a}\frac{f(x) - f(a)}{x - a} \;=\; 0.$$
Since $a$ was arbitrary, $f'(a) = 0$ for all $a \in \mathbb{R}$, i.e., $f' \equiv 0$ on $\mathbb{R}$.

*From $f' \equiv 0$ to $f$ constant.* This uses the Mean Value Theorem (see [[23-mean-value-theorems]]). For any $a < b$, there exists $c \in (a, b)$ with
$$f(b) - f(a) \;=\; f'(c)(b - a) \;=\; 0 \cdot (b - a) \;=\; 0,$$
so $f(b) = f(a)$. Since this holds for all $a, b$, $f$ is constant.

*Direct verification without MVT.* One can alternatively use the Lipschitz-like hypothesis directly: for any $x < y$ and any partition $x = x_0 < x_1 < \cdots < x_n = y$,
$$|f(y) - f(x)| \;\leq\; \sum_{i=1}^n |f(x_i) - f(x_{i-1})| \;\leq\; \sum_{i=1}^n (x_i - x_{i-1})^2.$$
With equal spacing $x_i - x_{i-1} = (y-x)/n$, the sum equals $n \cdot (y-x)^2/n^2 = (y-x)^2/n$. Letting $n \to \infty$: $|f(y) - f(x)| \leq 0$, so $f(y) = f(x)$. Hence $f$ is constant.

*Verification.* The hypothesis is stronger than Lipschitz; it says $f$ satisfies a **Hölder condition** of order $2$, and any $\alpha$-Hölder function with $\alpha > 1$ must be constant. The exponent $2 > 1$ is what forces triviality.

*Interpretation.* The derivative at any point exists and is $0$, yet this is forced not by a specific "flatness" of $f$ at each point but by a **uniform** second-order Lipschitz-type control. It is the global strength of this control — stronger than mere Lipschitz (exponent $1$) — that collapses $f$ to a constant. $\blacksquare$

---

## 22.12 Summary

> **Core definitions.**
> - $f'(a) = \lim_{h \to 0}\dfrac{f(a + h) - f(a)}{h} = \lim_{x \to a}\dfrac{f(x) - f(a)}{x - a}$.
> - Equivalent linear-approximation form: $f(x) = f(a) + f'(a)(x - a) + o(x - a)$.
> - One-sided derivatives $f'_\pm(a)$; two-sided $f'(a)$ exists iff both one-sided exist and agree.

> **Foundational theorems.**
> - **Theorem 22.2:** differentiable $\Rightarrow$ continuous (converse false: $|x|$).
> - **Theorem 22.3:** sum, constant-multiple, product (Leibniz), quotient rules.
> - **Theorem 22.4:** chain rule, rigorously via Carathéodory's $\phi$, $\psi$ (avoids the $f(x) = f(a)$ degeneracy of the naive argument).
> - **Theorem 22.7 (Fermat):** interior local extremum $\Rightarrow$ $f'(a) = 0$ (critical point).
> - **Theorem 22.8 (Darboux):** $f'$ satisfies the intermediate-value property, hence has no jump discontinuities, even though $f'$ can have essential discontinuities.

> **Key pathologies to remember.**
> - **Weierstrass $W$:** continuous everywhere, differentiable nowhere.
> - **$x^2 \sin(1/x)$:** differentiable everywhere, but $f'$ has an essential discontinuity at $0$.
> - **$|x|^k \cdot x^{k-1}$:** separates $C^{k-1}$ from $C^k$.

> **The derivative is the central object of differential calculus**; every subsequent theorem — the Mean Value Theorem, Taylor's theorem, L'Hôpital's rule, inverse function theorem — rests on the definition and basic properties established here.

---

## Related Topics

- [[16-continuity]] — differentiability implies continuity; Carathéodory's reformulation
- [[23-mean-value-theorems]] — Rolle, Lagrange MVT, Cauchy MVT, Taylor's theorem
- [[24-lhopital-vector-derivatives]] — L'Hôpital's rule and the vector-valued case
- [[20-ivt-and-connectedness]] — IVT for continuous functions, contrast with Darboux
- [[17-types-of-discontinuity-monotonic]] — classification of discontinuities (jump vs. essential)
- [[VACV/guide/02-vector-calculus]] — multivariable analogue: partial derivatives, gradient, Jacobian

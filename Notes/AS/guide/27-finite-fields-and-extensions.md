---
title: "Finite Fields and Extensions"
type: guide
co: CO5
related: [26-fields-and-irreducibility, 21-integral-domains, 24-polynomial-rings]
---

# 27. Finite Fields and Extensions

This chapter develops **field extensions** — the process of enlarging a field $\mathbb{F}$ by adjoining roots of irreducible polynomials. The main results are: the classification of **finite fields** $\mathbb{F}_{p^n}$ (unique up to isomorphism for each prime power), the theory of **algebraic** and **transcendental** elements with their **minimal polynomials**, and the **degree tower** $[L : \mathbb{F}] = [L : K][K : \mathbb{F}]$. We conclude with geometric applications: the impossibility of doubling the cube, trisecting an angle, and squaring the circle.

## 27.1 Field Extensions — Definitions

> **Definition 27.1.** A **field extension** $L/\mathbb{F}$ is a pair of fields with $\mathbb{F} \subseteq L$, where $\mathbb{F}$ is a subfield of $L$.

$L$ is naturally an $\mathbb{F}$-vector space (inherited operations from $L$, scalars from $\mathbb{F}$).

> **Definition 27.2 (Degree).** The **degree** of the extension $L/\mathbb{F}$, denoted $[L : \mathbb{F}]$, is the dimension of $L$ as an $\mathbb{F}$-vector space.

**Example 1.** $[\mathbb{C} : \mathbb{R}] = 2$ (basis: $\{1, i\}$).

**Example 2.** $[\mathbb{R} : \mathbb{Q}] = \infty$ (uncountable).

**Example 3.** $[\mathbb{Q}(\sqrt 2) : \mathbb{Q}] = 2$ (basis: $\{1, \sqrt 2\}$).

**Example 4.** $[\mathbb{F}_4 : \mathbb{F}_2] = 2$ ($\mathbb{F}_4$ has 4 elements, $\mathbb{F}_2$ has 2).

## 27.2 Algebraic and Transcendental Elements

> **Definition 27.3.** Let $L/\mathbb{F}$ be an extension, $\alpha \in L$. Then $\alpha$ is **algebraic over $\mathbb{F}$** if there exists a nonzero polynomial $p(x) \in \mathbb{F}[x]$ with $p(\alpha) = 0$. Otherwise $\alpha$ is **transcendental**.
	
**Example 5.** $\sqrt 2$ is algebraic over $\mathbb{Q}$ (root of $x^2 - 2$).

**Example 6.** $i$ is algebraic over $\mathbb{R}$ (root of $x^2 + 1$).

**Example 7.** $e$ and $\pi$ are transcendental over $\mathbb{Q}$ (Lindemann).

### Minimal polynomial

> **Theorem 27.4.** If $\alpha \in L$ is algebraic over $\mathbb{F}$, there exists a unique **monic** irreducible polynomial $m_\alpha(x) \in \mathbb{F}[x]$ such that $m_\alpha(\alpha) = 0$, and $m_\alpha(x)$ divides every $p(x) \in \mathbb{F}[x]$ with $p(\alpha) = 0$. This is the **minimal polynomial** of $\alpha$ over $\mathbb{F}$.

*Proof.* Let $I = \{p \in \mathbb{F}[x] : p(\alpha) = 0\}$, the kernel of the evaluation $\operatorname{ev}_\alpha: \mathbb{F}[x] \to L$. It's an ideal, and $\mathbb{F}[x]$ is a PID ([[24-polynomial-rings]] Theorem 24.7), so $I = \langle m \rangle$ for some monic generator $m$. 

$m$ is nonzero (since $\alpha$ is algebraic, $I \neq \{0\}$). $m$ is irreducible: if $m = fg$ with $\deg f, \deg g \ge 1$, then $f(\alpha) g(\alpha) = 0$, so $f(\alpha) = 0$ or $g(\alpha) = 0$ (in the field $L$). WLOG $f(\alpha) = 0$, so $f \in I = \langle m \rangle$, i.e., $m \mid f$. But $\deg f < \deg m$, contradiction unless $f$ and $m$ are associates — possible only when $g$ is a nonzero constant, hence a unit. $\blacksquare$

**Example 8.** Minimal polynomial of $\sqrt[3] 2$ over $\mathbb{Q}$ is $x^3 - 2$ (irreducible by Eisenstein).

**Example 9.** Minimal polynomial of $i$ over $\mathbb{R}$: $x^2 + 1$.

**Example 10.** Minimal polynomial of $\sqrt 2 + \sqrt 3$ over $\mathbb{Q}$: $x^4 - 10x^2 + 1$.

*Computation.* Let $\alpha = \sqrt 2 + \sqrt 3$. $\alpha^2 = 2 + 2\sqrt 6 + 3 = 5 + 2\sqrt 6$. $(\alpha^2 - 5)^2 = 24$, so $\alpha^4 - 10\alpha^2 + 25 = 24$, giving $\alpha^4 - 10\alpha^2 + 1 = 0$.

Degree 4 irreducible over $\mathbb{Q}$ (check rational roots and quadratic factors — standard).

## 27.3 Simple Extensions

> **Definition 27.5.** For $L/\mathbb{F}$ and $\alpha \in L$, $\mathbb{F}(\alpha)$ denotes the smallest subfield of $L$ containing $\mathbb{F}$ and $\alpha$.

> **Theorem 27.6.** If $\alpha$ is algebraic over $\mathbb{F}$ with minimal polynomial $m_\alpha(x)$ of degree $n$, then:
> 1. $\mathbb{F}(\alpha) \cong \mathbb{F}[x]/\langle m_\alpha(x) \rangle$
> 2. $\{1, \alpha, \alpha^2, \ldots, \alpha^{n-1}\}$ is an $\mathbb{F}$-basis of $\mathbb{F}(\alpha)$.
> 3. $[\mathbb{F}(\alpha) : \mathbb{F}] = n = \deg m_\alpha$.

*Proof.* Consider $\operatorname{ev}_\alpha: \mathbb{F}[x] \to L$ with image $\mathbb{F}[\alpha]$ and kernel $\langle m_\alpha \rangle$. First Isomorphism: $\mathbb{F}[x]/\langle m_\alpha \rangle \cong \mathbb{F}[\alpha]$.

Since $m_\alpha$ is irreducible and $\mathbb{F}[x]$ is a PID, $\langle m_\alpha \rangle$ is maximal, so $\mathbb{F}[x]/\langle m_\alpha \rangle$ is a field — namely $\mathbb{F}[\alpha]$.

This field contains $\alpha$ and $\mathbb{F}$, so $\mathbb{F}(\alpha) \subseteq \mathbb{F}[\alpha]$. Conversely, $\mathbb{F}[\alpha] \subseteq \mathbb{F}(\alpha)$ (since $\mathbb{F}(\alpha)$ is closed under polynomial evaluations). Hence $\mathbb{F}(\alpha) = \mathbb{F}[\alpha]$.

Basis: any polynomial $p(\alpha)$ reduces modulo $m_\alpha$ to a polynomial of degree $< n$, i.e., a linear combination of $1, \alpha, \ldots, \alpha^{n-1}$. Linear independence: no nontrivial combination = 0, else $\alpha$ satisfies a polynomial of degree $< n$. $\blacksquare$

### Examples

**Example 11.** $\mathbb{Q}(\sqrt 2) = \{a + b\sqrt 2 : a, b \in \mathbb{Q}\}$ with basis $\{1, \sqrt 2\}$, degree 2.

**Example 12.** $\mathbb{Q}(\sqrt[3] 2) = \{a + b\sqrt[3] 2 + c\sqrt[3]{4} : a, b, c \in \mathbb{Q}\}$ with basis $\{1, \sqrt[3] 2, \sqrt[3]{4}\}$, degree 3.

**Example 13.** $\mathbb{R}(i) = \mathbb{C}$, degree 2.

## 27.4 Degree Tower

> **Theorem 27.7 (Tower law).** Let $\mathbb{F} \subseteq K \subseteq L$ be a tower of fields. Then
> $$[L : \mathbb{F}] = [L : K] \cdot [K : \mathbb{F}].$$
>
> Moreover, if $\{u_1, \ldots, u_m\}$ is a $K$-basis of $L$ and $\{v_1, \ldots, v_n\}$ is an $\mathbb{F}$-basis of $K$, then $\{u_i v_j\}_{i,j}$ is an $\mathbb{F}$-basis of $L$.

*Proof.* Any $\ell \in L$ has $\ell = \sum a_i u_i$ with $a_i \in K$. Each $a_i = \sum b_{ij} v_j$ with $b_{ij} \in \mathbb{F}$. Combining: $\ell = \sum b_{ij} u_i v_j$, so $\{u_i v_j\}$ spans.

Linear independence: if $\sum b_{ij} u_i v_j = 0$ in $L$, group as $\sum_i (\sum_j b_{ij} v_j) u_i = 0$. By linear independence of $u_i$ over $K$, $\sum_j b_{ij} v_j = 0$ for each $i$. By linear independence of $v_j$ over $\mathbb{F}$, $b_{ij} = 0$. ✓

Hence dimension is $mn$. $\blacksquare$

### Applications

**Example 14.** $[\mathbb{Q}(\sqrt 2, \sqrt 3) : \mathbb{Q}]$. Tower: $\mathbb{Q} \subseteq \mathbb{Q}(\sqrt 2) \subseteq \mathbb{Q}(\sqrt 2, \sqrt 3)$. First step: degree 2. Second step: $\sqrt 3$ over $\mathbb{Q}(\sqrt 2)$, minimal polynomial $x^2 - 3$ (irreducible over $\mathbb{Q}(\sqrt 2)$ since $\sqrt 3 \notin \mathbb{Q}(\sqrt 2)$ — check), degree 2.

Total: $2 \cdot 2 = 4$. Basis of $\mathbb{Q}(\sqrt 2, \sqrt 3)$: $\{1, \sqrt 2, \sqrt 3, \sqrt 6\}$.

**Example 15.** $[\mathbb{Q}(\sqrt[3] 2, \omega) : \mathbb{Q}]$ where $\omega = e^{2\pi i/3}$. Tower: $\mathbb{Q} \subseteq \mathbb{Q}(\sqrt[3] 2) \subseteq \mathbb{Q}(\sqrt[3] 2, \omega)$. First: degree 3. Second: $\omega$ satisfies $x^2 + x + 1$, which remains irreducible over $\mathbb{Q}(\sqrt[3] 2) \subseteq \mathbb{R}$ (since $\omega \notin \mathbb{R}$). Degree 2.

Total: $3 \cdot 2 = 6$.

## 27.5 Algebraic Extensions

> **Definition 27.8.** $L/\mathbb{F}$ is **algebraic** if every $\alpha \in L$ is algebraic over $\mathbb{F}$. Otherwise it is **transcendental**.

> **Theorem 27.9.** Every finite extension is algebraic.

*Proof.* If $[L : \mathbb{F}] = n$ and $\alpha \in L$, then $\{1, \alpha, \alpha^2, \ldots, \alpha^n\}$ has $n + 1$ elements in an $n$-dimensional space, hence linearly dependent. Some nonzero combination $\sum_i c_i \alpha^i = 0$, giving a polynomial with $\alpha$ as a root. $\blacksquare$

**Warning.** The converse fails: algebraic extensions can be infinite (e.g., the algebraic numbers $\overline{\mathbb{Q}} / \mathbb{Q}$).

## 27.6 Finite Fields — Classification

> **Theorem 27.10 (Existence and uniqueness of finite fields).** For every prime $p$ and every integer $n \ge 1$, there exists a field $\mathbb{F}_{p^n}$ (also denoted $GF(p^n)$) of order $p^n$. It is unique up to isomorphism.

*Proof sketch.*

**Existence.** Consider the splitting field of $x^{p^n} - x$ over $\mathbb{F}_p$. This is a field of order $p^n$.

**Uniqueness.** Any field $F$ of order $p^n$ has $\operatorname{char}(F) = p$ (so contains $\mathbb{F}_p$). Multiplicative group $F^\times$ has order $p^n - 1$, so every $a \in F^\times$ satisfies $a^{p^n - 1} = 1$, hence $a^{p^n} = a$. Every element of $F$ is a root of $x^{p^n} - x$. Hence $F$ is determined as the splitting field of $x^{p^n} - x$ over $\mathbb{F}_p$. $\blacksquare$

### Structure of $\mathbb{F}_{p^n}$

- $|\mathbb{F}_{p^n}| = p^n$
- $\operatorname{char}(\mathbb{F}_{p^n}) = p$
- $\mathbb{F}_{p^n}$ contains $\mathbb{F}_p$ as its prime subfield
- $(\mathbb{F}_{p^n})^\times$ is **cyclic** of order $p^n - 1$
- $\mathbb{F}_{p^m} \subseteq \mathbb{F}_{p^n}$ iff $m \mid n$

**Example 16.** $\mathbb{F}_4 = \mathbb{F}_2[x]/\langle x^2 + x + 1 \rangle = \{0, 1, x, x + 1\}$. Multiplication: $x^2 = -x - 1 = x + 1$, $x(x+1) = x^2 + x = 1$. So $x^{-1} = x + 1$.

**Example 17.** $\mathbb{F}_8 = \mathbb{F}_2[x]/\langle x^3 + x + 1 \rangle$: 8 elements, $\mathbb{F}_8^\times$ cyclic of order 7. $\mathbb{F}_2 \subseteq \mathbb{F}_8$, but $\mathbb{F}_4 \not\subseteq \mathbb{F}_8$ (since $2 \nmid 3$).

**Example 18.** $\mathbb{F}_9 = \mathbb{F}_3[x]/\langle x^2 + 1 \rangle$: 9 elements, $\mathbb{F}_9^\times$ cyclic of order 8. $\mathbb{F}_3 \subseteq \mathbb{F}_9$.

## 27.7 Frobenius Automorphism

> **Theorem 27.11.** The map $\phi_p: \mathbb{F}_{p^n} \to \mathbb{F}_{p^n}$, $\phi_p(a) = a^p$, is a field automorphism. $\operatorname{Aut}(\mathbb{F}_{p^n}/\mathbb{F}_p)$ is cyclic of order $n$, generated by $\phi_p$.

(The Galois group of $\mathbb{F}_{p^n}/\mathbb{F}_p$.)

*Proof.* $\phi_p$ is a ring homomorphism by Freshman's Dream (Theorem 21.7). Injective (field homomorphism). Surjective (injective map on finite set).

$\phi_p^n(a) = a^{p^n} = a$ for all $a \in \mathbb{F}_{p^n}$ (as computed earlier). So $\phi_p$ has order dividing $n$. Order exactly $n$ because the fixed field of $\phi_p^d$ is $\mathbb{F}_{p^d}$, and $\mathbb{F}_{p^n}$'s only subfield fixed by $\phi_p^d$ with $d < n$ is smaller than $\mathbb{F}_{p^n}$. $\blacksquare$

## 27.8 Geometric Constructibility

**Constructible numbers** are lengths obtainable from the unit interval using compass and straightedge.

> **Theorem 27.12 (Constructible ⟹ algebraic of 2-power degree).** A real number $\alpha$ is constructible iff $\alpha$ lies in a tower $\mathbb{Q} = \mathbb{F}_0 \subseteq \mathbb{F}_1 \subseteq \cdots \subseteq \mathbb{F}_k$ with each $[\mathbb{F}_i : \mathbb{F}_{i-1}] = 2$.
>
> In particular, $[\mathbb{Q}(\alpha) : \mathbb{Q}]$ must be a power of 2.

### Classical impossibilities

**Impossibility 1 (Doubling the cube).** Constructing $\sqrt[3] 2$ is impossible.

*Proof.* $[\mathbb{Q}(\sqrt[3] 2) : \mathbb{Q}] = 3$, not a power of 2. $\blacksquare$

**Impossibility 2 (Trisecting the angle $60°$).** Impossible.

*Proof.* Trisecting $60°$ requires constructing $\cos 20°$. The triple-angle formula gives $\cos 60° = 4\cos^3 20° - 3\cos 20°$, so $\alpha = \cos 20°$ satisfies $4\alpha^3 - 3\alpha = 1/2$, i.e., $8\alpha^3 - 6\alpha - 1 = 0$. This polynomial $8x^3 - 6x - 1$ is irreducible over $\mathbb{Q}$ (rational root candidates $\pm 1, \pm 1/2, \pm 1/4, \pm 1/8$ fail). So $[\mathbb{Q}(\alpha) : \mathbb{Q}] = 3$, not a power of 2. $\blacksquare$

**Impossibility 3 (Squaring the circle).** Constructing $\sqrt \pi$ is impossible.

*Proof.* $\pi$ is transcendental (Lindemann, 1882), so $\sqrt \pi$ is transcendental. Transcendental elements can't be constructed (Theorem 27.12 needs algebraicity). $\blacksquare$

## 27.9 Practice Problems

**Problem 1.** Find $[\mathbb{Q}(\sqrt 5, \sqrt 7) : \mathbb{Q}]$ and exhibit a basis.

**Problem 2.** What is the minimal polynomial of $\sqrt 2 + 1$ over $\mathbb{Q}$?

**Problem 3.** Determine whether $\mathbb{F}_{25}$ contains $\mathbb{F}_5$ as a subfield, and whether it contains $\mathbb{F}_{125}$.

**Problem 4.** Compute $[\mathbb{Q}(\sqrt[4] 2) : \mathbb{Q}]$.

**Problem 5.** Show that the set of algebraic numbers $\overline{\mathbb{Q}}$ is a subfield of $\mathbb{C}$.

**Problem 6.** List all subfields of $\mathbb{F}_{64}$.

**Problem 7.** Show that the regular pentagon is constructible, i.e., $\cos(2\pi/5)$ is constructible.

### Solutions

**1.** Tower: $\mathbb{Q} \subseteq \mathbb{Q}(\sqrt 5) \subseteq \mathbb{Q}(\sqrt 5, \sqrt 7)$. First: degree 2. Second: $\sqrt 7 \notin \mathbb{Q}(\sqrt 5)$ (else $\sqrt 7 = a + b\sqrt 5$, squaring gives $7 = a^2 + 5b^2 + 2ab\sqrt 5$, so $2ab = 0$; either $a = 0$ gives $7 = 5b^2$, no rational $b$; or $b = 0$ gives $7 = a^2$, no rational $a$). So minimal polynomial $x^2 - 7$ irreducible. Degree 2.

Total: $2 \cdot 2 = 4$. Basis: $\{1, \sqrt 5, \sqrt 7, \sqrt{35}\}$. $\boxed{4}$

**2.** $(\sqrt 2 + 1)^2 = 3 + 2\sqrt 2$. So $\alpha^2 - 3 = 2\sqrt 2$, squaring: $(\alpha^2 - 3)^2 = 8$, giving $\alpha^4 - 6\alpha^2 + 9 = 8$, so $\alpha^4 - 6\alpha^2 + 1 = 0$. Hmm but simpler: $\alpha - 1 = \sqrt 2$, so $(\alpha - 1)^2 = 2$, $\alpha^2 - 2\alpha + 1 = 2$, $\alpha^2 - 2\alpha - 1 = 0$. Degree 2, irreducible (no rational roots: $\pm 1$ don't satisfy). $\boxed{x^2 - 2x - 1}$

**3.** $\mathbb{F}_{25} = \mathbb{F}_{5^2}$. Subfields $\mathbb{F}_{5^d}$ for $d \mid 2$, i.e., $d \in \{1, 2\}$: $\mathbb{F}_5, \mathbb{F}_{25}$. Yes, $\mathbb{F}_5 \subseteq \mathbb{F}_{25}$. $\mathbb{F}_{125} = \mathbb{F}_{5^3}$: need $3 \mid 2$, false. So $\mathbb{F}_{125} \not\subseteq \mathbb{F}_{25}$. $\boxed{}$

**4.** Minimal polynomial of $\sqrt[4] 2$ over $\mathbb{Q}$: $x^4 - 2$ (irreducible by Eisenstein, $\ell = 2$). Degree 4. $\boxed{4}$

**5.** $\overline{\mathbb{Q}}$: set of algebraic numbers. Closure: if $\alpha, \beta$ algebraic, then $\alpha + \beta, \alpha \beta, \alpha - \beta, \alpha/\beta$ (for $\beta \neq 0$) are algebraic. Key: $\mathbb{Q}(\alpha, \beta)$ has finite degree over $\mathbb{Q}$, so any element is algebraic.

Explicitly: let $n = [\mathbb{Q}(\alpha, \beta) : \mathbb{Q}]$. For any $\gamma \in \mathbb{Q}(\alpha, \beta)$, $\{1, \gamma, \gamma^2, \ldots, \gamma^n\}$ are linearly dependent, giving a polynomial with $\gamma$ as root. $\blacksquare$

**6.** $\mathbb{F}_{64} = \mathbb{F}_{2^6}$. Subfields $\mathbb{F}_{2^d}$ for $d \mid 6$, i.e., $d \in \{1, 2, 3, 6\}$: $\mathbb{F}_2, \mathbb{F}_4, \mathbb{F}_8, \mathbb{F}_{64}$. $\boxed{4\text{ subfields}}$

**7.** $\cos(2\pi/5)$ satisfies $4\cos^2(2\pi/5) + 2\cos(2\pi/5) - 1 = 0$ (from $\cos(4\pi/5) = -1 - \cos(2\pi/5)$ and double-angle manipulation). Specifically: $\cos(2\pi/5) = (\sqrt 5 - 1)/4$, which uses only $\sqrt 5$ — a 2-step tower $\mathbb{Q} \subseteq \mathbb{Q}(\sqrt 5)$ of degree 2. So constructible. $\blacksquare$

## Related Concepts

- [[26-fields-and-irreducibility]] — irreducible polynomials generate field extensions
- [[24-polynomial-rings]] — $\mathbb{F}[x]/\langle \text{irreducible} \rangle$ construction
- [[21-integral-domains]] — characteristic and Frobenius

---

*Last updated: 2026-04-18*

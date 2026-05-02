# 21. Gradient of Vector-Valued Functions, Jacobian, and Backpropagation

> **Source.** "Gradient of Vector Valued Functions and Neural Networks" lecture notes (April 28, 2026). This chapter generalises the gradient from scalar-valued $\mathbb{R}^n \to \mathbb{R}$ functions (covered in [[02-gradient-and-directional-derivatives]]) to vector-valued $\mathbb{R}^n \to \mathbb{R}^m$ functions, leading to the **Jacobian matrix**, the **chain rule in matrix form**, and culminating in **backpropagation** for neural networks — a major application of the multivariable chain rule.

> **Convention.** From §21.5 onwards (following the neural-network literature), we treat gradients as **row vectors** and use $\dfrac{\partial f}{\partial \mathbf{x}}$ in place of $\nabla_{\mathbf{x}} f$. Until then we keep the $\nabla$ notation.

---

## 21.1 From Scalar-Valued to Vector-Valued Functions

### Recap (scalar case, [[02-gradient-and-directional-derivatives]])

If $f : \mathbb{R}^n \to \mathbb{R}$ has continuous partials, the **gradient** at $\mathbf{a} \in \mathbb{R}^n$ is the row (or column, by convention) vector
$$\nabla_{\mathbf{x}} f(\mathbf{a}) = \left[\frac{\partial f}{\partial x_1}(\mathbf{a}), \ldots, \frac{\partial f}{\partial x_n}(\mathbf{a})\right].$$

### The vector-valued setting

Now consider $f : \mathbb{R}^n \to \mathbb{R}^m$ with components
$$f(\mathbf{x}) = (f_1(\mathbf{x}), f_2(\mathbf{x}), \ldots, f_m(\mathbf{x})),$$
where each $f_i : \mathbb{R}^n \to \mathbb{R}$ is a scalar component. We use **column** convention for inputs and outputs:
$$\mathbf{x} = (x_1, \ldots, x_n) = \begin{bmatrix} x_1 \\ \vdots \\ x_n\end{bmatrix} = [x_1, \ldots, x_n]^T \in \mathbb{R}^n,$$
identifying $\mathbb{R}^n \cong M_{n \times 1}(\mathbb{R})$. Likewise
$$f(\mathbf{x}) = \begin{bmatrix} f_1(\mathbf{x}) \\ \vdots \\ f_m(\mathbf{x})\end{bmatrix} = [f_1(\mathbf{x}), \ldots, f_m(\mathbf{x})]^T \in \mathbb{R}^m, \qquad f = [f_1, \ldots, f_m]^T.$$

---

## 21.2 The Jacobian Matrix (Gradient of a Vector-Valued Function)

> **Definition (Jacobian).** Let $f : \mathbb{R}^n \to \mathbb{R}^m$ have continuous partials. The **gradient of $f$ with respect to $\mathbf{x}$** — equivalently, the **Jacobian matrix** of $f$ — is the $m \times n$ matrix whose $(i, j)$ entry is $\partial f_i / \partial x_j$:
> $$\boxed{\;\nabla_{\mathbf{x}} f \;=\; \begin{bmatrix} \dfrac{\partial f_1}{\partial x_1} & \dfrac{\partial f_1}{\partial x_2} & \cdots & \dfrac{\partial f_1}{\partial x_n} \\ \vdots & \vdots & \ddots & \vdots \\ \dfrac{\partial f_m}{\partial x_1} & \dfrac{\partial f_m}{\partial x_2} & \cdots & \dfrac{\partial f_m}{\partial x_n} \end{bmatrix}_{m \times n}.\;}$$

Evaluated at a specific $\mathbf{a} \in \mathbb{R}^n$:
$$\nabla_{\mathbf{x}} f(\mathbf{a}) = \left[\frac{\partial f_i}{\partial x_j}(\mathbf{a})\right]_{i, j}.$$

### Reading the rows

Row $i$ of the Jacobian is the gradient (in row form) of the scalar component $f_i$:
$$(\nabla_{\mathbf{x}} f)_{i, *} = \nabla_{\mathbf{x}} f_i = \left[\frac{\partial f_i}{\partial x_1}, \ldots, \frac{\partial f_i}{\partial x_n}\right].$$

So the Jacobian stacks the gradients of the components.

### Special cases

- $m = 1$: Jacobian is a $1 \times n$ row vector — the ordinary gradient (in row form).
- $n = 1$ (curve $f : \mathbb{R} \to \mathbb{R}^m$): Jacobian is an $m \times 1$ column vector — the velocity vector $df/dt$ ([[01-vector-algebra-and-fields]] §1.4 motivation).
- $m = n$: square Jacobian, used in the Inverse Function Theorem and change-of-variables.

---

## 21.3 Why the Jacobian — the Chain Rule

The Jacobian is **exactly** the matrix that makes the chain rule a matrix multiplication.

### Recap of the multivariable chain rule

Let $w = f(x_1, x_2, x_3)$ be $C^1$ on $D \subseteq \mathbb{R}^3$. Suppose $x_1, x_2, x_3$ are themselves $C^1$ functions of $u_1, u_2$ (so $w$ becomes a function of $(u_1, u_2)$ via composition). Then by the chain rule for partial derivatives:
$$\frac{\partial w}{\partial u_1} = \frac{\partial w}{\partial x_1} \frac{\partial x_1}{\partial u_1} + \frac{\partial w}{\partial x_2} \frac{\partial x_2}{\partial u_1} + \frac{\partial w}{\partial x_3} \frac{\partial x_3}{\partial u_1},$$
$$\frac{\partial w}{\partial u_2} = \frac{\partial w}{\partial x_1} \frac{\partial x_1}{\partial u_2} + \frac{\partial w}{\partial x_2} \frac{\partial x_2}{\partial u_2} + \frac{\partial w}{\partial x_3} \frac{\partial x_3}{\partial u_2}.$$

### Matrix form

These two equations stack into:
$$\begin{bmatrix} \dfrac{\partial w}{\partial u_1} & \dfrac{\partial w}{\partial u_2}\end{bmatrix} = \begin{bmatrix} \dfrac{\partial w}{\partial x_1} & \dfrac{\partial w}{\partial x_2} & \dfrac{\partial w}{\partial x_3}\end{bmatrix} \begin{bmatrix} \dfrac{\partial x_1}{\partial u_1} & \dfrac{\partial x_1}{\partial u_2} \\ \dfrac{\partial x_2}{\partial u_1} & \dfrac{\partial x_2}{\partial u_2} \\ \dfrac{\partial x_3}{\partial u_1} & \dfrac{\partial x_3}{\partial u_2}\end{bmatrix}.$$

In compact form (with $\mathbf{h}(u_1, u_2) = (x_1, x_2, x_3)$):
$$\boxed{\;\nabla_{\mathbf{u}} w = \nabla_{\mathbf{x}} w \cdot \nabla_{\mathbf{u}} \mathbf{h}.\;}$$

Dimensions:
$$\underbrace{(1 \times 2)}_{\text{result}} = \underbrace{(1 \times 3)}_{\text{scalar grad}} \cdot \underbrace{(3 \times 2)}_{\text{Jacobian of } \mathbf{h}}.$$

This is **the chain rule as matrix multiplication**. Reading gradients as row vectors makes the dimensions line up.

### General chain rule

If $\mathbf{x} \xrightarrow{\mathbf{g}} \mathbf{y} \xrightarrow{\mathbf{f}} \mathbf{z}$ (composition $\mathbf{f} \circ \mathbf{g}$), with $\mathbf{x} \in \mathbb{R}^n, \mathbf{y} \in \mathbb{R}^m, \mathbf{z} \in \mathbb{R}^p$, and both $\mathbf{f}, \mathbf{g}$ are $C^1$, then
$$\nabla_{\mathbf{x}} (\mathbf{f} \circ \mathbf{g})(\mathbf{a}) = \nabla_{\mathbf{y}} \mathbf{f}(\mathbf{g}(\mathbf{a})) \cdot \nabla_{\mathbf{x}} \mathbf{g}(\mathbf{a}).$$

Dimensions: $(p \times n) = (p \times m) \cdot (m \times n)$. ✓

---

## 21.4 Worked Examples

### Example 1: Gradient of a linear map $f(\mathbf{x}) = A\mathbf{x}$

**Setup.** Let $A \in M_{m \times n}(\mathbb{R})$ and define $f : \mathbb{R}^n \to \mathbb{R}^m$ by $f(\mathbf{x}) = A\mathbf{x}$. Compute $\nabla_{\mathbf{x}} f$.

**Strategy.** Find each component function $f_i$ explicitly, take partials.

**Computation.**

The $i$-th component of $f$ is the $i$-th entry of $A\mathbf{x}$:
$$f_i(\mathbf{x}) = (A\mathbf{x})_i = \sum_{j=1}^n A_{ij} x_j.$$

Partial w.r.t. $x_j$:
$$\frac{\partial f_i}{\partial x_j} = A_{ij}.$$

Therefore:
$$\nabla_{\mathbf{x}} f = \begin{bmatrix} A_{11} & A_{12} & \cdots & A_{1n} \\ \vdots & \vdots & \ddots & \vdots \\ A_{m1} & A_{m2} & \cdots & A_{mn}\end{bmatrix} = A.$$

**Conclusion.** $\boxed{\nabla_{\mathbf{x}}(A\mathbf{x}) = A.}$ The Jacobian of a linear map is the matrix itself — analogous to $(ax)' = a$ in 1D.

**Exercise.** If $f(\mathbf{x}) = A\mathbf{x} + \mathbf{b}$ with $\mathbf{b} \in \mathbb{R}^m$ constant, then $\nabla_{\mathbf{x}} f = A$ (the constant doesn't affect partials).

---

### Example 2: Gradient via chain rule (linear regression loss)

**Setup.** In linear regression with $\theta \in \mathbb{R}^D$ as parameter vector and $\Phi \in M_{N \times D}(\mathbb{R})$ as the input feature matrix, predict $\hat{\mathbf{y}} = \Phi \theta$. Define error $\mathbf{e}(\theta) = \mathbf{y} - \Phi \theta \in \mathbb{R}^N$ and loss $L(\theta) = \|\mathbf{e}(\theta)\|^2$. Compute $\nabla_\theta L$.

**Strategy.** $L$ is a composition $\theta \to \mathbf{e} \to L$. Apply the chain rule.

**Computation.**

Composition: $\mathbb{R}^D \xrightarrow{\mathbf{e}} \mathbb{R}^N \xrightarrow{L} \mathbb{R}$.

By the chain rule:
$$\nabla_\theta L = \nabla_{\mathbf{e}} L \cdot \nabla_\theta \mathbf{e}.$$

**Inner Jacobian.** $\mathbf{e}(\theta) = \mathbf{y} - \Phi \theta$, a linear (affine) function of $\theta$. By Example 1, $\nabla_\theta \mathbf{e} = -\Phi$.

**Outer gradient.** $L(\mathbf{e}) = \mathbf{e}^T \mathbf{e} = e_1^2 + \cdots + e_N^2$, so
$$\frac{\partial L}{\partial e_i} = 2 e_i \qquad\Longrightarrow\qquad \nabla_{\mathbf{e}} L = [2 e_1, \ldots, 2 e_N] = 2 \mathbf{e}^T.$$

**Combine.**
$$\nabla_\theta L = 2 \mathbf{e}^T \cdot (-\Phi) = -2 \mathbf{e}^T \Phi = -2 (\mathbf{y} - \Phi\theta)^T \Phi = -2(\mathbf{y}^T - \theta^T \Phi^T) \Phi.$$

**Verification.** Setting $\nabla_\theta L = 0$: $\mathbf{y}^T \Phi = \theta^T \Phi^T \Phi$, i.e., $\Phi^T \mathbf{y} = \Phi^T \Phi\,\theta$ — the **normal equations** of least squares. ✓

---

## 21.5 Gradients of Matrices (Tensors)

If both input and output of $f$ are matrices, the gradient becomes a 4-dimensional array — a **tensor**.

### Setup

Let $A = f(B)$ where $A \in M_{m \times n}(\mathbb{R})$ and $B \in M_{p \times q}(\mathbb{R})$. So $f$ has $mn$ component functions $A_{11}, \ldots, A_{mn}$, each a function of the $pq$ entries of $B$.

### Tensor notation (first definition)

For each fixed $(i, j)$, the gradient of the scalar component $A_{ij}$ w.r.t. $B$ is a $p \times q$ matrix:
$$\nabla_B A_{ij} := \left[\frac{\partial A_{ij}}{\partial B_{kl}}\right]_{k, l}.$$

Stacking these $m n$ matrices indexed by $(i, j)$ gives a 4-dimensional tensor:
$$\mathcal{J}_{ijkl} = \frac{\partial A_{ij}}{\partial B_{kl}}.$$

### Vectorisation (second definition)

In practice it is often more convenient to **flatten** matrices into vectors:
- $A \in M_{m \times n}(\mathbb{R}) \cong \mathbb{R}^{mn}$ via $\operatorname{vec}(A) = [A_{11}, A_{12}, \ldots, A_{1n}, A_{21}, \ldots, A_{mn}]^T$.
- $B \in M_{p \times q}(\mathbb{R}) \cong \mathbb{R}^{pq}$ via $\operatorname{vec}(B)$.

Then $f$ becomes a map $\mathbb{R}^{pq} \to \mathbb{R}^{mn}$, and the Jacobian is an ordinary $mn \times pq$ matrix.

### Example 3: Gradient of $A\mathbf{x}$ w.r.t. $A$

**Setup.** Let $f(A) = A \mathbf{x}$ where $A \in M_{M \times N}(\mathbb{R})$ and $\mathbf{x} \in \mathbb{R}^N$ (fixed). So $f : M_{M \times N} \cong \mathbb{R}^{MN} \to \mathbb{R}^M$.

**Question.** What is $\nabla_A f$?

**Solution.**

*Dimensions.* $\nabla_A f \in M_{M \times (MN)}(\mathbb{R})$ (an $M \times MN$ matrix in vectorised form).

*Components.* Write $\operatorname{vec}(A) = [A_{11}, A_{12}, \ldots, A_{1N}, A_{21}, \ldots, A_{MN}]^T$.

The $i$-th component of $A \mathbf{x}$ is $f_i(A) = (A\mathbf{x})_i = \sum_{l=1}^N A_{il} x_l$.

Take partial w.r.t. $A_{kj}$:
$$\frac{\partial f_i}{\partial A_{kj}} = \begin{cases} x_j, & k = i, \\ 0, & k \ne i.\end{cases}$$

*Building the Jacobian.* Row $i$ of $\nabla_A f$ has $x_j$ in positions corresponding to $A_{ij}$ ($j = 1, \ldots, N$), and zero elsewhere. Specifically:

Row 1 ($i = 1$): nonzeros at $A_{11}, \ldots, A_{1N}$. Row reads
$$[x_1, x_2, \ldots, x_N, \;0, \ldots, 0, \;\ldots, \;0, \ldots, 0] = [\mathbf{x}^T, \mathbf{0}, \ldots, \mathbf{0}].$$

Row $k$: nonzeros at $A_{k1}, \ldots, A_{kN}$. Row reads
$$[\mathbf{0}, \ldots, \mathbf{0}, \mathbf{x}^T, \mathbf{0}, \ldots, \mathbf{0}].$$

So $\nabla_A f$ is a **block-diagonal-like** matrix:
$$\nabla_A f = \begin{bmatrix} \mathbf{x}^T & \mathbf{0} & \cdots & \mathbf{0} \\ \mathbf{0} & \mathbf{x}^T & \cdots & \mathbf{0} \\ \vdots & \vdots & \ddots & \vdots \\ \mathbf{0} & \mathbf{0} & \cdots & \mathbf{x}^T\end{bmatrix}_{M \times (MN)}.$$

---

### Example 4: Gradient of $A^T A$ w.r.t. $A$

**Setup.** $A \in M_{M \times N}(\mathbb{R})$, $f(A) = A^T A = K$. So $K \in M_{N \times N}(\mathbb{R})$, and we compute $\partial K_{pq} / \partial A_{ij}$.

**Computation.** $K_{pq} = (A^T A)_{pq} = \sum_{m=1}^M (A^T)_{pm} A_{mq} = \sum_{m=1}^M A_{mp} A_{mq}.$

$$\frac{\partial K_{pq}}{\partial A_{ij}} = \begin{cases} 2 A_{ip}, & p = q \text{ and } j = p, \\ A_{iq}, & p \ne q \text{ and } j = p, \\ A_{ip}, & p \ne q \text{ and } j = q, \\ 0, & \text{otherwise.}\end{cases}$$

(Each term in the sum contributes when the differentiation index matches one of the $A$-factors.)

---

## 21.6 Convention Change — Row Vectors and $\dfrac{\partial}{\partial \mathbf{x}}$

Following neural-network notation, from this section onwards we use:
- $\dfrac{\partial f}{\partial \mathbf{x}}$ instead of $\nabla_{\mathbf{x}} f$;
- gradients as **row vectors** (so the chain rule reads left-to-right: $\frac{\partial L}{\partial \mathbf{x}} = \frac{\partial L}{\partial \mathbf{y}} \cdot \frac{\partial \mathbf{y}}{\partial \mathbf{x}}$).

---

## 21.7 Artificial Neural Networks

A neural network is a parametric function $\mathbf{X} \mapsto \mathbf{Y}$ built by composing affine maps with non-linear activation functions.

### The single neuron

A single neuron processes input $a^{(0)} \in \mathbb{R}$ via:
- **Pre-activation:** $z = w a^{(0)} + b$, where $w \in \mathbb{R}$ is a weight and $b \in \mathbb{R}$ is a bias.
- **Activation:** $a^{(1)} = \sigma(z)$, where $\sigma : \mathbb{R} \to \mathbb{R}$ is a non-linear **activation function**.

Common activations:
- **Sigmoid:** $\sigma(x) = \dfrac{1}{1 + e^{-x}}$. Range $(0, 1)$.
- **Hyperbolic tangent:** $\tanh(x) = \dfrac{e^x - e^{-x}}{e^x + e^{-x}}$. Range $(-1, 1)$.

A neuron "fires" (output near 1) when the pre-activation $z$ is large.

### Single-layer network

For $n$ input neurons and $m$ output neurons, define:

(1) **Weight matrix** $W^{(1)} \in M_{m \times n}(\mathbb{R})$, where $w^{(1)}_{ij}$ is the weight connecting input neuron $j$ to output neuron $i$:
$$W^{(1)} = \begin{bmatrix} w^{(1)}_{00} & \cdots & w^{(1)}_{0, n-1} \\ \vdots & \ddots & \vdots \\ w^{(1)}_{m-1, 0} & \cdots & w^{(1)}_{m-1, n-1}\end{bmatrix}.$$

(2) **Bias vector** $\mathbf{b}^{(1)} \in \mathbb{R}^m$, one bias per output neuron.

(3) **Forward propagation equation.**
$$\boxed{\; \mathbf{a}^{(1)} = \sigma\big(W^{(1)} \mathbf{a}^{(0)} + \mathbf{b}^{(1)}\big), \;}$$
where $\sigma$ is applied element-wise. The pre-activation vector is $\mathbf{z}^{(1)} = W^{(1)} \mathbf{a}^{(0)} + \mathbf{b}^{(1)}$.

### Multi-layer (feed-forward) networks

Stacking layers gives a feed-forward neural network: for layer $l \in \{1, \ldots, L\}$,
$$\mathbf{z}^{(l)} = W^{(l)} \mathbf{a}^{(l-1)} + \mathbf{b}^{(l)}, \qquad \mathbf{a}^{(l)} = \sigma(\mathbf{z}^{(l)}).$$

The full network is the composition $\mathbf{a}^{(L)} = \sigma(W^{(L)} \sigma(W^{(L-1)} \cdots \sigma(W^{(1)} \mathbf{x} + \mathbf{b}^{(1)}) + \cdots ))$.

### Toy example: training a NOT gate

**Problem.** Train a single neuron to compute the NOT function: input $a^{(0)} = 1 \to$ output $\approx 0$, input $a^{(0)} = 0 \to$ output $\approx 1$.

Model: $a^{(1)} = \tanh(w a^{(0)} + b)$.

**Test option (d): $w = -5, b = 5$.**

If $a^{(0)} = 1$: $z = -5 + 5 = 0$, $\tanh(0) = 0$. ✓
If $a^{(0)} = 0$: $z = 0 + 5 = 5$, $\tanh(5) \approx 1$. ✓

So $(w, b) = (-5, 5)$ realises NOT.

**Take-away.** Training a neural network = finding weights and biases to fit a desired input-output relation.

---

## 21.8 Forward Propagation (Predictive Pass)

### Step-by-step

For each layer $l$ from $1$ to $L$:

**Step 1 — Pre-activation:** $\mathbf{z}^{(l)} = W^{(l)} \mathbf{a}^{(l-1)} + \mathbf{b}^{(l)}$. **Cache** $\mathbf{z}^{(l)}$ for the backward pass.

**Step 2 — Activation:** $\mathbf{a}^{(l)} = \sigma(\mathbf{z}^{(l)})$.

### Cost function

Once $\mathbf{a}^{(L)}$ is computed, compare to the target $\mathbf{y}$ via a cost function. Standard choice: mean squared error (MSE),
$$C = \tfrac{1}{2} \|\mathbf{a}^{(L)} - \mathbf{y}\|^2 = \tfrac{1}{2} \sum_i (a^{(L)}_i - y_i)^2.$$

The factor of $1/2$ is for clean derivative bookkeeping ($\partial C / \partial a^{(L)}_i = a^{(L)}_i - y_i$).

---

## 21.9 Backpropagation (Learning Pass)

### Goal

Compute $\dfrac{\partial C}{\partial W^{(l)}}$ and $\dfrac{\partial C}{\partial \mathbf{b}^{(l)}}$ for every layer $l$, so that the parameters can be updated via **gradient descent**:
$$W^{(l)} \;\leftarrow\; W^{(l)} - \alpha \frac{\partial C}{\partial W^{(l)}}, \qquad \mathbf{b}^{(l)} \;\leftarrow\; \mathbf{b}^{(l)} - \alpha \frac{\partial C}{\partial \mathbf{b}^{(l)}},$$
where $\alpha > 0$ is the **learning rate**.

### The chain rule applied backwards

The dependency chain is
$$C \leftarrow \mathbf{a}^{(L)} \leftarrow \mathbf{z}^{(L)} \leftarrow \mathbf{a}^{(L-1)} \leftarrow \mathbf{z}^{(L-1)} \leftarrow \cdots \leftarrow \mathbf{a}^{(l)} \leftarrow \mathbf{z}^{(l)} \leftarrow W^{(l)}.$$

By the chain rule (row-vector convention):
$$\frac{\partial C}{\partial W^{(l)}} = \frac{\partial C}{\partial \mathbf{z}^{(l)}} \cdot \frac{\partial \mathbf{z}^{(l)}}{\partial W^{(l)}}.$$

### Why "backpropagation"?

Notice the structure: when we compute $\partial C / \partial W^{(l)}$ for $l = L$, we use $\partial C / \partial \mathbf{z}^{(L)}$. When we compute $\partial C / \partial W^{(L-1)}$, we use $\partial C / \partial \mathbf{z}^{(L-1)} = \partial C / \partial \mathbf{z}^{(L)} \cdot \partial \mathbf{z}^{(L)} / \partial \mathbf{a}^{(L-1)} \cdot \partial \mathbf{a}^{(L-1)} / \partial \mathbf{z}^{(L-1)}$.

The factor $\partial C / \partial \mathbf{z}^{(L)}$ is **reused** rather than recomputed. By caching gradients of one layer and propagating them backward, we avoid redundant matrix products.

**Complexity.** Backpropagation runs in $O(N)$ time with respect to the number of layers $N$, vs. $O(N^2)$ for a brute-force layer-by-layer chain rule.

### Example architecture

Consider a two-hidden-layer network:
$$\mathbf{a}^{(0)} \xrightarrow{W^{(1)}, \mathbf{b}^{(1)}} \mathbf{z}^{(1)} \xrightarrow{\sigma} \mathbf{a}^{(1)} \xrightarrow{W^{(2)}, \mathbf{b}^{(2)}} \mathbf{z}^{(2)} \xrightarrow{\sigma} \mathbf{a}^{(2)}.$$

Cost: $C = \tfrac{1}{2}\|\mathbf{a}^{(2)} - \mathbf{y}\|^2$.

Chain rule gradients:

*For $W^{(2)}$ (top layer):*
$$\frac{\partial C}{\partial W^{(2)}} = \left(\frac{\partial C}{\partial \mathbf{a}^{(2)}} \cdot \frac{\partial \mathbf{a}^{(2)}}{\partial \mathbf{z}^{(2)}}\right) \cdot \frac{\partial \mathbf{z}^{(2)}}{\partial W^{(2)}}. \quad\text{(Eq. 1)}$$

*For $W^{(1)}$ (lower layer):*
$$\frac{\partial C}{\partial W^{(1)}} = \left(\underbrace{\frac{\partial C}{\partial \mathbf{a}^{(2)}} \cdot \frac{\partial \mathbf{a}^{(2)}}{\partial \mathbf{z}^{(2)}}}_{\text{reused from Eq. 1}}\right) \cdot \frac{\partial \mathbf{z}^{(2)}}{\partial \mathbf{a}^{(1)}} \cdot \frac{\partial \mathbf{a}^{(1)}}{\partial \mathbf{z}^{(1)}} \cdot \frac{\partial \mathbf{z}^{(1)}}{\partial W^{(1)}}. \quad\text{(Eq. 2)}$$

The bracketed term in Eq. 1 reappears verbatim in Eq. 2 — that is the reuse that makes backprop efficient.

### Generalised formula

For a network of $N$ layers, the gradient at layer $i$ is:
$$\frac{\partial C}{\partial W^{(i)}} = \frac{\partial C}{\partial \mathbf{a}^{(N)}} \cdot \frac{\partial \mathbf{a}^{(N)}}{\partial \mathbf{z}^{(N)}} \cdot \frac{\partial \mathbf{z}^{(N)}}{\partial \mathbf{a}^{(N-1)}} \cdots \frac{\partial \mathbf{z}^{(i+1)}}{\partial \mathbf{a}^{(i)}} \cdot \frac{\partial \mathbf{a}^{(i)}}{\partial \mathbf{z}^{(i)}} \cdot \frac{\partial \mathbf{z}^{(i)}}{\partial W^{(i)}}.$$

This is a long matrix product; the trick is to compute it **right-to-left** for forward derivation but **store** the partial products from output backwards (left-to-right in this expression) to enable reuse.

---

## 21.10 Numerical Worked Example 1 — Sigmoid Neuron

**Problem.** Single neuron with two inputs:

- Inputs: $\mathbf{x} = \mathbf{a}^{(0)} = (0.8, 0.6)^T$.
- Target: $y = 1.0$.
- Initial parameters: $w_1 = 0.3, w_2 = 0.5, b = 0.1$.
- Activation: sigmoid $\sigma(x) = (1 + e^{-x})^{-1}$.
- Learning rate: $\alpha = 0.1$.

Perform one full forward + backward pass.

### Derivative of sigmoid

Using the identity $\sigma'(x) = \sigma(x)(1 - \sigma(x))$:
*Derivation.* $\sigma(x) = (1 + e^{-x})^{-1}$, so
$$\sigma'(x) = -(1 + e^{-x})^{-2} \cdot (-e^{-x}) = \frac{e^{-x}}{(1 + e^{-x})^2} = \frac{1}{1 + e^{-x}} \cdot \frac{e^{-x}}{1 + e^{-x}} = \sigma(x)(1 - \sigma(x)). \;\checkmark$$

### Step 1 — Forward propagation

**Pre-activation.**
$$z^{(1)} = w_1 a_0^{(0)} + w_2 a_1^{(0)} + b = (0.3)(0.8) + (0.5)(0.6) + 0.1 = 0.24 + 0.30 + 0.10 = 0.64.$$

**Activation.**
$$a^{(1)} = \sigma(0.64) = \frac{1}{1 + e^{-0.64}} \approx \frac{1}{1 + 0.5273} \approx 0.6547.$$

**Cost.**
$$C = \tfrac{1}{2}(a^{(1)} - y)^2 = \tfrac{1}{2}(0.6547 - 1)^2 = \tfrac{1}{2}(0.3453)^2 \approx 0.0596.$$

### Step 2 — Backpropagation

**Update rule.** $w \leftarrow w - \alpha \dfrac{\partial C}{\partial w}$.

Chain rule for $w_1$:
$$\frac{\partial C}{\partial w_1} = \frac{\partial C}{\partial a^{(1)}} \cdot \frac{\partial a^{(1)}}{\partial z^{(1)}} \cdot \frac{\partial z^{(1)}}{\partial w_1}.$$

Compute each:
- $\dfrac{\partial C}{\partial a^{(1)}} = a^{(1)} - y = 0.6547 - 1 = -0.3453.$
- $\dfrac{\partial a^{(1)}}{\partial z^{(1)}} = \sigma'(0.64) = \sigma(0.64)(1 - \sigma(0.64)) = 0.6547 \cdot 0.3453 \approx 0.226.$
- $\dfrac{\partial z^{(1)}}{\partial w_1} = a_0^{(0)} = 0.8.$

So
$$\frac{\partial C}{\partial w_1} = (-0.3453)(0.226)(0.8) \approx -0.0624.$$

For $w_2$ (only the last factor changes to $a_1^{(0)} = 0.6$):
$$\frac{\partial C}{\partial w_2} = (-0.3453)(0.226)(0.6) \approx -0.047.$$

For $b$ (last factor is $\partial z^{(1)} / \partial b = 1$):
$$\frac{\partial C}{\partial b} = (-0.3453)(0.226)(1) \approx -0.078.$$

### Step 3 — Update parameters

$$W^{\text{new}} = [0.3, 0.5] - 0.1 \cdot [-0.0624, -0.047] = [0.30624, 0.5047].$$
$$b^{\text{new}} = 0.1 - 0.1 \cdot (-0.078) = 0.1078.$$

### Summary table (after one step)

| $b^{(1)}$ | $W^{(1)}$ | $a^{(1)}$ | $C$ | $\nabla_{W^{(1)}} C$ | $\partial C / \partial b^{(1)}$ | $W^{(1), \text{new}}$ | $b^{(1), \text{new}}$ |
|---|---|---|---|---|---|---|---|
| $0.1$ | $[0.3, 0.5]$ | $0.655$ | $0.0596$ | $[-0.0624, -0.047]$ | $-0.078$ | $[0.3062, 0.5047]^T$ | $0.1078$ |

After a second iteration (initial $W = [0.3062, 0.5047]$, $b = 0.1078$): $C \approx 0.0584$ — decreasing, as expected.

---

## 21.11 Numerical Worked Example 2 — tanh Neuron, 3 Inputs

**Problem.** Single neuron with three inputs.

- Inputs: $\mathbf{x} = (0.5, -0.2, 0.1)^T$.
- Target: $y = 1.0$.
- Initial: $w_1 = 0.2, w_2 = -0.3, w_3 = 0.4, b = 0.1$.
- Activation: $\tanh$.
- Learning rate: $\alpha = 0.4$.

Perform one full FP + BP iteration.

### Step 1 — Forward propagation

**Pre-activation.**
$$z = w_1 x_1 + w_2 x_2 + w_3 x_3 + b = (0.2)(0.5) + (-0.3)(-0.2) + (0.4)(0.1) + 0.1$$
$$= 0.10 + 0.06 + 0.04 + 0.10 = 0.30.$$

**Activation.** $a = \tanh(0.30) \approx 0.2913.$

**Cost.** $C = \tfrac{1}{2}(0.2913 - 1)^2 \approx 0.2511.$

### Step 2 — Backpropagation

**Activation derivative.** $\tanh'(z) = 1 - \tanh^2(z) = 1 - a^2$.
$$\sigma'(0.30) = 1 - (0.2913)^2 \approx 1 - 0.0849 = 0.9151.$$

**Pre-activation gradient.** Define $\delta = \dfrac{\partial C}{\partial z} = (a - y) \cdot \sigma'(z)$:
$$\delta = (0.2913 - 1)(0.9151) = (-0.7087)(0.9151) \approx -0.6485.$$

**Parameter gradients.**
- $\partial C / \partial w_1 = \delta \cdot x_1 = (-0.6485)(0.5) \approx -0.3243.$
- $\partial C / \partial w_2 = \delta \cdot x_2 = (-0.6485)(-0.2) \approx 0.1297.$
- $\partial C / \partial w_3 = \delta \cdot x_3 = (-0.6485)(0.1) \approx -0.0649.$
- $\partial C / \partial b = \delta = -0.6485.$

### Step 3 — Update

$$w_1^{\text{new}} = 0.2 - 0.4(-0.3243) = 0.3297.$$
$$w_2^{\text{new}} = -0.3 - 0.4(0.1297) = -0.3519.$$
$$w_3^{\text{new}} = 0.4 - 0.4(-0.0649) = 0.4260.$$
$$b^{\text{new}} = 0.1 - 0.4(-0.6485) = 0.3594.$$

### Summary table

| $b^{(1)}$ | $W^{(1)}$ | $a^{(1)}$ | $C$ | $\nabla_{W^{(1)}} C$ | $\partial C / \partial b^{(1)}$ | $W^{(1), \text{new}}$ | $b^{(1), \text{new}}$ |
|---|---|---|---|---|---|---|---|
| $0.1$ | $[0.2, -0.3, 0.4]^T$ | $0.2913$ | $0.2511$ | $[-0.3243, 0.1297, -0.0649]^T$ | $-0.6485$ | $[0.3297, -0.3519, 0.4260]^T$ | $0.3594$ |

---

## 21.12 Practice Problems

1. Compute the Jacobian of $f(x_1, x_2) = (x_1^2 + x_2, x_1 x_2, e^{x_1})$ at $(1, 2)$.

2. Let $f(\mathbf x) = \mathbf x^T A \mathbf x$ for $A \in M_n(\mathbb R)$ symmetric, $\mathbf x \in \mathbb R^n$. Show $\nabla_{\mathbf x} f = 2 \mathbf x^T A$.

3. Let $g : \mathbb R^2 \to \mathbb R^2$ be $g(x, y) = (x + y, xy)$ and $f : \mathbb R^2 \to \mathbb R$ be $f(u, v) = u^2 - v$. Compute $\nabla_{(x, y)}(f \circ g)$ at $(1, 2)$ in two ways: (a) directly, (b) via the chain rule.

4. A two-input neuron uses sigmoid activation. Inputs $(0.5, -0.3)$, target $y = 0$, initial $w_1 = 0.4, w_2 = 0.6, b = -0.2$, learning rate $\alpha = 0.5$. Carry out one FP + BP step.

5. Show that for sigmoid $\sigma$, $\sigma'(x) = \sigma(x)(1 - \sigma(x))$, and for tanh, $\tanh'(x) = 1 - \tanh^2(x)$. Using these, explain why both are computationally cheap derivatives in backpropagation.

### Solutions

**Solution 1.**

Components: $f_1 = x_1^2 + x_2, f_2 = x_1 x_2, f_3 = e^{x_1}$.

Partials:
- $\partial f_1 / \partial x_1 = 2 x_1, \; \partial f_1 / \partial x_2 = 1.$
- $\partial f_2 / \partial x_1 = x_2, \; \partial f_2 / \partial x_2 = x_1.$
- $\partial f_3 / \partial x_1 = e^{x_1}, \; \partial f_3 / \partial x_2 = 0.$

$$\nabla_{\mathbf x} f = \begin{bmatrix} 2 x_1 & 1 \\ x_2 & x_1 \\ e^{x_1} & 0\end{bmatrix}, \qquad \nabla_{\mathbf x} f(1, 2) = \begin{bmatrix} 2 & 1 \\ 2 & 1 \\ e & 0 \end{bmatrix}.$$

**Solution 2.** $f(\mathbf x) = \sum_{i, j} A_{ij} x_i x_j$. Partial w.r.t. $x_k$:
$$\frac{\partial f}{\partial x_k} = \sum_j A_{kj} x_j + \sum_i A_{ik} x_i = (A \mathbf x)_k + (A^T \mathbf x)_k.$$
For symmetric $A$, $A = A^T$, so $\partial f / \partial x_k = 2 (A \mathbf x)_k$. As a row vector: $\nabla f = 2 (A\mathbf x)^T = 2 \mathbf x^T A$. $\blacksquare$

**Solution 3.**

(a) Directly: $f(g(x, y)) = (x + y)^2 - xy$. Partials: $\partial / \partial x = 2(x + y) - y$, $\partial / \partial y = 2(x + y) - x$. At $(1, 2)$: $[2 \cdot 3 - 2, 2 \cdot 3 - 1] = [4, 5]$.

(b) Chain rule: $\nabla_{(u, v)} f = [2u, -1]$, $\nabla_{(x, y)} g = \begin{bmatrix} 1 & 1 \\ y & x\end{bmatrix}$.

At $g(1, 2) = (3, 2)$: $\nabla_{(u, v)} f = [6, -1]$.
At $(1, 2)$: $\nabla_{(x, y)} g = \begin{bmatrix} 1 & 1 \\ 2 & 1\end{bmatrix}$.

Product: $[6, -1] \begin{bmatrix} 1 & 1 \\ 2 & 1\end{bmatrix} = [6 - 2, 6 - 1] = [4, 5].\;\checkmark$

**Solution 4.** *Forward.* $z = (0.4)(0.5) + (0.6)(-0.3) + (-0.2) = 0.2 - 0.18 - 0.2 = -0.18.$ $a = \sigma(-0.18) \approx 0.4551$. $C = \tfrac{1}{2}(0.4551 - 0)^2 \approx 0.1036$.

*Backward.* $\sigma'(-0.18) = a(1-a) \approx 0.4551 \cdot 0.5449 \approx 0.2480$. $\delta = (a - y) \sigma'(z) = 0.4551 \cdot 0.2480 \approx 0.1129$.

$\partial C/\partial w_1 = \delta x_1 = 0.0564$. $\partial C / \partial w_2 = \delta x_2 = -0.0339$. $\partial C / \partial b = \delta = 0.1129$.

*Update.* $w_1^{\text{new}} = 0.4 - 0.5(0.0564) = 0.3718$. $w_2^{\text{new}} = 0.6 - 0.5(-0.0339) = 0.6170$. $b^{\text{new}} = -0.2 - 0.5(0.1129) = -0.2564$.

**Solution 5.**

*Sigmoid.* $\sigma(x) = (1 + e^{-x})^{-1}$. $\sigma'(x) = \sigma(x)^2 e^{-x}$. Note $e^{-x} = (1 - \sigma(x))/\sigma(x)$ (rearrange $\sigma$). So $\sigma'(x) = \sigma(x)^2 \cdot (1 - \sigma(x))/\sigma(x) = \sigma(x)(1 - \sigma(x))$. ✓

*tanh.* $\tanh(x) = \sinh x / \cosh x$. $\tanh'(x) = (\cosh^2 - \sinh^2)/\cosh^2 = 1/\cosh^2$. Using $\cosh^2 - \sinh^2 = 1$: $1/\cosh^2 = 1 - \sinh^2/\cosh^2 = 1 - \tanh^2$. ✓

*Why cheap:* Both derivatives are expressed in terms of the **already-computed** activation $a = \sigma(z)$ or $a = \tanh(z)$. No additional exponentials or divisions needed beyond what was computed in the forward pass — perfect for backprop, where activations are cached anyway.

---

## 21.13 Cross-References

- **Predecessor:** [[02-gradient-and-directional-derivatives]] — scalar gradient, directional derivative, level surfaces.
- **VA wrap-up:** [[06-greens-stokes-divergence-theorems]], [[07-va-practice-problems]].
- **Application directions:** Linear regression / least squares (Example 2), neural networks (§21.7+).

**Further reading.** Goodfellow–Bengio–Courville, *Deep Learning* (2016), Ch. 6 for full backpropagation. Strang, *Linear Algebra and Learning from Data* for the linear-algebra side. The Jacobian also features in [[06-greens-stokes-divergence-theorems]] (change of variables) and the inverse function theorem.

# 06 — Normalization

## 6.1 Features of a Good Relational Design

### Anomalies
A bad design exhibits:
- **Insertion anomalies** — cannot insert info without unrelated values being known.
- **Update anomalies** — multiple tuples must be updated when a fact changes.
- **Deletion anomalies** — deleting a tuple loses unrelated facts.
- **Repetition** of information.
- **Need for null values** to represent some data.

### Decomposition Goals
- **Lossless decomposition** — joining the decomposed pieces returns the original.
- **Dependency preservation** — all FDs can be tested locally on individual decomposed relations.
- **Avoid redundancy** — minimize repetition.

---

## 6.2 Lossless Decomposition

### Definition
$R$ decomposed into $R_1, R_2$ with $R = R_1 \cup R_2$ is **lossless** if:
$$\Pi_{R_1}(r) \bowtie \Pi_{R_2}(r) = r$$
otherwise **lossy**.

### Lossless Decomposition Test (using FDs)
Decomposition $R \to R_1, R_2$ is lossless iff at least one of these is in $F^+$:
- $R_1 \cap R_2 \to R_1$
- $R_1 \cap R_2 \to R_2$

### Example — Lossy decomposition
`employee(ID, name, street, city, salary)` →
- `employee1(ID, name)`
- `employee2(name, street, city, salary)`

If two employees share a name, joining produces spurious tuples. **Lossy.**

### Example — Lossless decomposition
$R = (A, B, C)$, $F = \{A \to B, B \to C\}$:
- Decomposition $R_1 = (A, B), R_2 = (B, C)$. Intersection = $\{B\}$. $B \to C$ in $F$ ⇒ $B \to BC$. **Lossless.**

---

## 6.3 Functional Dependencies (FDs)

### Definition
$\alpha \to \beta$ holds on $R$ if for any legal relation $r$, whenever any two tuples agree on $\alpha$, they agree on $\beta$:
$$t_1[\alpha] = t_2[\alpha] \implies t_1[\beta] = t_2[\beta]$$

FDs are constraints on legal instances (semantics-driven).

### Trivial FDs
$\alpha \to \beta$ is trivial if $\beta \subseteq \alpha$.

### FDs and Keys
- $K$ is a superkey iff $K \to R$.
- $K$ is a candidate key iff $K \to R$ and no proper subset of $K$ does.

### Closure of FDs
$F^+$ = all FDs logically implied by $F$. Computed using **Armstrong's axioms**:
- **Reflexivity**: if $\beta \subseteq \alpha$, then $\alpha \to \beta$.
- **Augmentation**: if $\alpha \to \beta$, then $\gamma\alpha \to \gamma\beta$.
- **Transitivity**: if $\alpha \to \beta$ and $\beta \to \gamma$, then $\alpha \to \gamma$.

These are **sound** (only generate true FDs) and **complete** (generate all true FDs).

### Derived rules
- **Union**: $\alpha \to \beta$ and $\alpha \to \gamma$ ⇒ $\alpha \to \beta\gamma$.
- **Decomposition**: $\alpha \to \beta\gamma$ ⇒ $\alpha \to \beta$ and $\alpha \to \gamma$.
- **Pseudotransitivity**: $\alpha \to \beta$ and $\gamma\beta \to \delta$ ⇒ $\alpha\gamma \to \delta$.

---

## 6.4 Attribute Closure $\alpha^+$

The set of attributes determined by $\alpha$ under $F$.

### Algorithm
```
result := α
while result changes:
    for each FD β → γ in F:
        if β ⊆ result: result := result ∪ γ
return result
```

### Worked example
$R = (A, B, C, G, H, I)$
$F = \{A \to B, A \to C, CG \to H, CG \to I, B \to H\}$.

Compute $(AG)^+$:
1. result = $AG$.
2. $A \to B$: result = $AGB$.
3. $A \to C$: result = $AGBC$.
4. $CG \to H$: result = $AGBCH$.
5. $CG \to I$: result = $AGBCHI = R$.

So $(AG)^+ = R$. **AG is a superkey**. Check: $A^+ = ABCH \ne R$, $G^+ = G$. So **AG is a candidate key**.

### Uses of attribute closure
- **Test for superkey:** check $\alpha^+ = R$.
- **Test FD $\alpha \to \beta$:** check $\beta \subseteq \alpha^+$.
- **Compute $F^+$:** for each $\gamma \subseteq R$, find $\gamma^+$, and for each $S \subseteq \gamma^+$, output $\gamma \to S$.

---

## 6.5 Canonical (Minimal) Cover $F_c$

A minimal equivalent of $F$:
- $F$ and $F_c$ logically imply each other.
- No FD in $F_c$ has an extraneous attribute.
- All LHSs are unique.

### Extraneous attribute
- LHS extraneous: $A \in \alpha$ is extraneous if $\gamma = \alpha - \{A\}$ has $\gamma^+ \supseteq \beta$ in $F$.
- RHS extraneous: $A \in \beta$ is extraneous if $\alpha^+$ in $F' = (F - \{\alpha \to \beta\}) \cup \{\alpha \to (\beta - A)\}$ contains $A$.

### Algorithm
```
repeat:
    1. Apply union rule to merge α → β1 and α → β2 into α → β1∪β2.
    2. Find an FD α → β with an extraneous attribute (LHS or RHS).
       Test using F_c (current set), not the original F.
    3. Delete the extraneous attribute.
until F_c does not change
```

### Worked example
$R = (A, B, C)$, $F = \{A \to BC, B \to C, A \to B, AB \to C\}$.
1. Union: $A \to BC$ and $A \to B$ → $A \to BC$. Now $F = \{A \to BC, B \to C, AB \to C\}$.
2. Is $A$ extraneous in $AB \to C$? Yes — $B \to C$ is already present. Drop $A$. Now $F = \{A \to BC, B \to C\}$ (the $AB \to C$ becomes $B \to C$ which is already there).
3. Is $C$ extraneous in $A \to BC$? Yes — by transitivity $A \to B \to C$. Drop $C$.

**$F_c = \{A \to B, B \to C\}$**.

---

## 6.6 Normal Forms

### First Normal Form (1NF)
- All attribute domains are **atomic**.
- We assume all relations are in 1NF.

### Second Normal Form (2NF)
- 1NF + no non-key attribute partially depends on a candidate key.

**Example (not 2NF):** `Book_author(PubId, AuId, Title, Price, AuAddress)` with primary key `(PubId, AuId)` and `AuId → AuAddress`. Decompose:
- `(PubId, AuId, Title, Price)`
- `(AuId, AuAddress)`

### Third Normal Form (3NF)
$R$ is in 3NF if for every $\alpha \to \beta$ in $F^+$, at least one holds:
- $\alpha \to \beta$ is trivial ($\beta \subseteq \alpha$).
- $\alpha$ is a superkey.
- Each attribute $A$ in $\beta - \alpha$ is contained in **some candidate key** of $R$.

### Boyce-Codd Normal Form (BCNF)
$R$ is in BCNF if for every $\alpha \to \beta$ in $F^+$:
- $\alpha \to \beta$ is trivial, OR
- $\alpha$ is a superkey.

(BCNF is stricter than 3NF: it removes the third condition.)

### Comparison
| Property | 3NF | BCNF |
|---|---|---|
| Lossless decomposition | Always achievable | Always achievable |
| Dependency preservation | Always achievable | Not always achievable |
| Redundancy | May still exist | Removed (relative to FDs) |

### 3NF Example
`dept_advisor(s_ID, i_ID, dept_name)` with FDs:
- `i_ID → dept_name`
- `s_ID, dept_name → i_ID`

Candidate keys: `{s_ID, dept_name}`, `{s_ID, i_ID}`.

- For `i_ID → dept_name`: `i_ID` is not a superkey, but `dept_name` is in the candidate key `{s_ID, dept_name}` → 3NF allows it. **In 3NF, NOT in BCNF.**

### BCNF decomposition example
`in_dep(ID, name, salary, dept_name, building, budget)` with `dept_name → building, budget`. `dept_name` is not a superkey.

Decompose: $\alpha \cup \beta = $ `(dept_name, building, budget)` and $R - (\beta - \alpha) = $ `(ID, name, salary, dept_name)`.

Both are in BCNF.

### BCNF Decomposition Algorithm
```
result := {R}
done := false
compute F+
while not done:
    if some R_i in result is not in BCNF:
        find α → β violating with α ∩ β = ∅
        result := (result - R_i) ∪ {(R_i - β), (α ∪ β)}
    else:
        done := true
```

### 3NF Decomposition (Synthesis) Algorithm
```
F_c := canonical cover of F
i := 0
for each α → β in F_c:
    if no R_j (j ≤ i) contains αβ:
        i := i+1; R_i := αβ
if no R_j contains a candidate key of R:
    i := i+1; R_i := any candidate key
remove any R_j contained in another R_k
return R_1, ..., R_i
```
Always: **lossless + dependency-preserving + 3NF**.

### Worked 3NF synthesis
`cust_banker_branch(customer_id, employee_id, branch_name, type)` with FDs:
- `customer_id, employee_id → branch_name, type`
- `employee_id → branch_name`
- `customer_id, branch_name → employee_id`

Step 1 (canonical cover): `branch_name` is extraneous in RHS of FD1 (since FD2 implies it). $F_c$:
- `customer_id, employee_id → type`
- `employee_id → branch_name`
- `customer_id, branch_name → employee_id`

Step 2 — for-loop creates schemas:
- `(customer_id, employee_id, type)`
- `(employee_id, branch_name)` — subset of {customer_id, branch_name, employee_id}
- `(customer_id, branch_name, employee_id)`

Step 3 — `(customer_id, employee_id, type)` already contains a candidate key; drop the redundant `(employee_id, branch_name)`.

Final 3NF schema:
- `(customer_id, employee_id, type)`
- `(customer_id, branch_name, employee_id)`

---

## 6.7 Dependency Preservation Test

A polynomial-time test (does not require computing $F^+$):

For each FD $\alpha \to \beta$:
```
result := α
repeat:
    for each R_i:
        t := (result ∩ R_i)+ ∩ R_i      -- closure under F
        result := result ∪ t
until result does not change
if β ⊆ result, then α → β is preserved.
```
A decomposition is dependency-preserving iff every FD in $F$ is preserved.

---

## 6.8 BCNF and Dependency Preservation

It is **not always possible** to achieve both BCNF and dependency preservation.
- e.g., `dept_advisor` (above) cannot be decomposed into BCNF without losing the FD `s_ID, dept_name → i_ID`.

---

## 6.9 Multivalued Dependencies (MVDs) and 4NF

### Motivation: redundant non-FD relationships
`inst_info(ID, child_name, phone_number)` — an instructor has multiple children and phone numbers. No non-trivial FDs (BCNF), but multiple cross-product entries cause redundancy.

### MVD Definition
$\alpha \twoheadrightarrow \beta$ holds if for any tuples $t_1, t_2$ agreeing on $\alpha$, there exist tuples $t_3, t_4$ where:
- $t_3[\alpha] = t_4[\alpha] = t_1[\alpha]$
- $t_3[\beta] = t_1[\beta]$, $t_3[R - \beta] = t_2[R - \beta]$
- $t_4[\beta] = t_2[\beta]$, $t_4[R - \beta] = t_1[R - \beta]$

Intuition: given a value of $\alpha$, the set of $\beta$-values is independent of the rest of the tuple.

Every FD is also an MVD.

### Fourth Normal Form (4NF)
$R$ is in 4NF if for every $\alpha \twoheadrightarrow \beta$ in $D^+$:
- It is trivial ($\beta \subseteq \alpha$ or $\alpha \cup \beta = R$), OR
- $\alpha$ is a superkey.

4NF ⇒ BCNF.

### 4NF Decomposition Algorithm
Same shape as BCNF:
```
result := {R}
while some R_i not in 4NF:
    find non-trivial α →→ β with α not superkey, α ∩ β = ∅
    result := (result - R_i) ∪ {(R_i - β), (α ∪ β)}
```

### Worked example
$R = (A, B, C, G, H, I)$, $D = \{A \twoheadrightarrow B, B \twoheadrightarrow HI, CG \twoheadrightarrow H\}$.

Decompose:
- $R_1 = (A, B)$ — 4NF.
- $R_2 = (A, C, G, H, I)$ — not 4NF (CG →→ H).
- $R_3 = (C, G, H)$ — 4NF.
- $R_4 = (A, C, G, I)$ — not 4NF (A →→ I, restricted MVD).
- $R_5 = (A, I)$ — 4NF.
- $R_6 = (A, C, G)$ — 4NF.

---

## 6.10 Design Goal Hierarchy

For a given $F$:
1. **BCNF + lossless + dependency-preserving** → ideal.
2. If not possible, choose between:
   - **Lossless BCNF** (gives up dependency preservation).
   - **Lossless 3NF + dependency preserving** (accepts some redundancy).

---

## 6.11 Likely Exam Questions

1. Define lossless and dependency-preserving decomposition.
2. State Armstrong's axioms; derive union, decomposition, pseudotransitivity.
3. Compute attribute closure for given $\alpha$.
4. Find candidate keys of a given relation.
5. Compute canonical cover of a given $F$.
6. Decompose a given relation into BCNF; show lossless join.
7. Decompose into 3NF using synthesis algorithm.
8. State the 3NF and BCNF definitions and explain when 3NF is preferred over BCNF.
9. Compare BCNF and 3NF; cite an example where BCNF cannot preserve dependencies.
10. What is a multivalued dependency? Define 4NF and decompose a given relation into 4NF.

### Practice numericals

**Problem A.** $R = (A, B, C, D, E)$, $F = \{A \to BC, CD \to E, B \to D, E \to A\}$.
- Compute $A^+$: $\{A, B, C, D, E\} = R$ → A is a superkey.
- Compute $E^+$: $\{E, A, B, C, D\} = R$ → E is a superkey.
- Compute $CD^+$: $\{C, D, E, A, B\} = R$ → CD is a superkey.
- Candidate keys: $\{A\}, \{E\}, \{CD\}, \{BC\}$ (since $B \to D$ gives $BC \to CD \to E \to A$).

**Problem B.** Decompose $R(A, B, C)$ with $F = \{A \to B, B \to C\}$ into BCNF.
- $A \to B$: A is candidate key (since $A^+ = ABC$). OK.
- $B \to C$: $B^+ = BC \ne R$, B is not a superkey → BCNF violation.
- Decompose: $R_1 = (B, C), R_2 = (A, B)$. Both BCNF.
- Lossless: $R_1 \cap R_2 = \{B\}$, $B \to C$ ✓.
- Dependency-preserving: $A \to B$ in $R_2$, $B \to C$ in $R_1$. ✓

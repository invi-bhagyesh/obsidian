# 11 — NoSQL

## 11.1 What is NoSQL?

**NoSQL ("Not Only SQL")** refers to non-relational data stores designed for scalability and flexibility:
- **Non-relational** data storage.
- **No fixed table schema**.
- **No joins** (typically).
- **No multi-document transactions** in many systems.
- **Relaxes** one or more ACID properties.

---

## 11.2 Types of NoSQL Stores

### 1. Key-value stores
- Simple key → value mapping.
- Examples: **Riak, Redis, Membase**.
- Use cases: shopping carts, web user data analysis (Amazon, LinkedIn).

### 2. Column-oriented stores
- Wide-column tables; column families.
- Examples: **Cassandra, HBase, HyperTable**.
- Use cases: web user actions, sensor feeds (Facebook, Twitter, eBay, Netflix).

### 3. Document stores
- JSON/BSON documents with flexible schema.
- Examples: **MongoDB, CouchDB, RavenDB**.
- Use cases: real-time analysis, logging, document archives.

### 4. Graph stores
- Nodes + edges + properties; native graph traversal.
- Examples: **InfiniteGraph, Neo4j, Allegro Graph**.
- Use cases: network modeling, recommendation, upsell/cross-sell (Walmart).

---

## 11.3 Advantages of NoSQL

- Cheap, easy to implement.
- Easy to distribute.
- Easily scale up/down (horizontally).
- Relaxes data consistency.
- No pre-defined schema needed.
- Data can be replicated and partitioned.

## 11.4 Disadvantages of NoSQL

- Doesn't fully support relational features:
  - No joins, group by, order by across partitions.
  - No referential integrity across partitions.
- No declarative query language (more programming required).
- Relaxed ACID → fewer guarantees.
- Limited integration with SQL applications.

---

## 11.5 SQL vs NoSQL — Quick Comparison

| SQL | NoSQL |
|---|---|
| Relational | Non-relational, distributed |
| Pre-defined schema | Dynamic schema |
| Tables | Documents / graphs / wide-column / KV |
| Vertically scalable | Horizontally scalable |
| Uses SQL | UnQL (Unstructured Query Language) |
| Not ideal for very large datasets | Designed for large datasets |
| Not great for hierarchical data | Excellent for hierarchical (e.g., JSON) |
| ACID emphasis | Brewer's CAP theorem |
| Strong vendor support | Community-driven |
| Strong consistency | Eventual or configurable consistency |
| Examples: Oracle, DB2, MySQL, MS SQL, PostgreSQL | MongoDB, HBase, Cassandra, Redis, Neo4j, CouchDB, Couchbase, Riak |

---

## 11.6 CAP Theorem (Brewer)

In a distributed data store, you can only guarantee 2 out of 3:

- **C — Consistency**: every read sees the latest write.
- **A — Availability**: every request gets a response (success or failure).
- **P — Partition tolerance**: system continues to operate despite network partitions.

**Implication:** in the presence of a network partition (which is unavoidable in distributed systems), you must choose between Consistency and Availability:
- **CP systems**: choose consistency over availability (e.g., HBase, MongoDB).
- **AP systems**: choose availability over consistency (e.g., Cassandra, CouchDB) — eventually consistent.

Most NoSQL systems pick AP and use **eventual consistency** to remain available.

---

## 11.7 BASE (NoSQL alternative to ACID)

- **Basically Available**: system always responds (possibly stale data).
- **Soft state**: state may change without input due to eventual consistency.
- **Eventual consistency**: replicas converge given enough time.

---

## 11.8 Likely Exam Questions

1. Define NoSQL. List its features.
2. Compare the four types of NoSQL stores; give examples and use cases.
3. List advantages and disadvantages of NoSQL.
4. State the CAP theorem; explain CP vs AP systems.
5. SQL vs NoSQL — compare on schema, scaling, queries, consistency.
6. What is BASE? How does it differ from ACID?
7. When would you use a graph database? A document database?

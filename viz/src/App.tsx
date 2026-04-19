import { Routes, Route, Link } from "react-router-dom"
import Home from "./pages/Home"
import Soon from "./pages/Soon"
import RealNumbers from "./pages/ra/RealNumbers"
import Inequalities from "./pages/ra/Inequalities"
import SupInf from "./pages/ra/SupInf"
import Countability from "./pages/ra/Countability"
import Topology from "./pages/ra/Topology"
import Compactness from "./pages/ra/Compactness"
import Sequences from "./pages/ra/Sequences"
import Cauchy from "./pages/ra/Cauchy"
import Series from "./pages/ra/Series"
import Continuity from "./pages/ra/Continuity"
import Differentiation from "./pages/ra/Differentiation"
import Riemann from "./pages/ra/Riemann"
import Groups from "./pages/as/Groups"
import SubgroupLattice from "./pages/as/SubgroupLattice"
import Cosets from "./pages/as/Cosets"
import Quotient from "./pages/as/Quotient"
import { TOPICS } from "./topics"

export default function App() {
  return (
    <div className="min-h-screen">
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-neutral-950/70 border-b border-neutral-800">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center gap-4">
          <Link to="/" className="font-semibold tracking-tight">
            <span className="text-neutral-400">maths</span>
            <span className="mx-1 text-neutral-600">/</span>
            <span>interactive</span>
          </Link>
          <div className="ml-auto text-sm text-neutral-400">
            <a href="../" className="hover:text-neutral-100 transition">
              ← back to notes
            </a>
          </div>
        </div>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ra/real-numbers" element={<RealNumbers />} />
          <Route path="/ra/inequalities" element={<Inequalities />} />
          <Route path="/ra/sup-inf" element={<SupInf />} />
          <Route path="/ra/countability" element={<Countability />} />
          <Route path="/ra/topology-of-r" element={<Topology />} />
          <Route path="/ra/compactness" element={<Compactness />} />
          <Route path="/ra/sequences" element={<Sequences />} />
          <Route path="/ra/cauchy" element={<Cauchy />} />
          <Route path="/ra/series" element={<Series />} />
          <Route path="/ra/continuity" element={<Continuity />} />
          <Route path="/ra/differentiation" element={<Differentiation />} />
          <Route path="/ra/riemann" element={<Riemann />} />
          <Route path="/as/groups" element={<Groups />} />
          <Route path="/as/subgroup-lattice" element={<SubgroupLattice />} />
          <Route path="/as/cosets" element={<Cosets />} />
          <Route path="/as/quotient" element={<Quotient />} />
          {TOPICS.filter((t) => t.status === "soon").map((t) => (
            <Route key={t.slug} path={`/${t.slug}`} element={<Soon topic={t} />} />
          ))}
        </Routes>
      </main>
    </div>
  )
}

import { Eye, Timer } from "lucide-react";
import { formatNumber } from "../lib/math";
import { metricSummary } from "../lib/relativity";
import type { SimulationState } from "../types";
export function ObserverComparison({state}:{state:SimulationState}){ const m=metricSummary(state.mass,state.observerRadius); return <section className="panel observerPanel"><p className="eyebrow">Observer comparison</p><h2>Local vs distant observer</h2><div className="observerGrid"><article><Timer/><h3>Local observer</h3><p>Experiences their own clock normally while moving through local spacetime.</p><strong>1.0000× proper time</strong></article><article><Eye/><h3>Distant observer</h3><p>Sees the local clock slow down and signals arrive stretched.</p><strong>{formatNumber(m.dilation,4)}× observed clock rate</strong></article></div></section>; }

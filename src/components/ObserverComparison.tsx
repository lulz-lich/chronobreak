import { Eye, Timer } from "lucide-react";
import { formatNumber } from "../lib/math";
import { metricSummary } from "../lib/relativity";
import type { SimulationState } from "../types";

export function ObserverComparison({ state }: { state: SimulationState }) {
  const m = metricSummary(state.mass, state.observerRadius, state.spin);
  return <section className="panel observerPanel"><p className="eyebrow">Observer comparison</p><h2>Two observers, one signal</h2><p>O ponto em órbita é o observador local; o ponto externo representa o observador distante que recebe o mesmo evento depois de atravessar a curvatura do espaço-tempo.</p><div className="observerGrid"><article><Timer /><h3>Local observer</h3><p>O relógio local segue seu próprio tempo próprio, mesmo dentro da curvatura intensa do espaço-tempo.</p><strong>Local clock: 1.000× proper time</strong></article><article><Eye /><h3>Distant observer</h3><p>Do lado de fora, o mesmo evento aparece atrasado, vermelho e dilatado devido à gravidade e ao movimento orbital.</p><strong>Distant view: {formatNumber(m.clockRateCombined, 4)}× | Frequency ratio: {formatNumber(m.observedFrequency, 4)}× | Redshift: {formatNumber(m.redshift, 4)}×</strong></article></div></section>;
}
import { Eye, Timer } from "lucide-react";
import { formatNumber } from "../lib/math";
import { metricSummary } from "../lib/relativity";
import type { SimulationState } from "../types";

export function ObserverComparison({ state }: { state: SimulationState }) {
  const m = metricSummary(state.mass, state.observerRadius, state.spin);
  return <section className="panel observerPanel"><p className="eyebrow">Observer comparison</p><h2>Local vs distant observer</h2><div className="observerGrid"><article><Timer /><h3>Local observer</h3><p>Proper time always feels normal locally, but orbital speed rises when mass/spin increase.</p><strong>1.0000× proper time</strong></article><article><Eye /><h3>Distant observer</h3><p>Recebe sinais afetados por gravidade e Doppler orbital; frequência observada pode cair drasticamente perto do horizonte.</p><strong>{formatNumber(m.clockRateCombined, 4)}× observed clock rate | ν ratio {formatNumber(m.observedFrequency, 4)}×</strong></article></div></section>;
}
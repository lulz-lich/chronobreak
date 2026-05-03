import { Activity, Gauge, Orbit, Radio, Satellite, TimerReset, Waves, Zap } from "lucide-react";
import { formatNumber, percent } from "../lib/math";
import { metricSummary } from "../lib/relativity";
import type { SimulationState } from "../types";

type Props = { state: SimulationState };

function MetricCard({ icon, title, value, detail }: { icon: React.ReactNode; title: string; value: string; detail: string }) {
  return <article className="metricCard"><div className="metricIcon">{icon}</div><div><p>{title}</p><strong>{value}</strong><span>{detail}</span></div></article>;
}

export function MetricsGrid({ state }: Props) {
  const m = metricSummary(state.mass, state.observerRadius, state.spin);
  return <section className="metricsGrid">
    <MetricCard icon={<TimerReset size={22} />} title="Grav. clock rate" value={`${formatNumber(m.dilation, 4)}×`} detail="Only gravitational contribution." />
    <MetricCard icon={<Orbit size={22} />} title="Orbital speed" value={`${percent(m.orbitalVelocity)} c`} detail="Relativistic speed for a co-rotating observer." />
    <MetricCard icon={<TimerReset size={22} />} title="Total clock rate" value={`${formatNumber(m.clockRateCombined, 4)}×`} detail="Gravitational + kinematic dilation combined." />
    <MetricCard icon={<Waves size={22} />} title="Grav. redshift" value={formatNumber(m.redshift, 3)} detail="How much outgoing light is stretched by gravity." />
    <MetricCard icon={<Zap size={22} />} title="Doppler factor" value={`${formatNumber(m.doppler, 3)}×`} detail="Special-relativistic shift from orbital motion." />
    <MetricCard icon={<Waves size={22} />} title="Obs. frequency" value={`${formatNumber(m.observedFrequency, 4)}×`} detail="Net received frequency (gravity + Doppler)." />
    <MetricCard icon={<Satellite size={22} />} title="Escape velocity" value={`${percent(m.escapeVelocity)} c`} detail="Fraction of light speed needed to escape." />
    <MetricCard icon={<Activity size={22} />} title="Orbit state" value={m.condition.toUpperCase()} detail="Qualitative stability near this radius." />
    <MetricCard icon={<Radio size={22} />} title="Signal delay" value={`${formatNumber(m.delay, 2)}×`} detail="Communication delay from near gravity well." />
    <MetricCard icon={<Gauge size={22} />} title="Frame dragging" value={`${percent(m.frameDragging)}×`} detail="Kerr-like spacetime twist due to spin." />
    <MetricCard icon={<Gauge size={22} />} title="Lensing index" value={`${formatNumber(m.lensing, 3)}×`} detail="Approximate light-bending intensity." />
    <MetricCard icon={<Gauge size={22} />} title="Proper accel." value={`${formatNumber(m.properAcceleration, 3)}×`} detail="Acceleration needed to hover at this radius." />
    <MetricCard icon={<Activity size={22} />} title="Energy density" value={`${formatNumber(m.energyDensity, 3)}×`} detail="Effective Tμν proxy used in field coupling." />
    <MetricCard icon={<Activity size={22} />} title="Curvature κT" value={`${formatNumber(m.curvatureCoupling, 3)}×`} detail="Einstein-field coupling proxy driving warp intensity." />
    <MetricCard icon={<Orbit size={22} />} title="Epicyclic freq" value={`${formatNumber(m.radialEpicyclic, 5)}×`} detail="Radial oscillation frequency for near-circular GR orbits." />
    <MetricCard icon={<Orbit size={22} />} title="Precession" value={`${formatNumber(m.precessionRate, 4)}×`} detail="Periapsis precession proxy from curved spacetime." />
    <MetricCard icon={<Orbit size={22} />} title="Specific energy" value={`${formatNumber(m.specificE, 4)}×`} detail="Conserved orbital energy proxy in Schwarzschild." />
    <MetricCard icon={<Orbit size={22} />} title="Specific L" value={`${formatNumber(m.specificL, 2)}`} detail="Conserved angular momentum proxy for circular orbit." />
    <MetricCard icon={<Gauge size={22} />} title="Veff" value={`${formatNumber(m.effectivePotential, 4)}×`} detail="Effective potential controlling radial stability." />
    <MetricCard icon={<Gauge size={22} />} title="dV/dr" value={`${formatNumber(m.potentialGradient, 5)}×`} detail="Radial potential gradient used in orbit integration." />
    <MetricCard icon={<Gauge size={22} />} title="Tidal stress" value={percent(m.tidal, 2)} detail="Simplified stress index from gravity gradient." />
  </section>;
}
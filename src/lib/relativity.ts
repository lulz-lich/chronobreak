import { clamp } from "./math";

export function schwarzschildRadiusPixels(mass: number): number { return mass * 18; }
export function gravitationalTimeDilation(rs: number, radius: number): number { const safeRadius = Math.max(radius, rs + 0.001); return Math.sqrt(clamp(1 - rs / safeRadius, 0.000001, 1)); }
export function gravitationalRedshift(timeDilationFactor: number): number { return 1 / Math.max(timeDilationFactor, 0.000001) - 1; }
export function escapeVelocityFractionC(rs: number, radius: number): number { return Math.sqrt(clamp(rs / Math.max(radius, rs + 0.001), 0, 0.999999)); }
export function orbitCondition(rs: number, radius: number): "stable" | "unstable" | "critical" { if (radius <= rs * 1.5) return "critical"; if (radius <= rs * 3) return "unstable"; return "stable"; }
export function communicationDelayFactor(timeDilationFactor: number): number { return 1 / Math.max(timeDilationFactor, 0.000001); }
export function tidalStressIndex(rs: number, radius: number): number { return clamp((rs / Math.max(radius, 1)) ** 3, 0, 1); }

export function photonSphereRadius(rs: number): number { return rs * 1.5; }
export function iscoRadius(rs: number, spin: number): number {
  const a = clamp(spin, 0, 1);
  return rs * clamp(3 - 1.8 * a, 1.2, 3);
}

export function kerrFrameDraggingStrength(spin: number, rs: number, radius: number): number {
  const a = clamp(spin, 0, 1);
  const ratio = rs / Math.max(radius, rs + 0.001);
  return clamp(0.7 * a * ratio * ratio, 0, 0.98);
}

export function orbitalVelocityFractionC(rs: number, radius: number, spin: number): number {
  const r = Math.max(radius, rs * 1.12);
  const base = Math.sqrt(clamp(rs / (2 * r), 0, 0.999));
  const drag = kerrFrameDraggingStrength(spin, rs, r);
  return clamp(base * (1 + drag * 0.8), 0, 0.999);
}

export function lorentzGamma(vFractionC: number): number {
  const v2 = clamp(vFractionC * vFractionC, 0, 0.999999);
  return 1 / Math.sqrt(1 - v2);
}

export function combinedClockRate(rs: number, radius: number, spin: number): number {
  const grav = gravitationalTimeDilation(rs, radius);
  const v = orbitalVelocityFractionC(rs, radius, spin);
  return grav / lorentzGamma(v);
}

export function specialRelativisticDoppler(vFractionC: number): number {
  const v = clamp(vFractionC, 0, 0.999999);
  return Math.sqrt((1 + v) / (1 - v));
}

export function totalObservedFrequencyRatio(rs: number, radius: number, spin: number): number {
  const grav = gravitationalTimeDilation(rs, radius);
  const doppler = 1 / specialRelativisticDoppler(orbitalVelocityFractionC(rs, radius, spin));
  return grav * doppler;
}

export function lensingStrengthIndex(rs: number, radius: number): number {
  const u = rs / Math.max(radius, rs + 0.001);
  return clamp(4 * u + 6 * u * u, 0, 2.5);
}

export function properAccelerationIndex(rs: number, radius: number): number {
  const r = Math.max(radius, rs + 0.001);
  return clamp((rs / r ** 2) / 0.01, 0, 3);
}


export function einsteinFieldCoupling(energyDensity: number): number {
  const kappa = 8 * Math.PI;
  return clamp((kappa * energyDensity) / 1000, 0, 5);
}

export function effectiveEnergyDensity(rs: number, radius: number, spin: number): number {
  const compactness = rs / Math.max(radius, rs + 0.001);
  return clamp((compactness ** 2) * (1 + spin), 0, 2);
}


export function radialEpicyclicFrequency(rs: number, radius: number, spin: number): number {
  const r = Math.max(radius, rs * 1.2);
  const omegaPhi = Math.sqrt(clamp(rs / (2 * r ** 3), 0, 1));
  const stability = clamp(1 - (iscoRadius(rs, spin) / r), 0, 1);
  return omegaPhi * Math.sqrt(stability);
}

export function periapsisPrecessionRate(rs: number, radius: number): number {
  const r = Math.max(radius, rs + 0.001);
  return clamp((3 * rs) / (2 * r), 0, 0.95);
}


export function circularOrbitSpecificAngularMomentum(rs: number, radius: number): number {
  const r = Math.max(radius, rs * 1.5001);
  return Math.sqrt((rs * r * r) / (2 * (r - 1.5 * rs)));
}

export function circularOrbitSpecificEnergy(rs: number, radius: number): number {
  const r = Math.max(radius, rs * 1.5001);
  const num = 1 - rs / r;
  const den = Math.sqrt(Math.max(1 - 1.5 * rs / r, 1e-6));
  return clamp(num / den, 0, 2);
}

export function effectivePotentialSchwarzschild(rs: number, radius: number, specificL: number): number {
  const r = Math.max(radius, rs + 0.001);
  const c1 = 1 - rs / r;
  const c2 = 1 + (specificL * specificL) / (r * r);
  return clamp(c1 * c2, 0, 10);
}

export function radialPotentialGradient(rs: number, radius: number, specificL: number): number {
  const eps = 0.5;
  const vPlus = effectivePotentialSchwarzschild(rs, radius + eps, specificL);
  const vMinus = effectivePotentialSchwarzschild(rs, Math.max(radius - eps, rs + 0.001), specificL);
  return (vPlus - vMinus) / (2 * eps);
}

export function metricSummary(mass: number, radius: number, spin = 0) {
  const rs = schwarzschildRadiusPixels(mass);
  const safeRadius = Math.max(radius, rs + 0.001);
  const photonSphere = photonSphereRadius(rs);
  const isco = iscoRadius(rs, spin);
  const dilation = gravitationalTimeDilation(rs, safeRadius);
  const redshift = gravitationalRedshift(dilation);
  const escapeVelocity = escapeVelocityFractionC(rs, safeRadius);
  const condition = orbitCondition(rs, safeRadius);
  const delay = communicationDelayFactor(dilation);
  const tidal = tidalStressIndex(rs, safeRadius);
  const frameDragging = kerrFrameDraggingStrength(spin, rs, safeRadius);
  const orbitalVelocity = orbitalVelocityFractionC(rs, safeRadius, spin);
  const gamma = lorentzGamma(orbitalVelocity);
  const clockRateCombined = combinedClockRate(rs, safeRadius, spin);
  const doppler = specialRelativisticDoppler(orbitalVelocity);
  const observedFrequency = totalObservedFrequencyRatio(rs, safeRadius, spin);
  const lensing = lensingStrengthIndex(rs, safeRadius);
  const properAcceleration = properAccelerationIndex(rs, safeRadius);
  const energyDensity = effectiveEnergyDensity(rs, safeRadius, spin);
  const curvatureCoupling = einsteinFieldCoupling(energyDensity);
  const radialEpicyclic = radialEpicyclicFrequency(rs, safeRadius, spin);
  const precessionRate = periapsisPrecessionRate(rs, safeRadius);
  const specificL = circularOrbitSpecificAngularMomentum(rs, safeRadius);
  const specificE = circularOrbitSpecificEnergy(rs, safeRadius);
  const effectivePotential = effectivePotentialSchwarzschild(rs, safeRadius, specificL);
  const potentialGradient = radialPotentialGradient(rs, safeRadius, specificL);

  return { rs, safeRadius, photonSphere, isco, dilation, redshift, escapeVelocity, condition, delay, tidal, frameDragging, orbitalVelocity, gamma, clockRateCombined, doppler, observedFrequency, lensing, properAcceleration, energyDensity, curvatureCoupling, radialEpicyclic, precessionRate, specificL, specificE, effectivePotential, potentialGradient };
}
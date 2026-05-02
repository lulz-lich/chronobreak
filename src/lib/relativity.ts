import { clamp } from "./math";
export function schwarzschildRadiusPixels(mass: number): number { return mass * 18; }
export function gravitationalTimeDilation(rs: number, radius: number): number { const safeRadius = Math.max(radius, rs + 0.001); return Math.sqrt(clamp(1 - rs / safeRadius, 0.000001, 1)); }
export function gravitationalRedshift(timeDilationFactor: number): number { return 1 / Math.max(timeDilationFactor, 0.000001) - 1; }
export function escapeVelocityFractionC(rs: number, radius: number): number { return Math.sqrt(clamp(rs / Math.max(radius, rs + 0.001), 0, 0.999999)); }
export function orbitCondition(rs: number, radius: number): "stable" | "unstable" | "critical" { if (radius <= rs * 1.5) return "critical"; if (radius <= rs * 3) return "unstable"; return "stable"; }
export function communicationDelayFactor(timeDilationFactor: number): number { return 1 / Math.max(timeDilationFactor, 0.000001); }
export function tidalStressIndex(rs: number, radius: number): number { return clamp((rs / Math.max(radius, 1)) ** 3, 0, 1); }
export function metricSummary(mass: number, radius: number) { const rs = schwarzschildRadiusPixels(mass); const safeRadius = Math.max(radius, rs + 0.001); const dilation = gravitationalTimeDilation(rs, safeRadius); const redshift = gravitationalRedshift(dilation); const escapeVelocity = escapeVelocityFractionC(rs, safeRadius); const condition = orbitCondition(rs, safeRadius); const delay = communicationDelayFactor(dilation); const tidal = tidalStressIndex(rs, safeRadius); return { rs, safeRadius, dilation, redshift, escapeVelocity, condition, delay, tidal }; }

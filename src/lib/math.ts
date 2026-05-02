export function clamp(value: number, min: number, max: number): number { return Math.max(min, Math.min(max, value)); }
export function formatNumber(value: number, digits = 3): string { if (!Number.isFinite(value)) return "∞"; return Number(value).toFixed(digits); }
export function percent(value: number, digits = 1): string { return `${formatNumber(value * 100, digits)}%`; }

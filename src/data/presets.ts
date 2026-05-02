import type { Preset } from "../types";
export const presets: Preset[] = [
 { name: "Safe distant observer", description: "Weak time dilation and mild photon bending.", state: { mass: 3.2, observerRadius: 210, spin: 0.2, mode: "photon" } },
 { name: "Near event horizon", description: "Signals stretch, clocks slow down, and spacetime gets dramatic.", state: { mass: 5.6, observerRadius: 112, spin: 0.45, mode: "redshift" } },
 { name: "Causal trap", description: "Light cones tilt inward near the horizon.", state: { mass: 6.4, observerRadius: 102, spin: 0.72, mode: "cones" } },
 { name: "Time fracture", description: "Clock rate differences between observers.", state: { mass: 4.8, observerRadius: 128, spin: 0.35, mode: "time" } },
 { name: "Extreme lensing", description: "Heavy mass and close radius for intense path bending.", state: { mass: 7.0, observerRadius: 142, spin: 0.8, mode: "photon" } }
];

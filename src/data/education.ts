import type { SimulationMode } from "../types";
export const educationContent: Record<SimulationMode, { title: string; simple: string; formula: string; interpretation: string }> = {
 photon: { title: "Photon path bending", simple: "Light does not curve because it has mass. It follows curved spacetime around massive objects.", formula: "Stronger curvature appears as r approaches rs.", interpretation: "The visual paths bend more aggressively when the observer is closer to the event horizon." },
 cones: { title: "Light cone distortion", simple: "A light cone shows every possible future direction for a signal or object.", formula: "Near the horizon, future-directed paths tilt inward.", interpretation: "Inside the horizon, escape is not merely difficult. It is outside the future light cone." },
 redshift: { title: "Gravitational redshift", simple: "Light climbing out of gravity loses energy, stretching toward lower frequencies.", formula: "z = 1 / sqrt(1 - rs / r) - 1", interpretation: "Large z means the outside observer receives weaker, slower, redder signals." },
 time: { title: "Gravitational time dilation", simple: "A clock closer to the black hole runs slower relative to a far-away observer.", formula: "dt_local / dt_far = sqrt(1 - rs / r)", interpretation: "The local observer feels normal time, while the distant observer sees that clock slow down." }
};

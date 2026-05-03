import type { SimulationMode } from "../types";

type Equation = { name: string; expr: string; note: string };

export const physicsFoundations: Equation[] = [
  { name: "Einstein field equations", expr: "G_{μν} + Λg_{μν} = (8πG/c^4) T_{μν}", note: "A curvatura do espaço-tempo (lado esquerdo) é determinada pelo conteúdo de energia-momento (lado direito)." },
  { name: "Schwarzschild interval", expr: "ds² = -(1-rs/r)c²dt² + (1-rs/r)^(-1)dr² + r²dΩ²", note: "Métrica usada para modelar a geometria fora de um buraco negro não rotante." },
  { name: "Lorentz factor", expr: "γ = 1 / √(1-v²/c²)", note: "Base da relatividade especial para dilatação do tempo por velocidade." },
  { name: "Relativistic Doppler", expr: "f_obs/f_emit = √((1-β)/(1+β)), β=v/c", note: "A frequência observada muda devido ao movimento relativo emissor-observador." }
];

export const educationContent: Record<SimulationMode, { title: string; simple: string; formula: string; interpretation: string }> = {
  photon: { title: "Photon path bending", simple: "Light follows geodesics of curved spacetime and can be strongly lensed near compact masses.", formula: "α ~ 4GM/(bc²)  and  lensing ∝ rs/r", interpretation: "As o observador se aproxima do buraco negro, o desvio dos feixes aumenta e o caminho óptico fica mais curvo." },
  cones: { title: "Light cone distortion", simple: "A light cone encodes causal futures; near a horizon, outward directions tip inward.", formula: "g_tt → 0 as r → rs", interpretation: "Próximo ao horizonte, menos direções permanecem causalmente conectadas ao infinito." },
  redshift: { title: "Gravitational redshift", simple: "Photons lose energy escaping gravity and can also shift via relativistic Doppler motion.", formula: "1+z = 1/√(1-rs/r),  f_obs/f_emit ≈ √(1-rs/r)·D^{-1}", interpretation: "O espectro recebido combina efeito gravitacional e cinemático orbital." },
  time: { title: "Gravitational + kinematic time dilation", simple: "Clock rate near the hole is affected both by geometry and orbital speed.", formula: "dτ/dt ≈ √(1-rs/r)/γ", interpretation: "Mesmo com r fixo, aumentar velocidade orbital reduz ainda mais a taxa de relógio observada." }
};
import type { SimulationMode } from "../types";

type Equation = { name: string; expr: string; note: string };

type EducationEntry = { title: string; simple: string; formula: string; interpretation: string; insight: string };

export const physicsFoundations: Equation[] = [
  { name: "Einstein field equations", expr: "G_{μν} + Λg_{μν} = (8πG/c^4) T_{μν}", note: "A curvatura do espaço-tempo (lado esquerdo) é determinada pelo conteúdo de energia-momento (lado direito)." },
  { name: "Schwarzschild interval", expr: "ds² = -(1-rs/r)c²dt² + (1-rs/r)^(-1)dr² + r²dΩ²", note: "Métrica usada para modelar a geometria fora de um buraco negro não rotante." },
  { name: "Lorentz factor", expr: "γ = 1 / √(1-v²/c²)", note: "Base da relatividade especial para dilatação do tempo por velocidade." },
  { name: "Relativistic Doppler", expr: "f_obs/f_emit = √((1-β)/(1+β)), β=v/c", note: "A frequência observada muda devido ao movimento relativo emissor-observador." }
];

export const educationContent: Record<SimulationMode, EducationEntry> = {
  photon: {
    title: "Photon path bending",
    simple: "Light follows geodesics of curved spacetime and can be strongly lensed near compact masses.",
    formula: "α ~ 4GM/(bc²)  and  lensing ∝ rs/r",
    interpretation: "À medida que o observador se aproxima do buraco negro, o desvio dos feixes aumenta e o caminho óptico fica mais curvo.",
    insight: "Dois observadores podem ver a mesma luz curva de formas diferentes: o local vê o caminho no próprio espaço, o distante vê o feixe deformado por lente gravitacional."
  },
  cones: {
    title: "Light cone distortion",
    simple: "A light cone encodes causal futures; near a horizon, outward directions tip inward.",
    formula: "g_tt → 0 as r → rs",
    interpretation: "Próximo ao horizonte, menos direções permanecem causalmente conectadas ao infinito.",
    insight: "O observador local observa o cone inclinar-se; o observador distante interpreta essa mudança como perda de acesso ao futuro exterior."
  },
  redshift: {
    title: "Gravitational redshift",
    simple: "Photons from a local source near the hole are received by a distant observer with a shifted frequency due to gravity and motion.",
    formula: "1+z = 1/√(1-rs/r),  f_obs/f_emit ≈ √(1-rs/r)·D^{-1}",
    interpretation: "O espectro recebido combina o deslocamento gravitacional local com o efeito Doppler medido por um observador distante.",
    insight: "Este modo mostra como um relógio local e uma fonte de luz próximos ao buraco negro são registrados de longe como mais lentos e mais vermelhos."
  },
  time: {
    title: "Gravitational + kinematic time dilation",
    simple: "Two observers measure time differently: a local orbiting clock versus a distant clock far from the hole.",
    formula: "dτ/dt ≈ √(1-rs/r)/γ",
    interpretation: "Mesmo com r fixo, aumentar velocidade orbital reduz ainda mais a taxa de relógio observada pelo observador distante.",
    insight: "Compare o tempo próprio do observador local com a taxa de relógio observada de longe: o atraso é tanto gravitacional quanto cinemático."
  }
};
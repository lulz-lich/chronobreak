export type SimulationMode = "photon" | "cones" | "redshift" | "time";
export type SimulationState = { mass: number; observerRadius: number; spin: number; mode: SimulationMode };
export type Preset = { name: string; description: string; state: SimulationState };
export type SavedExperiment = { id: string; name: string; createdAt: string; state: SimulationState };

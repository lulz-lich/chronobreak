import { useState } from "react";
import { Header } from "./components/Header";
import { BlackHoleCanvas } from "./components/BlackHoleCanvas";
import { ControlPanel } from "./components/ControlPanel";
import { MetricsGrid } from "./components/MetricsGrid";
import { EducationPanel } from "./components/EducationPanel";
import { ObserverComparison } from "./components/ObserverComparison";
import { ExperimentJournal } from "./components/ExperimentJournal";
import { ProjectArchitecture } from "./components/ProjectArchitecture";
import { Roadmap } from "./components/Roadmap";
import { useLocalExperiments } from "./hooks/useLocalExperiments";
import { exportCanvasAsPng } from "./lib/snapshot";
import type { SimulationState } from "./types";
const initialState: SimulationState = { mass: 4.8, observerRadius: 150, spin: 0.25, mode: "photon" };
export default function App(){ const [state,setState]=useState<SimulationState>(initialState); const {experiments,saveExperiment,deleteExperiment,clearExperiments}=useLocalExperiments(); return <main><div className="backgroundGlow"/><div className="appShell"><Header/><section className="labLayout"><div className="mainColumn"><BlackHoleCanvas state={state}/><MetricsGrid state={state}/><ObserverComparison state={state}/></div><div className="sideColumn"><ControlPanel state={state} setState={setState} onSnapshot={()=>exportCanvasAsPng()} onSave={()=>saveExperiment(state)}/><EducationPanel mode={state.mode}/><ExperimentJournal experiments={experiments} onLoad={setState} onDelete={deleteExperiment} onClear={clearExperiments}/></div></section><section className="lowerGrid"><ProjectArchitecture/><Roadmap/></section></div></main>; }

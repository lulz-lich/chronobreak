import { BookOpen } from "lucide-react";
import { educationContent } from "../data/education";
import type { SimulationMode } from "../types";
export function EducationPanel({mode}:{mode:SimulationMode}){ const c=educationContent[mode]; return <section className="panel educationPanel"><div className="panelTitle compact"><div><p className="eyebrow">Education mode</p><h2>{c.title}</h2></div><BookOpen/></div><p>{c.simple}</p><div className="formulaCard"><span>Core relation</span><strong>{c.formula}</strong></div><p>{c.interpretation}</p></section>; }

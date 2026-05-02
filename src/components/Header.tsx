import { motion } from "framer-motion";
import { Atom, Code2, Sparkles } from "lucide-react";

export function Header() {
  return (
    <motion.header
      className="hero"
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <div className="heroContent">
        <div className="badgeRow">
          <span className="badge">Physics project</span>
          <span className="badge violet">Relativity lab</span>
          <span className="badge dim">React + TypeScript + Canvas</span>
        </div>

        <h1>
          ChronoBreak
          <span>Black Hole Relativity Lab</span>
        </h1>

        <p>
          Interactive visual experiments for event horizons, gravitational time
          dilation, photon path bending, redshift and causal structure around black holes.
        </p>

        <div className="heroActions">
          <a href="#lab" className="primaryAction">
            <Sparkles size={18} />
            Open lab
          </a>

          <a href="#architecture" className="secondaryAction">
            <Code2 size={18} />
            Project structure
          </a>
        </div>
      </div>

      <div className="missionCard">
        <Atom size={32} />
        <p className="label">Mission</p>
        <p>
          Make relativity explorable instead of hiding it inside a PDF so dry it
          could be used as industrial desiccant.
        </p>
      </div>
    </motion.header>
  );
}
import { useEffect, useRef } from "react";
import type { SimulationState } from "../types";
import { clamp } from "../lib/math";
import { schwarzschildRadiusPixels } from "../lib/relativity";

type Props = {
  state: SimulationState;
};

function stars(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number
) {
  for (let i = 0; i < 180; i++) {
    const x = (Math.sin(i * 91.7) * 0.5 + 0.5) * width;
    const y = (Math.cos(i * 47.3) * 0.5 + 0.5) * height;
    const pulse = 0.35 + Math.sin(time * 0.002 + i) * 0.25;
    const radius = 0.45 + ((i * 13) % 19) / 20;

    ctx.globalAlpha = clamp(pulse, 0.12, 0.82);
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.globalAlpha = 1;
}

function disk(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  spin: number,
  time: number
) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(time * 0.00025 + spin * Math.PI);
  ctx.scale(1, 0.26);

  const gradient = ctx.createLinearGradient(-radius * 2.3, 0, radius * 2.3, 0);
  gradient.addColorStop(0, "rgba(34, 211, 238, 0.01)");
  gradient.addColorStop(0.18, "rgba(34, 211, 238, 0.32)");
  gradient.addColorStop(0.42, "rgba(248, 250, 252, 0.9)");
  gradient.addColorStop(0.62, "rgba(168, 85, 247, 0.62)");
  gradient.addColorStop(0.82, "rgba(251, 113, 133, 0.42)");
  gradient.addColorStop(1, "rgba(34, 211, 238, 0.02)");

  ctx.strokeStyle = gradient;
  ctx.lineWidth = 24;
  ctx.shadowColor = "rgba(34, 211, 238, 0.75)";
  ctx.shadowBlur = 24;

  ctx.beginPath();
  ctx.ellipse(0, 0, radius * 2.18, radius * 0.72, 0, 0, Math.PI * 2);
  ctx.stroke();

  for (let i = 0; i < 24; i++) {
    const phase = time * 0.0015 + i * 0.62;

    ctx.strokeStyle =
      i % 2
        ? "rgba(125, 211, 252, 0.14)"
        : "rgba(216, 180, 254, 0.17)";

    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(0, 0, radius * (1.28 + i * 0.045), phase, phase + 0.42);
    ctx.stroke();
  }

  ctx.restore();
}

function photons(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  eventRadius: number,
  observerRadius: number,
  time: number
) {
  const bend = clamp((eventRadius / observerRadius) * 150, 22, 118);

  for (let i = 0; i < 11; i++) {
    const y = height * 0.2 + i * 30;
    const offset = (i - 5) * 10;

    ctx.strokeStyle =
      i === 5 ? "rgba(248,250,252,0.9)" : "rgba(103,232,249,0.34)";

    ctx.lineWidth = i === 5 ? 2.5 : 1.15;
    ctx.setLineDash([10, 12]);
    ctx.lineDashOffset = -time * 0.04;

    ctx.beginPath();
    ctx.moveTo(30, y);
    ctx.bezierCurveTo(
      width * 0.34 - bend,
      y + offset,
      width * 0.55 + bend,
      height - y + offset,
      width - 30,
      y + offset
    );
    ctx.stroke();
  }

  ctx.setLineDash([]);
}

function cones(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  eventRadius: number
) {
  for (let i = 0; i < 7; i++) {
    const x = width * 0.14 + i * width * 0.12;
    const tilt = eventRadius * 0.34 + i * 8;
    const topY = height * 0.2;
    const midY = height * 0.5;
    const bottomY = height * 0.8;

    ctx.fillStyle = "rgba(34, 211, 238, 0.055)";
    ctx.strokeStyle = "rgba(103, 232, 249, 0.28)";
    ctx.lineWidth = 1.2;

    ctx.beginPath();
    ctx.moveTo(x, topY);
    ctx.lineTo(x - 38 - tilt, midY);
    ctx.lineTo(x + 38 - tilt, midY);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "rgba(168, 85, 247, 0.055)";
    ctx.strokeStyle = "rgba(216, 180, 254, 0.25)";

    ctx.beginPath();
    ctx.moveTo(x, bottomY);
    ctx.lineTo(x - 38 - tilt, midY);
    ctx.lineTo(x + 38 - tilt, midY);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.strokeStyle = "rgba(248, 250, 252, 0.18)";
    ctx.setLineDash([4, 9]);

    ctx.beginPath();
    ctx.moveTo(x, topY);
    ctx.lineTo(x - tilt, bottomY);
    ctx.stroke();

    ctx.setLineDash([]);
  }
}

function redshift(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  eventRadius: number,
  observerRadius: number,
  time: number
) {
  for (let i = 0; i < 32; i++) {
    const angle = (i / 32) * Math.PI * 2 + time * 0.0004;
    const inner = eventRadius + 10;
    const outer = observerRadius + 48 + Math.sin(time * 0.002 + i) * 11;

    const x1 = cx + Math.cos(angle) * inner;
    const y1 = cy + Math.sin(angle) * inner;
    const x2 = cx + Math.cos(angle) * outer;
    const y2 = cy + Math.sin(angle) * outer;

    const hue =
      i < 10 ? "248, 113, 113" : i < 22 ? "251, 146, 60" : "250, 204, 21";

    ctx.strokeStyle = `rgba(${hue}, ${0.1 + i * 0.004})`;
    ctx.lineWidth = 1.8;

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }
}

function timeGrid(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  eventRadius: number,
  time: number
) {
  const cx = width / 2;
  const cy = height / 2;
  const pull = eventRadius * 0.0065;

  ctx.strokeStyle = "rgba(125, 211, 252, 0.16)";
  ctx.lineWidth = 1;

  for (let x = 40; x < width; x += 32) {
    ctx.beginPath();

    for (let y = 30; y < height; y += 10) {
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const warp = Math.max(0, 170 - dist) * pull;

      const px = x + Math.sin(y * 0.05 + time * 0.001) * warp;
      const py = y + Math.cos(x * 0.04 + time * 0.001) * warp;

      if (y === 30) {
        ctx.moveTo(px, py);
      } else {
        ctx.lineTo(px, py);
      }
    }

    ctx.stroke();
  }

  for (let y = 40; y < height; y += 32) {
    ctx.beginPath();

    for (let x = 30; x < width; x += 10) {
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const warp = Math.max(0, 170 - dist) * pull;

      const px = x + Math.sin(y * 0.03 + time * 0.001) * warp;
      const py = y + Math.cos(x * 0.04 + time * 0.001) * warp;

      if (x === 30) {
        ctx.moveTo(px, py);
      } else {
        ctx.lineTo(px, py);
      }
    }

    ctx.stroke();
  }
}

export function BlackHoleCanvas({ state }: Props) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    let frame = 0;

    const canvasElement = ref.current;

    if (!canvasElement) {
      return;
    }

    const canvasContext = canvasElement.getContext("2d");

    if (!canvasContext) {
      return;
    }

    const canvas: HTMLCanvasElement = canvasElement;
    const ctx: CanvasRenderingContext2D = canvasContext;

    function resize() {
      const rect = canvas.getBoundingClientRect();
      const scale = window.devicePixelRatio || 1;

      canvas.width = Math.floor(rect.width * scale);
      canvas.height = Math.floor(rect.height * scale);

      ctx.setTransform(scale, 0, 0, scale, 0, 0);
    }

    const draw = (time: number) => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const cx = width / 2;
      const cy = height / 2;

      const rs = schwarzschildRadiusPixels(state.mass);
      const eventRadius = clamp(rs, 40, 132);
      const observerRadius = clamp(state.observerRadius, eventRadius + 16, 270);

      ctx.clearRect(0, 0, width, height);

      const background = ctx.createRadialGradient(
        cx,
        cy,
        20,
        cx,
        cy,
        width * 0.68
      );

      background.addColorStop(0, "rgba(15,23,42,1)");
      background.addColorStop(0.42, "rgba(2,6,23,1)");
      background.addColorStop(1, "rgba(0,0,0,1)");

      ctx.fillStyle = background;
      ctx.fillRect(0, 0, width, height);

      stars(ctx, width, height, time);
      disk(ctx, cx, cy, eventRadius, state.spin, time);

      if (state.mode === "photon") {
        photons(ctx, width, height, eventRadius, observerRadius, time);
      }

      if (state.mode === "cones") {
        cones(ctx, width, height, eventRadius);
      }

      if (state.mode === "redshift") {
        redshift(ctx, cx, cy, eventRadius, observerRadius, time);
      }

      if (state.mode === "time") {
        timeGrid(ctx, width, height, eventRadius, time);
      }

      const glow = ctx.createRadialGradient(
        cx,
        cy,
        eventRadius * 0.4,
        cx,
        cy,
        eventRadius * 2.25
      );

      glow.addColorStop(0, "rgba(0,0,0,1)");
      glow.addColorStop(0.45, "rgba(0,0,0,.98)");
      glow.addColorStop(0.7, "rgba(34,211,238,.18)");
      glow.addColorStop(1, "rgba(34,211,238,0)");

      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(cx, cy, eventRadius * 2.25, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "black";
      ctx.shadowColor = "rgba(103,232,249,.35)";
      ctx.shadowBlur = 18;

      ctx.beginPath();
      ctx.arc(cx, cy, eventRadius, 0, Math.PI * 2);
      ctx.fill();

      ctx.shadowBlur = 0;

      ctx.strokeStyle = "rgba(103,232,249,.28)";
      ctx.lineWidth = 2;

      ctx.beginPath();
      ctx.arc(cx, cy, eventRadius, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = "rgba(168,85,247,.14)";
      ctx.setLineDash([8, 12]);

      ctx.beginPath();
      ctx.arc(cx, cy, eventRadius * 1.5, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = "rgba(103,232,249,.10)";

      ctx.beginPath();
      ctx.arc(cx, cy, eventRadius * 2.35, 0, Math.PI * 2);
      ctx.stroke();

      ctx.setLineDash([]);

      const angle = time * 0.00035 + state.spin * Math.PI * 2;
      const ox = cx + Math.cos(angle) * observerRadius;
      const oy = cy + Math.sin(angle) * observerRadius * 0.55;

      ctx.fillStyle = "rgba(224,242,254,1)";
      ctx.strokeStyle = "rgba(56,189,248,1)";
      ctx.lineWidth = 3;

      ctx.beginPath();
      ctx.arc(ox, oy, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "rgba(226,232,240,.8)";
      ctx.font =
        "12px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
      ctx.fillText("observer", ox + 12, oy - 10);

      frame = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);

    frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, [state]);

  return (
    <div className="canvasShell" id="lab">
      <canvas ref={ref} className="blackHoleCanvas" />

      <div className="canvasHud top">
        <span>ChronoBreak Lab</span>
        <small>{state.mode.toUpperCase()} MODE</small>
      </div>

      <div className="canvasHud bottom">
        <span>Live Canvas Simulation</span>
        <small>visual approximation, not full GR solver</small>
      </div>
    </div>
  );
}
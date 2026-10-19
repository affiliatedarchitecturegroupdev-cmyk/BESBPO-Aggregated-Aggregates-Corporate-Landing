import { Bath, BrickWall, Container, DoorOpen, Droplets, Fence, Grid2x2, Grid3x3, HardHat, House, Layers, LayoutGrid, Mountain, PaintRoller, PanelTop, TreePine, Waves, Wrench, Zap, type LucideIcon } from "lucide-react";
import { DEPARTMENT_ICONS } from "@/data/site";

const ICONS: Record<string, LucideIcon> = { Bath, BrickWall, Container, DoorOpen, Droplets, Fence, Grid2x2, Grid3x3, HardHat, House, Layers, LayoutGrid, Mountain, PaintRoller, PanelTop, TreePine, Waves, Wrench, Zap };

export function DepartmentIcon({ slug, className }: { slug: string; className?: string }) {
  const Icon = ICONS[DEPARTMENT_ICONS[slug] ?? "Mountain"] ?? Mountain;
  return <Icon className={className} aria-hidden strokeWidth={1.6} />;
}

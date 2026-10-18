import { BrickWall, Container, DoorOpen, Droplets, Fence, Grid3x3, HardHat, House, LayoutGrid, Mountain, PaintRoller, PanelTop, TreePine, Waves, type LucideIcon } from "lucide-react";
import { DEPARTMENT_ICONS } from "@/data/site";

const ICONS: Record<string, LucideIcon> = { BrickWall, Container, DoorOpen, Droplets, Fence, Grid3x3, HardHat, House, LayoutGrid, Mountain, PaintRoller, PanelTop, TreePine, Waves };

export function DepartmentIcon({ slug, className }: { slug: string; className?: string }) {
  const Icon = ICONS[DEPARTMENT_ICONS[slug] ?? "Mountain"] ?? Mountain;
  return <Icon className={className} aria-hidden strokeWidth={1.6} />;
}

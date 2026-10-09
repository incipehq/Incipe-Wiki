import { AppWindow, BookOpen, Cpu, FileText, Hammer, HardDrive, MonitorPlay, NotebookText, Presentation, Radar } from 'lucide-react';
import type { WikiKind } from '../wikiContent';

/** One glyph per Academy page type. */
export const PAGE_GLYPH = {
  slides: Presentation,
  video: MonitorPlay,
  document: FileText,
  notes: NotebookText,
  project: Hammer,
} as const;

/** One glyph per Wiki kind. */
export const WIKI_GLYPH: Record<WikiKind, typeof Cpu> = {
  board: Cpu,
  guide: BookOpen,
  app: AppWindow,
  sensor: Radar,
  module: HardDrive,
};

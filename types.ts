
// Fix: Added React import to define the React namespace for React.ReactNode usage
import React from 'react';

export interface NavItem {
  label: string;
  path: string;
}

export interface DocumentInfo {
  label: string;
  value: string;
  category: string;
}

export interface ImpactStat {
  label: string;
  value: string;
  icon: string;
}

export interface Initiative {
  title: string;
  description: string;
  image: string;
  icon: React.ReactElement;
}

export interface TeamMember {
  name: string;
  role: string;
  description: string;
  emoji: string;
  color?: string;
  image?: string;
}

export interface TeamData {
  founders: TeamMember[];
  coreTeam: TeamMember[];
}
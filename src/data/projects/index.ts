
import { caraeximProject } from './caraexim';
import { clusterProject } from './cluster';
import { graphyProject } from './graphy';
import { eventttsProject } from './eventtts';
import { qnsaiProject } from './qnsai';
import { carboProject } from './carbo';

export const projectsdata = [
  caraeximProject,
  clusterProject,
  graphyProject,
  eventttsProject,
  qnsaiProject,
  carboProject,
];

export type Project = typeof caraeximProject;

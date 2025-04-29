
import { faceDBProject } from './facedb';
import { feelWellProject } from './feelWell';
import { inclusiAIProject } from './inclusiAI';
import { googleStockPredictionProject } from './googleStockPrediction';

export const projectsdata = [
  faceDBProject,
  feelWellProject,
  inclusiAIProject,
  googleStockPredictionProject,
];

export type Project = typeof faceDBProject;

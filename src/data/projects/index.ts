
import { faceDBProject } from './facedb';
import { feelWellProject } from './feelWell';
import { inclusiAIProject } from './inclusiAI';
import { googleStockPredictionProject } from './googleStockPrediction';
import { qnsaiProject } from './qnsai';
import { carboProject } from './carbo';

export const projectsdata = [
  faceDBProject,
  feelWellProject,
  inclusiAIProject,
  googleStockPredictionProject,
  qnsaiProject,
  carboProject,
];

export type Project = typeof faceDBProject;

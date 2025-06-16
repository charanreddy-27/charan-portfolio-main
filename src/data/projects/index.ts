
import { faceDBProject } from './facedb';
import { feelWellProject } from './feelWell';
import { inclusiAIProject } from './inclusiAI';
import { googleStockPredictionProject } from './googleStockPrediction';
import { pathPilotProject } from './pathpilot';
import { meetEaseProject } from './meetease';
import { iotSmokeDetectorProject } from './iotsmokedetector';
import { fakeImageDetectionProject } from './fakeimagedetection';
import { smolDoclingOCRProject } from './smolDoclingOCR';
import { chatbotv9Project } from './chatbotv9';

export const projectsdata = [
  faceDBProject,
  feelWellProject,
  inclusiAIProject,
  googleStockPredictionProject,
  pathPilotProject,
  meetEaseProject,
  iotSmokeDetectorProject,
  fakeImageDetectionProject,
  smolDoclingOCRProject,
  chatbotv9Project,
];

export type Project = typeof faceDBProject;

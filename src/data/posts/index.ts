
import type { BlogPost } from './types';
import { modernDataStackBlog } from './modernDataStackBlog';
import { aiDrivenPersonalization } from './aiDrivenPersonalization';
import { dataCenterOptimization } from './dataCenterOptimization';
import { userBehaviorBlog } from './userBehaviorBlog';
import { aiDataCleaning } from './aiDataCleaning';
import { agenticAIBlog } from './agenticAIBlog';

export const blogPosts: BlogPost[] = [
  modernDataStackBlog,
  aiDrivenPersonalization,
  dataCenterOptimization,
  userBehaviorBlog,
  aiDataCleaning,
  agenticAIBlog,
];

export type { BlogPost };

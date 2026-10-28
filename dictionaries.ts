import { ar, type Dictionary } from './ar';
import { en } from './en';
import type { Lang } from './types';

export const dictionaries: Record<Lang, Dictionary> = { ar, en };

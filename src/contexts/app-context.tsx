import type { UseAppContext } from '@/types/core.d.ts';
import { createContext } from 'react';

export const AppContext = createContext<UseAppContext>({} as UseAppContext);

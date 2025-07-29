import { UseAppContext } from '@types';
import { createContext } from 'react';

export const AppContext = createContext<UseAppContext>({} as UseAppContext);

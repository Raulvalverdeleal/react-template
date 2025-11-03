import { useContext } from 'react';
import { AppContext } from '@/contexts/app-context.tsx';

export const useApp = () => useContext(AppContext);

import { createRoot } from 'react-dom/client';
import '@styles';
import { RouterProvider } from 'react-router-dom';
import { router } from './router.tsx';

// trigger gh actions |

createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />);

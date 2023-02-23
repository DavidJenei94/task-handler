import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { FeedbackContextProvider } from './store/feedback-context';
import { AuthContextProvider } from './store/auth-context';

import App from './App';

import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <AuthContextProvider>
    <FeedbackContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </FeedbackContextProvider>
  </AuthContextProvider>
);

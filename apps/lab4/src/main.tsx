import { StrictMode } from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { Provider } from 'react-redux';
import styled from 'styled-components';

import App from './app/app';
import store from './app/store';

import './style.css';

const root = ReactDOMClient.createRoot(
  document.getElementById('root') as HTMLElement
);

const Wrapper = styled.div`
width: 100%;
height: 100vh;
`;

root.render(
  <StrictMode>
    <Wrapper>
      <Provider store={store}>
        <App />
      </Provider>
    </Wrapper>
  </StrictMode>
);

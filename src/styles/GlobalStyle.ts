import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    font-family: 'Inter', sans-serif;
    font-weight: 400;
    font-size: clamp(14px, 1.5vw, 16px);
    line-height: 1.7;
    color: rgba(0,0,0,0.88);
    background: #FAFAFA;
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'DM Sans', sans-serif;
    line-height: 1.2;
  }

  h1 {
    font-size: clamp(32px, 5vw, 54px);
    font-weight: 800;
    letter-spacing: -1.5px;
  }

  h2 {
    font-size: clamp(28px, 4vw, 40px);
    font-weight: 700;
    letter-spacing: -1px;
  }

  h3 {
    font-size: clamp(22px, 3vw, 32px);
    font-weight: 700;
    letter-spacing: -0.5px;
  }

  h4 {
    font-size: 24px;
    font-weight: 600;
    letter-spacing: -0.3px;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ul, ol {
    list-style: none;
  }

  button {
    border: none;
    cursor: pointer;
    font-family: inherit;
    background: none;
  }

  img {
    max-width: 100%;
    display: block;
  }

  ::selection {
    background: #C4B5FD;
    color: rgba(0,0,0,0.88);
  }
`;

export default GlobalStyle;

import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

const FontStyles = createGlobalStyle`
  ${props => props.fontResult.map(fontData => `
    @font-face {
      font-family: '${fontData.font}';
      src: url('${fontData.font_file}') format('truetype');
      font-weight: ${fontData.is_bold ? 'bold' : 'normal'};
      font-style: ${fontData.is_italic ? 'italic' : 'normal'};
    }
  `)}
`;

const FontFaceStyles = ({ fontResult }) => {
    return (
        <FontStyles fontResult={fontResult} />
    );
};

export default FontFaceStyles;

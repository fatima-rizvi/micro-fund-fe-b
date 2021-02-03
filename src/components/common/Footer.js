import React from 'react';
import styled from 'styled-components';

const FooterStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 2px 2px 2px grey;
  margin: 10px;
  padding: 10px;
`;

function Footer() {
  return (
    <FooterStyle>
      <h5>MicroFund 2020</h5>
    </FooterStyle>
  );
}

export default Footer;

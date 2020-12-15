import React from 'react';
import styled from 'styled-components';

const FooterStyle = styled.div`
  display: flex;
  box-shadow: 2px 2px 2px grey;
  margin: 10px;
  padding: 10px;
  background: #d5f2bb;
`;

function Footer() {
  return (
    <FooterStyle>
      <h2>Footer</h2>
    </FooterStyle>
  );
}

export default Footer;

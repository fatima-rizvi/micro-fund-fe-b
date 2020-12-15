import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Form from '../../common/Form';

const AppCardStyle = styled.div`
  box-shadow: 2px 2px 2px grey;
  margin: 10px;
  padding: 10px;
  background: #d5f2bb;
  box-szing: boarder-box;
  height: 100%;
`;

function AppCard() {
  return (
    <AppCardStyle>
      <h1>Application Form</h1>
      <Link to="/">
        <div>Home</div>
      </Link>

      <Form />
    </AppCardStyle>
  );
}

export default AppCard;

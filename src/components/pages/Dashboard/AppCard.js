import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Form from '../../common/Form';
import UserDescription from '../../common/UserDescription';
import logo from '../../../images/microLogo.png';

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
      <img src={logo} />
      <h1>Application Form</h1>
      <Link to="/">
        <div>Home</div>
      </Link>
      <UserDescription />

      <Form />
    </AppCardStyle>
  );
}

export default AppCard;

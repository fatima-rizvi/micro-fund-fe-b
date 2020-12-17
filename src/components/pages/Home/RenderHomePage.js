import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Typography } from 'antd';
import { useQuery } from 'react-query';
import axiosWithAuth from '../../../utils/axiosWithAuth';
import DashCard from '../Dashboard/DashCard';
import Footer from '../../common/Footer';
import styled from 'styled-components';
import logo from '../../../images/microLogo.png';
import {
  BrowserRouter as Router,
  Route,
  useHistory,
  Switch,
} from 'react-router-dom';

const LandingNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  box-shadow: 2px 2px 2px grey;
  background: #d5f2bb;
  text-align: center;
  margin: 10px;
  padding: 10px;
`;

const { Paragraph, Title } = Typography;

function RenderHomePage(props) {
  const { userInfo, authService } = props;

  return (
    <div className="title">
      <LandingNav>
        <img src={logo} alt="MicroFund Logo" className="header-logo" />
        <div className="welcome-style"> Welcome back, {userInfo.name}!</div>

        <Link to="/AppCard">Apply</Link>
        <br></br>
        <Link onClick={() => authService.logout()}>Log Out</Link>
      </LandingNav>

      <Switch>
        <div>
          <DashCard />
          <Footer />
        </div>
      </Switch>
    </div>
  );
}
export default RenderHomePage;

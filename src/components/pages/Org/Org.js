import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useOrgQuery, useUserQuery } from '../../../hooks';
import { useOktaAuth } from '@okta/okta-react';
import styled from 'styled-components';
import OrgComponent from '../../common/Org';
import '../../../styles/theme-overrides';

// I think these styles should be unnecessary?
// I feel like there should be global styles
// someplace that will apply?
const OrgPageStyle = styled.div`
  margin: 10%;
  padding: 10px;
  box-sizing: border-box;
  height: 100%;
  text-align: center;
`;

export default function Org() {
  const { id } = useParams();
  const auth = useOktaAuth();
  const [{ isLoading, data, error }, mutation] = useOrgQuery(auth, id);

  if (isLoading) return <h2>...Loading</h2>;
  else if (error) return <h2>{error}</h2>;
  //TEMPORARY description data
  else
    data.data.description =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In ante metus dictum at tempor commodo. Elementum sagittis vitae et leo duis ut diam. Sociis natoque penatibus et magnis dis. Nunc non blandit massa enim nec. At varius vel pharetra vel. Amet est placerat in egestas erat imperdiet sed. Justo donec enim diam vulputate ut pharetra sit amet aliquam. Fames ac turpis egestas integer eget. Consectetur lorem donec massa sapien faucibus et molestie ac feugiat. Ornare quam viverra orci sagittis eu. Lacus viverra vitae congue eu consequat ac felis donec et. Nulla malesuada pellentesque elit eget.\nNullam ac tortor vitae purus faucibus ornare suspendisse. Lectus proin nibh nisl condimentum id venenatis a. Venenatis cras sed felis eget velit aliquet sagittis. Donec enim diam vulputate ut pharetra sit amet aliquam. Dui ut ornare lectus sit amet est placerat in egestas. Tortor consequat id porta nibh venenatis cras sed felis. Adipiscing diam donec adipiscing tristique risus nec feugiat in fermentum. At augue eget arcu dictum varius. Nunc aliquet bibendum enim facilisis gravida neque convallis a. Sociis natoque penatibus et magnis dis parturient. Commodo odio aenean sed adipiscing diam donec adipiscing tristique. Ultricies leo integer malesuada nunc vel risus.\nEst pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat. Eget felis eget nunc lobortis mattis aliquam faucibus purus. Laoreet id donec ultrices tincidunt arcu non. Duis ultricies lacus sed turpis tincidunt. Mauris pharetra et ultrices neque ornare. Enim facilisis gravida neque convallis a cras semper. Ut morbi tincidunt augue interdum velit euismod in pellentesque. Lectus sit amet est placerat in egestas. Massa vitae tortor condimentum lacinia. Est placerat in egestas erat imperdiet sed euismod.';

  return (
    <OrgPageStyle>
      <OrgComponent orgData={data.data} editable="true" />
    </OrgPageStyle>
  );
}

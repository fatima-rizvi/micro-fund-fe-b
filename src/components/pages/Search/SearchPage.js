import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import CompactApp from './CompactApp';
import SearchInput from './SearchInput';
import './search.css';
import dummyData from './dummySearchData';
import { useOktaAuth } from '@okta/okta-react';
import { getProfileData } from '../../../api';
import { useAppsQuery } from '../../../hooks';

function SearchPage() {
  const { authState } = useOktaAuth();

  console.log(getProfileData(authState));

  const [apps, setAppsState] = useState([]);
  const [filterValues, setFilter] = useState({ name: '', status: '' });

  //https://micro-fund-be-b.herokuapp.com/orgs/org/6/apps

  useEffect(() => {
    console.log('search page use effect:', filterValues);

    axios
      .get('https://micro-fund-be-b.herokuapp.com/apps/all')
      .then(res => {
        console.log('Retrieved data from api');
        setAppsState(res.data);
      })
      .catch(err => {
        console.log('Error: ', err);
      });
  }, [filterValues]);

  return (
    <div className="search-page">
      <SearchInput setFilter={setFilter} />
      <div className="all-short-apps">
        <div className="short-apps-header">
          <p>Name</p>
          <p>Organization Name</p>
          <p>Status</p>
        </div>
        {apps.map(application => (
          <CompactApp
            key={application.appid}
            app={application}
            filterValues={filterValues}
          />
        ))}
      </div>
    </div>
  );
}

export default SearchPage;

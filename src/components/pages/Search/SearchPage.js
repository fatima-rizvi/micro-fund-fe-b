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
  /* Lines 14 and 15, to my understanding, will be necessary to use the useAppsQuery to 
  retrieve all of the applications using the react queries. I'm not yet sure how to 
  retrieve all of the applications made to a specific organization, but I think
  the getProfileData hook should be able to return an id or something that can
  be passed to the neccessary endpoint link. Still figuring that out.*/

  const { authState } = useOktaAuth();
  getProfileData(authState);

  const [apps, setAppsState] = useState([]);
  const [filterValues, setFilter] = useState({ name: '', status: '' });

  useEffect(() => {
    axios
      .get('https://micro-fund-be-b.herokuapp.com/apps/all')
      .then(res => {
        setAppsState(res.data);
      })
      .catch(err => {
        console.log('Error: ', err);
      });
  }, [filterValues]); // Rerender the page when the filter values have updated

  return (
    <div className="search-page">
      <SearchInput setFilter={setFilter} />
      <div className="all-short-apps">
        <div className="short-apps-header">
          <p>Name</p>
          <p>Organization Name</p>
          <p>Status</p>
        </div>
        {/* To substitute in the dummyData in dummmySearchData.js, swap "apps" for "dummyData" below  */}
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

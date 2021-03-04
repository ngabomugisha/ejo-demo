import React, { useState, useEffect } from 'react';
import './Feed.css';
import FeedCards from '../feedCards/FeedCards';
import FeedHead from './FeedHead'
import {useHistory} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { handleFetchSchool } from '../../store/actions/schools.actions';


function Feed() {
  const history = useHistory()
  const dispatch = useDispatch();
  // const { list: ALL_SCHOOLS } = useSelector((state) => state.school);
  const [isLoading, setIsLoading] = useState(true);
  const fetchData = async () => {
    try {
      await dispatch(handleFetchSchool());
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="feed">
        <FeedCards/>
    </div>
  );
}

export default Feed;

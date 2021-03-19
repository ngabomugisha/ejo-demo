import { Home } from '@material-ui/icons';
import React from 'react';
import HomeLayout from '../../components/Layouts/HomeLayout';
import HomeImage from '../../assets/img/home.svg';
const HomePage = () => (
  <HomeLayout>
    <img src={HomeImage} className="home" />
  </HomeLayout>
);

export default HomePage;

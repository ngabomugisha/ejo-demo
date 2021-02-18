import React, { useState } from 'react';
import './HomeLayout.css'
import { useHistory } from 'react-router-dom';
import logo from '../../assets/icons/logo.svg';
import Button from '@material-ui/core/Button';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';


const HomeLayout = ({ children }) => {
  const history = useHistory();
  const [auth, setAuth] = useState('none');
  return (
    <>
      <div className="container">
        <div className="left_side">
          <img src={logo} className="logo" />
          <div className="content-text">
            <h2>Education is the</h2>
            <h1>Future</h1>

            <p>
              We are providing the best support <br />
              for schools, parents and student
              <br /> to redefine the future
            </p>
            <Button
              style={{
                borderRadius: 5,
                backgroundColor: '#1f75c6',
                padding: '7px 15px',
                fontSize: '15px',
                color: '#fff',
                textTransform: 'capitalize',
              }}
              variant="contained"
            >
              Join Us
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{' '}
              <KeyboardArrowRightIcon />
            </Button>
          </div>
        </div>
        <div className="right_side">
          <div className="btn-auth">
            <h3 onClick={() => history.push('/login')}>Sign In</h3>
          </div>
          {children}
        </div>
      </div>
    </>
  );
};

export default HomeLayout;

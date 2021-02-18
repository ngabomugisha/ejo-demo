import React from 'react';
import { useHistory } from 'react-router-dom';
import HomeLayout from '../../components/Layouts/HomeLayout';
import { Button } from '@material-ui/core';
const ForgetPassword = () => {
  const history = useHistory();
  return (
    <HomeLayout>
      <>
        <h1>Did you forget your password, really?</h1>
        <Button variant="outlined" onClick={history.goBack}>
          Go back
        </Button>
      </>
    </HomeLayout>
  );
};

export default ForgetPassword;

import './Login.css';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import HomeLayout from '../../components/Layouts/HomeLayout';
import { handleLogin } from '../../store/actions/auth.actions';

const LoginPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errMessage, setErrMessage] = React.useState('');

  const handleSubmit = async () => {
    if (!password || !email) return;
    setErrMessage('');
    setIsLoading(true);
    try {
      await dispatch(handleLogin({ email, password }));
      setIsLoading(false);
      history.replace('/teacher');
    } catch (error) {
      setErrMessage(error.message || error.error || error);
      setIsLoading(false);
    }
  };
  return (
    <HomeLayout>
      <>
        <div className="login-form">
          <div className="login-field">
            <TextField
              label="Email"
              id="mui-theme-provider-outlined-input"
              defaultValue=""
              variant="outlined"
              size="small"
              color="primary"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="login-field">
            <TextField
              label="Password"
              id="outlined-size-small"
              defaultValue=""
              variant="outlined"
              size="small"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              error={!!errMessage}
            />
            <p>{errMessage}</p>
          </div>
          <p className="forget-password"><Link to="/passwords">Forgot Password?</Link>
          </p>
          <Button
            className="login-btn"
            disabled={isLoading}
            style={{
              borderRadius: 5,
              backgroundColor: '#fff',
              padding: '8px 26px',
              fontSize: '14px',
              width: '120px',
              textTransform: 'capitalize',
            }}
            variant="contained"
            onClick={handleSubmit}
          >
            Sign In
          </Button>
        </div>
        <div>
        </div>
      </>
    </HomeLayout>
  );
};

export default LoginPage;

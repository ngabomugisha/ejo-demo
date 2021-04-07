import './Login.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, connect, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import HomeLayout from '../../components/Layouts/HomeLayout';
import { handleLogin } from '../../store/actions/auth.actions';
import { SCHOOLADMIN, TEACHER, SUPERADMIN, HEADSTUDY } from './Users'
import logoAfrica from '../../assets/img/white-logo.png';
import Alert from 'react-bootstrap/Alert';
import 'bootstrap/dist/css/bootstrap.min.css'

const LoginPage = (props) => {

  const history = useHistory();
  const dispatch = useDispatch();
  // const [fine, setFine] = useState(false);
  const data = useSelector((state) => state.auth)
  const [isLoading, setIsLoading] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errMessage, setErrMessage] = React.useState('');
  let fine = false

  const handleSubmit = async () => {
    if (!password || !email) {
      setErrMessage("Email or Password are empty")
      return setErrMessage;
    }
    setErrMessage('');
    setIsLoading(true);
    try {
      const res = await dispatch(handleLogin({ email, password }));
      // if(data != null) fine =true

      switch (res.user.role) {
        case TEACHER:
          history.replace('/teacher');
          setIsLoading(false);
          break;
        case SCHOOLADMIN:
          history.replace('/schoolAdmin')
          setIsLoading(false);
          break;
        case SUPERADMIN:
          history.replace('/admin')
          setIsLoading(false);
          break;
        case HEADSTUDY:
          history.replace('/headStudy')
          setIsLoading(false);
          break;

        default:
          setIsLoading(false);
          break;
      }




    } catch (error) {
      setErrMessage(error.message || error.error || error);
      setIsLoading(false);
    }

  };
  console.log("%$%$%$%$%$%$%$%", props.state)
  return (
    <HomeLayout>
      <>
        <div className="login-form">
          <div className="africa">
            <img src={logoAfrica} />
          </div>
          <div className="login-field">
            <TextField
              label="Email"
              id="mui-theme-provider-outlined-input"
              defaultValue=""
              variant="outlined"
              size="small"
              fullWidth
              color="primary"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              error={!!errMessage}
            />
          </div>
          <div className="login-field">
            <TextField
              label="Password"
              id="outlined-size-small"
              defaultValue=""
              variant="outlined"
              fullWidth
              size="small"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              error={!!errMessage}
            />
            <p className="errorMessage">{errMessage}</p>
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
  )
}

const mapStateToProps = (state) => ({
  state: state
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)

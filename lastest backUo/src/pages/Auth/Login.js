import './Login.css';
import React from 'react';
import { useDispatch, connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import HomeLayout from '../../components/Layouts/HomeLayout';
import { handleLogin } from '../../store/actions/auth.actions';
import { SCHOOLADMIN, TEACHER, SUPERADMIN } from './Users'
import  Alert  from 'react-bootstrap/Alert';
import 'bootstrap/dist/css/bootstrap.min.css'

const LoginPage = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errMessage, setErrMessage] = React.useState('');

  const handleSubmit = async () => {
    if (!password || !email) {
      setErrMessage("Email or Password are empty")
      return setErrMessage;}
    setErrMessage('');
    setIsLoading(true);
    try {
      await dispatch(handleLogin({ email, password }));
      setIsLoading(false);

      //load teacher's dashboard
      switch (props.st.auth.user.role) {
        case TEACHER:
          history.replace('/teacher');
          break;
        case SCHOOLADMIN:
          history.replace('/schoolAdmin')
          break;
          case SUPERADMIN:
            history.replace('/admin')
            break;

        default:
          break;
      }




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
  st: state
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)

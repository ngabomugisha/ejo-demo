import './Login.css';
import React, {  } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, connect, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Button, TextField,InputBase } from '@material-ui/core';
import HomeLayout from '../../components/Layouts/HomeLayout';
import { handleLogin } from '../../store/actions/auth.actions';
import { SCHOOLADMIN, TEACHER, SUPERADMIN, HEADSTUDY } from './Users'
import logoAfrica from '../../assets/img/white-logo.png';
import 'bootstrap/dist/css/bootstrap.min.css'
import InputGroup from 'react-bootstrap/InputGroup'

const styles = makeStyles(theme => ({
  textField: {
    border: "1px solid #1F72C6",
    borderRadius: theme.shape.borderRadius,
    color: 'green',
    backgroundColor: 'whitesmoke'
  },
  inputBase: {
      color: 'white',
      border: "1px solid #1F72C6",
      borderRadius: theme.shape.borderRadius,
      height: "7vh",
      padding: theme.spacing(1),
      backgroundColor: 'whitesmoke'
  }
}));


const LoginPage = (props) => {

  const classes = styles();
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
  return (
    <HomeLayout>
      <>

      <form className={classes.root} noValidate>
        <div className="login-form">
          <div className="africa">
            <img src={logoAfrica} />
          </div>
          <div className="login-field">
            <TextField
              className={classes.textField}
              size="small"
              fullWidth
              variant="outlined"
              label="Email"
              placeholder="Email"
              color="primary"
              onChange={(e) => setEmail(e.target.value)}
              error={!!errMessage}
              InputProps={{
                className: classes.input,
            }}
            />
          </div>
          <div className="login-field">
            <TextField
              className={classes.textField}
              placeholder="Password"
              id="custom-css-outlined-input"
              fullWidth
              variant="outlined"
              size="small"
              color="primary"
              type="password"
              label="password"
              onChange={(e) => setPassword(e.target.value)}
              error={!!errMessage}
              InputProps={{
                className: classes.input,
            }}
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
        </form>
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

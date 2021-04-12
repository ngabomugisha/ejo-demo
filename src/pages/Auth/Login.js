import './Login.css';
import React, {  } from 'react';
import {
  withStyles,
  makeStyles,
  createMuiTheme,
} from '@material-ui/core/styles';
import { useDispatch, connect, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import HomeLayout from '../../components/Layouts/HomeLayout';
import { handleLogin } from '../../store/actions/auth.actions';
import { SCHOOLADMIN, TEACHER, SUPERADMIN, HEADSTUDY } from './Users'
import logoAfrica from '../../assets/img/white-logo.png';
import 'bootstrap/dist/css/bootstrap.min.css'
import { green } from '@material-ui/core/colors';


const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

const ValidationTextField = withStyles({
  root: {
    '& input:valid + fieldset': {
      borderColor: 'white',
      borderWidth: 2,
      color: 'white'
    },
    '& input:invalid + fieldset': {
      borderColor: 'red',
      borderWidth: 2,
      color: 'white'
    },
    '& input:valid:focus + fieldset': {
      borderLeftWidth: 6,
      borderColor: 'white',
      color: 'white !important',
      padding: '4px !important', // override inline-style
    },
  },
})(TextField);

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});


const LoginPage = (props) => {

  const classes = useStyles();
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
            <ValidationTextField
              label="Email"
              className={classes.margin}
              defaultValue=""
              variant="outlined"
              size="small"
              fullWidth
              style={{color: 'red !important'}}
              color="primary"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              error={!!errMessage}
              id="validation-outlined-input"
            />
          </div>
          <div className="login-field">
            <ValidationTextField
              label="Password"
              className={classes.root}
              id="validation-outlined-input"
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

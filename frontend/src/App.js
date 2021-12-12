import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { LogoutComponent } from './components/LogoutComponent'
import { Header } from './components/Header'
import { HomeScreen } from './screens/HomeScreen'
import { LoginScreen } from './screens/LoginScreen'
import { RegisterScreen } from './screens/RegisterScreen'
import { ForgotPasswordScreen } from './screens/ForgotPasswordScreen'
import { EnterOtpScreen } from './screens/EnterOtpScreen'
import { ResetPasswordScreen } from './screens/ResetPasswordScreen'
import { ProfileScreen } from './screens/ProfileScreen'
import { AdminScreen } from './screens/AdminScreen'
import './App.css';

function App() {

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  return (
    <Router>
      <Header/>
      {userInfo && <LogoutComponent/>}
      <Container style={{ width:"100%" }} className='mx-auto pt-5 mt-2'>
        <Routes>
          <Route path="/login" element={<LoginScreen/>} exact />
          <Route path="/forgot" element={<ForgotPasswordScreen/>} exact />
          <Route path="/otp" element={<EnterOtpScreen/>} exact />
          <Route path="/reset" element={<ResetPasswordScreen/>} exact />
          <Route path="/register" element={<RegisterScreen/>} exact />
          <Route path="/profile" element={<ProfileScreen/>} exact />
          <Route path="/admin" element={<AdminScreen/>} exact />
          <Route path="/" element={<HomeScreen/>} exact />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;

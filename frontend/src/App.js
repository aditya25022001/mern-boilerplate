import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Header } from './components/Header'
import { HomeScreen } from './screens/HomeScreen'
import { LoginScreen } from './screens/LoginScreen'
import { RegisterScreen } from './screens/RegisterScreen'
import { ForgotPasswordScreen } from './screens/ForgotPasswordScreen'
import { EnterOtpScreen } from './screens/EnterOtpScreen'
import { ResetPasswordScreen } from './screens/ResetPasswordScreen'
import { Container } from 'react-bootstrap'
import './App.css';

function App() {
  return (
    <Router>
      <Header/>
      <Container style={{ width:"100%" }} className='mx-auto pt-5 mt-5'>
        <Routes>
          <Route path="/login" element={<LoginScreen/>} />
          <Route path="/forgot" element={<ForgotPasswordScreen/>} />
          <Route path="/otp" element={<EnterOtpScreen/>} />
          <Route path="/reset" element={<ResetPasswordScreen/>} />
          <Route path="/register" element={<RegisterScreen/>} />
          <Route path="/" element={<HomeScreen/>} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;

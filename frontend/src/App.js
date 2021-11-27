import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Header } from './components/Header'
import { HomeScreen } from './screens/HomeScreen'
import { LoginScreen } from './screens/LoginScreen'
import { RegisterScreen } from './screens/RegisterScreen'
import { ForgotPasswordScreen } from './screens/ForgotPasswordScreen'
import { EnterOtpScreen } from './screens/EnterOtpScreen'
import { ResetPasswordScreen } from './screens/ResetPasswordScreen'
import './App.css';

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/login" component={LoginScreen} exact />
        <Route path="/forgot" component={ForgotPasswordScreen} exact />
        <Route path="/otp" component={EnterOtpScreen} exact />
        <Route path="/reset" component={ResetPasswordScreen} exact />
        <Route path="/register" component={RegisterScreen} exact />
        <Route path="/" component={HomeScreen} exact />
      </Routes>
    </Router>
  );
}

export default App;

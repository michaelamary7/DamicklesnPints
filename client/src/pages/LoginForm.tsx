import { useState, FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { SIGNUP_USER, LOGIN_USER } from "../graphql/mutation";
import { useMutation } from '@apollo/client';

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loginMutation] = useMutation(LOGIN_USER);
  const [signupMutation] = useMutation(SIGNUP_USER);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const { data } = await loginMutation({
        variables: {
          email: formData.email,
          password: formData.password,
        },
      });

      if (!data?.login) {
        setError('Failed to login. Please try again.');
        return;
      }

      const { token } = data.login;
      localStorage.setItem('token', token);
      window.dispatchEvent(new Event('authChange'));
      navigate('/');
      window.location.reload();
    } catch (err: any) {
      console.error('Failed to login', err);
      setError('Invalid email or password. Please try again.');
    }
  };

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    try {
      const { data } = await signupMutation({
        variables: {
          input: {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          },
        },
      });
      const token = data.createUser.token;
      localStorage.setItem('token', token);
      console.log('Account created and you can now log in!');
      navigate('/');
    } catch (err: any) {
      console.error('Failed to signup', err);
      setError('Failed to create account. Please try again.');
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError(null);
    setFormData({ username: '', email: '', password: '', confirmPassword: '' });
  };

  return (
    <main>
      <div className="form2">
        <form className="form" onSubmit={isLogin ? handleLogin : handleSignup}>
          <h2 className="shadow-text">DamicklesnPints</h2>
          <h1>{isLogin ? 'Login' : 'Create Account'}</h1>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email || ''}
            onChange={handleChange}
            required
          />
          {!isLogin && (
            <>
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={formData.username || ''}
                onChange={handleChange}
                required
              />
            </>
          )}
          <label>Password</label>
          <input 
            type="password"
            name="password"
            value={formData.password || ''}
            onChange={handleChange}
            required
            minLength={isLogin ? undefined : 8}
          />
          {!isLogin && (
            <>
              <label>Confirm Password</label>
              <input 
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword || ''}
                onChange={handleChange}
                required
              />
            </>
          )}
          <button type="submit">{isLogin ? 'Login' : 'Create Account'}</button>
          <button type="button" onClick={toggleForm} className="toggle-button">
            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Login'}
          </button>
          {error && <div className="error">{error}</div>}
        </form>
      </div>
    </main>
  );
};

export default Login;

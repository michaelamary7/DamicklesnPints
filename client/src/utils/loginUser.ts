import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../graphql/mutation';
import { jwtDecode } from 'jwt-decode';

interface TokenPayload {
  id: string;
  username: string;
}

interface LoginResponse {
  login: {
    token: string;
    user: {
      id: string;
      username: string;
    }
  }
}

interface UserLogin {
  username: string;
  password: string;
}

const useLogin = () => {
  const [loginMutation, { loading }] = useMutation<LoginResponse>(LOGIN_USER);

  const login = async (userInfo: UserLogin) => {
    console.log('Attempting login with:', {
      username: userInfo.username,
      passwordLength: userInfo.password ? userInfo.password.length : 'null'
    });

    try {
      const { data } = await loginMutation({
        variables: {
          username: userInfo.username,
          password: userInfo.password
        }
      });

      if (!data || !data.login || !data.login.token) {
        throw new Error('Login failed - No token received');
      }

      const token = data.login.token;
      console.log('Login successful, token received:', token);

      // Decode the JWT token to extract the userId and username
      const decoded: TokenPayload = jwtDecode(token);
      console.log('Decoded token payload:', decoded);

      return {
        token: token,
        userId: decoded.id,
      };

    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  return { login, loading };
};

export default useLogin;
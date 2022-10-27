//react
import {useState, useEffect} from 'react';

//custom hooks
import { useAuthenthication } from '../../hooks/useAuthentication.hook';

//styles
import styles from './Login.module.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const {login, error: authError, loading} = useAuthenthication();

  const handleSubmit = async (e) => {

      e.preventDefault();

      setError("");

      const user = {
          email,
          password
      };

      const res = await login(user);

      console.log(res);
  };

  useEffect(() => {

      if(authError) setError(authError);

  }, [authError]);

  return (
    <div className={styles.login}>
      <h1>Entrar</h1>
      <p>Faça um login para poder entrar no sistema</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>E-mail</span>
          <input
            type="text"
            name="email"
            required
            placeholder='email do usuário'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <span>Senha:</span>
          <input
            type="password"
            name="password"
            required
            placeholder='insira a sua senha'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {!loading && <button type='submit' className='btn'>Entrar</button>}
        {loading && <button type='submit' className='btn' disabled>Aguarde...</button>}
        {error && <p className='error'>{error}</p>}
      </form>
    </div>
  )
}

export default Login
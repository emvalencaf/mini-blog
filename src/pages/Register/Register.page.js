//react
import {useState, useEffect} from 'react';

//custom hooks
import { useAuthenthication } from '../../hooks/useAuthentication.hook';

//styles
import styles from './Register.module.css';

const Register = () => {

    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState("");

    const {createUser, error: authError, loading} = useAuthenthication();

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        const user = {
            displayName,
            email,
            password
        };

        if(password !== confirmPassword) return setError("As senhas precisam ser iguais");

        const res = await createUser(user);

        console.log(user);
    };

    useEffect(() => {

        if(authError) setError(authError);

    }, [authError]);

    return (
        <div className={styles.register}>
            <h2>Cadastre-se para postar</h2>
            <p>
                Crie seu usuário e compartilhe as suas histórias.
            </p>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Nome:</span>
                    <input
                        type="text"
                        name="name"
                        required
                        placeholder="nome do usuário"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                    />
                </label>
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
                <label>
                    <span>Confirme a sua senha:</span>
                    <input
                        type="password"
                        name="confirmPassword"
                        required
                        placeholder='confirme a sua senha'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </label>
                {!loading && <button type='submit' className='btn'>Cadastrar</button>}
                {loading && <button type='submit' className='btn' disabled>Aguarde...</button>}
                {error && <p className='error'>{error}</p>}
            </form>

        </div>
    );
};

export default Register;
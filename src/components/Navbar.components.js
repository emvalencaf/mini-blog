//react
import { NavLink } from 'react-router-dom';

//custom hooks
import { useAuthenthication } from '../hooks/useAuthentication.hook';

//context
import { useAuthValue } from '../contexts/AuthContext';

//styles
import styles from './Navbar.module.css';

const Navbar = () => {

    const { user } = useAuthValue();
    const { logout } = useAuthenthication();
    return (
        <nav className={styles.navbar}>
            <NavLink
                to="/"
                className={styles.brand}
            >Mini <span>Blog</span></NavLink>
            <ul className={styles.links_list}>
                <li>
                    <NavLink
                        to="/"
                        className={({isActive})=> (isActive? styles.active: "")}
                    >Home</NavLink>
                </li>
                {!user && (
                    <>
                        <li>
                            <NavLink
                                to='/login'
                                className={({isActive})=> (isActive? styles.active: "")}
                            >Entrar</NavLink>
                        </li>
                        <li>
                            <NavLink
                                to='/register'
                                className={({isActive})=> (isActive? styles.active: "")}
                            >Cadastrar</NavLink>
                        </li>
                    </>
                )}
                <li>
                    <NavLink
                        to="/about"
                        className={({isActive})=> (isActive? styles.active: "")}
                    >Sobre</NavLink>
                </li>
                {user && (
                    <>
                        <li>
                            <NavLink
                                to='/post/create'
                            >Novo post</NavLink>
                        </li>
                        <li>
                            <NavLink
                                to='/dashboard'
                            >Dashboard</NavLink>
                        </li>
                    </>
                )}
                {user && (
                    <li>
                        <button onClick={logout}>Sair</button>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
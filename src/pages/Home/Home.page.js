
//hooks
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';

//components
import PostDetails from '../../components/PostsDetails.component';

//styles
import styles from './Home.module.css';

const Home = () => {

    const [query, setQuery] = useState("");
    const {documents:posts, loading} = useFetchDocuments('posts');

    const handleSubmit = (e) => {
        
        e.preventDefault();

    };

    console.log(posts);

    return (
        <div className={styles.home}>
            <h1>Veja os nossos posts mais recentes</h1>
            <form onSubmit={handleSubmit} className={styles.search_form}>
                <input
                    type="text"
                    name="search"
                    placeholder='Ou busque por tags...'
                    onChange={(e) => setQuery(e.target.value)}
                    value={query}
                />
                <button className='btn btn-dark'>Pesquisar</button>
            </form>
            <div>
                {loading && <p>Carregando...</p>}
                {posts && posts.map(post => <PostDetails key={post.id} post={post}/>)}
                {posts && posts.length === 0 && (
                    <div className={styles.noposts}>
                        <p>Não foram encontrados posts</p>
                        <Link to='/post/create' className='btn'>Criar o primeiro post</Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
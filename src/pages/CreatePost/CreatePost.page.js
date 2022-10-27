// hooks
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useInsertDocument } from '../../hooks/useInsertDocument';

//contexts
import { useAuthValue} from '../../contexts/AuthContext';

//styles
import styles from './CreatePost.module.css';

const CreatePost = () => {

    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [body, setBody] = useState("");
    const [tags, setTags] = useState([]);
    const [formError, setFormError] = useState("");
    
    const {user} = useAuthValue();

    const {insertDocument, response} = useInsertDocument('posts');

    const navigate = useNavigate();

    const handleSubmit = (e) => {

        e.preventDefault();

        setFormError("");

        // validate image URL
        try{
        
            new URL(image);

        }catch(err){
            setFormError("A imagem precisa ser uma URL.");
        };

        // create tag array
        const tagsArray = tags.split(',').map((tag) => tag.trim().toLowerCase());

        // check all values
        if(!title || !image || !tags || !body) setFormError('Por favor, preencha todos os campos!');

        console.log(formError);

        if(formError) return false;

        insertDocument({
            title,
            image,
            body,
            tags: tagsArray,
            uid: user.uid,
            createdBy: user.displayName
        });

        // redirect to homepage

        navigate('/');

    };

    return (
        <div className={styles.create_post}>
            <h2>Criar post</h2>
            <p>Escreva sobre o que você quiser compartilhar</p>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Título</span>
                    <input
                        type="text"
                        name="title"
                        placeholder='pense em um bom título'
                        required
                        value={title}
                        onChange={(e)=>setTitle(e.target.value)}
                    />
                </label>
                <label>
                    <span>URL da Imagem</span>
                    <input
                        type="text"
                        name="image"
                        placeholder='Insira uma imagem que representa o seu post'
                        required
                        value={image}
                        onChange={(e)=>setImage(e.target.value)}
                    />
                </label>
                <label>
                    <span>Conteúdo</span>
                    <textarea
                        name="body"
                        placeholder='insira o conteúdo do post...'
                        required
                        value={body}
                        onChange={(e)=>setBody(e.target.value)}
                    />
                </label>
                <label>
                    <span>Tags</span>
                    <input
                        type="text"
                        name="tags"
                        placeholder='Insira as tags separadas por vírgula'
                        required
                        value={tags}
                        onChange={(e)=>setTags(e.target.value)}
                    />
                </label>
                {!response.loading && <button type='submit' className='btn'>Cadastrar</button>}
                {response.loading && <button type='submit' className='btn' disabled>Aguarde...</button>}
                {response.error && <p className='error'>{response.error}</p>}
                {formError && <p className='error'>{formError}</p>}
            </form>
        </div>
    );
};

export default CreatePost;
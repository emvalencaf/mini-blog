//react
import { useEffect } from 'react';

// hooks
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useFetchDocument } from '../../hooks/useFetchDocument';
import { useUpdateDocument } from '../../hooks/useUpdateDocument';


//contexts
import { useAuthValue } from '../../contexts/AuthContext';

//styles
import styles from './EditPost.module.css';

const EditPost = () => {

    const { id } = useParams();
    const { document: post } = useFetchDocument('posts', id);

    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [body, setBody] = useState("");
    const [tags, setTags] = useState([]);
    const [formError, setFormError] = useState("");

    useEffect(() => {

        if (post) {
            setTitle(post.title);
            setBody(post.body);
            setImage(post.image);

            const textTags = post.tags.join(',');

            setTags(textTags);
        }

    }, [post]);


    const { user } = useAuthValue();

    const { updateDocument, response } = useUpdateDocument('posts');

    const navigate = useNavigate();

    const handleSubmit = (e) => {

        e.preventDefault();

        setFormError("");

        // validate image URL
        try {

            new URL(image);

        } catch (err) {
            setFormError("A imagem precisa ser uma URL.");
        };

        // create tag array
        const tagsArray = tags.split(',').map((tag) => tag.trim().toLowerCase());

        // check all values
        if (!title || !image || !tags || !body) setFormError('Por favor, preencha todos os campos!');

        console.log(formError);

        if (formError) return false;

        const data = {
            title,
            image,
            body,
            tags: tagsArray,
            uid: user.uid,
            createdBy: user.displayName
        }

        updateDocument(id, data);

        // redirect to homepage

        navigate('/dashboard');

    };

    return (
        <div className={styles.edit_post}>
            {post && (
                <>
                    <h2>Editando post: {post.title}</h2>
                    <p>Altere os dados do post como desejar</p>
                    <form onSubmit={handleSubmit}>
                        <label>
                            <span>Título</span>
                            <input
                                type="text"
                                name="title"
                                placeholder='pense em um bom título'
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
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
                                onChange={(e) => setImage(e.target.value)}
                            />
                        </label>
                        <p
                            className={styles.preview_title}
                        >Preview da imagem atual</p>
                        <img
                            className={styles.image_preview}
                            src={post.image}
                            alt={post.title}
                        />
                        <label>
                            <span>Conteúdo</span>
                            <textarea
                                name="body"
                                placeholder='insira o conteúdo do post...'
                                required
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
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
                                onChange={(e) => setTags(e.target.value)}
                            />
                        </label>
                        {!response.loading && <button type='submit' className='btn'>Cadastrar</button>}
                        {response.loading && <button type='submit' className='btn' disabled>Aguarde...</button>}
                        {response.error && <p className='error'>{response.error}</p>}
                        {formError && <p className='error'>{formError}</p>}
                    </form>

                </>

            )}
        </div>
    );
};

export default EditPost;
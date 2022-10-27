//react
import { Link } from 'react-router-dom';

//styles
import styles from './PostsDetails.module.css';


const PostDetails = ({post}) => {
  return (
    <article className={styles.post_detail}>
        <img src={post.image} alt={post.title} />
        <h2>{post.title}</h2>
        <p className={styles.createdBy}>{post.createdBy}</p>
        <div className={styles.tags}>
            {post.tags.map((tag)=>(
                <p key={tag}><span>#</span>{tag}</p>
            ))}
        </div>
        <Link to={`/posts/${post.id}`} className='btn btn-outline'>Ler</Link>
    </article>
  )
}

export default PostDetails;
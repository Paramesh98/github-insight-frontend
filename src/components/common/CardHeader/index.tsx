import { Card } from 'react-bootstrap';
import styles from './styles.module.css';

type ICardHeader = { avatar: string; url: string; userName: string };

function CardHeader(props: ICardHeader) {
  const { avatar, url, userName } = props;
  return (
    <Card.Header className='bg-secondary text-white d-flex align-items-center'>
      <img src={avatar} alt='avatar' className={styles['card-header-image']} />
      <div>
        <a
          href={url}
          target='_blank'
          rel='noopener noreferrer'
          className='text-white text-decoration-none'
        >
          <h5 className='mb-0'>{userName}</h5>
        </a>
      </div>
    </Card.Header>
  );
}

export default CardHeader;

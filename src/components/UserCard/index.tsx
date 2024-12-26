import { Button, Card, Col, Container, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import {
  FaBook,
  FaBuilding,
  FaCalendarAlt,
  FaCodeBranch,
  FaLink,
  FaLocationArrow,
  FaUserFriends,
  FaUsers,
} from 'react-icons/fa';
import { User } from '../../types/User';
import UserDetailsTab from '../Tabs';
import styles from './styles.module.css';

function GithubUserCard({ user }: { user: User | null }) {
  if (!user) {
    return null;
  }

  const UserAvatar = () => {
    return (
      <div className='text-center'>
        <Card.Img
          variant='top'
          src={user.avatar_url}
          alt='User Avatar'
          className={styles['user-card-image']}
        />
        <h3 className='mt-3'>{user.name || user.login}</h3>
        <p>{user.type}</p>
      </div>
    );
  };
  const UserDetails = () => {
    return (
      <ListGroup className='mb-3'>
        <ListGroupItem>
          <FaBuilding className='me-2' /> <strong>Company:</strong> {user.company || 'Not Provided'}
        </ListGroupItem>
        <ListGroupItem>
          <FaLocationArrow className='me-2' /> <strong>Location:</strong>{' '}
          {user.location || 'Not Provided'}
        </ListGroupItem>
        <ListGroupItem>
          <FaLink className='me-2' /> <strong>Website:</strong>{' '}
          {user.blog ? (
            <a href={user.blog} target='_blank' rel='noreferrer'>
              {user.blog}
            </a>
          ) : (
            'Not Provided'
          )}
        </ListGroupItem>
      </ListGroup>
    );
  };

  const GithubDetails = () => {
    return (
      <Row>
        <Col sm={6} className='mb-3'>
          <ListGroupItem>
            <FaCodeBranch className='me-2' /> <strong>Public Repos:</strong> {user.public_repos}
          </ListGroupItem>
        </Col>
        <Col sm={6} className='mb-3'>
          <ListGroupItem>
            <FaUsers className='me-2' /> <strong>Followers:</strong> {user.followers}
          </ListGroupItem>
        </Col>
        <Col sm={6} className='mb-3'>
          <ListGroupItem>
            <FaUserFriends className='me-2' /> <strong>Following:</strong> {user.following}
          </ListGroupItem>
        </Col>
        <Col sm={6} className='mb-3'>
          <ListGroupItem>
            <FaBook className='me-2' /> <strong>Public Gists:</strong> {user.public_gists}
          </ListGroupItem>
        </Col>
      </Row>
    );
  };
  return (
    <Container>
      <Row>
        <Col md={12}>
          <Card className='shadow-lg border-0 mb-4' style={{ overflow: 'hidden' }}>
            <Row noGutters>
              <Col
                md={4}
                className='d-flex align-items-center justify-content-center p-4 bg-dark text-light'
              >
                <UserAvatar />
              </Col>
              <Col md={8}>
                <Card.Body>
                  <Card.Title>
                    {user.bio ? (
                      <span>{user.bio}</span>
                    ) : (
                      <span className='text-muted'>No bio available</span>
                    )}
                  </Card.Title>
                  <Button variant='primary' href={user?.html_url} target='_blank' className='mb-3'>
                    Visit GitHub Profile
                  </Button>

                  <UserDetails />
                  <GithubDetails />
                </Card.Body>
              </Col>
            </Row>

            <UserDetailsTab user={user} />

            <Card.Footer className='text-center'>
              <Container>
                <FaCalendarAlt className='me-2' />
                <small>Member since: {new Date(user.created_at).toLocaleDateString()}</small>
              </Container>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default GithubUserCard;

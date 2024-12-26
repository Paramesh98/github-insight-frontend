import { Button, Card, Col, Row } from 'react-bootstrap';
import { FaCalendarAlt, FaCodeBranch, FaGithub, FaLink, FaUsers } from 'react-icons/fa';
import { IOrganization } from '../../types/Organization';
import CardHeader from '../common/CardHeader';

export const Organization = ({ data }: { data: IOrganization }) => {
  const renderDetail = (icon: JSX.Element, label: string, value: string | number, url?: string) => {
    const renderValue = () => {
      if (url) {
        return (
          <a
            href={url}
            target='_blank'
            rel='noopener noreferrer'
            className='text-decoration-none text-primary'
          >
            {value}
          </a>
        );
      } else {
        return value;
      }
    };
    return (
      <Row className='mb-3'>
        <Col md={3} className='d-flex align-items-center'>
          {icon}
          <strong>{label}:</strong>
        </Col>
        <Col md={7}>{renderValue()}</Col>
      </Row>
    );
  };

  return (
    <Col md={12}>
      <Card className='mb-4 shadow-sm'>
        <CardHeader
          avatar={data?.avatar_url}
          url={`https://github.com/${data.login}`}
          userName={data?.login}
        />

        <Card.Body>
          {renderDetail(<FaGithub size={24} className='me-2 text-dark  ' />, 'GitHub ID', data.id)}
          {renderDetail(
            <FaLink size={24} className='me-2 text-dark' />,
            'Description',
            data.description || 'No description available'
          )}

          {renderDetail(
            <FaCodeBranch size={24} className='me-2 text-dark' />,
            'Repositories',
            'View Repositories',
            data.repos_url
          )}

          {renderDetail(
            <FaCalendarAlt size={24} className='me-2 text-dark' />,
            'Events',
            'View Events',
            data.events_url
          )}

          {renderDetail(
            <FaUsers size={24} className='me-2 text-dark' />,
            'Members',
            'View Members',
            data.members_url?.replace('{/member}', '') ?? '-'
          )}

          {renderDetail(
            <FaUsers size={24} className='me-2 text-dark' />,
            'Public Members',
            'View Public Members',
            data.public_members_url?.replace('{/member}', '') ?? '-'
          )}
        </Card.Body>
        <Card.Footer className='d-flex justify-content-between'>
          <Button variant='outline-primary' href={data.repos_url} target='_blank'>
            Explore Repositories
          </Button>
          <Button variant='primary' href={`https://github.com/${data.login}`} target='_blank'>
            Visit Organization
          </Button>
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default Organization;

import { Badge, Button, Card, Col, Row } from 'react-bootstrap';
import { FaCodeBranch, FaExclamationCircle, FaEye, FaStar } from 'react-icons/fa';
import { IRepository } from '../../types/Repository';
import CardHeader from '../common/CardHeader';

export const Repository = ({ data }: { data: IRepository }) => {
  const renderMetaInfo = (label: string, value: string): JSX.Element => {
    return (
      <Col md={12}>
        <strong>{label}:</strong> {value}
      </Col>
    );
  };

  const renderEngagementStats = (icon: JSX.Element, count: number, label: string) => {
    return (
      <Col xs={6} sm={3}>
        {icon} <strong>{count}</strong>
        <br />
        <small>{label}</small>
      </Col>
    );
  };
  const CardBody = () => {
    return (
      <Card.Body style={{ minHeight: '230px' }}>
        <h5 className='text-primary'>
          <a
            href={data.html_url}
            target='_blank'
            rel='noopener noreferrer'
            style={{ textDecoration: 'none' }}
          >
            {data.name}
          </a>
        </h5>
        {data.description && <Card.Text className='mb-2'>{data.description}</Card.Text>}
        <Row className='text-muted mb-2'>
          <Col md={8}>
            {renderMetaInfo('Size', `${data.size} KB`)}
            {!!data.language && renderMetaInfo('Language', data.language)}
            {renderMetaInfo('Last updated', new Date(data.updated_at).toLocaleDateString())}
          </Col>

          <Col md={4} className='text-md-end text-center'>
            {!!data.language && (
              <Badge bg='secondary' className='me-2'>
                {data.language}
              </Badge>
            )}
            {!!data.license && (
              <Badge bg='secondary' className='me-2'>
                License: {data?.license?.name}
              </Badge>
            )}
            <Badge bg='secondary'>Private: {data.private ? 'Yes' : 'No'}</Badge>
          </Col>
        </Row>
        <Row className='text-center'>
          {renderEngagementStats(
            <FaStar className='text-warning' />,
            data.stargazers_count,
            'Stars'
          )}

          {renderEngagementStats(
            <FaCodeBranch className='text-success' />,
            data.forks_count,
            'Forks'
          )}

          {renderEngagementStats(
            <FaExclamationCircle className='text-danger' />,
            data.open_issues_count,
            'Open Issues'
          )}

          {renderEngagementStats(<FaEye className='text-info' />, data.watchers_count, 'Watchers')}
        </Row>
      </Card.Body>
    );
  };
  return (
    <Col md={12}>
      <Card className='mb-4 shadow-sm border-0'>
        <CardHeader
          avatar={data.owner?.avatar_url}
          url={data?.owner?.html_url}
          userName={data.owner.login}
        />

        <CardBody />

        <Card.Footer className='text-end'>
          <Button variant='outline-primary' href={data?.html_url} target='_blank'>
            View Repository
          </Button>
        </Card.Footer>
      </Card>
    </Col>
  );
};

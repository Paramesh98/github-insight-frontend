import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import {
  FaCalendarAlt,
  FaComments,
  FaExternalLinkAlt,
  FaFileAlt,
  FaUnlockAlt,
} from 'react-icons/fa';
import { IGist } from '../../types/Gists';
import CardHeader from '../common/CardHeader';
import styles from './styles.module.css';

export const Gist = ({ data }: { data: IGist }) => {
  const formattedCreatedDate = new Date(data.created_at).toLocaleDateString();
  const formattedUpdatedDate = new Date(data.updated_at).toLocaleDateString();

  const renderMetaInfo = (icon: JSX.Element, label: string, value: string) => {
    return (
      <p className='d-flex  align-items-center'>
        {icon}
        <strong>{label}:</strong> {value}
      </p>
    );
  };

  return (
    <Col md={12}>
      <Card className={`mb-4 shadow-sm border-0 ${styles['gists-card']}`}>
        {!!data?.owner?.avatar_url && !!data?.owner?.html_url && data?.owner?.login && (
          <CardHeader
            avatar={data.owner.avatar_url}
            url={data.owner.html_url}
            userName={data.owner.login}
          />
        )}
        <Card.Body>
          <Row className='mb-3'>
            <Col md={8}>
              <Card.Title className='h5'>
                <FaFileAlt className='me-2 text-dark' />
                {data.description || 'No description provided'}
              </Card.Title>
              <p className='text-muted small'>
                Gist ID: <strong>{data.id}</strong>
              </p>
            </Col>
            <Col md={4} className='text-end'>
              <Button variant='primary' href={data?.html_url} target='_blank' className='btn-sm'>
                <FaExternalLinkAlt className='me-1' /> View Gist
              </Button>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              {renderMetaInfo(
                <FaCalendarAlt className='me-2 text-dark' />,
                'Created on',
                formattedCreatedDate
              )}
              {renderMetaInfo(
                <FaCalendarAlt className='me-2 text-dark' />,
                'Last Updated',
                formattedUpdatedDate
              )}
            </Col>
            <Col md={6}>
              {renderMetaInfo(
                <FaUnlockAlt className='me-2 text-dark' />,
                'Public',
                data.public ? 'Yes' : 'No'
              )}

              {renderMetaInfo(
                <FaComments className='me-2 text-dark' />,
                'Comments',
                data?.comments?.toString() ?? '-'
              )}
            </Col>
          </Row>

          <hr />
          <Files data={data} />
        </Card.Body>
      </Card>
    </Col>
  );
};

const Files = ({ data }: { data: IGist }) => {
  return (
    <>
      <h6 className='text-dark mb-3'>Files</h6>
      <ListGroup>
        {!!data?.files &&
          Object.keys(data.files).map((fileKey) => (
            <ListGroup.Item
              key={fileKey}
              className='d-flex justify-content-between align-items-center p-3'
            >
              <div>
                <h6 className='mb-1'>{data.files[fileKey].filename}</h6>
                <p className='text-muted small mb-0'>
                  {data.files[fileKey].language} | {data.files[fileKey].size} bytes
                </p>
              </div>
              <Button
                variant='outline-primary'
                size='sm'
                href={data.files[fileKey].raw_url}
                target='_blank'
              >
                <FaExternalLinkAlt className='me-1' /> View File
              </Button>
            </ListGroup.Item>
          ))}
      </ListGroup>
    </>
  );
};

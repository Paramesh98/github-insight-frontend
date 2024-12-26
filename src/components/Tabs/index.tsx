import { Col, Container, Row, Tab, Tabs } from 'react-bootstrap';
import { endPointForGists, endPointForOrgs, endPointForRepo } from '../../config/endpoints';
import { User } from '../../types/User';
import { Gist } from '../Gists';
import { Organization } from '../Organizations';
import { Repository } from '../Repositories';
import TabItem from './tabItem';

type ITab = {
  key: string;
  title: string;
  url: string;
};

function UserDetailsTab({ user }: { user: User }) {
  const { login } = user;

  const repoTab: ITab = {
    key: 'repositories',
    title: 'Repositories',
    url: endPointForRepo(login),
  };

  const gistTab: ITab = {
    key: 'gists',
    title: 'Gists',
    url: endPointForGists(login),
  };

  const orgTab: ITab = {
    key: 'organizations',
    title: 'Organizations',
    url: endPointForOrgs(login),
  };

  return (
    <Row>
      <Col md={12}>
        <Container className='mt-4'>
          <Tabs defaultActiveKey='repositories' id='user-detail-tabs' className='mb-3'>
            <Tab eventKey={repoTab.key} title={repoTab.title} key={repoTab.key}>
              {!!user && (
                <Row>
                  <TabItem endpoint={repoTab.url} Component={Repository} title={repoTab.title} />
                </Row>
              )}
            </Tab>
            <Tab eventKey={gistTab.key} title={gistTab.title} key={gistTab.key}>
              {!!user && (
                <Row>
                  <TabItem endpoint={gistTab.url} Component={Gist} title={gistTab.title} />
                </Row>
              )}
            </Tab>
            <Tab eventKey={orgTab.key} title={orgTab.title} key={orgTab.key}>
              {!!user && (
                <Row>
                  <TabItem endpoint={orgTab.url} Component={Organization} title={orgTab.title} />
                </Row>
              )}
            </Tab>
          </Tabs>
        </Container>
      </Col>
    </Row>
  );
}

export default UserDetailsTab;

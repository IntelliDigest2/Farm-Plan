import React from 'react';
import { Tabs, Tab, Container } from 'react-bootstrap';
import AddChild from './AddChild';
import ConnectSchool from './ConnectSchool';
import { PageWrap } from '../../../SubComponents/PageWrap';

const ManageChild = (props) => {
  return (
    <PageWrap goTo="/manage-child" header="Manage Child Data">
      <Container>
        <Tabs defaultActiveKey="connectSchool" id="manage-students-tabs">
          <Tab eventKey="connectSchool" title="Connect School">
            <ConnectSchool {...props} />
          </Tab>
          <Tab eventKey="AddChild" title="Add a Child">
            <AddChild {...props} />
          </Tab>
        </Tabs>
      </Container>
    </PageWrap>
  );
};

export default ManageChild;
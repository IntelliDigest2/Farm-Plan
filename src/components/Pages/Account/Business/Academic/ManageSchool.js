import React from 'react';
import { Tabs, Tab, Container } from 'react-bootstrap';
import CreateCode from './CreateCode';
import { PageWrap } from '../../../../SubComponents/PageWrap';
import AddClass from './AddClass';

const ManageSchool = (props) => {
  return (
    <PageWrap goTo="/manage-school" header="Manage School Data">
      <Container>
        <Tabs defaultActiveKey="CreateCode" id="manage-school-tabs">
          <Tab eventKey="CreateCode" title="Create Code to connect schools to parents">
            <CreateCode {...props} />
          </Tab>
          <Tab eventKey="AddClass" title="Add a Class to the school">
            <AddClass {...props} />
          </Tab>
        </Tabs>
      </Container>
    </PageWrap>
  );
};

export default ManageSchool;
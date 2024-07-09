import React, { useState } from "react";
import { PageWrap } from "../../../../SubComponents/PageWrap";
import { connect } from "react-redux";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const CreateClass = () => {
  const [className, setClassName] = useState("");
  const [subClassName, setSubClassName] = useState("");
  const [classes, setClasses] = useState([]);

  const handleClassSubmit = (e) => {
    e.preventDefault();
    if (className) {
      setClasses([...classes, { name: className, subclasses: [] }]);
      setClassName("");
    }
  };

  const handleSubClassSubmit = (e) => {
    e.preventDefault();
    if (subClassName && classes.length > 0) {
      const updatedClasses = [...classes];
      updatedClasses[updatedClasses.length - 1].subclasses.push(subClassName);
      setClasses(updatedClasses);
      setSubClassName("");
    }
  };
  return (
    <>
      <PageWrap goTo="/account" header="Create School Code">
        <div className="page-container">
          <div className="d-flex justify-content-center">
            <form onSubmit={handleClassSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <Box sx={{ mb: 2 }}>
                    <TextField
                      label="Class Name"
                      value={className}
                      onChange={(e) => setClassName(e.target.value)}
                      fullWidth
                      required
                      sx={{ mb: 2 }}
                    />
                    <Button type="submit" variant="contained" color="primary">
                      Add Class
                    </Button>
                  </Box>
                </div>
              </div>
            </form>
          </div>

          {classes.length > 0 && (
            <>
              <div className="d-flex justify-content-center">
                <form onSubmit={handleSubClassSubmit}>
                  <div className="row">
                    <div className="col-md-6">
                      <Box sx={{ mb: 2 }}>
                        <TextField
                          label="Sub Class Name"
                          value={subClassName}
                          onChange={(e) => setSubClassName(e.target.value)}
                          fullWidth
                          required
                          sx={{ mb: 2 }}
                        />
                        <Button
                          type="submit"
                          variant="contained"
                          color="secondary"
                        >
                          Add Sub Class
                        </Button>
                      </Box>
                    </div>
                  </div>
                </form>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <Typography variant="h6" component="h2" gutterBottom>
                    Classes List
                  </Typography>
                  <List>
                    {classes.map((classItem, index) => (
                      <ListItem key={index}>
                        <ListItemText
                          primary={classItem.name}
                          secondary={classItem.subclasses.join(", ")}
                        />
                      </ListItem>
                    ))}
                  </List>
                </div>
              </div>
            </>
          )}
        </div>
      </PageWrap>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps)(CreateClass);

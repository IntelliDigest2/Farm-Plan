import React, { useState, useEffect } from "react";
import "./SignUp.css";
import "../Account/UserAccount.css";
import "./Mob.css";
import { Select } from "../../SubComponents/Dropdown";
import { Title } from "./MobComponents";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { Form, Col, Button, Row } from "react-bootstrap";
import styled from "styled-components";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import EmailIcon from "@mui/icons-material/Email";
import EditLocationAltIcon from "@mui/icons-material/EditLocationAlt";
import HomeWorkIcon from "@mui/icons-material/HomeWork";

import { connect } from "react-redux";
import {
  Redirect,
  Link,
  useLocation,
  useHistory,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { updateSignup } from "../../../store/actions/authActions";

import { createMapData } from "../../../store/actions/dataActions";
import Geocode from "react-geocode";
import { countryNames, regionNames } from "../../lib/Countries";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { submitNotification } from "../../lib/Notifications";
import { AddButton } from "../../SubComponents/Button";
import ClearIcon from "@mui/icons-material/Clear";

//import TermsAndCons from "../../SubComponents/TermsAndConditions";

const SignUp = (props) => {
  //   const location = useLocation();
  // const history = useHistory();
  // const navigate = useNavigate();

  //Stage1
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Stage2
  const [town, setTown] = useState("");
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [buildingFunction, setBuildingFunction] = useState("");

  //Stage4
  const [restaurantName, setRestaurantName] = useState("");
  const [regulatoryBody, setRegulatoryBody] = useState("");
  const [regulatoryBodyID, setRegulatoryBodyID] = useState("");

  //Stage7
  const [companyName, setCompanyName] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");

  //Stage6
  const [IDType, setIDType] = useState("");
  const [IDNumber, setIDNumber] = useState("");
  const [image, setImage] = useState("");
  const [IDUrl, setUrl] = useState("");
  const [adminType, setAdminType] = useState("");

  //Stage5
  const [cuisine, setCuisine] = useState("");
  const [restaurantDescription, setRestaurantDescription] = useState("");
  const [restaurantAddress, setRestaurantAddress] = useState("");

  const [stage, setStage] = useState(2);
  const [userUID, setUserUID] = useState(null);

  const [errorNotification, setErrorNotification] = useState();

  //stage9
  //stage9
  const [certificateImg, setCertificateImg] = useState();
  const [certificateImgOne, setCertificateImgOne] = useState();
  const [certificateImgTwo, setCertificateImgTwo] = useState();
  const [certificateImgThree, setCertificateImgThree] = useState();

  const [IDImg, setIDImg] = useState();
  const [profImg, setProfImg] = useState();
  const [addressImg, setAddressImg] = useState();
  const [idDesc, setIDDesc] = useState("");
  const [certificateDescOne, setCertificateDescOne] = useState("");
  const [certificateDescTwo, setCertificateDescTwo] = useState("");
  const [certificateDescThree, setCertificateDescThree] = useState("");

  const [profDesc, setProfDesc] = useState("");
  const [addressDesc, setAddressDesc] = useState("");

  const [isFreelancer, setIsFreelancer] = useState("");

  const [imgPreview1, setImgPreview1] = useState();
  const [imgPreview2, setImgPreview2] = useState();
  const [imgPreview3, setImgPreview3] = useState();
  const [imgPreview4, setImgPreview4] = useState();
  const [imgPreview5, setImgPreview5] = useState();
  const [imgPreview6, setImgPreview6] = useState();

  const [consultant, setConsultant] = useState({
    urlLink: "",
    experience: "",
    expertise: "",
    services: [{ service: "", price: "" }],
    summary: "",
    isActive: true,
    images: [{ certificateImg: null }, { identificationImg: null }],
  });
  const [businessCert, setBusinessCert] = useState({
    images: [
      { certificateImgOne: null },
      { certificateImgTwo: null },
      { certificateImgThree: null },
      { identificationImg: null },
      { profImg: null },
      { addressImg: null },
    ],
  });

  useEffect(() => {
    if (!certificateImgOne) {
      setImgPreview1(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(certificateImgOne);
    setImgPreview1(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [certificateImgOne]);

  //This block of code is used to preview uploaded image
  useEffect(() => {
    if (!certificateImgTwo) {
      setImgPreview1(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(certificateImgTwo);
    setImgPreview2(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [certificateImgTwo]);

  //This block of code is used to preview uploaded image
  useEffect(() => {
    if (!certificateImgThree) {
      setImgPreview3(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(certificateImgThree);
    setImgPreview3(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [certificateImgThree]);

  useEffect(() => {
    if (!IDImg) {
      setImgPreview4(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(IDImg);
    setImgPreview4(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [IDImg]);

  useEffect(() => {
    if (!profImg) {
      setImgPreview5(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(profImg);
    setImgPreview5(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [profImg]);

  useEffect(() => {
    if (!addressImg) {
      setImgPreview6(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(addressImg);
    setImgPreview6(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [addressImg]);

  // THE useLocation and useHistory Hooks, ARE BOTH CAUSING THIS COMPONENT NOT TO RENDER,
  // DUE TO THE VERSION OF THE REACT-ROUTER-DOM PACKAGES,

  //   useEffect(() => {
  //     const stageFromUrl = searchParams.get("stage");
  //     console.log("uid", stageFromUrl);

  //     if (stageFromUrl) {
  //       setStage(parseInt(stageFromUrl, 10));
  //     }

  //     console.log("show stage", stage);
  //   }, [searchParams, setStage]);

  //   useEffect(() => {
  //     // This useEffect runs after the stage has been updated
  //     console.log("show stage", stage);
  //   }, [stage]);

  // useEffect(() => {
  //   const UIDFromUrl = searchParams.get("uid");
  //   console.log("uid", UIDFromUrl);

  //   if (UIDFromUrl) {
  //     // setUserUID is likely asynchronous
  //     setUserUID(UIDFromUrl);
  //   }
  // }, [searchParams, setUserUID]);

  // useEffect(() => {
  //   // This useEffect runs after the state has been updated
  //   console.log("show uid", userUID);
  // }, [userUID]);

  let certificateImg1 = certificateImgOne ? (
    <img
      className="consultant_previewImg"
      alt="certificate preview"
      height="120px"
      width="70%"
      src={imgPreview1}
    />
  ) : (
    ""
  );

  let certificateImg2 = certificateImgTwo ? (
    <img
      className="consultant_previewImg"
      alt="certificate preview"
      height="120px"
      width="70%"
      src={imgPreview2}
    />
  ) : (
    ""
  );

  let certificateImg3 = certificateImgThree ? (
    <img
      className="consultant_previewImg"
      alt="certificate preview"
      height="120px"
      width="70%"
      src={imgPreview3}
    />
  ) : (
    ""
  );

  let IDImg1 = IDImg ? (
    <img
      alt="certificate preview"
      height="120px"
      width="70%"
      src={imgPreview4}
    />
  ) : (
    ""
  );

  let profImg1 = profImg ? (
    <img
      alt="certificate preview"
      height="120px"
      width="70%"
      src={imgPreview5}
    />
  ) : (
    ""
  );

  let addressImg1 = addressImg ? (
    <img
      alt="certificate preview"
      height="120px"
      width="70%"
      src={imgPreview6}
    />
  ) : (
    ""
  );

  async function handleSubmit() {
    let data = {
      function: buildingFunction,
      city: town,
      country: country,
      region: region,
      mobile: mobile,
      restaurantName: restaurantName,
      companyName: companyName,
      companyDescription: companyDescription,
      regulatoryBody: regulatoryBody,
      regulatoryBodyID: regulatoryBodyID,
      IDType: IDType,
      IDNumber: IDNumber,
      IDUrl: IDUrl,
      cuisine: cuisine,
      restaurantDescription: restaurantDescription,
      restaurantAddress: restaurantAddress,
      type: "user",
      adminType: adminType,
      uid: props.auth.uid,
      isFreelancer: isFreelancer,
      schoolCode: null,
    };

    switch (data.function) {
      case "Consultant":
        data.consultantInfo = consultant;
        break;
      case "Restaurants":
      case "Hotels":
      case "Schools":
      case "Offices":
      case "Recreational Centers":
      case "Machinery/Supply":
      case "Material/Supply":
      case "Shop/Supermarket":
      case "Hospitals":
        data.certImg = businessCert;
        break;
      default:
      // Handle the default case if necessary
    }

    if (validation()) {
      try {
        await props.updateSignup(data, image);
        console.log("sign up data", data);
        setIsLoggedIn(true);
        // history.push("/account");
        // navigate("/account")
      } catch (error) {
        console.error("Signup failed", error);
      }
    } else {
      console.log("error");
    }
  }

  useEffect(() => {
    // console.log(
    // 	consultant.services,
    // 	`the consultant service change and this is the new value`
    // );
  }, [consultant.services]);

  let servicesInput = consultant.services.map((service, index) => {
    // console.log(value, `valuecheck`);
    return (
      <div key={`userService-${index}`}>
        <Row className="mb-3">
          <Col md={8}>
            <Form.Control
              as="select"
              className="form-control"
              type="select"
              // onChange={(e) => updateService(e, index)}
              onChange={(e) =>
                handleServiceChange(index, "service", e.target.value)
              }
              required
              value={service.service}
              aria-label="Default select example"
              // id={`service-${index}`}
            >
              <option>select service</option>
              <option value="Written feedback"> Written Feedback</option>
              <option value="Chat"> Chat</option>
              <option value="Phone call"> Phone call</option>
              <option value="Video call"> Video call</option>
              <option value="Visit to consultant"> Visit to consultant</option>
              <option value="Consultant visitation">
                {" "}
                Consultant visitation
              </option>
            </Form.Control>
          </Col>
          <Col md={3}>
            <div>
              {/* <span>$</span> */}
              <Form.Control
                type="number"
                aria-label="Amount (to the nearest dollar)"
                placeholder="price"
                required
                onChange={(e) =>
                  handleServiceChange(index, "price", e.target.value)
                }
                value={service.price}
              />
            </div>
          </Col>
          <Col md={1}>{showDeleteBtn(index)}</Col>
        </Row>
      </div>
    );
  });

  let addNewServiceBtn =
    consultant.services.length < 5 ? (
      <AddButton onClick={addService}></AddButton>
    ) : (
      ""
    );

  function addService() {
    if (consultant.services.length < 5) {
      let newArray = consultant.services.slice();
      newArray.splice(consultant.services.length, 0, {
        service: "",
        price: "",
      });

      setConsultant({ ...consultant, services: newArray });
    }

    return;
  }

  function deleteService(e, i) {
    e.preventDefault();
    // console.log(i, `this is the index of what should be deleted`);
    // let newArray = consultant.services.splice();
    let newArray = consultant.services.filter((item, index) => {
      return index !== i;
    });
    // console.log(newArray, `remaining arrays`);
    // newArray.splice(i, 1);

    // console.log(newArray, `remaining arrays`);
    setConsultant({
      ...consultant,
      ...consultant.services,
      services: newArray,
    });
  }

  function showDeleteBtn(index) {
    if (index > 0) {
      return (
        <button type="button" onClick={(e) => deleteService(e, index)}>
          <ClearIcon />
        </button>
      );
    }
    return "";
  }

  const handleServiceChange = (index, property, value) => {
    setConsultant((prevConsultant) => {
      const updatedServices = prevConsultant.services.map((service, i) =>
        i === index ? { ...service, [property]: value } : service
      );
      return { ...prevConsultant, services: updatedServices };
    });
  };

  //If error, send notification
  useEffect(() => {
    if (errorNotification) {
      submitNotification("Error", errorNotification);
      setErrorNotification();
    }
  }, [errorNotification]);

  //Form validation (Preferably change this to use bootstrap validation)
  const validation = () => {
    //no regex
    const no = /^[0-9\b]+$/;
    //Email regex
    const em =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    // var s1 =
    // 	firstName !== "" && lastName !== "" && email !== "" && password !== "";

    var s2 =
      town !== "" && country !== "" && region !== "" && buildingFunction !== "";

    // var s3 = em.test(email);

    // var s4 = !no.test(lastName) && !no.test(firstName);

    var s5 = !no.test(town);

    if (s2 && s5) {
      return true;
    } else {
      if (!s2) {
        setErrorNotification("Please enter a valid name, email, and password.");
      } else if (!s5) {
        setErrorNotification("Please enter a valid name.");
      } else {
        setErrorNotification("Please enter valid information.");
      }
      return false;
    }
  };

  const { authError } = props;
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //Setup geocode for getting coords when changing location
  useEffect(() => {
    Geocode.setApiKey("AIzaSyA7vyoyDlw8wHqveKrfkkeku_46bdR_aPk");
    Geocode.setLocationType("ROOFTOP");
  }, []);

  //make sure the user isn't already logged in and if they are a new account, createMapData document for them.
  useEffect(() => {
    if (props.auth.uid) {
      // setIsLoggedIn(true);
      if (town !== "" && country !== "") {
        Geocode.fromAddress(town + " " + country).then((response) => {
          var upload = {
            masterCollection: "mapData",
            uid: props.auth.uid,
            upload: {
              foodWasteWeight: 0,
              location: response.results[0].address_components[0].long_name,
              coords: [
                response.results[0].geometry.location.lat,
                response.results[0].geometry.location.lng,
              ],
            },
          };
          props.createMapData(upload);
        });
      }
    }
  }, [props.auth.uid]);

  //rerender every time the stage changes
  useEffect(() => {}, [stage]);

  // useEffect(() => {}, [consultant.services.]);

  const handleSelectedImage = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setCertificateImg(undefined);
      setIDImg(undefined);
      return;
    } else {
    }

    // I've kept this example simple by using the first image instead of multiple
    if (e.target.id === "img1") {
      let imageFile = e.target.files[0];
      setCertificateImg(imageFile);
      let newArray = consultant.images.slice();
      newArray.splice(0, 1, { certificateImg: imageFile });
      setConsultant({ ...consultant, images: newArray });
    } else {
      let imageFile = e.target.files[0];
      let newArray = consultant.images.slice();
      setIDImg(imageFile);
      newArray.splice(1, 1, { identificationImg: imageFile });
      setConsultant({ ...consultant, images: newArray });
    }
  };

  const handleSelectedImageOthers = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setCertificateImgOne(undefined);
      setCertificateImgTwo(undefined);
      setCertificateImgThree(undefined);
      setIDImg(undefined);
      profImg(undefined);
      addressImg(undefined);
      return;
    } else {
    }

    // I've kept this example simple by using the first image instead of multiple
    if (e.target.id === "img11") {
      let imageFile = e.target.files[0];
      setCertificateImgOne(imageFile);
      let newArray = businessCert.images.slice();
      newArray.splice(0, 1, {
        certificateImgOne: imageFile,
        description: certificateDescOne,
      });
      setBusinessCert({ ...businessCert, images: newArray });
    } else if (e.target.id === "img12") {
      let imageFile = e.target.files[0];
      let newArray = businessCert.images.slice();
      setCertificateImgTwo(imageFile);
      newArray.splice(1, 1, {
        certificateImgTwo: imageFile,
        description: certificateDescTwo,
      });
      setBusinessCert({ ...businessCert, images: newArray });
    } else if (e.target.id === "img13") {
      let imageFile = e.target.files[0];
      let newArray = businessCert.images.slice();
      setCertificateImgThree(imageFile);
      newArray.splice(2, 1, {
        certificateImgThree: imageFile,
        description: certificateDescThree,
      });
      setBusinessCert({ ...businessCert, images: newArray });
    } else if (e.target.id === "img2") {
      let imageFile = e.target.files[0];
      let newArray = businessCert.images.slice();
      setIDImg(imageFile);
      newArray.splice(3, 1, {
        identificationImg: imageFile,
        description: idDesc,
      });
      setBusinessCert({ ...businessCert, images: newArray });
    } else if (e.target.id === "img3") {
      let imageFile = e.target.files[0];
      let newArray = businessCert.images.slice();
      setProfImg(imageFile);
      newArray.splice(4, 1, { profImg: imageFile, description: profDesc });
      setBusinessCert({ ...businessCert, images: newArray });
    } else {
      let imageFile = e.target.files[0];
      let newArray = businessCert.images.slice();
      setAddressImg(imageFile);
      newArray.splice(5, 1, {
        addressImg: imageFile,
        description: addressDesc,
      });
      setBusinessCert({ ...businessCert, images: newArray });
    }

    // switch(e.target.id){
    // 	case "img1":
    // 		let imageFile = e.target.files[0];
    // 		console.log("image file 1", imageFile)
    // 		setCertificateImg(imageFile);
    // 		let newArray = businessCert.images.slice();
    // 		newArray.splice(0, 1, { certificateImg: imageFile });
    // 		setBusinessCert({ ...businessCert, images: newArray });
    // 	case "img2":
    // 		let imageFile = e.target.files[0];
    // 		console.log("image file 2", imageFile1)
    // 		let newArray = businessCert.images.slice();
    // 		setIDImg(imageFile);
    // 		newArray.splice(1, 1, { identificationImg: imageFile });
    // 		setBusinessCert({ ...businessCert, images: newArray });
    // 	case "img3":
    // 		let imageFile = e.target.files[0];
    // 		console.log("image file 3", imageFile1)
    // 		setProfImg(imageFile);
    // 		let newArray = businessCert.images.slice();
    // 		newArray.splice(0, 1, { ProfImg: imageFile });
    // 		setBusinessCert({ ...businessCert, images: newArray });
    // }
  };

  const handleImageNameChange = (e, imageId) => {
    const newName = e.target.value;

    if (imageId === "img111Name") {
      setCertificateDescOne(newName);
      console.log("cert", certificateDescOne);
    } else if (imageId === "img12Name") {
      setCertificateDescTwo(newName);
      console.log("cert", certificateDescTwo);
    } else if (imageId === "img13Name") {
      setCertificateDescThree(newName);
      console.log("cert", certificateDescThree);
    } else if (imageId === "img2Name") {
      setIDDesc(newName);
      console.log("cert", idDesc);
    } else if (imageId === "img3Name") {
      setProfDesc(newName);
      console.log("cert", profDesc);
    } else {
      setAddressDesc(newName);
      console.log("cert", addressDesc);
    }
  };

  if (isLoggedIn) {
    return <Redirect to="/account" />;
  }

  switch (stage) {
    default:
    case 1:
      return (
        <div className="signup-page">
          <div className="signup-content">
            <Title subtitle="Sign Up">
              <div className="signup-center subtitles">
                <p>First, create your account.</p>
              </div>
              <Stage1
                setFirstName={setFirstName}
                firstName={firstName}
                setLastName={setLastName}
                lastName={lastName}
                setMobile={setMobile}
                mobile={mobile}
                setEmail={setEmail}
                email={email}
                setPassword={setPassword}
                password={password}
                setStage={setStage}
              />
              <div className="signup-center subtitles row">
                <p>Already have an account? </p>
                <Link style={{ color: "#1C1569" }} to="/login">
                  {"  "}
                  LOG IN
                </Link>
              </div>
            </Title>
          </div>
        </div>
      );
    case 2:
      return (
        <div className="signup-page">
          <div className="signup-content">
            <Title subtitle="Complete Sign Up">
              <div className="signup-center subtitles">
                <p>Please enter details again!</p>
              </div>
              <Stage2
                mobile={mobile}
                setMobile={setMobile}
                setIDType={setIDType}
                IDType={IDType}
                setIDNumber={setIDNumber}
                IDNumber={IDNumber}
                IDUrl={IDUrl}
                setUrl={setUrl}
                setTown={setTown}
                town={town}
                setCountry={setCountry}
                country={country}
                setRegion={setRegion}
                region={region}
                setBuildingFunction={setBuildingFunction}
                buildingFunction={buildingFunction}
                setStage={setStage}
                countries={countryNames}
              />
            </Title>
          </div>
        </div>
      );
    case 3:
      return (
        <div className="signup-page">
          <div className="signup-content">
            <Title subtitle="Sign Up">
              <div className="signup-center subtitles">
                <h5>Confirmation</h5>
              </div>
              <Stage3
                setIDType={setIDType}
                IDType={IDType}
                setIDNumber={setIDNumber}
                IDNumber={IDNumber}
                IDUrl={IDUrl}
                setUrl={setUrl}
                setStage={setStage}
                firstName={firstName}
                lastName={lastName}
                mobile={mobile}
                email={email}
                town={town}
                region={region}
                country={country}
                buildingFunction={buildingFunction}
                setRestaurantName={setRestaurantName}
                restaurantName={restaurantName}
                companyName={companyName}
                setCuisine={setCuisine}
                cuisine={cuisine}
                setRegulatoryBody={setRegulatoryBody}
                regulatoryBody={regulatoryBody}
                setRegulatoryBodyID={setRegulatoryBodyID}
                regulatoryBodyID={regulatoryBodyID}
                setRestaurantDescription={setRestaurantDescription}
                restaurantDescription={restaurantDescription}
                restaurantAddress={restaurantAddress}
                setRestaurantAddress={setRestaurantAddress}
              />
              <div className="signup-center">
                <div className="auth-error">
                  {authError ? <p> {authError}</p> : null}
                </div>
                <div className="signup">
                  <Button
                    variant="default"
                    className="signup-confirm"
                    onClick={(e) => setStage(1)}
                  >
                    Change
                  </Button>
                </div>
                <div className="row">
                  <Button
                    style={{ fontWeight: "700" }}
                    variant="default"
                    className="signup-confirm"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSubmit();
                    }}
                  >
                    Confirm
                  </Button>
                </div>
              </div>
            </Title>
          </div>
        </div>
      );
    //Restaurant-specific
    case 4:
      return (
        <div className="signup-page">
          <div className="signup-content">
            <Title subtitle="Restaurant Details">
              <div className="signup-center subtitles"></div>
              <Stage4
                setIDType={setIDType}
                IDType={IDType}
                setIDNumber={setIDNumber}
                IDNumber={IDNumber}
                IDUrl={IDUrl}
                setUrl={setUrl}
                IDImg1={IDImg1}
                certificateImg1={certificateImg1}
                handleSelectedImageOthers={handleSelectedImageOthers}
                setBusinessCert={setBusinessCert}
                businessCert={businessCert}
                setTown={setTown}
                town={town}
                setCountry={setCountry}
                country={country}
                setRegion={setRegion}
                region={region}
                setBuildingFunction={setBuildingFunction}
                buildingFunction={buildingFunction}
                setStage={setStage}
                countries={countryNames}
                setRestaurantName={setRestaurantName}
                restaurantName={restaurantName}
                setRegulatoryBody={setRegulatoryBody}
                regulatoryBody={regulatoryBody}
                setRegulatoryBodyID={setRegulatoryBodyID}
                regulatoryBodyID={regulatoryBodyID}
              />
            </Title>
          </div>
        </div>
      );

    case 5:
      return (
        <div className="signup-page">
          <div className="signup-content">
            <Title subtitle="More Information about">
              <div className="signup-center subtitles"></div>
              <Stage5
                setIDType={setIDType}
                IDType={IDType}
                setIDNumber={setIDNumber}
                IDNumber={IDNumber}
                IDUrl={IDUrl}
                setUrl={setUrl}
                setTown={setTown}
                town={town}
                setCountry={setCountry}
                country={country}
                setRegion={setRegion}
                region={region}
                setBuildingFunction={setBuildingFunction}
                buildingFunction={buildingFunction}
                setStage={setStage}
                countries={countryNames}
                restaurantName={restaurantName}
                regulatoryBody={regulatoryBody}
                regulatoryBodyID={regulatoryBodyID}
                setCuisine={setCuisine}
                cuisine={cuisine}
                setRestaurantDescription={setRestaurantDescription}
                restaurantDescription={restaurantDescription}
                restaurantAddress={restaurantAddress}
                setRestaurantAddress={setRestaurantAddress}
              />
            </Title>
          </div>
        </div>
      );
    // Admin specific signup
    case 6:
      return (
        <div className="signup-page">
          <div className="signup-content">
            <Title subtitle="Sign Up">
              <div className="signup-center subtitles"></div>
              <Stage6
                setIDType={setIDType}
                setAdminType={setAdminType}
                adminType={adminType}
                IDType={IDType}
                setIDNumber={setIDNumber}
                IDNumber={IDNumber}
                IDUrl={IDUrl}
                setUrl={setUrl}
                image={image}
                setImage={setImage}
                setTown={setTown}
                town={town}
                setCountry={setCountry}
                country={country}
                setRegion={setRegion}
                region={region}
                setBuildingFunction={setBuildingFunction}
                buildingFunction={buildingFunction}
                setStage={setStage}
                countries={countryNames}
                restaurantName={restaurantName}
                regulatoryBody={regulatoryBody}
                regulatoryBodyID={regulatoryBodyID}
                setCuisine={setCuisine}
                cuisine={cuisine}
                setRestaurantDescription={setRestaurantDescription}
                restaurantDescription={restaurantDescription}
                restaurantAddress={restaurantAddress}
                setRestaurantAddress={setRestaurantAddress}
              />
            </Title>
          </div>
        </div>
      );
    // supplier/ machinery specific signup
    case 7:
      return (
        <div className="signup-page">
          <div className="signup-content">
            <Title subtitle="Complete Sign Up">
              <div className="signup-center subtitles"></div>
              <Stage7
                IDImg1={IDImg1}
                certificateImg1={certificateImg1}
                handleSelectedImageOthers={handleSelectedImageOthers}
                setBusinessCert={setBusinessCert}
                businessCert={businessCert}
                setTown={setTown}
                town={town}
                setCountry={setCountry}
                country={country}
                setRegion={setRegion}
                region={region}
                setBuildingFunction={setBuildingFunction}
                buildingFunction={buildingFunction}
                setStage={setStage}
                countries={countryNames}
                companyName={companyName}
                setCompanyName={setCompanyName}
                setCompanyDescription={setCompanyDescription}
                companyDescription={companyDescription}
              />
            </Title>
          </div>
        </div>
      );
    case 8:
      return (
        <div className="signup-page">
          <div className="signup-content">
            <Title subtitle="Complete Sign Up">
              <div className="signup-center subtitles"></div>
              <Stage8
                setConsultant={setConsultant}
                consultant={consultant}
                addNewServiceBtn={addNewServiceBtn}
                handleSelectedImage={handleSelectedImage}
                IDImg1={IDImg1}
                certificateImg1={certificateImg1}
                servicesInput={servicesInput}
                setTown={setTown}
                town={town}
                setCountry={setCountry}
                country={country}
                setRegion={setRegion}
                region={region}
                setBuildingFunction={setBuildingFunction}
                buildingFunction={buildingFunction}
                setStage={setStage}
                countries={countryNames}
              />
            </Title>
          </div>
        </div>
      );
    case 9:
      return (
        <div className="signup-page">
          <div className="signup-content">
            <Title subtitle="Sign Up">
              <div className="signup-center subtitles">
                <p>First, create your account.</p>
              </div>
              <Stage9
                setIDType={setIDType}
                IDType={IDType}
                setIDNumber={setIDNumber}
                IDNumber={IDNumber}
                IDUrl={IDUrl}
                setUrl={setUrl}
                IDImg1={IDImg1}
                certificateImg1={certificateImg1}
                certificateImg2={certificateImg2}
                certificateImg3={certificateImg3}
                profImg1={profImg1}
                addressImg1={addressImg1}
                setIDDesc={setIDDesc}
                setCertificateDescOne={setCertificateDescOne}
                setCertificateDescTwo={setCertificateDescTwo}
                setCertificateDescThree={setCertificateDescThree}
                setProfDesc={setProfDesc}
                setAddressDesc={setAddressDesc}
                handleSelectedImageOthers={handleSelectedImageOthers}
                handleImageNameChange={handleImageNameChange}
                setBusinessCert={setBusinessCert}
                businessCert={businessCert}
                setTown={setTown}
                town={town}
                setCountry={setCountry}
                country={country}
                setRegion={setRegion}
                region={region}
                setBuildingFunction={setBuildingFunction}
                buildingFunction={buildingFunction}
                setStage={setStage}
                countries={countryNames}
                setRestaurantName={setRestaurantName}
                restaurantName={restaurantName}
                setRegulatoryBody={setRegulatoryBody}
                regulatoryBody={regulatoryBody}
                setRegulatoryBodyID={setRegulatoryBodyID}
                regulatoryBodyID={regulatoryBodyID}
                isFreelancer={isFreelancer}
                setIsFreelancer={setIsFreelancer}
              />
            </Title>
          </div>
        </div>
      );
  }
};

const Stage1 = (props) => {
  return (
    <div>
      <FormStyle>
        <Form>
          <Form.Row>
            <Form.Group className="mb-3" as={Col}>
              <Form.Control
                type="text"
                placeholder="Enter name"
                defaultValue={props.firstName}
                required
                onChange={(e) => props.setFirstName(e.target.value)}
                className="signup-input placeholder-input"
              />
            </Form.Group>
            <Form.Group className="mb-3" as={Col}>
              <Form.Control
                type="text"
                placeholder="Enter surname"
                defaultValue={props.lastName}
                required
                onChange={(e) => props.setLastName(e.target.value)}
                className="signup-input placeholder-input"
              />
            </Form.Group>
          </Form.Row>

          <Form.Group className="mb-3">
            <PhoneInput value={props.mobile} onChange={props.setMobile} />
          </Form.Group>

          <Form.Group className="mb-3">
            {/* <Form.Label>Email address</Form.Label> */}
            <Form.Control
              type="email"
              placeholder="Enter email"
              defaultValue={props.email}
              required
              onChange={(e) => props.setEmail(e.target.value)}
              className="signup-input placeholder-input"
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              placeholder="Password"
              defaultValue={props.password}
              required
              onChange={(e) => props.setPassword(e.target.value)}
              className="signup-input placeholder-input"
            />
          </Form.Group>
          {/*Confirm Password*/}
          <div className="signup-center">
            <Button
              type="submit"
              variant="default"
              className="signup-confirm"
              disabled={
                props.firstName.trim() === "" ||
                props.lastName.trim() === "" ||
                props.email.trim() === "" ||
                props.password.trim() === ""
                  ? true
                  : false
              }
              onClick={(e) => {
                e.preventDefault();
                //Next Stage
                props.setStage(2);
              }}
            >
              Next
            </Button>
          </div>
        </Form>
      </FormStyle>
    </div>
  );
};

const Stage2 = (props) => {
  return (
    <div>
      <FormStyle>
        <Form>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Town"
              defaultValue={props.town}
              required
              className="signup-input placeholder-input"
              onChange={(e) => {
                props.setTown(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Select
              id="country"
              className="signup-input placeholder-input"
              function={(e) => {
                props.setCountry(e.target.value);
              }}
              value={props.country}
              placeholder="Please Select a Country"
              items={countryNames}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Select
              id="region"
              function={(e) => {
                props.setRegion(e.target.value);
              }}
              value={props.region}
              placeholder="Please Select a Region"
              items={regionNames}
              className="signup-input placeholder-input"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>What kind of account did you create?</Form.Label>
            <Select
              id="buildingFunction"
              function={(e) => {
                props.setBuildingFunction(e.target.value);
              }}
              value={props.buildingFunction}
              placeholder="Please Select your Account Type"
              items={[
                "Households",
                "Admin",
                "Personal",
                "Hospitals",
                "Schools",
                "Hotels",
                "Offices",
                "Restaurants",
                "Shop/Supermarket",
                "Machinery/Supply",
                "Material/Supply",
                "Farm",
                "Recreational Centers",
                "Consultant",
              ]}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <PhoneInput value={props.mobile} onChange={props.setMobile} />
          </Form.Group>
        </Form>
      </FormStyle>

      <div className="signup-center">
        <div className="row">
          <Button
            variant="default"
            className="signup-confirm"
            onClick={(e) => {
              e.preventDefault();
              //Previous Stage
              props.setStage(1);
            }}
          >
            Back
          </Button>

          <Button
            variant="default"
            className="signup-confirm"
            disabled={
              props.town.trim() === "" ||
              props.country.trim() === "" ||
              props.region.trim() === "" ||
              props.buildingFunction.trim() === ""
                ? true
                : false
            }
            onClick={(e) => {
              e.preventDefault();
              //Next Stage

              // switch(props.buildingFunction){
              //   // case "Restaurants":
              //   //   props.setStage(4) //stage for restaurant-specific questions
              //   case "Admin":
              //     props.setStage(4)
              //   default:
              //     props.setStage(3)
              // }

              switch (props.buildingFunction) {
                case "Restaurants":
                  props.setStage(4); // stage for restaurant-specific questions
                  break;
                case "Farm":
                  props.setStage(9); // stage for Farm-specific questions
                  break;
                case "Admin":
                  props.setStage(6); // stage for admin-specific questions
                  break;
                case "Machinery/Supply":
                case "Material/Supply":
                case "Hotels":
                case "Hospitals":
                case "Schools":
                case "Offices":
                case "Recreational Centers":
                case "Shop/Supermarket":
                  props.setStage(7); // stage for supplier/machinery-specific questions
                  break;
                case "Consultant":
                  props.setStage(8); // stage for consultant-specific questions
                  break;
                default:
                  props.setStage(3);
                  break;
              }
            }}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

//If account type == restaurant, this routes
const Stage4 = (props) => {
  return (
    <div>
      <FormStyle>
        <Form>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Restaurant name"
              defaultValue={props.restaurantName}
              required
              className="signup-input placeholder-input"
              onChange={(e) => {
                props.setRestaurantName(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              Please input the local authority which verifies your restuarant's
              health and safety status (e.g. the Food Standards Agency for
              Scotland).
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Regulatory body"
              defaultValue={props.regulatoryBody}
              required
              className="signup-input placeholder-input"
              onChange={(e) => {
                props.setRegulatoryBody(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              Please input the ID this regulatory body has provided you with.{" "}
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="ID"
              defaultValue={props.regulatoryBodyID}
              required
              className="signup-input placeholder-input"
              onChange={(e) => {
                props.setRegulatoryBodyID(e.target.value);
              }}
            />
          </Form.Group>

          {/* <Form.Group>
						<Form.Label style={{ width: "100%" }} className="form-label">
							Upload certificate of incorporation and Identity card.
							<span style={{ color: "red" }}>*</span>
						</Form.Label>
						<Row className="mb-3">
							<Col>
								Certificate
								<Form.Control
									id="img1"
									onChange={props.handleSelectedImageOthers}
									label="upload certificate"
									type="file"
									required
								/>
							</Col>
							<Col>
								Identification
								<Form.Control
									id="img2"
									onChange={props.handleSelectedImageOthers}
									className="mb-3"
									label="upload Identification document"
									type="file"
									required
								/>
							</Col>
						</Row>
						<Row className="mb-3">
							<Col>
								Cert with Professional body
								<Form.Control
									id="img2"
									// onChange={props.handleSelectedImageOthers}
									className="mb-3"
									label="upload Identification document"
									type="file"
									// required
								/>
							</Col>
						</Row>
						<Row>
							<Col>{props.certificateImg1}</Col>
							<Col>{props.IDImg1}</Col>
						</Row>
					</Form.Group> */}

          <div className="signup-center">
            <div className="row">
              <Button
                variant="default"
                className="signup-confirm"
                onClick={(e) => {
                  e.preventDefault();
                  //Previous Stage
                  props.setStage(2);
                }}
              >
                Back
              </Button>

              <Button
                variant="default"
                className="signup-confirm"
                disabled={
                  props.restaurantName.trim() === "" ||
                  props.regulatoryBody.trim() === "" ||
                  props.regulatoryBodyID.trim() === ""
                    ? true
                    : false
                }
                onClick={(e) => {
                  e.preventDefault();
                  //Next Stage

                  if (props.buildingFunction === "Restaurants") {
                    props.setStage(9); //stage for restaurant-specific questions
                  } else {
                    props.setStage(2);
                  }
                }}
              >
                Next
              </Button>
            </div>
          </div>
        </Form>
      </FormStyle>
    </div>
  );
};

// !!!TODO
const Stage8 = (props) => {
  return (
    <div>
      <FormStyle>
        <Form>
          <Form.Group className="form-group">
            <Form.Label className="form-label">
              Field of Expertise<span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              as="select"
              className="form-control"
              onChange={(e) =>
                props.setConsultant({
                  ...props.consultant,
                  expertise: e.target.value,
                })
              }
              required
            >
              <option>Select</option>
              <option>Dietician</option>
              <option>Nutrition</option>
              <option>Food and Beverage</option>
              <option>Food Safety</option>
              <option>Sustainable Food Packaging</option>
              <option>Aquaculture</option>
              <option>Horticulture</option>
              <option>Agro-Feed</option>
              <option>Account and Legal</option>
              <option>Supply Chain</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formBasicSummary" className="form-group">
            <Form.Label className="form-label">
              Brief Summary of your Expertise/Key areas in the Food System.
              <span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              type="text"
              onChange={(e) =>
                props.setConsultant({
                  ...props.consultant,
                  summary: e.target.value,
                })
              }
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="formBasicUrl" className="form-group">
            <Form.Label className="form-label">
              Website Url or (social media link)
              <span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              type="text"
              className="form-control"
              onChange={(e) =>
                props.setConsultant({
                  ...props.consultant,
                  urlLink: e.target.value,
                })
              }
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="formBasicText" className="form-group">
            <Form.Label className="form-label1">
              {" "}
              How Long have you been a consultant? (in years)
              <span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              type="number"
              className="form-control"
              onChange={(e) =>
                props.setConsultant({
                  ...props.consultant,
                  experience: e.target.value,
                })
              }
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="formBasicService" className="form-group">
            <Form.Label style={{ width: "100%" }}>
              Select service and charge (hourly rate)
              <span style={{ color: "red" }}>*</span>
            </Form.Label>
            <div style={{ marginBottom: "1rem", textAlign: "left" }}>
              {props.addNewServiceBtn}
            </div>

            {props.servicesInput}
          </Form.Group>

          <Form.Group>
            <Form.Label style={{ width: "100%" }} className="form-label">
              Upload consultancy certification and identity card.
              <span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Row className="mb-3">
              <Col>
                Certificate
                <Form.Control
                  id="img1"
                  onChange={props.handleSelectedImage}
                  label="upload certificate"
                  type="file"
                  required
                />
              </Col>
              <Col>
                Identification
                <Form.Control
                  id="img2"
                  onChange={props.handleSelectedImage}
                  className="mb-3"
                  label="upload Identification document"
                  type="file"
                  required
                />
              </Col>
            </Row>
            <Row>
              <Col>{props.certificateImg1}</Col>
              <Col>{props.IDImg1}</Col>
            </Row>
          </Form.Group>
          <Form.Group controlId="formBasicOptional" className="form-group">
            <Form.Label className="form-label">
              Any other thing you would like to share with us ?(optional)
            </Form.Label>
            <Form.Control as="textarea" rows={4} type="text"></Form.Control>
          </Form.Group>

          <div className="signup-center">
            <div className="row">
              <Button
                variant="default"
                className="signup-confirm"
                onClick={(e) => {
                  e.preventDefault();
                  //Previous Stage
                  props.setStage(2);
                }}
              >
                Back
              </Button>

              <Button
                variant="default"
                className="signup-confirm"
                disabled={
                  props.consultant.urlLink.trim() === "" ||
                  props.consultant.expertise.trim() === "" ||
                  props.consultant.summary.trim() === "" ||
                  props.consultant.images[0].certificateImg === null ||
                  props.consultant.images[1].identificationImg === null ||
                  props.consultant.services[0].service.trim() === "" ||
                  props.consultant.services[0].price.trim() === "" ||
                  props.buildingFunction.trim() === ""
                    ? true
                    : false
                }
                onClick={(e) => {
                  e.preventDefault();
                  //Next Stage

                  if (props.buildingFunction === "Consultant") {
                    props.setStage(3); //stage for restaurant-specific questions
                  } else {
                    props.setStage(3);
                  }
                }}
              >
                Next
              </Button>
            </div>
          </div>
        </Form>
      </FormStyle>
    </div>
  );
};

//If account type == restaurant, this routes
const Stage9 = (props) => {
  return (
    <div>
      <FormStyle>
        <Form>
          <Form.Group>
            <Form.Label style={{ width: "100%" }} className="form-label">
              Upload certificate of incorporation and Identity card.
              <span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Row className="mb-3">
              <Col>
                Identification
                <Form.Control
                  id="img2"
                  onChange={props.handleSelectedImageOthers}
                  className="mb-3 rounded-5"
                  label="upload Identification document"
                  type="file"
                  // required
                />
              </Col>
              <Col>
                <Form.Control
                  id="img2Name"
                  // onChange={(e) => {
                  // 	props.setIDDesc(e.target.value);
                  //   }}
                  onChange={(e) => props.handleImageNameChange(e, "img2Name")}
                  type="text"
                  placeholder="Enter description"
                  className="mt-4 rounded-2"
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                Incoporation
                <Form.Control
                  id="img11"
                  onChange={props.handleSelectedImageOthers}
                  label="upload certificate"
                  type="file"
                  className="mb-3" // Add margin-bottom class

                  // required
                />
                <Form.Control
                  id="img12"
                  onChange={props.handleSelectedImageOthers}
                  label="upload certificate"
                  type="file"
                  className="mb-3" // Add margin-bottom class

                  // required
                />
                <Form.Control
                  id="img13"
                  onChange={props.handleSelectedImageOthers}
                  label="upload certificate"
                  type="file"
                  className="mb-3" // Add margin-bottom class

                  // required
                />
              </Col>
              <Col>
                <Form.Control
                  id="img1Name"
                  // onChange={(e) => {
                  // 	props.setCertificateDesc(e.target.value);
                  //   }}
                  onChange={(e) => props.handleImageNameChange(e, "img1Name")}
                  type="text"
                  placeholder="Enter description"
                  className="mt-4"
                />
              </Col>
            </Row>
            <p>Cert with Professional body</p>
            <Row className="mb-3">
              <Col>
                <Form.Control
                  id="img3"
                  onChange={props.handleSelectedImageOthers}
                  className="mb-3"
                  label="upload Identification document"
                  type="file"
                  // required
                />
              </Col>
              <Col>
                <Form.Control
                  id="img3Name"
                  // onChange={(e) => {
                  // 	props.setProfDesc(e.target.value);
                  //   }}
                  onChange={(e) => props.handleImageNameChange(e, "img3Name")}
                  type="text"
                  placeholder="Enter description"
                />
              </Col>
            </Row>
            <p>
              Please upload a means of addrress verification like utility bills
            </p>

            <Row className="mb-3">
              <Col>
                <Form.Control
                  id="img4"
                  onChange={props.handleSelectedImageOthers}
                  className="mb-3"
                  label="upload Address verification document"
                  type="file"
                  // required
                />
              </Col>
              <Col>
                <Form.Control
                  id="img4Name"
                  onChange={(e) => props.handleImageNameChange(e, "img4Name")}
                  type="text"
                  placeholder="Enter description"
                />
              </Col>
            </Row>

            <Row style={{ marginBottom: "20px" }}>
              <Col>{props.IDImg1}</Col>
              <Col>{props.certificateImg1}</Col>
              <Col>{props.certificateImg2}</Col>
            </Row>
            <Row>
              <Col>{props.certificateImg3}</Col>
              <Col>{props.profImg1}</Col>
              <Col>{props.addressImg1}</Col>
            </Row>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Are you a Freelancer?</Form.Label>
            <Select
              id="freelancer"
              function={(e) => {
                // Convert the selected value to a boolean
                const isFreelancer = e.target.value === "Yes";
                props.setIsFreelancer(isFreelancer);
              }}
              value={props.isFreelancer ? "Yes" : "No"} // Convert boolean to string for the initial value
              placeholder="Select an option"
              items={["Yes", "No"]}
            />
          </Form.Group>

          <div className="signup-center">
            <div className="row">
              <Button
                variant="default"
                className="signup-confirm"
                onClick={(e) => {
                  e.preventDefault();
                  //Previous Stage
                  props.setStage(2);
                }}
              >
                Back
              </Button>

              <Button
                variant="default"
                className="signup-confirm"
                onClick={(e) => {
                  e.preventDefault();
                  //Next Stage

                  // if (props.buildingFunction == "Restaurants") {
                  // 	props.setStage(5); //stage for restaurant-specific questions
                  // } else {
                  // 	props.setStage(2);
                  // }

                  switch (props.buildingFunction) {
                    case "Restaurants":
                      props.setStage(5);
                      break;
                    case "Machinery/Supply":
                    case "Material/Supply":
                    case "Farm":
                    case "Hotels":
                    case "Hospitals":
                    case "Schools":
                    case "Offices":
                    case "Recreational Centers":
                    case "Shop/Supermarket":
                      props.setStage(3); // stage for supplier/machinery-specific questions
                      break;

                    default:
                      props.setStage(3);
                      break;
                  }
                }}
              >
                Next
              </Button>
            </div>
          </div>
        </Form>
      </FormStyle>
    </div>
  );
};

//If account type == admin, this routes
const Stage6 = (props) => {
  //upload immage to cloudinary
  // const uploadImage = () => {
  // 	const data = new FormData();
  // 	data.append("file", props.image);
  // 	data.append("upload_preset", "wft-app");
  // 	data.append("cloud_name", "dghm4xm7k");
  // 	data.append("folder", "restaurant_id");
  // 	fetch("https://api.cloudinary.com/v1_1/dghm4xm7k/image/upload", {
  // 		method: "post",
  // 		body: data,
  // 	}).then((result) => {
  // 		console.log(result);
  // 		// props.setUrl(result.data.url);
  // 	});
  // 	// .then(() => {
  // 	// 	if (props.buildingFunction == "Admin") {
  // 	// 		props.setStage(3); //confimation page
  // 	// 	} else {
  // 	// 		props.setStage(2);
  // 	// 	}
  // 	// })
  // 	// .catch((err) => console.log(err));
  // };

  return (
    <div>
      <FormStyle>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Admin Type</Form.Label>
            <Select
              id="buildingFunction"
              function={(e) => {
                props.setAdminType(e.target.value);
              }}
              value={props.adminType}
              placeholder="select admin type"
              items={["Purchase Admin"]}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Identification</Form.Label>
            <Select
              id="buildingFunction"
              function={(e) => {
                props.setIDType(e.target.value);
              }}
              value={props.IDType}
              placeholder="Please add Identity Type"
              items={[
                "Int'l Passport",
                "Voters Card",
                "Driving License",
                "National Identity Card",
              ]}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Enter Identification Number"
              defaultValue={props.setIDNumber}
              required
              onChange={(e) => {
                props.setIDNumber(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="file"
              placeholder="Upload Image"
              defaultValue={""}
              required
              onChange={(e) => {
                props.setImage(e.target.files[0]);
              }}
            />
          </Form.Group>

          <div className="signup-center">
            <div className="row">
              <Button
                variant="default"
                className="signup-confirm"
                onClick={(e) => {
                  e.preventDefault();
                  //Previous Stage
                  props.setStage(2);
                }}
              >
                Back
              </Button>

              <Button
                variant="default"
                className="signup-confirm"
                disabled={
                  props.adminType === "" ||
                  props.IDType === "" ||
                  props.IDNumber.trim() === "" ||
                  props.image === null
                    ? true
                    : false
                }
                onClick={(e) => {
                  e.preventDefault();

                  // uploadImage();
                  //Next Stage

                  if (props.buildingFunction == "Admin") {
                    props.setStage(3); //confimation page
                  } else {
                    props.setStage(2);
                  }
                }}
              >
                Next
              </Button>
            </div>
          </div>
        </Form>
      </FormStyle>
    </div>
  );
};

//If account type == admin, this routes
const Stage7 = (props) => {
  //upload immage to cloudinary
  // const uploadImage = async () => {
  //     const data = new FormData()
  //     data.append("file", props.image)
  //     data.append("upload_preset", "supplier")
  //     data.append("cloud_name","dghm4xm7k")
  //     await fetch("https://api.cloudinary.com/v1_1/dghm4xm7k/image/upload",{
  //       method:"post",
  //       body: data
  //     })
  //     .then(resp => resp.json())
  //     .then(data => {
  //     props.setUrl(data.url)
  //     })
  //     .catch(err => console.log(err))
  // }

  return (
    <div>
      <FormStyle>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Company Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Company name"
              defaultValue={props.companyName}
              required
              className="signup-input placeholder-input"
              onChange={(e) => {
                props.setCompanyName(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Company Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Describe what you do"
              defaultValue={props.companyDescription}
              required
              className="signup-input placeholder-input"
              onChange={(e) => {
                props.setCompanyDescription(e.target.value);
              }}
            />
          </Form.Group>

          <div className="signup-center">
            <div className="row">
              <Button
                variant="default"
                className="signup-confirm"
                onClick={(e) => {
                  e.preventDefault();
                  //Previous Stage
                  props.setStage(2);
                }}
              >
                Back
              </Button>

              <Button
                variant="default"
                className="signup-confirm"
                disabled={
                  props.companyName.trim() === "" ||
                  props.companyDescription.trim() === ""
                    ? true
                    : false
                }
                onClick={(e) => {
                  e.preventDefault();
                  //Next Stage

                  switch (props.buildingFunction) {
                    case "Machinery/Supply":
                    case "Material/Supply":
                    case "Hotels":
                    case "Hospitals":
                    case "Schools":
                    case "Offices":
                    case "Recreational Centers":
                    case "Shop/Supermarket":
                      props.setStage(9); // stage for supplier/machinery-specific questions
                      break;

                    default:
                      props.setStage(3);
                      break;
                  }
                }}
              >
                Next
              </Button>
            </div>
          </div>
        </Form>
      </FormStyle>
    </div>
  );
};

const Stage5 = (props) => {
  return (
    <div>
      <FormStyle>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>What cuisine does your kitchen offer?</Form.Label>
            <Form.Control
              type="text"
              placeholder="Cuisine"
              defaultValue={props.cuisine}
              required
              className="signup-input placeholder-input"
              onChange={(e) => {
                props.setCuisine(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              Please provide a brief description of your restaurant for
              customers to see.
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Description"
              defaultValue={props.restaurantDescription}
              required
              className="signup-input placeholder-input"
              onChange={(e) => {
                props.setRestaurantDescription(e.target.value);
              }}
            />

            <Form.Control
              type="text"
              placeholder="Where are you located?"
              defaultValue={props.restaurantAddress}
              required
              className="signup-input placeholder-input"
              onChange={(e) => {
                props.setRestaurantAddress(e.target.value);
              }}
            />
          </Form.Group>

          <div className="signup-center">
            <div className="row">
              <Button
                variant="default"
                className="signup-confirm"
                onClick={(e) => {
                  e.preventDefault();
                  //Previous Stage
                  props.setStage(4);
                }}
              >
                Back
              </Button>

              <Button
                variant="default"
                className="signup-confirm"
                disabled={
                  props.cuisine.trim() === "" ||
                  props.restaurantDescription.trim() === ""
                    ? true
                    : false
                }
                onClick={(e) => {
                  e.preventDefault();
                  //Next Stage

                  if (props.buildingFunction === "Restaurants") {
                    props.setStage(3); //stage for restaurant-specific questions
                  } else {
                    props.setStage(3);
                  }
                }}
              >
                Next
              </Button>
            </div>
          </div>
        </Form>
      </FormStyle>
    </div>
  );
};

const Stage3 = (props) => {
  switch (props.buildingFunction) {
    case "Restaurants":
      return (
        <div>
          <List>
            {/* <ListItem>
              <ListItemIcon>
                <DriveFileRenameOutlineIcon />
              </ListItemIcon>
              <ListItemText>
                {props.firstName} {props.lastName}
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <EmailIcon />
              </ListItemIcon>
              <ListItemText>{props.email}</ListItemText>
            </ListItem> */}
            <ListItem className="space-between">
              <ListItemIcon>
                <EditLocationAltIcon />
              </ListItemIcon>
              <ListItemText>
                {props.town}, {props.country}, {props.region}
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <HomeWorkIcon />
              </ListItemIcon>
              <ListItemText>{props.buildingFunction}</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <HomeWorkIcon />
              </ListItemIcon>
              <ListItemText>{props.restaurantName}</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <HomeWorkIcon />
              </ListItemIcon>
              <ListItemText>{props.regulatoryBody}</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <HomeWorkIcon />
              </ListItemIcon>
              <ListItemText>{props.regulatoryBodyID}</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <HomeWorkIcon />
              </ListItemIcon>
              <ListItemText>{props.cuisine}</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <HomeWorkIcon />
              </ListItemIcon>
              <ListItemText>{props.restaurantDescription}</ListItemText>
              <ListItemText>{props.restaurantAddress}</ListItemText>
            </ListItem>
          </List>
        </div>
      );
    case "Machinery/Supply":
    case "Material/Supply":
      return (
        <div>
          <List>
            <ListItem>
              <ListItemIcon>
                <DriveFileRenameOutlineIcon />
              </ListItemIcon>
              <ListItemText>
                {props.firstName} {props.lastName}
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <EmailIcon />
              </ListItemIcon>
              <ListItemText>{props.email}</ListItemText>
            </ListItem>
            <ListItem className="space-between">
              <ListItemIcon>
                <EditLocationAltIcon />
              </ListItemIcon>
              <ListItemText>
                {props.town}, {props.country}, {props.region}
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <HomeWorkIcon />
              </ListItemIcon>
              <ListItemText>{props.buildingFunction}</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <HomeWorkIcon />
              </ListItemIcon>
              <ListItemText>{props.companyName}</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <HomeWorkIcon />
              </ListItemIcon>
              <ListItemText>{props.companyDescription}</ListItemText>
            </ListItem>
          </List>
        </div>
      );
    case "Admin":
      return (
        <div>
          <List>
            <ListItem>
              <ListItemIcon>
                <DriveFileRenameOutlineIcon />
              </ListItemIcon>
              <ListItemText>
                {props.firstName} {props.lastName}
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <EmailIcon />
              </ListItemIcon>
              <ListItemText>{props.email}</ListItemText>
            </ListItem>
            <ListItem className="space-between">
              <ListItemIcon>
                <EditLocationAltIcon />
              </ListItemIcon>
              <ListItemText>
                {props.town}, {props.country}, {props.region}
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <HomeWorkIcon />
              </ListItemIcon>
              <ListItemText>{props.buildingFunction}</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <HomeWorkIcon />
              </ListItemIcon>
              <ListItemText>{props.IDType}</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <HomeWorkIcon />
              </ListItemIcon>
              <ListItemText>{props.IDNumber}</ListItemText>
            </ListItem>
          </List>
        </div>
      );
    default:
      return (
        <div>
          <List>
            <ListItem>
              <ListItemIcon>
                <DriveFileRenameOutlineIcon />
              </ListItemIcon>
              <ListItemText>
                {props.firstName} {props.lastName}
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <EmailIcon />
              </ListItemIcon>
              <ListItemText>{props.email}</ListItemText>
            </ListItem>
            <ListItem className="space-between">
              <ListItemIcon>
                <EditLocationAltIcon />
              </ListItemIcon>
              <ListItemText>
                {props.town}, {props.country}, {props.region}
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <HomeWorkIcon />
              </ListItemIcon>
              <ListItemText>{props.buildingFunction}</ListItemText>
            </ListItem>
          </List>
        </div>
      );
  }
};

const FormStyle = styled.div`
  form {
    width: 80%;
    margin: auto;
    padding: 10px;
  }

  input {
    border: 1px solid #62680a;
  }

  .btn-dark {
    background-color: #071850;
    color: whitesmoke;
    border: 1px solid #03091d;
    float: right;

    &:hover {
      background-color: #030d2b;
      border: 1px solid #03091d;
    }

    &:active {
      background-color: #030d2b;
      border: 1px solid #03091d;
    }
  }
`;

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateSignup: (newUser, image) => dispatch(updateSignup(newUser, image)), //r: cmd+click on signUp takes you to where the signUp event's props are defined
    createMapData: (mapdata) => dispatch(createMapData(mapdata)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

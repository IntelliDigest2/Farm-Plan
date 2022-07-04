// This file is not in use but don't delete yet
import React, { useEffect, useState } from "react";

import "../../../../SubComponents/Button.css";
import "../../UserAccount.css";

import { PageWrap } from "../../../../SubComponents/PageWrap";
import { ExistingFarmer } from "./ExistingFarm";
import { NewFarmer } from "./NewFarm";

import { Form, Button } from "react-bootstrap";

import { storage } from "../../../../../config/fbConfig";
import { becomeSeller } from "../../../../../store/actions/authActions";
import { connect } from "react-redux";

function SellerAuth(props) {
  const [form, setForm] = useState("start");
  const [error, setError] = useState("");
  const [validated, setValidated] = useState(false);

  const [member, setMember] = useState(true);
  const [organisation, setOrganisation] = useState("");
  const [registered, setRegistered] = useState(false);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);

  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [town, setTown] = useState("");
  const [postcode, setPostcode] = useState("");
  const [sector, setSector] = useState("Horticulture");

  const [subsector, setSubsector] = useState("select");
  const [foodItems, setFoodItems] = useState("");
  const [input, setInput] = useState("");
  const [quality, setQuality] = useState(false);
  const [qualityCert, setQualityCert] = useState("");
  const [infr, setInfr] = useState(false);
  const [practiceEffective, setPracticeEffective] = useState("");
  const [farmSize, setFarmSize] = useState(0);
  const [harvestFreq, setHarvestFreq] = useState("daily");
  const [harvestSize, setHarvestSize] = useState(0);
  const [growthTime, setGrowthTime] = useState(0);
  const [harvestUnit, setHarvestUnit] = useState("kg");

  const practices = [
    "Permaculture",
    "Biodynamic Farming",
    "Agroforestry",
    "Food forestry",
    "Poly culture",
    "Crop rotation",
    "Mulching/ground cover",
    "Growth of heirlooms",
    "Natural animal raising",
    "Natural pest management",
    "Natural fish harvest",
    "Others",
    "None",
  ];

  const processes = ["Washing", "Packaging", "None of the above"];

  const preservations = ["Refrigeration", "Freezing", "None of the above"];

  let subSectors;
  let productTypes;
  let nutrients;
  if (sector === "Horticulture") {
    subSectors = [
      "Nature fed vertical farm",
      "Nature fed soil farm",
      "Regenerative farming",
    ];
    productTypes = ["(List of crop, vegetable and fruit)"];
    nutrients = ["(Crop, Veg, Fruit nutrient growth requirement list)"];
  } else if (sector === "Livestock") {
    subSectors = ["Open grazing", "Regenerative farming"];
    productTypes = ["(List of animals/meat/dairy?)"];
    nutrients = ["(Livestock nutrient growth requirement list)"];
  } else if (sector === "Aquaculture") {
    subSectors = ["Nature fed ponds", "Natural Harvest"];
    productTypes = ["(List of fish/fishproduct?)"];
    nutrients = ["(Fish nutrient growth requirement list)"];
  } else if (sector === "Insect farm") {
    subSectors = ["Nature fed insect farms"];
    productTypes = ["(List of insect)"];
    nutrients = ["(Insect nutrient growth requirement list)"];
  } else {
    subSectors = [""];
    productTypes = [""];
    nutrients = [""];
  }

  const soilNutrients = ["(List of soil nutrients)"];

  //handles the state of items in the checklist
  const [practice, setPractice] = useState(
    new Array(practices.length).fill(false)
  );
  const [futurePractice, setFuturePractice] = useState(
    new Array(practices.length).fill(false)
  );
  const [processing, setProcessing] = useState(
    new Array(processes.length).fill(false)
  );
  const [preservation, setPreservation] = useState(
    new Array(preservations.length).fill(false)
  );
  const [productType, setProductType] = useState(
    new Array(productTypes.length).fill(false)
  );
  const [nutrient, setNutrient] = useState(
    new Array(nutrients.length).fill(false)
  );
  const [soilComp, setSoilComp] = useState(
    new Array(soilNutrients.length).fill(false)
  );

  const uploadFiles = (file) => {
    //uploads document to firebase storage and gives feedback to the user
    const uploadTask = storage.ref(`farmer-auth/${file.name}`).put(file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (error) => console.log(error),
      () => {
        storage
          .ref("farmer-auth")
          .child(file.name)
          .getDownloadURL()
          .then((url) => console.log(url));
      }
    );
  };

  const handleFile = (e) => {
    e.preventDefault();
    uploadFiles(file);
  };

  const HandleSubmit = (e) => {
    let data;
    if (registered) {
      data = {
        uid: props.auth.uid,

        info: {
          email: props.auth.email,

          membership: [member, organisation],
          registered: registered,
          certificate: `/farmer-auth/${file.name}`,

          location: [address1, address2, town, postcode],
          sector: sector,
          practice: practice,
          futurePractice: futurePractice,
          practiceEffective: practiceEffective,
          farmInput: input,
          foodItems: foodItems,
          harvestFreq: harvestFreq,
          harvestSize: harvestSize,
          harvestUnit: harvestUnit,
          processing: processing,
          preservation: preservation,
          quality: quality,
          qualityCert: qualityCert,
        },

        profile: { isSeller: true },
      };
      props.becomeSeller(data);
    } else {
      data = {
        uid: props.auth.uid,

        info: {
          email: props.auth.email,

          membership: [member, organisation],
          registered: registered,

          location: [address1, address2, town, postcode],
          sector: sector,
          subsector: subsector,
          infrastructure: infr,
          productType: productType,
          nutrient: nutrient,
          soilComp: soilComp,
          farmSize: farmSize,
          growthTime: growthTime,
          harvestFreq: harvestFreq,
          harvestSize: harvestSize,
          harvestUnit: harvestUnit,
        },

        profile: { isSeller: true },
      };

      props.becomeSeller(data);
    }
  };

  const validate = (e) => {
    const submit = e.currentTarget;
    if (!submit.checkValidity()) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      setValidated(true);
    }
  };

  const handleNext = (e) => {
    if (registered && validated) {
      setForm("existingFarmer");
    } else if (!registered && validated) {
      setForm("newFarmer");
    } else {
      e.preventDefault();
      setError("Please fill in all form fields.");
    }
  };

  //rerender every time form or sector switches
  useEffect(() => {
    setValidated(false);
  }, [form]);

  switch (form) {
    default:
    case "start":
      return (
        <PageWrap goTo="account" header="My Farm Plan" subtitle="Plan To Save">
          <div className="pts-info">
            <p style={{ fontSize: "1.1rem" }}>
              The "Plan To Save" Campaign is helping food consumers (Users) to
              appreciate the health and environmental impact of the food they
              eat through pre-planning, pre-ordering and monitoring of their
              food consumption while helping food producers (farmers) pre-plan
              and sustainably produce food to meet the consumption demand of the
              users. We will gather data in your local area and recommend what
              crops for you to grow based on demand. More importantly, you can
              sell directly to the consumers through our automated AI driven
              market places that matches demand from local consumers with supply
              from local farmers, boosting your sales revenue at no additional
              marketing cost. Join us today so that we can support you farm
              sustainably.
            </p>
          </div>
          <FormStart
            validated={validated}
            validate={validate}
            handleNext={handleNext}
            member={member}
            registered={registered}
            setMember={setMember}
            setOrganisation={setOrganisation}
            setRegistered={setRegistered}
            setFile={setFile}
            handleFile={handleFile}
            progress={progress}
            error={error}
          />
        </PageWrap>
      );
    case "existingFarmer":
      return (
        <PageWrap goTo="account" header="My Farm Plan" subtitle="Plan To Save">
          <ExistingFarmer
            HandleSubmit={HandleSubmit}
            setAddress1={setAddress1}
            setAddress2={setAddress2}
            setTown={setTown}
            setPostcode={setPostcode}
            sector={sector}
            setSector={setSector}
            practices={practices}
            practice={practice}
            setPractice={setPractice}
            futurePractice={futurePractice}
            setFuturePractice={setFuturePractice}
            setPracticeEffective={setPracticeEffective}
            setInput={setInput}
            foodItems={foodItems}
            setFoodItems={setFoodItems}
            harvestFreq={harvestFreq}
            setHarvestFreq={setHarvestFreq}
            setHarvestSize={setHarvestSize}
            harvestUnit={harvestUnit}
            setHarvestUnit={setHarvestUnit}
            processes={processes}
            processing={processing}
            setProcessing={setProcessing}
            preservations={preservations}
            preservation={preservation}
            setPreservation={setPreservation}
            quality={quality}
            setQuality={setQuality}
            setQualityCert={setQualityCert}
          />
        </PageWrap>
      );
    case "newFarmer":
      return (
        <PageWrap goTo="account" header="My Farm Plan" subtitle="Plan To Save">
          <NewFarmer
            HandleSubmit={HandleSubmit}
            setAddress1={setAddress1}
            setAddress2={setAddress2}
            setTown={setTown}
            setPostcode={setPostcode}
            sector={sector}
            setSector={setSector}
            subsector={subsector}
            setSubsector={setSubsector}
            subSectors={subSectors}
            infr={infr}
            setInfr={setInfr}
            productTypes={productTypes}
            productType={productType}
            setProductType={setProductType}
            nutrients={nutrients}
            nutrient={nutrient}
            setNutrient={setNutrient}
            soilNutrients={soilNutrients}
            soilComp={soilComp}
            setSoilComp={setSoilComp}
            farmSize={farmSize}
            setFarmSize={setFarmSize}
            growthTime={growthTime}
            setGrowthTime={setGrowthTime}
            harvestFreq={harvestFreq}
            setHarvestFreq={setHarvestFreq}
            setHarvestSize={setHarvestSize}
            harvestUnit={harvestUnit}
            setHarvestUnit={setHarvestUnit}
          />
        </PageWrap>
      );
  }
}

function FormStart(props) {
  return (
    <>
      <p>In order to start your farm plan, we need some information.</p>
      <Form noValidate validated={props.validated} onSubmit={props.handleNext}>
        <Form.Group>
          <Form.Label>
            Are you a member of a local food system association?
          </Form.Label>
          <Form.Check
            required
            type="radio"
            name="member"
            label="Yes"
            onClick={() => props.setMember(true)}
            onBlur={props.validate}
          />
          <Form.Check
            required
            type="radio"
            name="member"
            label="No"
            onClick={() => props.setMember(false)}
            onBlur={props.validate}
          />
          {props.member ? (
            <Form.Control
              required
              type="text"
              placeholder="Which local food system association?"
              id="organisation"
              onChange={(e) => props.setOrganisation(e.target.value)}
              onBlur={props.validate}
            />
          ) : (
            <p>
              We recommend joining an organisation such as the NFU or Soil
              Association.
            </p>
          )}
          <Form.Control.Feedback type="invalid">
            Please answer yes or no.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label>Are you an exsisting farmer and registered?</Form.Label>
          <Form.Check
            required
            type="radio"
            name="register"
            label="Yes"
            onClick={() => props.setRegistered(true)}
            onBlur={props.validate}
          />
          <Form.Check
            required
            type="radio"
            name="register"
            label="No"
            onClick={() => props.setRegistered(false)}
            onBlur={props.validate}
          />
          <Form.Control.Feedback type="invalid">
            Please answer yes or no.
          </Form.Control.Feedback>
        </Form.Group>

        {props.registered ? (
          <Form.Group>
            <Form.Label>
              If registered, please upload your certificate of incorporation.
            </Form.Label>
            <Form.Control
              required
              type="file"
              id="file"
              onInput={(e) => {
                props.setFile(e.target.files[0]);
              }}
            />
            <Button
              className="sub-btn green-btn"
              style={{ width: "20%" }}
              onClick={props.handleFile}
            >
              Submit
            </Button>
            <p style={{ color: "rgb(131, 131, 131)" }}>
              Uploaded {props.progress}%
            </p>
            <Form.Control.Feedback type="invalid">
              Please upload your certificate.
            </Form.Control.Feedback>
          </Form.Group>
        ) : null}

        <div className="auth-error">
          {props.error ? <p> {props.error}</p> : null}
        </div>
        <Button type="submit" className="sub-btn blue-btn">
          Next
        </Button>
      </Form>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError,
    profile: state.firebase.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    becomeSeller: (seller) => dispatch(becomeSeller(seller)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SellerAuth);

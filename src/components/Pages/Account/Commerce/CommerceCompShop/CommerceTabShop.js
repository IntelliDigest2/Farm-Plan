import React, { useState, useEffect } from "react";
import { Container, Dropdown, DropdownButton } from "react-bootstrap";

import "./CommerceTab.css";
import { PageWrapSupply } from "../../../../SubComponents/PageWrapSupply";
import LoadingScreen from "../../../../SubComponents/Loading/LoadingScreen";
import { Tab, Tabs } from "react-bootstrap";
import { useTranslation, Trans } from 'react-i18next';

import Buy from "./Buy.js";
import moment from "moment";
import Rent from "./Rent.js";

export default function CommerceTab() {

  const { i18n } = useTranslation();

  const { t } = useTranslation();


  const lngs = {
    en: { nativeName: 'English' },
    fr: { nativeName: 'French' },
    es: { nativeName: 'Spanish' },
    ar: { nativeName: 'Arabic' },
    zh: { nativeName: 'Chinese' },
    ru: { nativeName: 'Russian' }
  };

  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  });

  const [value, setValue] = useState(moment());

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <PageWrapSupply goTo="/account" header="Shop/Supermarket ">
      {/* <WaveLoader /> */}
      <div>          
              <>
               {/* <button key={lng} style={{ fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal', padding: '10px' }} type="submit" onClick={() => i18n.changeLanguage(lng)}>
                {lngs[lng].nativeName}
              </button> */}

              <DropdownButton id="dropdown-basic-button" title="Language" variant='success'>
                
                {Object.keys(lngs).map((lng) => (
                  <Dropdown.Item onSelect={() => i18n.changeLanguage(lng)}>{lngs[lng].nativeName}</Dropdown.Item>
                  ))}

              </DropdownButton>
              </>
             
          </div>

      <Tabs
        defaultActiveKey="buy"
        id="meal-plan-tabs"
        className="mb-3 mealtabs basic-title"
        fill
      >
        <Tab eventKey="buy" title="Buy Item" className="mealtab">
          <Buy />
        </Tab>
      </Tabs> 
 
      {/* input available locations for picking up */}
      {/* shopping list */}
    </PageWrapSupply>
  );
}

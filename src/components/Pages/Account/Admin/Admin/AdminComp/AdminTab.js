import React, { useState, useEffect } from "react";
import { Container, Dropdown, DropdownButton } from "react-bootstrap";

import "./AdminTab.css";
import { PageWrapAdmin } from "../../../../../SubComponents/PageWrapAdmin";
import LoadingScreen from "../../../../../SubComponents/Loading/LoadingScreen";
import { Tab, Tabs } from "react-bootstrap";
import { useTranslation, Trans } from 'react-i18next';

import Admin from "./Admin";
import moment from "moment";
import ChartProduce from "../../../Charts/ChartProduce";
import AdminRes from "./AdminRes";

export default function AdminTab() {

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
    <PageWrapAdmin goTo="/account" header="Admin">
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
        defaultActiveKey="calendar"
        id="meal-plan-tabs"
        className="mb-3 mealtabs basic-title"
        fill
      >
        <Tab eventKey="calendar" title="Users" className="mealtab">
          <Admin value={value} onChange={setValue} />
        </Tab>
        <Tab eventKey="recipes" title="Restaurant" className="mealtab">
          <AdminRes />
        </Tab>
      </Tabs> 

      {/* input available locations for picking up */}
      {/* shopping list */}
    </PageWrapAdmin>
  );
}

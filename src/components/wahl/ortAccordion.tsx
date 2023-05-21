import React, {useState} from 'react';
import classes from "../../pages/Wahl.module.scss";
import PicArrowUp from "../../assets/img/icons/caret-up.svg";
import PicArrowDown from "../../assets/img/icons/caret-down.svg";
import {IParty} from "../../interfaces/IParty";


interface OrtAccordionProps {
  party: IParty
}

const OrtAccordion = ({party}: OrtAccordionProps) => {

  const [isOrtExpanded, setIsOrtExpanded] = useState(false);


  return (
    <div className={classes.ortContainer}>
      <details onClick={() => setIsOrtExpanded(!isOrtExpanded)}>
        <summary className={classes.ortText}>
          <div><b>Ort:</b></div>
          <div className={classes.ortArrowContainer}>
            <div id="ort" className={classes.ort}>{party.ort}</div>
            <img src={isOrtExpanded ? PicArrowUp : PicArrowDown} alt="open"/>
          </div>
        </summary>
        <iframe
          width="290"
          height="250"
          title={party.ort}
          style={{border: 0}}
          loading="lazy"
          allowFullScreen
          src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_API_Key}&q=${party.ortCoordinates ? party.ortCoordinates : party.ort}`}>
        </iframe>
      </details>
    </div>
  );
};

export default OrtAccordion;

import React from "react";
import "./Footer.css"

function Footer({title,message}) {
  return (
    <div  className="footer-div">
      <footer>
      <i className="fa fa-copyright copy"> Copyright - IntelliDigest 2021</i>
      </footer>
    </div>
  );
}

export default Footer;

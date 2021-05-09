import React from "react";
import "./Footer.css"

// check new branch creation worked properly

function Footer({title,message}) {
  return (
    <div  className="footer-div">
      <footer>
      <i className="fa fa-copyright copy"> Copyright - IntelliDigest 2021</i>
      <a href="https://www.linkedin.com/company/intellidigest-limited/?viewAsMember=true" target="_blank" rel="noopener noreferrer">
        <i className="fa fa-linkedin social-media"></i>
      </a>
      <a href="https://www.facebook.com/IntelliDigest.ltd" target="_blank" rel="noopener noreferrer">
        <i className="fa fa-facebook social-media"></i>
      </a>
      <a href="https://twitter.com/IntelliDigest" target="_blank" rel="noopener noreferrer">
      <i className="fa fa-twitter social-media"></i>
      </a>
      </footer>
    </div>
  );
}

export default Footer;

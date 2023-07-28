import React from "react";
import "./Copyright.css";

export function Copyright() {
  return (
    <div>
      <i className="fa fa-copyright copy"> Copyright - IntelliDigest 2023</i>
      <a
        href="https://www.linkedin.com/company/intellidigest-limited/?viewAsMember=true"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fa fa-linkedin social-media"></i>
      </a>
      <a
        href="https://www.facebook.com/IntelliDigest.ltd"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fa fa-facebook social-media"></i>
      </a>
      <a
        href="https://twitter.com/IntelliDigest"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fa fa-twitter social-media"></i>
      </a>
    </div>
  );
}

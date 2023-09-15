import React from "react";

import "./footer.css";

function Footer() {
  return (
    <footer className="footer container-fluid text-center">
      <div className="social-links col">
        <a href="https://github.com/ExcuseMeImJack" target="_blank">
          <i className="fa-brands fa-github"></i> ExcuseMeImJack
        </a>
      </div>

      <div className="social-links col">
        <a href="https://www.linkedin.com/in/jack-roybal-719909264/" target="_blank">
          <i className="fa-brands fa-linkedin"></i> Jack Roybal
        </a>
      </div>
    </footer>
  );
}

export default Footer;

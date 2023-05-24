import React from "react";

import "./footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="social-links">
        <a href="https://github.com/ExcuseMeImJack">
          <i className="fa-brands fa-github"></i> ExcuseMeImJack
        </a>
      </div>

      <div className="social-links">
        <a href="https://www.linkedin.com/in/jack-roybal-719909264/">
          <i className="fa-brands fa-linkedin"></i> Jack Roybal
        </a>
      </div>
    </footer>
  );
}

export default Footer;

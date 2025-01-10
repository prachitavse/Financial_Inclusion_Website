import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h4>Use cases</h4>
        <p>UI design</p>
        <p>UX design</p>
        <p>Wireframing</p>
        <p>Diagramming</p>
      </div>
      <div className="footer-section">
        <h4>Explore</h4>
        <p>Design</p>
        <p>Prototyping</p>
        <p>Development features</p>
        <p>Design systems</p>
      </div>
      <div className="footer-section">
        <h4>Resources</h4>
        <p>Blog</p>
        <p>Best practices</p>
        <p>Colors</p>
        <p>Color wheel</p>
      </div>
    </footer>
  );
}

export default Footer;
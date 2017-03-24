"use strict";
import React from 'react';
import css from './Footer.css';
import projectInfo from '../../../package.json';


function Footer() {
    let version = projectInfo["version"];
    return (
        <div className={css.footer}>
            <span>Powered by Lausanne Genomic Technologies Facility (LGTF), University of Lausanne | v.{version}</span>
        </div>
  );
}

export default Footer;

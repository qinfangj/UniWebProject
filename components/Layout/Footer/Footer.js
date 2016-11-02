import React from 'react';
import { Link } from 'react-router';
import cx from 'classnames';
import css from './Footer.css';


function Footer() {
    return (
        <div className={css.footer}>
            <span>Powered by Lausanne Genomic Technologies Facility (LGTF), University of Lausanne</span>
        </div>
  );
}

export default Footer;

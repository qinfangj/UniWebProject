
import React from 'react';
import Link from '../../Link';
import cx from 'classnames';
import css from './Footer.css';


function Footer() {
    return (
        <div className={css.footer}>
            <span>Lausanne Genomic Technologies Facility (LGTF), University of Lausanne</span>

            <span className={cx(css.logo, css.unilLogo)}>
                <img src={require("../../../public/images/gtf_logo.png")} height="50px" />
            </span>

        </div>
  );
}

export default Footer;

"use strict";
import React from 'react';
import css from './bs.css';
import { ControlLabel } from 'react-bootstrap/lib';


/**
 * Make an input label with a red star when the field is required.
 */
export function makeLabel(label, required) {
    let star = required ? <span className={css.requiredStar}>*</span> : null;
    return label ? <ControlLabel>{label}{star}</ControlLabel> : null;
}


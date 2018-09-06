import React from 'react';
import PropTypes from 'prop-types';

const CountryItem = ({country}) => (
    <div>
        <span className={`flag-icon flag-icon-${country.iso2.toLowerCase()}`}></span>
        &nbsp;
        <span>{country.name}</span>

    </div>
);

CountryItem.propTypes = {
    country: PropTypes.object,
};

export default CountryItem;
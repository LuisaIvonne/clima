import React from 'react';
import PropTypes from 'prop-types';

const Error = ({mensaje}) => {
    return ( 
        <p className="error red darken-4">{mensaje}</p> 
    );
}

Error.prototype = {
    mensaje: PropTypes.string.isRequired
}
 
export default Error;
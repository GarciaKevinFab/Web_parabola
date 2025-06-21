import React from 'react';
import Katex from '@matejmazur/react-katex';
import 'katex/dist/katex.min.css';

const Preview = ({ formula }) => {
    return (
        <div className="preview">
            <Katex math={formula} errorColor="#ff3333" />
        </div>
    );
};

export default Preview;
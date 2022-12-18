import { memo } from 'react';
import { RotatingLines } from 'react-loader-spinner';

function RotatingLinesLoading({ width }) {
    return (
        <RotatingLines
            strokeColor="white"
            strokeWidth="5"
            animationDuration="0.75"
            width={width}
            visible={true}
        />
    );
}

export default memo(RotatingLinesLoading);

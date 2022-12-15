import { memo } from 'react';
import { RotatingLines } from 'react-loader-spinner';

function RotatingLinesLoading() {
    return (
        <RotatingLines
            strokeColor="white"
            strokeWidth="5"
            animationDuration="0.75"
            width="20"
            visible={true}
        />
    );
}

export default memo(RotatingLinesLoading);

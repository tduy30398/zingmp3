import { memo } from 'react';
import { Audio } from 'react-loader-spinner';

function AudioLoading({ height, width, color }) {
    return (
        <Audio
            height={height}
            width={width}
            color={color}
            ariaLabel="audio-loading"
            wrapperStyle={{}}
            wrapperClass="wrapper-class"
            visible={true}
        />
    );
}

export default memo(AudioLoading);

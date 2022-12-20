import { useRef, memo } from 'react';
import { Link } from 'react-router-dom';

function WeekChartSection({ data }) {
    const imgRef = useRef('');

    const handleMouseEnter = () => {
        imgRef.current.classList.remove('animate-scale-down-image');
        imgRef.current.classList.add('animate-scale-up-image');
    };

    const handleMouseLeave = () => {
        imgRef.current.classList.remove('animate-scale-up-image');
        imgRef.current.classList.add('animate-scale-down-image');
    };

    return (
        <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            key={data?.link}
            className="w-full overflow-hidden rounded-[5px]"
        >
            <Link to={data?.link} key={data?.link} className="flex-auto">
                <img ref={imgRef} src={data?.cover} alt="banner" className="object-cover w-full" />
            </Link>
        </div>
    );
}

export default memo(WeekChartSection);

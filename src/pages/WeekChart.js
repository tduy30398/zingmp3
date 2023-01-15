import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function WeekChart() {
    const { weekchartId } = useParams();
    useEffect(() => {}, [weekchartId]);
    return (
        <div className="w-full mt-[70px] h-[calc(100vh-90px)] overflow-x-hidden overflow-y-auto overflow-y-overlay scrollbar">
            WeekChart
        </div>
    );
}

export default WeekChart;

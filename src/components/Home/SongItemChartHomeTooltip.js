import { memo } from 'react';

function SongItemChartHomeTooltip({ data, totalScore }) {
    return (
        <div className="w-full select-none p-1 bg-[#4A90E2] gap-[10px] flex items-center justify-between rounded-[4px] bg-opacity-color-2 mb-[10px]">
            <div className="flex items-center">
                <div className="relative">
                    <img
                        className="w-[40px] h-[40px] rounded-[4px] object-cover mr-[10px]"
                        src={data?.thumbnail}
                        alt={data?.artistsNames}
                    />
                </div>
                <div className="flex flex-col justify-between">
                    <span className="text-text-color-2 mb-0.5 text-xs font-semibold">
                        {data?.title?.length > 10 ? `${data?.title?.slice(0, 10)}...` : data?.title}
                    </span>
                    <span className="text-text-color-1 text-[10px] font-medium">
                        {data?.artistsNames?.length > 10
                            ? `${data?.artistsNames?.slice(0, 10)}...`
                            : data?.artistsNames}
                    </span>
                </div>
            </div>
            <span className="font-bold text-xs mr-1">{`${Math.round(
                (data?.score * 100) / totalScore
            )}%`}</span>
        </div>
    );
}

export default memo(SongItemChartHomeTooltip);

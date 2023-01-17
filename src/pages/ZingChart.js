/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import _ from 'lodash';
// eslint-disable-next-line no-unused-vars
import { Chart } from 'chart.js/auto';

import bgChart from '../assets/images/imgs/bg-chart.jpg';
import bgChart2 from '../assets/images/imgs/bg-chart-2.jpg';
import { TabTitle } from '../utils';
import { SongItemChartHomeTooltip } from '../components/Home';
import { ZingChartSong, ZingChartSongSmall } from '../components/ZingChart';
import { RotatingLinesLoading } from '../assets/icons/dynamicIcons';
import { setSearchText } from '../redux/actions';

function ZingChart() {
    const { chart, rank, chartPageData, screenWidthRedux } = useSelector((state) => state.app);
    const [chartData, setChartData] = useState(null);
    const [tooltipState, setTooltipState] = useState({
        opacity: 0,
        top: 0,
        left: 0
    });
    const [tooltipData, setTooltipData] = useState(null);
    const [isShowFull, setIsShowFull] = useState(false);
    const [songData, setSongData] = useState([]);

    const chartRef = useRef('');

    const dispatch = useDispatch();

    useEffect(() => {
        TabTitle('#zingchart | Xem bài hát, album, MV đang hot nhất hiện tại');
        dispatch(setSearchText(''));
    }, []);

    useEffect(() => {
        const labels = chartPageData?.RTChart?.chart?.times
            ?.filter((time) => +time.hour % 2 === 0)
            ?.map((item) => `${item.hour}:00`);

        if (chartPageData?.RTChart?.chart?.items) {
            const datasets = [];
            for (let i = 0; i < 3; i++) {
                datasets.push({
                    data: chartPageData?.RTChart?.chart?.items[
                        Object.keys(chartPageData?.RTChart?.chart?.items)[i]
                    ]
                        ?.filter((item) => +item.hour % 2 === 0)
                        ?.map((item) => item.counter),
                    borderColor: i === 0 ? '#4A90E2' : i === 1 ? '#27BD9C' : '#E35050',
                    tension: 0.2,
                    borderWidth: 2,
                    pointBackgroundColor: 'white',
                    pointHoverRadius: 5,
                    pointBorderColor: i === 0 ? '#4A90E2' : i === 1 ? '#27BD9C' : '#E35050',
                    pointHoverBorderWidth: 2
                });
            }
            setChartData({ labels, datasets });
        }
    }, [chartPageData]);

    const options = {
        responsive: true,
        pointRadius: 0,
        maintainAspectRatio: false,
        scales: {
            y: {
                ticks: { color: 'transparent' },
                grid: { color: 'rgba(255,255,255,0.2)', drawTicks: false },
                min: chartPageData?.RTChart?.chart?.minScore,
                max: chartPageData?.RTChart?.chart?.maxScore,
                border: { dash: [3, 4] }
            },
            x: {
                ticks: { color: '#bfabbb' },
                grid: { color: 'transparent' }
            }
        },
        plugins: {
            legend: false,
            tooltip: {
                enabled: false,
                external: ({ tooltip }) => {
                    if (!chartRef || !chartRef.current) {
                        return;
                    }
                    if (tooltip.opacity === 0) {
                        if (tooltipState.opacity !== 0) {
                            setTooltipState((prev) => ({
                                ...prev,
                                opacity: 0
                            }));
                        }
                        return;
                    }

                    const counters = [];
                    for (let i = 0; i < 3; i++) {
                        counters.push({
                            data: chartPageData?.RTChart?.chart?.items[
                                Object.keys(chartPageData?.RTChart?.chart?.items)[i]
                            ]
                                ?.filter((item) => +item.hour % 2 === 0)
                                ?.map((item) => item.counter),
                            encodeId: Object.keys(chartPageData?.RTChart?.chart?.items)[i]
                        });
                    }

                    const result = counters.find((item) =>
                        item.data.some(
                            (number) => number === +tooltip.body[0]?.lines[0]?.replace(',', '')
                        )
                    );
                    setTooltipData(result.encodeId);
                    const newTooltipData = {
                        opacity: 1,
                        left: tooltip.caretX,
                        top: tooltip.caretY
                    };

                    if (!_.isEqual(tooltipState, newTooltipData)) {
                        setTooltipState(newTooltipData);
                    }
                }
            }
        },
        hover: {
            mode: 'dataset',
            intersect: false
        }
    };

    useEffect(() => {
        if (isShowFull) {
            setSongData(chartPageData?.RTChart?.items);
        } else {
            setSongData(chartPageData?.RTChart?.items.filter((item, index) => index < 10));
        }
    }, [isShowFull, chartPageData]);

    const hoverSong = rank?.find((item) => item?.encodeId === tooltipData);

    return (
        <div className="w-full relative h-[calc(100vh-90px)] overflow-x-hidden overflow-y-auto overflow-y-overlay scrollbar">
            {!chartPageData && (
                <div className="absolute left-0 right-0 top-0 bottom-0 bg-primary-color-2 z-20">
                    <div className="absolute top-[50%] right-[50%] translate-x-[50%] translate-y-[-50%]">
                        <RotatingLinesLoading height={'50'} width={'50'} color={'#FFFFFF'} />
                    </div>
                </div>
            )}
            <div className="relative">
                <img src={bgChart} alt="cover" className="object-cover w-full h-[500px]" />
                <div className="absolute top-0 bottom-0 left-0 right-0 bg-[rgba(65,22,54,0.92)]"></div>
                <div
                    className={`absolute top-0 bottom-2/3 flex items-end ${
                        screenWidthRedux > 1022
                            ? 'left-[59px] right-[59px]'
                            : 'left-[29px] right-[29px]'
                    }`}
                >
                    <h3 className="mb-5 text-[40px] font-extrabold">#zingchart</h3>
                </div>
                <div className="absolute top-1/3 bottom-0 left-0 right-[10px] md:right-[59px] bg-gradient-to-t from-[rgb(65,22,54)] to-transparent">
                    <div className="w-full h-[90%] relative">
                        {chartData && <Line data={chartData} options={options} ref={chartRef} />}
                        <div
                            className="tooltip"
                            style={{
                                top: tooltipState.top,
                                left: tooltipState.left,
                                opacity: tooltipState.opacity,
                                position: 'absolute'
                            }}
                        >
                            <SongItemChartHomeTooltip
                                data={hoverSong}
                                totalScore={chart?.totalScore}
                                key={hoverSong?.encodeId}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className={`pb-[30px] ${screenWidthRedux > 1022 ? 'px-[59px]' : 'px-[29px]'}`}>
                <div className="mb-5">
                    {songData?.map((item, index) => (
                        <ZingChartSong songInfo={item} key={item?.encodeId} index={index} />
                    ))}
                </div>
                <div className="w-full flex items-center justify-center">
                    {isShowFull ? (
                        <button
                            onClick={() => setIsShowFull((prev) => !prev)}
                            className="py-2 px-[25px] border-[1px] border-[#ffffff] rounded-full font-medium text-sm hover:bg-opacity-color-4"
                        >
                            Ẩn bớt
                        </button>
                    ) : (
                        <button
                            onClick={() => setIsShowFull((prev) => !prev)}
                            className="py-2 px-[25px] border-[1px] border-[#ffffff] rounded-full font-medium text-sm hover:bg-opacity-color-4"
                        >
                            Xem top 100
                        </button>
                    )}
                </div>
            </div>
            {chartPageData && (
                <div className="relative mt-7">
                    <img
                        src={bgChart2}
                        alt="cover"
                        className={`object-cover w-full ${
                            screenWidthRedux > 1224 ? 'h-[615px]' : 'h-[1620px]'
                        }`}
                    />
                    <div className="absolute top-0 bottom-0 left-0 right-0 bg-[rgba(139,57,121,0.9)]"></div>
                    <div className="absolute top-0 bottom-0 left-[59px] right-[59px]">
                        <div className="mt-8 mb-5">
                            <Link
                                to={chartPageData?.weekChart?.vn?.link}
                                className="text-[40px] font-bold cursor-pointer"
                            >
                                Bảng Xếp Hạng Tuần
                            </Link>
                        </div>
                        <div
                            className={`justify-between gap-7 ${
                                screenWidthRedux > 1224 ? 'flex' : 'flex-col'
                            }`}
                        >
                            <div
                                className={`flex flex-col py-5 px-[10px] bg-[hsla(0,0%,100%,0.05)] rounded-2xl ${
                                    screenWidthRedux > 1224 ? 'w-1/3' : 'w-full mb-8'
                                }`}
                            >
                                <div className="w-full pl-10 pb-[10px]">
                                    <Link
                                        className="text-2xl font-bold hover:text-text-color-primary-1"
                                        to={chartPageData?.weekChart?.vn?.link}
                                    >
                                        Việt Nam
                                    </Link>
                                </div>
                                <div className="mb-[15px]">
                                    {chartPageData?.weekChart?.vn?.items
                                        ?.filter((item, index) => index < 5)
                                        ?.map((item, index) => (
                                            <ZingChartSongSmall
                                                songInfo={item}
                                                key={item?.encodeId}
                                                index={index}
                                            />
                                        ))}
                                </div>
                                <div className="w-full flex items-center justify-center">
                                    <Link
                                        to={chartPageData?.weekChart?.vn?.link}
                                        className="py-[6px] px-[25px] border-[1px] border-[#ffffff] rounded-full font-medium text-sm hover:bg-opacity-color-4"
                                    >
                                        Xem tất cả
                                    </Link>
                                </div>
                            </div>
                            <div
                                className={`flex flex-col py-5 px-[10px] bg-[hsla(0,0%,100%,0.05)] rounded-2xl ${
                                    screenWidthRedux > 1224 ? 'w-1/3' : 'w-full mb-8'
                                }`}
                            >
                                <div className="w-full pl-10 pb-[10px]">
                                    <Link
                                        className="text-2xl font-bold hover:text-text-color-primary-1"
                                        to={chartPageData?.weekChart?.us?.link}
                                    >
                                        US-UK
                                    </Link>
                                </div>
                                <div className="mb-[15px]">
                                    {chartPageData?.weekChart?.us?.items
                                        ?.filter((item, index) => index < 5)
                                        ?.map((item, index) => (
                                            <ZingChartSongSmall
                                                songInfo={item}
                                                key={item?.encodeId}
                                                index={index}
                                            />
                                        ))}
                                </div>
                                <div className="w-full flex items-center justify-center">
                                    <Link
                                        to={chartPageData?.weekChart?.us?.link}
                                        className="py-[6px] px-[25px] border-[1px] border-[#ffffff] rounded-full font-medium text-sm hover:bg-opacity-color-4"
                                    >
                                        Xem tất cả
                                    </Link>
                                </div>
                            </div>
                            <div
                                className={`flex flex-col py-5 px-[10px] bg-[hsla(0,0%,100%,0.05)] rounded-2xl ${
                                    screenWidthRedux > 1224 ? 'w-1/3' : 'w-full mb-8'
                                }`}
                            >
                                <div className="w-full pl-10 pb-[10px]">
                                    <Link
                                        className="text-2xl font-bold hover:text-text-color-primary-1"
                                        to={chartPageData?.weekChart?.korea?.link}
                                    >
                                        K-Pop
                                    </Link>
                                </div>
                                <div className="mb-[15px]">
                                    {chartPageData?.weekChart?.korea?.items
                                        ?.filter((item, index) => index < 5)
                                        ?.map((item, index) => (
                                            <ZingChartSongSmall
                                                songInfo={item}
                                                key={item?.encodeId}
                                                index={index}
                                            />
                                        ))}
                                </div>
                                <div className="w-full flex items-center justify-center">
                                    <Link
                                        to={chartPageData?.weekChart?.korea?.link}
                                        className="py-[6px] px-[25px] border-[1px] border-[#ffffff] rounded-full font-medium text-sm hover:bg-opacity-color-4"
                                    >
                                        Xem tất cả
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ZingChart;

import { memo, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Line } from 'react-chartjs-2';
import _ from 'lodash';
// eslint-disable-next-line no-unused-vars
import { Chart } from 'chart.js/auto';

import paths from '../../configs';
import bgChart from '../../assets/images/imgs/bg-chart.jpg';
import { SongItemChartHome, SongItemChartHomeTooltip } from '../Home';

function ChartSection() {
    const { chart, rank } = useSelector((state) => state.app);
    const [chartData, setChartData] = useState(null);
    const [tooltipState, setTooltipState] = useState({
        opacity: 0,
        top: 0,
        left: 0,
    });
    const [tooltipData, setTooltipData] = useState(null);

    const chartRef = useRef('');

    const options = {
        responsive: true,
        // pointRadius là điểm tại các mốc trên chart
        pointRadius: 0,
        // Duy trì tỉ lệ width / height khi resize
        maintainAspectRatio: false,
        scales: {
            y: {
                // màu của các mốc tại trục tung
                ticks: { color: 'transparent' },
                // các đường kẻ vuông góc từ trục tung
                grid: { color: 'rgba(255,255,255,0.2)', drawTicks: false },
                // set điểm min cho đồ thị
                min: chart?.minScore,
                // set điểm max cho đồ thị
                max: chart?.maxScore,
                // dash là nét đứt, 3 là width của mỗi nét, 4 là khoảng cách giữa 2 nét
                border: { dash: [3, 4] },
            },
            x: {
                // màu của các mốc tại trục hoành
                ticks: { color: '#bfabbb' },
                // các đường kẻ vuông góc từ trục hoành
                grid: { color: 'transparent' },
            },
        },
        plugins: {
            // legend là chú thích của biểu đồ
            legend: false,
            tooltip: {
                // khi hover chuột vào điểm point ko còn hiện ra tọa độ x và y như default nữa
                enabled: false,
                external: ({ tooltip }) => {
                    // Chỉ tạo tooltip khi chart tồn tại
                    if (!chartRef || !chartRef.current) {
                        return;
                    }
                    // Nếu hover chuột ra khỏi điểm point thì sẽ set lại opacity của tooltipState
                    // là 0 (ẩn đi) và return
                    if (tooltip.opacity === 0) {
                        if (tooltipState.opacity !== 0) {
                            setTooltipState((prev) => ({
                                ...prev,
                                opacity: 0,
                            }));
                        }
                        return;
                    }

                    // lấy ra counter gồm encodeId và data của các line
                    const counters = [];
                    for (let i = 0; i < 3; i++) {
                        counters.push({
                            data: chart?.items[Object.keys(chart?.items)[i]]
                                ?.filter((item) => +item.hour % 2 === 0)
                                ?.map((item) => item.counter),
                            encodeId: Object.keys(chart?.items)[i],
                        });
                    }

                    // khi hover chuột vào, tìm xem trong counters vừa rồi có chứa thằng nào khớp
                    // với tọa độ vừa hover trên line của chart (tooltip.body[0].lines[0]). Nếu khớp
                    // thì set tooltipData là encodeId của thằng đó
                    const result = counters.find((item) =>
                        item.data.some(
                            (number) => number === +tooltip.body[0]?.lines[0]?.replace(',', ''),
                        ),
                    );
                    setTooltipData(result.encodeId);
                    const newTooltipData = {
                        opacity: 1,
                        left: tooltip.caretX,
                        top: tooltip.caretY,
                    };

                    // Nếu tooltipState của lần trước đó và newTooltipData khác nhau thì update
                    // lại tooltipState
                    if (!_.isEqual(tooltipState, newTooltipData)) {
                        setTooltipState(newTooltipData);
                    }
                },
            },
        },
        hover: {
            // dataset mode: tìm những item có cùng dataset. Nếu intersect: true, item đầu tiên
            // đc sử dụng để quyết định index của data. Nếu intersect: true, item gần nhất được
            // sử dụng để quyết định index của data
            mode: 'dataset',
            // Nếu là true, phải hover chuột vào điểm point thì mới hiện ra hover, còn nếu false thì
            // chỉ cần hover vào chart thì nó sẽ hiện ra hover của line gần chuột nhất
            intersect: false,
        },
    };

    // từ rank ban đầu lấy từ redux, tìm ra thằng item có encodeId khớp với thằng vừa được hover
    // vào (tooltipData)
    const hoverSong = rank?.find((item) => item?.encodeId === tooltipData);

    useEffect(() => {
        // labels và datasets là các key được định nghĩa sẵn tên, xem tại:
        // https://www.chartjs.org/docs/latest/getting-started/

        // labels là array gồm các mốc của trục hoành (đường nằm ngang)
        const labels = chart?.times
            ?.filter((time) => +time.hour % 2 === 0)
            ?.map((item) => `${item.hour}:00`);

        // datasets là các giá trị để vẽ lên đồ thị
        if (chart?.items) {
            const datasets = [];
            // lặp qua 3 lần để lấy ra 3 đồ thị
            for (let i = 0; i < 3; i++) {
                datasets.push({
                    // Object.keys(chart?.items) là array gồm các key của chart?.items
                    data: chart?.items[Object.keys(chart?.items)[i]]
                        ?.filter((item) => +item.hour % 2 === 0)
                        ?.map((item) => item.counter),
                    borderColor: i === 0 ? '#4A90E2' : i === 1 ? '#27BD9C' : '#E35050',
                    // tension là độ cong tại các điểm nối trên đồ thị
                    tension: 0.2,
                    // width của các line trên chart
                    borderWidth: 2,
                    // màu của các điểm point (điểm nối)
                    pointBackgroundColor: 'white',
                    // kích thước của các điểm point khi hover vào
                    pointHoverRadius: 5,
                    // màu của border của các điểm point (điểm nối)
                    pointBorderColor: i === 0 ? '#4A90E2' : i === 1 ? '#27BD9C' : '#E35050',
                    // width của border của các điểm point khi hover
                    pointHoverBorderWidth: 2,
                });
            }
            setChartData({ labels, datasets });
        }
    }, [chart]);

    return (
        <div className="w-full overflow-hidden px-[59px] mt-12 max-h-[415px] relative">
            <img
                src={bgChart}
                alt="bgChart"
                className="w-full object-cover rounded-lg max-h-[415px]"
            />
            <div className="absolute top-0 bottom-0 left-[59px] right-[59px] rounded-lg bg-[rgba(172,52,147,0.9)]"></div>
            <div className="absolute top-0 bottom-0 left-[59px] right-[59px] p-5 flex flex-col">
                <Link
                    to={paths.ZINGCHART}
                    className="text-[28px] font-bold hover:text-text-color-primary-1 mb-5"
                >
                    #zingchart
                </Link>
                <div className="flex mx-[-14px] h-full">
                    <div className="flex flex-col">
                        <div className="flex-44 px-[14px] flex flex-col">
                            {rank
                                ?.filter((item, index) => index < 3)
                                ?.map((item, index) => (
                                    <SongItemChartHome
                                        data={item}
                                        totalScore={chart?.totalScore}
                                        index={index}
                                        key={item?.encodeId}
                                    />
                                ))}
                        </div>
                        <div className="flex justify-center">
                            <Link
                                to={paths.ZINGCHART}
                                className="py-[5px] px-[25px] outline-none text-center rounded-full border leading-[14px] text-text-color-2 text-sm hover:bg-[hsla(0,0%,100%,.1)]"
                            >
                                Xem thêm
                            </Link>
                        </div>
                    </div>
                    <div className="flex-66 px-[14px] h-[90%] relative">
                        {chartData && <Line data={chartData} options={options} ref={chartRef} />}
                        <div
                            className="tooltip"
                            style={{
                                top: tooltipState.top,
                                left: tooltipState.left,
                                opacity: tooltipState.opacity,
                                position: 'absolute',
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
        </div>
    );
}

export default memo(ChartSection);

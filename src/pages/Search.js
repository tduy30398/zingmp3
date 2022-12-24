import { RotatingLinesLoading } from '../assets/icons/dynamicIcons';
import { useSelector } from 'react-redux';

function Search({ children }) {
    const { isSearching } = useSelector((state) => state.music);
    return (
        <div className="w-full relative flex flex-col h-[calc(100vh-160px)] overflow-x-hidden overflow-y-auto overflow-y-overlay scrollbar">
            {isSearching && (
                <div className="absolute left-0 right-0 top-0 bottom-0 bg-primary-color-2 z-20">
                    <div className="absolute top-[50%] right-[50%] translate-x-[50%] translate-y-[-50%]">
                        <RotatingLinesLoading height={'50'} width={'50'} color={'#FFFFFF'} />
                    </div>
                </div>
            )}
            <div className="border-b-[1px] border-border-color-1 mb-7">
                <div className="w-full flex h-[50px] px-[59px] items-center">
                    <h3 className="pr-5 text-2xl font-bold border-r-[1px] border-border-color-1">
                        Kết Quả Tìm Kiếm
                    </h3>
                    <ul className="flex items-center">
                        <li className="mx-5 py-[15px] cursor-pointer text-sm font-medium text-text-color-1 hover:text-text-color-2">
                            TẤT CẢ
                        </li>
                        <li className="mx-5 py-[15px] cursor-pointer text-sm font-medium text-text-color-1 hover:text-text-color-2">
                            BÀI HÁT
                        </li>
                        <li className="mx-5 py-[15px] cursor-pointer text-sm font-medium text-text-color-1 hover:text-text-color-2">
                            PLAYLIST/ALBUM
                        </li>
                        <li className="mx-5 py-[15px] cursor-pointer text-sm font-medium text-text-color-1 hover:text-text-color-2">
                            NGHỆ SĨ/OA
                        </li>
                        <li className="mx-5 py-[15px] cursor-pointer text-sm font-medium text-text-color-1 hover:text-text-color-2">
                            MV
                        </li>
                    </ul>
                </div>
            </div>
            <div>{children}</div>
        </div>
    );
}

export default Search;

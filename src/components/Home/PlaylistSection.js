import { PlaylistSectionItem } from '../Home';

function PlaylistSection({ content }) {
    return (
        <div className="w-full overflow-hidden px-[59px] mt-12">
            <div className="flex flex-col">
                <div className="flex justify-between">
                    {content.title && (
                        <h3 className="text-text-color-2 mb-5 text-left font-bold text-xl capitalize">
                            {content.title}
                        </h3>
                    )}
                </div>
                <div className="flex justify-between items-start gap-7">
                    {content?.items
                        ?.filter((item, index) => index < 5)
                        ?.map((item) => (
                            <PlaylistSectionItem key={item.encodeId} item={item} />
                        ))}
                </div>
            </div>
        </div>
    );
}

export default PlaylistSection;

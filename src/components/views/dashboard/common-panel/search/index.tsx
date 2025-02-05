import { Search as Searchs } from 'lucide-react';

const Search = () => {
    return (
        <div className="flex  items-center bg-[white] py-1 px-3 rounded-md">
                <div className="flex w-5 items-center justify-center">
                    <Searchs />
                </div>
                <input
                    type="text"
                    className="pl-2 w-full outline-none"
                    placeholder="Search hare"
                />
            </div>
    );
}

export default Search
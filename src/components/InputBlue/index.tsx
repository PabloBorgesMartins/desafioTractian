import React from 'react';
import {
    HeaderInput,
    Button,
    SearchButton
} from './styles'
import { FaSearch } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';

interface NoDataProps {
    search: string;
    setSearch(val: string): void;
    searchUnit(val: string): void;
}

const InputBlue: React.FC<NoDataProps> = ({ search, setSearch, searchUnit, children }) => {
    return (
        <HeaderInput>
            <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Buscar"
            />
            {
                search && <Button>
                    <MdCancel onClick={() => searchUnit("")} size={15} />
                </Button>
            }
            <SearchButton>
                <FaSearch onClick={() => searchUnit(search)} size={15} />
            </SearchButton>
        </HeaderInput>
    );
}

export default InputBlue;
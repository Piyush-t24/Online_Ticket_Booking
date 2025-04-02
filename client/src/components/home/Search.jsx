import React from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const Search = () => {
    const navigate = useNavigate();

    const loadOptions = (inputValue) => {
        return fetch(
            `${import.meta.env.VITE_HOST}/venue/get-entries?name=${inputValue}`,
        )
            .then(response => response.json())
            .then(response => {
                return {
                    options: response.map((museum) => ({
                        label: (
                            <div className="flex items-center">
                                <img
                                    src={museum.imgLink}
                                    alt={museum.name}
                                    className="w-8 h-8 rounded-full mr-2"
                                />
                                <div className="flex flex-col items-start text-start">
                                    <div className="font-bold">{museum.name}</div>
                                    <div className="text-sm text-gray-500">{museum.location.address}</div>
                                </div>

                            </div>
                        ),
                        details: museum,
                    })),
                };
            });
    };

    const handleOnChange = async (searchData) => {
        if (searchData && searchData.details) {
            const { _id, name } = searchData.details;
            navigate(`/museum?name=${encodeURIComponent(name)}&id=${encodeURIComponent(_id)}`);
        }
    };

    return (
        <AsyncPaginate
            placeholder={(
                <div className="flex items-center justify-center text-gray-500 my-2">
                    <FaSearch className="mr-2" />
                    Search for city
                </div>
            )}
            debounceTimeout={300}
            value={""}
            onChange={handleOnChange}
            loadOptions={loadOptions}
            styles={{
                control: (provided) => ({
                    ...provided,
                    borderRadius: '16px',
                    backgroundColor: '#f9fafb',
                    borderColor: '#d1d5db',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    '&:hover': {
                        borderColor: '#4f46e5',
                        cursor: 'text',
                    },
                }),
                menuList: (provided) => ({
                    ...provided,
                    maxHeight: 190,
                    scrollbarWidth: 'none', // For Firefox
                    msOverflowStyle: 'none', // For Internet Explorer and Edge
                    '&::-webkit-scrollbar': {
                        display: 'none', // For Chrome, Safari, and Opera
                    },
                }),
                option: (provided) => ({
                    ...provided,
                    cursor: 'pointer',
                }),
            }}
        />
    );
};

export default Search;

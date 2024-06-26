import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CheckIcon = () => {
  return (
    <svg
      className="h-8 w-8 text-green-500"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {" "}
      <path stroke="none" d="M0 0h24v24H0z" /> <circle cx="12" cy="12" r="9" /> <path d="M9 12l2 2l4 -4" />
    </svg>
  );
};

const CancelIcon = () => {
  return (
    <svg className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
};

const EyeIcon = () => {
  return (
    <svg className="h-4 w-4 text-black dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
      />
    </svg>
  );
};

const AnimeSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(5);

  const searchAnime = async (query) => {
    if (!query) return setResults([]);
    setLoading(true);

    try {
      const response = await axios.get(`https://api.jikan.moe/v4/anime?q=${query}`);
      setResults(response.data.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   if (query) searchAnime(query);
  // }, [query]);

  return (
    <div className="mx-10 my-10 w-fit">
      <div className="w-full flex justify-between items-center">
        <p className="text-black text-[20px] font-medium">Anime Search</p>
        <div className=" bg-white">
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative mt-1">
            <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") searchAnime(e.target.value);
              }}
              type="text"
              id="table-search"
              className="block px-[34px] py-[12px] pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for items"
            />
          </div>
        </div>
      </div>

      <div className="relative overflow-x-auto">
        <table className="mt-3 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 w-[25%]">
                Title
              </th>
              <th scope="col" className="px-6 py-3 w-[3%]">
                members
              </th>
              <th scope="col" className="px-6 py-3">
                synopsis
              </th>
              <th scope="col" className="px-6 py-3 w-[2%]">
                status
              </th>
              <th scope="col" className="px-6 py-3 w-[2%]">
                action
              </th>
            </tr>
          </thead>
          <tbody>
            {results.slice(page * Number(count), page * Number(count) + Number(count)).map((item, index) => {
              return (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                    <p className="line-clamp-1 overflow-ellipsis">{item.title}</p>
                  </th>
                  <td className="px-6 py-4 dark:text-white ">{item.members}</td>
                  <td className="px-6 py-4">
                    <p className="line-clamp-2 overflow-ellipsis dark:text-white">{item.synopsis}</p>
                  </td>
                  <td className="px-6 py-4 dark:text-white">{item.approved ? <CheckIcon /> : <CancelIcon />}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => navigate(`/anime/${item.mal_id}`)}
                      className="text-gray-900 flex bg-white border items-center gap-2 border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    >
                      <EyeIcon />
                      View
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {!loading && results.length < 1 && (
          <div className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 h-40 flex justify-center items-center">
            <p className=" italic dark:text-white">No Data</p>
          </div>
        )}
        {loading && (
          <div className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 h-40 flex justify-center items-center">
            <p className=" italic dark:text-white">loading....</p>
          </div>
        )}
        <div className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 p-5 flex items-center justify-between">
          <select
            id="countries"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-30 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => setCount(e.target.value)}
            defaultValue={count}
          >
            <option value="5">Show 5 Anime</option>
            <option value="10">Show 10 Anime</option>
            <option value={results.length}>Show All</option>
          </select>
          <nav aria-label="Page navigation example">
            <ul className="flex items-center -space-x-px h-10 text-base">
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span className="sr-only">Previous</span>
                  <svg className="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                  </svg>
                </a>
              </li>
              {Array.from({ length: Math.ceil(results.length / count) }, (_, index) => {
                return (
                  <li onClick={() => setPage(index)} key={index}>
                    <p className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                      {index + 1}
                    </p>
                  </li>
                );
              })}
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span className="sr-only">Next</span>
                  <svg className="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                  </svg>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default AnimeSearch;

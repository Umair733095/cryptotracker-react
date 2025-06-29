import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { Percent } from "@/components/ui/Percent";
import useLocalStorage from "@/hooks/useLocalStorage";
import {
  faStarFilled,
  faStarEmpty,
  faAngleLeft,
  faAngleRight,
} from "@/assets/icons";
import { useCryptoData } from "@/hooks/useCryptoData";

export const CryptosPage = () => {
  const coingeckoUrl = "https://www.coingecko.com/en/coins/";
  const [pageNum, setPageNum] = useState(1);
  const [favorites, setFavorites] = useLocalStorage("favorites", []);
  const { cryptos, fetchCryptos } = useCryptoData();

  function favoriteCrypto(crypto: any) {
    let fav = favorites.slice();
    if (fav.includes(crypto)) {
      fav = fav.filter((e: any) => e !== crypto);
    } else {
      fav.push(crypto);
    }
    setFavorites(fav);
  }

  function nextPage() {
    setPageNum((prevPage) => prevPage + 1);
  }
  function prevPage() {
    if (pageNum > 1) {
      setPageNum((prevPage) => prevPage - 1);
    }
  }
  function goToPage(page: any) {
    setPageNum(page);
  }

  useEffect(() => {
    fetchCryptos(pageNum);
  }, [pageNum]);

  const renderPagination = () => {
    let pages = Array.from({ length: 10 }, (x, i) => i + (pageNum - 5));
    pages = pages.filter((page) => page > 0);

    if (!pages.includes(1)) {
      pages.unshift(1);
    }

    return pages.map((page) => (
      <button
        key={nanoid()}
        className={`
          px-3 py-2 font-medium border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-100
          ${
            page === pageNum
              ? "bg-gray-100 dark:bg-gray-700"
              : "bg-inherit text-gray-700 dark:text-gray-400"
          }
        `}
        onClick={() => goToPage(page)}
      >
        {page}
      </button>
    ));
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-[1600px] mx-auto">
        <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
          <table className="min-w-full table-fixed text-sm text-gray-600 dark:text-gray-300">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-xs sm:text-sm font-semibold uppercase">
                <th className="w-6 p-2 text-center">#</th>
                <th className="w-32 sm:w-48 text-left p-2">Coin</th>
                <th className="w-24 text-center p-2">Price</th>
                <th className="w-20 text-right p-2">1h</th>
                <th className="w-20 text-right p-2">24h</th>
                <th className="w-20 text-right p-2">7d</th>
                <th className="w-28 sm:w-32 text-center p-2">Volume</th>
                <th className="w-28 sm:w-32 text-center p-2">Market Cap</th>
                <th className="w-28 text-center p-2 hidden sm:table-cell">
                  Last 7 Days
                </th>
              </tr>
            </thead>

            <tbody>
              {cryptos.map((crypto: any) => (
                <tr
                  key={crypto.id}
                  className="border-t border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  <td className="text-center p-2">
                    <button
                      onClick={() => favoriteCrypto(crypto.id)}
                      className="text-gray-500 dark:text-gray-400 hover:text-[#ffcc66]"
                    >
                      <FontAwesomeIcon
                        icon={
                          favorites.includes(crypto.id)
                            ? faStarFilled
                            : faStarEmpty
                        }
                        className={
                          favorites.includes(crypto.id) ? "text-[#ffcc66]" : ""
                        }
                      />
                    </button>
                  </td>

                  <td className="p-2">
                    <a
                      href={`${coingeckoUrl}${crypto.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <img
                        src={crypto.image}
                        alt={crypto.name}
                        className="h-6 w-6 rounded-full"
                      />
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {crypto.name}
                      </span>
                      <span className="uppercase text-xs">{crypto.symbol}</span>
                    </a>
                  </td>

                  <td className="text-center p-2">
                    $
                    {crypto.current_price.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}
                  </td>

                  <td className="text-right p-2">
                    <Percent
                      value={crypto.price_change_percentage_1h_in_currency}
                    />
                  </td>

                  <td className="text-right p-2">
                    <Percent
                      value={crypto.price_change_percentage_24h_in_currency}
                    />
                  </td>

                  <td className="text-right p-2">
                    <Percent
                      value={crypto.price_change_percentage_7d_in_currency}
                    />
                  </td>

                  <td className="text-center p-2">
                    ${crypto.total_volume.toLocaleString()}
                  </td>

                  <td className="text-center p-2">
                    ${crypto.market_cap.toLocaleString()}
                  </td>

                  <td className="text-center p-2 hidden sm:table-cell">
                    <Sparklines data={crypto.sparkline_in_7d.price}>
                      <SparklinesLine
                        color={
                          crypto.sparkline_in_7d.price[0] >
                          crypto.sparkline_in_7d.price[
                            crypto.sparkline_in_7d.price.length - 1
                          ]
                            ? "#ef4444"
                            : "#10b981"
                        }
                        style={{ fill: "none", strokeWidth: 2 }}
                      />
                    </Sparklines>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 py-4 w-full">
        <button
          className="px-3 py-2 font-medium text-gray-900 dark:text-gray-100 
    border border-gray-400 dark:border-gray-600 bg-transparent 
    hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-100 w-full sm:w-auto text-center"
          onClick={prevPage}
        >
          <FontAwesomeIcon icon={faAngleLeft} className="mr-2" />
          Back
        </button>

        <div className="flex justify-center items-center flex-wrap gap-2">
          {renderPagination()}
        </div>

        <button
          className="px-3 py-2 font-medium text-gray-900 dark:text-gray-100 
    border border-gray-400 dark:border-gray-600 bg-transparent 
    hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-100 w-full sm:w-auto text-center"
          onClick={nextPage}
        >
          Next
          <FontAwesomeIcon icon={faAngleRight} className="ml-2" />
        </button>
      </div>
    </div>
  );
};

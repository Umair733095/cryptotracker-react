import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-100 dark:border-gray-700 px-4 py-6 sm:px-6 sm:py-8 flex flex-col items-center gap-6 max-w-[95%] xl:max-w-[1200px] mx-auto">
      {/* Directory Links Section */}
      <div className="w-full flex flex-wrap gap-6 justify-center md:justify-between">
        {/* Products Column */}
        <div className="min-w-[120px] font-semibold">
          <p className="text-lg text-gray-900 dark:text-gray-100 text-center md:text-left">
            Products
          </p>
          <div className="mt-4 space-y-3">
            <p>
              <Link
                className="text-gray-500 dark:text-gray-400 text-sm hover:text-orange-500 transition-colors duration-200"
                to="/"
              >
                CryptoTracker
              </Link>
            </p>
            <p>
              <Link
                className="text-gray-500 dark:text-gray-400 text-sm hover:text-orange-500 transition-colors duration-200"
                to="/portfolio"
              >
                CryptoPortfolio
              </Link>
            </p>
            <p>
              <Link
                className="text-gray-500 dark:text-gray-400 text-sm hover:text-orange-500 transition-colors duration-200"
                to="/widgets"
              >
                CryptoWidgets
              </Link>
            </p>
          </div>
        </div>

        {/* Company Column */}
        <div className="min-w-[120px] font-semibold">
          <p className="text-lg text-gray-900 dark:text-gray-100 text-center md:text-left">
            Company
          </p>
          <div className="mt-4 space-y-3">
            <p>
              <a
                className="text-gray-500 dark:text-gray-400 text-sm hover:text-orange-500 transition-colors duration-200"
                href="https://github.com/Umair733095/umair-portfolio"
                target="_blank"
                rel="noopener"
              >
                Github
              </a>
            </p>
            <p>
              <a
                className="text-gray-500 dark:text-gray-400 text-sm hover:text-orange-500 transition-colors duration-200"
                href="https://craftedbyumair.netlify.app/"
                target="_blank"
              >
                About
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* All rights reserved - Bottom line */}
      <div className="w-full text-center pt-6 border-t border-gray-100 dark:border-gray-700">
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          © {new Date().getFullYear()} CryptoTracker. All rights reserved
        </p>
      </div>
    </footer>
  );
};

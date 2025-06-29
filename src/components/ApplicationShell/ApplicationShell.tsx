import { Nav } from "@/components/ApplicationShell/Nav";
import { Footer } from "@/components/ApplicationShell/Footer";
import { CryptosPage } from "@/pages/CryptosPage";
import { PortfolioPage } from "@/pages/PortfolioPage";
import { WidgetsPage } from "@/pages/WidgetsPage";
import { Route, Routes } from "react-router-dom";
import Form from "../Login/Form";

function ApplicationShell() {
  return (
    <div className="ApplicationShell bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col min-h-screen">
      <Nav />
      {/* <Form></Form> */}
      <Routes>
        <Route path="/" element={<CryptosPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/widgets" element={<WidgetsPage />} />
        <Route path="/Form" element={<Form />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default ApplicationShell;

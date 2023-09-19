import InvestV3Page from "page/v3";
import ROUTES from "./routes";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "page/home";
import InvestV4Page from "page/v4";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.V3} element={<InvestV3Page />} />
        <Route path={ROUTES.V4} element={<InvestV4Page />} />
      </Routes>
    </BrowserRouter>
  );
}

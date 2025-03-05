import React from "react";
import { Routes, Route } from "react-router-dom";
import Admin from "../pages/Admin";
import PricesRate from "../pages/IMOEUSetup/PricesRate/PricesRate.jsx";
import PathList from "../pages/PathwaySetup/PathList​/PathList​.jsx";
import ImoTarget from "../pages/TargetSetup/IMOTarget/IMOTarget.jsx";
import SpecsPrices from "../pages/FuelSetup/SpecsPrices​/SpecsPrices​.jsx";
import KrpRegistrationEdit from '../pages/UserSetup/krpRegistrationEdit/KrpRegistrationEdit.jsx';
import KrpUserList from '../pages/UserSetup/KrpUserList/KrpUserList.jsx';
import KrpUserListWithAccess from '../pages/UserSetup/KrpUserListWithAccess/KrpUserListWithAccess.jsx';
import KrUser from '../pages/UserSetup/KrUser/KrUser.jsx';
import KrpUser from '../pages/UserSetup/KrpUser/KrpUser.jsx';
import WorkSheet from '../pages/WorkSheet/WorkSheet.jsx';
import UserAddForm from '../pages/UserSetup/krpRegistrationEdit/UserAddForm/UserAddForm.jsx';
import UserEditForm from '../pages/UserSetup/krpRegistrationEdit/UserEditForm/UserEditForm.jsx';
import KrpRegistrationEditAdmin from '../pages/UserSetup/krpRegistrationEdit/KrpRegistrationEditAdmin.jsx';
import OptionsList from "pages/OMSetup/OptionsList/OptionsList";
import OptionsDetails from "pages/OMSetup/OptionDetails/OptionsDetails";
import FuelSpecPriceIMO from "../pages/OptionSetup/FuelSpecPrice/FuelSpecPriceIMO";
import FuelSpecPriceEU from "../pages/OptionSetup/FuelSpecPrice/FuelSpecPriceEU";
import FuelSpecPriceBio from "../pages/OptionSetup/FuelSpecPrice/FuelSpecPriceBio";
import FuelEmissionPrice from "../pages/OptionSetup/FuelEmissionPrice/FuelEmissionPrice";

// 퍼블리싱 라우트 배열
import publishingRoutes from "./PublishingRoutes.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Admin />} />
      <Route path="/pilot/imoEuSetup/pricesRate" element={<PricesRate />} />
      <Route path="/pilot/pathwaySetup/pathList" element={<PathList />} />
      <Route path="/pilot/targetSetup/imoTarget" element={<ImoTarget />} />
      <Route path="/pilot/fuelSetup/specsPrices​" element={<SpecsPrices />} />
      {/* userSetup */}
      
      <Route path="/pilot/krUser/krUser" element={<KrUser />}></Route>
      <Route path="/pilot/krpUser/krpUser" element={<KrpUser />}></Route>
      <Route path="/pilot/krpUserList/krpUserList" element={<KrpUserList />}></Route>
      <Route path="/pilot/krpUserListWithAccess/krpUserListWithAccess" element={<KrpUserListWithAccess />}></Route>
      <Route path="/pilot/krpRegistrationEdit/krpRegistrationEdit" element={<KrpRegistrationEdit />}></Route>
      <Route path="/pilot/krpRegistrationEdit/krpRegistrationEditAdmin" element={<KrpRegistrationEditAdmin />}></Route>
      <Route path="/pilot/krpRegistrationEdit/krpRegistrationEdit/userAddForm" element={<UserAddForm />}></Route>
      <Route path="/pilot/krpRegistrationEdit/krpRegistrationEdit/userEditForm" element={<UserEditForm />}></Route>
      {/*OMSetup */}
      <Route path="/pilot/OMSetup/OptionsList/OptionsList" element={<OptionsList/>}></Route>
      <Route path="/pilot/OMSetup/OptionDetails/OptionsDetails" element={<OptionsDetails/>}></Route>
      {/* OptionSetup -> FuelSpecPrice */}
      <Route
        path="/pilot/optionSetup/fuelSpecPriceIMO"
        element={<FuelSpecPriceIMO />}
      />
      <Route
        path="/pilot/optionSetup/fuelSpecPriceEU"
        element={<FuelSpecPriceEU />}
      />
      <Route
        path="/pilot/optionSetup/fuelSpecPriceBio"
        element={<FuelSpecPriceBio />}
      />
      <Route
        path="/pilot/optionSetup/fuelSpecPriceBio"
        element={<FuelSpecPriceBio />}
      />

      {/* OptionSetup -> FuelEmissionPrice */}
      <Route
        path="/pilot/optionSetup/FuelEmissionPrice"
        element={<FuelEmissionPrice />}
      />

      <Route path="/workSheet" element={<WorkSheet />} />

      {/* 퍼블리싱 라우트 */}
      {publishingRoutes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
}

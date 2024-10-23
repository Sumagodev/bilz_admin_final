////sos
import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import BaseLayout from "./layout/BaseLayout";
import { Dashboard, PageNotFound } from "./screens";
import Carausal from "./screens/submenus/Carausal";
import Leadership from "./screens/submenus/Leadership";
import Infrastructure from "./screens/submenus/Infrastructure";
import OurStory from "./screens/submenus/OurStory";
import OurTeam from "./screens/submenus/OurTeam";

import News from "./screens/submenus/News";
import News1 from "./screens/submenus/News1";
import Special from "./screens/submenus/Special";

import HeaderContact from "./screens/submenus/HeaderContact";
import HeroForm from "./screens/submenus/HeroForm";

import BgVideoForm from "./screens/submenus/BgVideoForm";
import BlogList from "./screens/submenus/BlogList";
import ProductList from "./screens/submenus/ProductList";
import BlogDetails from "./screens/submenus/BlogDetails";

import Register from "./screens/submenus/Register";
import Login from "./screens/submenus/Login";
import Testimonial from "./screens/submenus/Testimonial";
import UploadCv from "./screens/submenus/UploadCv";
import HomeSlider from "./screens/submenus/HomeSlider";
import CarousalForm from "./screens/submenus/CarousalForm";
import Office from "./screens/submenus/Office";
import ContactSalesPerson from "./screens/submenus/ContactSalesPerson";
import GetInTouch from "./screens/submenus/GetInTouch";
import RequestCallbackForm from "./screens/submenus/RequestCallbackForm";
import Subscribe from "./screens/submenus/Subscribe";
import ProductName from "./screens/submenus/ProductName";
import ProductDetails from "./screens/submenus/ProductDetails";
import TechnicalData from "./screens/submenus/TechnicalData";
import OptionsData from "./screens/submenus/OptionsData";
import ProjectTitleName from "./screens/submenus/ProjectTitleName";
import MaterialData from "./screens/submenus/MaterialData";
import Logout from "./screens/submenus/Logout";
import { Sidebar } from "./components";
import ProtectedRoutes from "./api/ProtectedRoutes";
import ApplicationData from "./screens/submenus/ApplicationData";
import Events from "./screens/submenus/Events";
import ProductImages from "./screens/submenus/ProductImages";
import SocialContact from "./screens/submenus/SocialContact";
import Analysis from "./screens/submenus/Analysis";
import Further_analysis from "./screens/submenus/Further_analysis";
import ApplicationCategory from "./screens/submenus/ApplicationCategory";
import PDF from "./screens/submenus/PDF";
import Implemented from "./screens/submenus/Implemented";
import ProductData from "./screens/submenus/ProductData";
import ProductData2 from "./screens/submenus/ProductData2";
import Job from "./screens/submenus/Job";
import Distributer from "./screens/submenus/Distributer";
import Feedback from "./screens/submenus/Feedback";
import Contact_Form from "./screens/submenus/Contact_form";

function App() {
  return (
    <>
      <ToastContainer autoClose={2000}/>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
        <Route element={<BaseLayout />}>
          {/* submenus */}

         
          <Route
            path="/dashboard"
            element={<ProtectedRoutes Component={Dashboard} />}
          />
            
            <Route
            path="/distributer"
            element={<ProtectedRoutes Component={Distributer} />}
          />
            
            <Route
            path="/feedback"
            element={<ProtectedRoutes Component={Feedback} />}
          />
            
            <Route
            path="/contact_form"
            element={<ProtectedRoutes Component={Contact_Form} />}
          />
          <Route
            path="/carousal"
            element={<ProtectedRoutes Component={Carausal} />}
          />
          <Route
            path="/exhibition"
            element={<ProtectedRoutes Component={Infrastructure} />}
          />
           <Route
            path="/v_analysis"
            element={<ProtectedRoutes Component={Analysis} />}
          />
          
          <Route
            path="/ourstory"
            element={<ProtectedRoutes Component={OurStory} />}
          />
          <Route
            path="/v_measurment"
            element={<ProtectedRoutes Component={OurTeam} />}
          />
          <Route
            path="/About"
            element={<ProtectedRoutes Component={Testimonial} />}
          />
           <Route
            path="/Further"
            element={<ProtectedRoutes Component={Further_analysis} />}
          />
           <Route
            path="/Special"
            element={<ProtectedRoutes Component={Special} />}
          />
          
          
          <Route
            path="/leadership"
            element={<ProtectedRoutes Component={Leadership} />}
          />
          <Route
            path="/news"
            element={<ProtectedRoutes Component={News} />}
          />
           <Route
            path="/News1"
            element={<ProtectedRoutes Component={News1} />}
          />
          
                  <Route
            path="/solution"
            element={<ProtectedRoutes Component={Events} />}
          />
          <Route
            path="/headercontact"
            element={<ProtectedRoutes Component={HeaderContact} />}
          />
          <Route
            path="/social-contact"
            element={<ProtectedRoutes Component={SocialContact} />}
          />
          <Route
            path="/heroform"
            element={<ProtectedRoutes Component={HeroForm} />}
          />
          <Route
            path="/homeslider"
            element={<ProtectedRoutes Component={HomeSlider} />}
          />
          <Route
            path="/bgvideoform"
            element={<ProtectedRoutes Component={BgVideoForm} />}
          />
          <Route
            path="/bloglist"
            element={<ProtectedRoutes Component={BlogList} />}
          />
          <Route
            path="/productlist"
            element={<ProtectedRoutes Component={ProductList} />}
          />
          <Route
            path="/blogdetails"
            element={<ProtectedRoutes Component={BlogDetails} />}
          />
          <Route
            path="/register"
            element={<ProtectedRoutes Component={Register} />}
          />
          <Route
            path="/uploadcv"
            element={<ProtectedRoutes Component={UploadCv} />}
          />
          <Route
            path="/carousalform"
            element={<ProtectedRoutes Component={CarousalForm} />}
          />
          <Route
            path="/apply_now"
            element={<ProtectedRoutes Component={Office} />}
          />
            <Route
            path="/job"
            element={<ProtectedRoutes Component={Job} />}
          />
          <Route
            path="/contactperson"
            element={<ProtectedRoutes Component={ContactSalesPerson} />}
          />
             <Route
            path="/applicationcategory"
            element={<ProtectedRoutes Component={ApplicationCategory} />}
          />
            <Route
            path="/pdf"
            element={<ProtectedRoutes Component={PDF} />}
          />
          <Route
            path="/getintouch"
            element={<ProtectedRoutes Component={GetInTouch} />}
          />
           <Route
            path="/implemented"
            element={<ProtectedRoutes Component={Implemented} />}
          />
          
          <Route
            path="/requestcallbackform"
            element={<ProtectedRoutes Component={RequestCallbackForm} />}
          />
          <Route
            path="/subscribe"
            element={<ProtectedRoutes Component={Subscribe} />}
          />
          <Route
            path="/productname"
            element={<ProtectedRoutes Component={ProductName} />}
          />
          <Route
            path="/productdetails"
            element={<ProtectedRoutes Component={ProductDetails} />}
          />
           <Route
            path="/productdata"
            element={<ProtectedRoutes Component={ProductData} />}
          />
           <Route
            path="/productdata2"
            element={<ProtectedRoutes Component={ProductData2} />}
          />
          <Route
            path="/technicaldata"
            element={<ProtectedRoutes Component={TechnicalData} />}
          />
          <Route
            path="/optionsdata"
            element={<ProtectedRoutes Component={OptionsData} />}
          />
          <Route
            path="/materialdata"
            element={<ProtectedRoutes Component={MaterialData} />}
          />
          <Route
            path="/projecttitilename"
            element={<ProtectedRoutes Component={ProjectTitleName} />}
          />
                    <Route
            path="/applicationdata"
            element={<ProtectedRoutes Component={ApplicationData} />}
          />
                           <Route
            path="/productimages"
            element={<ProtectedRoutes Component={ProductImages} />}
          />
          <Route
            path="/logout"
            element={<ProtectedRoutes Component={Logout} />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;

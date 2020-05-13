import React, { useState, useEffect } from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import ReactGA from "react-ga";
import PrivateRoute from "./components/PrivateRoute";

import "./App.scss";
import 'antd/dist/antd.css';

import Dashboard from "./components/pages/index/Dashboard";
import Navigation from "./components/navigation/Navigation";
import Footer from "./components/navigation/Footer";
import Comparison from "./components/pages/comparison/Comparison.js";
import Profile from "./components/pages/user-profile/Profile";
import PrivacyPolicy from "./components/legal/PrivacyPolicy";
import AboutUs from "./components/pages/aboutus/AboutUs";
// import AboutUs2 from './components/aboutus/AboutUs2';
import citiesIndex from "./data/city_ids.json";
import { UserContext } from "./contexts/UserContext";
import { CityContext } from "./contexts/CityContext";
import Callback from "./components/Callback";
import AuthForm from "./components/forms/AuthForm";
import axiosAuth from "./utils/axiosAuth";
import SingleCityPage from "./components/pages/singlecity/SingleCityPage";


function initializeAnalytics() {
  ReactGA.initialize("UA-156199574-1");
  ReactGA.pageview("/");
}

function App() {
  useEffect((_) => {
    initializeAnalytics();
    ReactGA.event({ category: "App", action: "Loaded app" });
  }, []);

  //possible map component
  //parse data into static js arr instead of reading off the json file everytime
  let cityIndex = [];
  Object.keys(citiesIndex).forEach((item) => {
    let city = citiesIndex[item];
    city.name = item;
    cityIndex.push(city);
  });

  //search component??
  const [toggleSearch, setToggleSearch] = useState(true);

  //possibly for user profile only?? possibly for others?? probably don't use localStorage??
  //user reducer
  const [user, setUserValue] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );

  //should go with comparison page, doesn't really work right now
  //part of user reducer
  const [favorites, setFavorites] = useState([]);

  //map components??
  //city reducer
  const [cityMarkers, setCityMarkers] = useState(cityIndex);

  //comparison components?? also works for map component??
  //city reducer
  const [selected, setSelected] = useState([]);

  //for the map component, should change from state var to something else
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    longitude: -96.7,
    latitude: 38.55,
    zoom: 3.55,
    minZoom: 3.5,
    maxZoom: 10,
    trackResize: true,
  });

  //user logic
  const setUser = (info) => {
    localStorage.setItem("user", JSON.stringify(info));
    setUserValue(info);
  };

  //ALL PART OF MAP COMPONENT
  //comparing population numbers between cities
  function compare(a, b) {
    const popA = a.population;
    const popB = b.population;

    let comparison = 0;
    if (popA < popB) {
      comparison = 1;
    } else if (popA > popB) {
      comparison = -1;
    }
    return comparison;
  }

  cityIndex.sort(compare);

  // this filters the map markers based on zoom - Closer zoom, lesser population cap
  useEffect(
    (_) => {
      function recursive_filter(data, arrayFilters, index = 0) {
        if (arrayFilters.length === 0) {
          return data;
        }
        if (index === arrayFilters.length - 1) {
          return data.filter(arrayFilters[index]);
        }
        return recursive_filter(
          data.filter(arrayFilters[index]),
          arrayFilters,
          index + 1
        );
      }

      //these 4 lines of code took too long to write, they determine the bounds of the map on screen
      const f1 = (item) =>
        item.lng >
        viewport.longitude -
          (0.00007810743 * Math.pow(2, 24 - viewport.zoom)) / 2;
      const f2 = (item) =>
        item.lng <
        viewport.longitude +
          (0.00007810743 * Math.pow(2, 24 - viewport.zoom)) / 2;
      const f3 = (item) =>
        item.lat >
        viewport.latitude -
          (0.00001907348 * Math.pow(2, 24 - viewport.zoom)) / 2;
      const f4 = (item) =>
        item.lat <
        viewport.latitude +
          (0.00001907348 * Math.pow(2, 24 - viewport.zoom)) / 2;

      const filters = [f1, f2, f3, f4];

      setCityMarkers(recursive_filter(cityIndex, filters).slice(0, 30));

      // let selectedCityMarkers = selected.map(item => cityIndex.find(city => city.ID === item.id))
      // setCityMarkers([...cityMarkers, ...selectedCityMarkers])
    },
    [viewport.latitude]
  );

  // console.log("getCities", selected);

  return (
    <Router>
      <UserContext.Provider
        value={{
          axiosAuth,
          user,
          setUserValue,
          setUser,
          favorites,
          setFavorites,
          toggleSearch,
          setToggleSearch,
        }}
      >
        <CityContext.Provider
          value={{
            cityIndex,
            cityMarkers,
            setCityMarkers,
            viewport,
            setViewport,
          }}
        >
          <div className="App">
            {/* <Navigation /> */}
            <Route path="/" render={(props) => <Navigation {...props} />} />
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/" component={Footer} />
            <Route path="/compare" render={(props) => <Comparison {...props} />} />
            <PrivateRoute path="/profile" component={Profile} />
            <Route path="/privacypolicy" component={PrivacyPolicy} />
            <Route path="/meet-the-team" component={AboutUs} />
            <Route
              path="/SingleCityPage"
              render={(props) => <SingleCityPage {...props} />}
            />

            <Route
              path="/signin"
              render={(props) => <AuthForm {...props} action="Login" />}
            />
            <Route
              path="/signup"
              render={(props) => <AuthForm {...props} action="Register" />}
            />

            <Route path="/callback" component={Callback} />
          </div>
        </CityContext.Provider>
      </UserContext.Provider>
    </Router>
  );
}

export default App;

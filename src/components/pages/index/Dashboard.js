import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import ReactGA from "react-ga";
import { useSelector } from "react-redux"; //import

import FlowContainer from "./user-flow/FlowContainer";

import useModal from "../../modal/useModal";
import ModalPopup from "../../modal/modal.js";

import { UserContext } from "../../../contexts/UserContext";

import AOS from "aos";
import "aos/dist/aos.css";
import "../../../App.scss";

import economy from "./assets/economy.svg";
import community from "./assets/community.svg";
import housing from "./assets/housing.svg";
import data from "./assets/visualize.svg";
import location from "./assets/map.svg";
import control from "./assets/control.svg";
import unlock from "./assets/unlock.svg";

//submit city needs more looking at.... Reducer needed???
function Dashboard({ history }) {
  const { isShowing, toggle } = useModal();

  AOS.init();
  const { user, setUser, axiosAuth } = useContext(UserContext);

  const selected = useSelector((state) => state.cityReducer.selected); //added

  useEffect((_) => {
    if (user) {
      axiosAuth()
        .get(`/users/profile/image`)
        .then((res) => {
          const image = res.data[0];

          if (image) {
            setUser({ ...user, userimage: image.userimage });
          }
        })
        .catch((err) => console.log(err));
    }
  }, []);

  useEffect(
    (_) => {
      ReactGA.event({
        category: "Selected",
        action: "selected a city using dashboard",
      });
    },
    [selected]
  );

  return (
    <div className="dashboard-container">
      {/* * LANDING PAGE AND SEARCH FUNCTION */}
      <div className="dashboard-search-container">
        <div className="dashboard-search-function">
          {/* LANDING IMAGE */}
          <div className="dashboard-image">
            <div className="dashboard-image-header">
              {/* TITLE */}
              <p className="dashboard-title">
                Make Your <br />
                Move.
              </p>
              <p className="dashboard-title2">
                Make <br />
                Your <br />
                Move.
              </p>
              {/* SEARCH CONTAINER */}
              <div className="dashboard-function-container">
<<<<<<< HEAD
                <div className="search-and-modal">
                  <div className="all-search-container">
                    {/* TOGGLE SEARCH VS. COMPARE FUNCTIONALITY */}
                    {toggleSearch ? (
                      <div className="dashboard-single-search-container">
                        <form autoComplete="off" onSubmit={submitCity}>
                          <div className="search-and-button">
                            <input
                              placeholder="Search for a city"
                              onChange={handleCityOne}
                              value={compare.cityOne}
                              name="cityOne"
                            />
                            <button
                              onClick={submitCity}
                              className="compare-button"
                            >
                              Go
                            </button>
                          </div>
                          <div>
                            {cityOneSuggestions.map((suggestion) => {
                              const style = {
                                backgroundColor: suggestion.active
                                  ? "#e9e8e9"
                                  : "#fff",
                                cursor: "pointer",
                                fontSize: "1rem",
                                textAlign: "left",
                                padding: "10px",
                                boxShadow: "0 1px 16px 0 rgba(0, 0, 0, 0.09)",
                              };
                              return (
                                <div
                                  key={suggestion._id}
                                  name="cityOne"
                                  style={style}
                                  onClick={() =>
                                    chooseCityOneSuggestion(suggestion)
                                  }
                                >
                                  {" "}
                                  <img
                                    alt="a pointer"
                                    className="imageStyle"
                                    src={pointer}
                                  />{" "}
                                  {suggestion.name.replace(" city", "")}
                                </div>
                              );
                            })}
                          </div>
                        </form>
                      </div>
                    ) : (
                      <div className="dashboard-compare-search-container">
                        <form autoComplete="off" onSubmit={submitCity}>
                          <div>
                            <input
                              placeholder="Enter city one"
                              onChange={handleCityOne}
                              value={compare.cityOne}
                              name="cityOne"
                            />

                            <div>
                              {cityOneSuggestions.map((suggestion) => {
                                const style = {
                                  backgroundColor: suggestion.active
                                    ? "#e9e8e9"
                                    : "#fff",
                                  cursor: "pointer",
                                  fontSize: "1rem",
                                  textAlign: "left",
                                  padding: "10px",
                                  boxShadow: "0 1px 16px 0 rgba(0, 0, 0, 0.09)",
                                };
                                return (
                                  <div
                                    key={suggestion.name}
                                    style={style}
                                    onClick={() =>
                                      chooseCityOneSuggestion(suggestion)
                                    }
                                  >
                                    {" "}
                                    <img
                                      alt="a map pin"
                                      className="imageStyle"
                                      src={pointer}
                                    />{" "}
                                    {suggestion.name.replace(" city", "")}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                          <div style={{ display: "flex", marginTop: "10px" }}>
                            <input
                              placeholder="Enter city two"
                              onChange={handleCityTwo}
                              value={compare.cityTwo}
                            />
                            <button
                              onClick={submitCity}
                              className="compare-button"
                            >
                              Go
                            </button>
                          </div>
                          <div>
                            {cityTwoSuggestions.map((suggestion) => {
                              const style = {
                                backgroundColor: suggestion.active
                                  ? "#e9e8e9"
                                  : "#fff",
                                cursor: "pointer",
                                fontSize: "1rem",
                                textAlign: "left",
                                padding: "10px",
                                boxShadow: "0 1px 16px 0 rgba(0, 0, 0, 0.09)",
                              };
                              return (
                                <div
                                  key={suggestion.name}
                                  style={style}
                                  onClick={() =>
                                    chooseCityTwoSuggestion(suggestion)
                                  }
                                >
                                  {" "}
                                  <img
                                    alt="a map pin"
                                    className="imageStyle"
                                    src={pointer}
                                  />{" "}
                                  {suggestion.name.replace(" city", "")}
                                </div>
                              );
                            })}
                          </div>
                        </form>
                      </div>
                    )}
                    {/* * TOGGLE DIV FOR SEARCH AND GO BUTTON */}
                    <div className="toggle-div">
                      <div id="search-toggle">
                        <label className="switch">
                          <input type="checkbox" onClick={toggleClass} />
                          <span className="slider round"></span>
                        </label>
                        <p className={buttonClass} style={toggleStyle}>
                          Compare cities
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <ModalPopup
                      isShowing={isShowing}
                      hide={toggle}
                      component={<FlowContainer />}
                      size='large'
                    />
                    <div className="modal-prompt">
                      Not sure where you want to go?
                      <br></br>
                      take our quiz and let us help you find out!
                      <button
                        className="compare-button"
                        onClick={() => {
                          toggle();
                        }}
                      >
                        Take the quiz!
                      </button>
                    </div>
                  </div>
                </div>
=======
                <ModalPopup
                  isShowing={isShowing}
                  hide={toggle}
                  component={<FlowContainer />}
                />
                <button
                  className="quiz-btn"
                  onClick={() => {
                    toggle();
                  }}
                >
                  Get Started
                </button>
>>>>>>> 1dbc3a9942b6fe048752889c1b41043d86df25ca
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SIGN UP CALL TO ACTION */}
      <div
        className="kevinmotor"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div
          className="bonus-features-container"
          data-aos="fade-right"
          data-aos-offset="100"
          // data-aos-delay="50"
          data-aos-duration="800"
          data-aos-easing="ease-in-out"
          data-aos-mirror="true"
          data-aos-once="true"
        >
          <div className="motoranimationcontainer">
            <img alt="img of lock" className="unlockfeatures" src={unlock} />
          </div>
          <div className="bonus-features-CTA">
            <p className="bonus-features-title">Unlock bonus features</p>
            <p className="bonus-features-description">
              Sign up for free to unlock additional features to export data,
              review and comment on cities, and view favorited cities.{" "}
            </p>

            <Link to="/signup">
              <button className="sign-up-CTA">Sign Up</button>
            </Link>
          </div>
        </div>
      </div>

      {/* PRODUCT FEATURES */}
      <div className="kevin">
        <div className="dashboard-features-container">
          <div className="dashboard-features-title">
            <h3 className="features-title">Features</h3>
          </div>
          <div
            className="feature-descriptions-container"
            data-aos="fade-up"
            data-aos-offset="100"
            // data-aos-delay="50"
            data-aos-duration="500"
            data-aos-easing="ease-in-out"
            data-aos-mirror="true"
            data-aos-once="true"
          >
            <img className="feature-images" src={control} alt="money" />
            <div className="feature-descriptions">
              <p className="feature-title">Control of data</p>
              <p>
                Explore cost of living and other data of a single city or
                compare multiple cities to learn about differences.
              </p>
            </div>
          </div>
          <div
            className="feature-descriptions-container"
            data-aos="fade-up"
            data-aos-offset="100"
            // data-aos-delay="50"
            data-aos-duration="500"
            data-aos-easing="ease-in-out"
            data-aos-mirror="true"
            data-aos-once="true"
          >
            <img className="feature-images" src={location} alt="map" />
            <div className="feature-descriptions">
              <p className="feature-title">Map view</p>
              <p>
                View the map to explore what is near cities and how the data
                compares with different parts of the city.
              </p>
            </div>
          </div>
          <div
            className="feature-descriptions-container"
            data-aos="fade-up"
            data-aos-offset="100"
            // data-aos-delay="50"
            data-aos-duration="500"
            data-aos-easing="ease-in-out"
            data-aos-mirror="true"
            data-aos-once="true"
          >
            <img className="feature-images" src={data} alt="data visual" />
            <div className="feature-descriptions">
              <p className="feature-title">Visualize data</p>
              <p>
                Data visuals help to easily understand cost of living in
                multiple cities and provide data from a bird’s eye view.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* VISUALIZING DATA CONTAINER */}
      <div className="dashboard-metrics-container">
        <p className="metrics-title">Visualizing data made easier</p>
        <div className="dashboard-metrics">
          <div
            className="metrics-description-container"
            data-aos="fade-down"
            data-aos-offset="100"
            data-aos-delay="100"
            data-aos-duration="600"
            data-aos-easing="ease-in-out"
            data-aos-mirror="true"
            data-aos-once="true"
          >
            <img
              className="feature-images"
              src={housing}
              alt="housing visual"
            />
            {/* <LineGraph2 /> */}
            <p className="metrics-description">
              <p className="metrics-description-title">Housing</p>Housing data
              includes median rent, home prices, monthly homeowner costs,
              housing by rooms, and etc.
            </p>
          </div>
          <div
            className="metrics-description-container"
            data-aos="fade-down"
            data-aos-offset="100"
            data-aos-delay="100"
            data-aos-duration="600"
            data-aos-easing="ease-in-out"
            data-aos-mirror="true"
            data-aos-once="true"
          >
            <img
              className="feature-images"
              src={community}
              alt="community visual"
            />
            {/* <LineGraph /> */}
            <p className="metrics-description">
              <p className="metrics-description-title">Community</p>Data for
              social trends consists of age, ethnicity, education, languages
              spoken, school enrollment, and etc.
            </p>
          </div>
          <div
            className="metrics-description-container"
            data-aos="fade-down"
            data-aos-offset="100"
            data-aos-delay="100"
            data-aos-duration="600"
            data-aos-easing="ease-in-out"
            data-aos-mirror="true"
            data-aos-once="true"
          >
            <img
              className="feature-images"
              src={economy}
              alt="economy visual"
            />
            {/* <RadarGraph /> */}
            <p className="metrics-description">
              <p className="metrics-description-title">Economy</p>Economic data
              includes household income, major industries, etc.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

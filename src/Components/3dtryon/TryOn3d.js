import React, { useRef, useEffect } from "react";

import { JEELIZVTO, JEELIZVTOWIDGET } from "jeelizvtowidget";
//import { JEELIZVTO, JEELIZVTOWIDGET } from '../../../../../npm/package/index.js'
import "./TryOn3d.scss";
import searchImage from "../../Images/target512.jpg";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { Helmet } from "react-helmet-async";

async function init_VTOWidget(placeHolder, canvas, toggle_loading, navigate) {
  async function checkCameraStatus() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      // Camera is accessible
      stream.getTracks().forEach((track) => track.stop());
      return true;
    } catch (error) {
      // Camera is not accessible or user denied access
      return false;
    }
  }
  try {
    const cameraOn = await checkCameraStatus();
    if (cameraOn) {
      JEELIZVTOWIDGET.start({
        placeHolder,
        canvas,
        callbacks: {
          ADJUST_START: null,
          ADJUST_END: null,
          LOADING_START: toggle_loading.bind(null, true),
          LOADING_END: toggle_loading.bind(null, false),
        },
        sku: "empty", // SKU loadded at the beginning
        // image displayed when face is not found:
        searchImageMask: searchImage, //'https://appstatic.jeeliz.com/jeewidget/images/target.png',
        searchImageColor: 0xeeeeee, // color of loading (face not found) animation
        searchImageRotationSpeed: -0.001, // negative -> clockwise
        callbackReady: function () {
        },
        onError: function (errorLabel) {
          // this function catches errors, so you can display custom integrated messages
          alert("An error happened. errorLabel =" + errorLabel);
          // navigate('/')
          switch (errorLabel) {
            case "WEBCAM_UNAVAILABLE":
              // the user has no camera, or does not want to share it.
              navigate("/");
              break;

            case "INVALID_SKU":
              // the provided SKU does not match with a glasses model
              navigate("/");
              break;

            case "PLACEHOLDER_NULL_WIDTH":
              navigate("/");
            case "PLACEHOLDER_NULL_HEIGHT":
              navigate("/");
              // Something is wrong with the placeholder
              // (element whose id='JeelizVTOWidget')
              break;

            case "FATAL":
              navigate("/");
            default:
              // a bit error happens:(
              navigate("/");
              break;
          } // end switch
        }, // end onError()
      }).catch((err) => console.log(err)); // end JEELIZVTOWIDGET.start call
    } else {
      toast.error(
        "Camera is not on, please enable camera or try with other system"
      );
      navigate("/");
    }
  } catch (error) {
    // Handle the error here, such as navigating to another page or displaying a message to the user
    // navigate('/');
  }
}

function TryOn3d(props) {
  const navigate = useNavigate();
  useEffect(() => {
    if (window !== undefined) {
      window.scrollTo(0, 0);
    }
  }, []);
  const refPlaceHolder = useRef();
  const refCanvas = useRef();
  const refAdjustEnter = useRef();
  const refAdjust = useRef();
  const refChangeModel = useRef();
  const refLoading = useRef();

  const toggle_loading = (isLoadingVisible) => {
    refLoading.current.style.display = isLoadingVisible ? "block" : "none";
  };

  const enter_adjustMode = () => {
    JEELIZVTOWIDGET.enter_adjustMode();
    refAdjustEnter.current.style.display = "none";
    refAdjust.current.style.display = "block";
    refChangeModel.current.style.display = "none";
  };

  const exit_adjustMode = () => {
    JEELIZVTOWIDGET.exit_adjustMode();
    refAdjustEnter.current.style.display = "block";
    refAdjust.current.style.display = "none";
    refChangeModel.current.style.display = "block";
  };

  const set_glassesModel = (sku) => {
    JEELIZVTOWIDGET.load(sku);
  };

  useEffect(() => {
    // try {
    //   const placeHolder = refPlaceHolder.current;
    //   const canvas = refCanvas.current;
    //   init_VTOWidget(placeHolder, canvas, toggle_loading,navigate);
    // } catch (error) {
    //   toast.error(error?.message, { autoClose: 2000 });
    //   navigate("/");
    // }

    const placeHolder = refPlaceHolder.current;
    const canvas = refCanvas.current;
    init_VTOWidget(placeHolder, canvas, toggle_loading, navigate);

    return () => {
      JEELIZVTOWIDGET.destroy();
    };
  }, []);

  return (
    <div ref={refPlaceHolder} className="JeelizVTOWidget">
      <Helmet>
        <title>{props?.title || "Welcome To Vuezen"}</title>
      </Helmet>
      <h5>
        Face a light source, align your face, take off your glasses, and tuck
        your hair behind your ears
      </h5>
      <canvas ref={refCanvas} className="JeelizVTOWidgetCanvas"></canvas>

      <div ref={refAdjustEnter} className="JeelizVTOWidgetControls">
        <button
          className="JeelizVTOWidgetButton JeelizVTOWidgetAdjustEnterButton"
          onClick={enter_adjustMode}
        >
          Adjust
        </button>
      </div>

      <div ref={refAdjust} className="JeelizVTOWidgetAdjustNotice">
        Move the glasses to adjust them.
        <button
          className="JeelizVTOWidgetButton JeelizVTOWidgetAdjustExitButton"
          onClick={exit_adjustMode}
        >
          Quit
        </button>
      </div>

      <div
        ref={refChangeModel}
        className="JeelizVTOWidgetControls JeelizVTOWidgetChangeModelContainer"
      >
        <button
          className="JeelizVTOWidgetButton"
          onClick={set_glassesModel.bind(this, "rayban_aviator_or_vertFlash")}
        >
          Model 1
        </button>
        <button
          className="JeelizVTOWidgetButton"
          onClick={set_glassesModel.bind(
            this,
            "rayban_round_cuivre_pinkBrownDegrade"
          )}
        >
          Model 2
        </button>
        <button
          className="JeelizVTOWidgetButton"
          onClick={set_glassesModel.bind(this, "carrera_113S_blue")}
        >
          Model 3
        </button>
      </div>

      <div ref={refLoading} className="JeelizVTOWidgetLoading">
        <div className="JeelizVTOWidgetLoadingText">Loading...</div>
      </div>
    </div>
  );
}

export default TryOn3d;

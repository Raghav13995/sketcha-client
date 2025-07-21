import React, { useState } from 'react';
import Panorama from '../PanaromaViewer/Panaroma';
import logo from '../assets/icons8-price-30.png';
import logo1 from '../assets/icons8-area-chart-30.png';
import TextToSpeech from '../components/TextToSpeech';
import googlemap from '../assets/googlemap.png';
import DynamicGoogleMap from '../components/Map';

function TenantCard({ props }) {
  const [showPanorama, setShowPanorama] = useState(false);
  const [showMapPopup, setShowMapPopup] = useState(false);

  const togglePanorama = () => setShowPanorama(prev => !prev);
  const toggleMapPopup = () => setShowMapPopup(prev => !prev);

  const truncateDescription = (desc) => {
    if (!desc) return "";
    return desc.split(' ').slice(0, 20).join(' ') + '...';
  };

  return (
    <div className="w-full flex justify-center py-8 bg-tertiary">
      <div className="w-[95%] max-w-[1200px] bg-white rounded-3xl p-6 flex flex-col xl:flex-row gap-6 shadow-2xl">
        
        {/* Image */}
        <div className="w-full xl:w-[40%] flex justify-center">
          <img
            src={props.VRImage}
            alt="Property VR"
            className="h-[350px] w-[100%] object-cover rounded-3xl shadow-md"
          />
        </div>

        {/* Details */}
        <div className="w-full xl:w-[60%] flex flex-col justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{props.size}</h2>
            <h3 className="text-xl font-semibold text-blue-700">{props.title}</h3>

            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center bg-gray-100 p-4 mt-3 rounded-md gap-4">
              <div className="flex items-center gap-2">
                <img src={logo1} alt="Area Icon" />
                <span><strong>Plot Area:</strong> {props.area} sq. ft.</span>
              </div>
              <div className="flex items-center gap-2">
                <img src={logo} alt="Price Icon" />
                <span><strong>Avg Price:</strong> $100,000</span>
              </div>
              <div className="flex items-center gap-2">
                <img src={logo} alt="Price Icon" />
                <span><strong>Price:</strong> ₹{props.price}</span>
              </div>
            </div>

            <p className="mt-3"><strong>Address:</strong> {props.location}</p>
            <div className="flex items-center mt-2">
              <span><strong>Description:</strong> {truncateDescription(props.description)}</span>
              <TextToSpeech text={props.description} />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-3">
            <button
              onClick={toggleMapPopup}
              className="flex items-center gap-2 text-blue-600 hover:underline"
            >
              <img src={googlemap} alt="Map Icon" className="w-6 h-6" />
              View on Map
            </button>

            <div className="flex gap-3">
              <button
                onClick={togglePanorama}
                className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md shadow transition"
              >
                View AR
              </button>
              <a href="/Payment">
                <button className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-md shadow transition">
                  Buy
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Map Popup */}
      {showMapPopup && (
        <div className="fixed inset-0 z-[1000] flex justify-center items-center bg-black bg-opacity-60">
          <div className="relative w-[90vw] h-[85vh] bg-white rounded-xl shadow-lg">
            <button
              onClick={toggleMapPopup}
              className="absolute top-4 right-4 bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition"
            >
              Close
            </button>
            <DynamicGoogleMap address={props.location} pincode={props.pincode} />
          </div>
        </div>
      )}

      {/* Panorama Viewer */}
      {showPanorama && (
        <div className="fixed inset-0 z-[1000] flex justify-center items-center bg-black bg-opacity-70">
          <div className="relative w-full h-full">
            <Panorama VRImage={props.VRImage} />
            <button
              onClick={togglePanorama}
              className="absolute top-4 left-4 bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition z-[1000]"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TenantCard;

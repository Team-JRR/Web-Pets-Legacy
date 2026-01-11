import React, { useState } from "react";
import axios from "axios";

const Profile = ({ contrastTB, refreshDeviceColorData }) => {
  const [hexInput, setHexInput] = useState("");

  const profileTabStyles = ["border-2", `border-${contrastTB}`, "p-[10px]"];

  const profileContentStyles = ["border", `border-${contrastTB}`, "p-[10px]"];
  const handleInputChange = (e) => {
    setHexInput(e.target.value);
  };

  // handles submitting the hex code user entered to be saved to their database profile
  // after that the refreshDeviceColorData method is called which causes a rerender of the App component,
  // which then rerenders the DeviceViews componenet allowing it to see the updated color immediately.
  const handleHexSubmit = () => {
    axios
      .patch(`/user/device-color`, {
        deviceColor: hexInput,
      })
      .then(() => {
        refreshDeviceColorData();
        setHexInput("");
      })
      .catch((err) => {
        console.error("Failed to update Device Color", err);
      });
  };

  // triggers patch handler in server/routers/user.js, when it is passed undefined as the device color value
  // it sets the value of the currently logged in User's device color back to default (hardcoded value in the handler)
  const handleRevert = () => {
    axios
      .patch(`/user/device-color`, {
        deviceColor: undefined,
      })
      .then(() => {
        refreshDeviceColorData();
      })
      .catch((err) => {
        console.error("Failed to revert to default device color", err);
      });
  };

  return (
    <div className={profileTabStyles.join(" ")}>
      <input
        className={profileTabStyles.join(" ")}
        type="text"
        placeholder="Enter 3-6 Digit Hex Code"
        onChange={handleInputChange}
        value={hexInput}
        minLength={4}
        maxLength={7}
      />
      <button
        className={profileContentStyles.join(" ")}
        onClick={handleHexSubmit}
        type="button"
      >
        Apply Change
      </button>
      <button
        className={profileContentStyles.join(" ")}
        onClick={handleRevert}
        type="button"
      >
        Revert Changes
      </button>
    </div>
  );
};

export default Profile;

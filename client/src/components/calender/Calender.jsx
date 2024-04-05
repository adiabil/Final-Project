import React, { useEffect } from "react";
import "./Calender.css";

const CalendlyComponent = () => {
  useEffect(() => {
    const head = document.querySelector("head");
    const script = document.createElement("script");

    script.setAttribute(
      "src",
      "https://assets.calendly.com/assets/external/widget.js"
    );
    head.appendChild(script);

    return () => {
      head.removeChild(script);
    };
  }, []);

  return (
    <div className="calendly-wrapper">
      <h1>Made an appointment!👇</h1>

      <div
        className="calendly-inline-widget"
        data-url="https://calendly.com/alamayo274"
      />
    </div>
  );
};

export default CalendlyComponent;

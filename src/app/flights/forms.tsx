import { API_BASE_URL } from "@/app/utils/apiClient";
import AirportDropdown from "../airports/dropdown";
import { useState } from "react";

export default function FlightPredictForm(props) {
  
  const [startAirportVal, setStartAirportVal] = useState("jfk");
  const [endAirportVal, setEndAirportVal] = useState("ord");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formObject = Object.fromEntries(formData);
    const jsonData = JSON.stringify(formObject);
    const endPoint = `${API_BASE_URL}/predict`;
    const response = await fetch(endPoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    });
    console.log("response", response);
    const data = await response.json();
    console.log("data", data);
  };
  return <form onSubmit={handleSubmit}>
    <AirportDropdown 
      value={startAirportVal}
      name='startingAirport' onChange={ e => setStartAirportVal(e.target.value)} />
    <AirportDropdown 
      name='destinationAirport'
      value={endAirportVal} 
      onChange={ e => setEndAirportVal(e.target.value)} 
      filterval={startAirportVal} />
    <button type="submit">Send</button>
  </form>
}
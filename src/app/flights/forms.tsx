import { API_BASE_URL } from "@/app/utils/apiClient";
import AirportDropdown from "../airports/dropdown";
import { useState } from "react";
import { PredictionResultTable } from "./table";

export default function FlightPredictForm(props) {

  const [startAirportVal, setStartAirportVal] = useState("jfk");
  const [endAirportVal, setEndAirportVal] = useState("lax");
  const [predictData, setPredictData] = useState({ loading: false, predictions: [], recommendation: {bestFlightOption: {}} });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (predictData.loading) return;
    setPredictData(prev => ({ ...prev, loading: true }));

    const formData = new FormData(event.target);
    
    //temporarily convert checkbox values to 1 or 0
    formData.set('isNonStop', formData.get('isNonStop') === 'on' ? '1' : '0');
    formData.set('isBasicEconomy', formData.get('isBasicEconomy') === 'on' ? '1' : '0');
    formData.set('isRefundable', formData.get('isRefundable') === 'on' ? '1' : '0');

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
    const data = await response.json();
    setPredictData(prev => ({
      ...prev,
      loading: false,
      ...data
    }));
  };

  const btnClassName = predictData.loading ? "btn-disabled" : "btn-primary";
  const btnLabel = predictData.loading ? "Loading..." : "Predict";

  return <div >
    <form className="space-2 md:space-y-3" onSubmit={handleSubmit}>
      <div className="grid md:grid-cols-2 md:gap-3" >
        <div>
          <label htmlFor="startingAirport">Starting Airport</label>
          <AirportDropdown
            value={startAirportVal}
            name='startingAirport' onChange={e => setStartAirportVal(e.target.value)} />
        </div>
        <div>
          <label htmlFor="destinationAirport">Destination Airport</label>
          <AirportDropdown
            name='destinationAirport'
            value={endAirportVal}
            onChange={e => setEndAirportVal(e.target.value)}
            filterval={startAirportVal} />
        </div>
      </div>
      <div className="grid md:grid-cols-6 md:gap-3">
        <div>
          <label htmlFor="isNonStop">
          </label>
          <input type="checkbox" id="isNonStop" name="isNonStop" />
          &nbsp;Non stop flight?
        </div>
        <div>
          <label htmlFor="isBasicEconomy">
          </label>
          <input type="checkbox" id="isBasicEconomy" name="isBasicEconomy" />
          &nbsp;Basic Economy?
        </div>
        <div>
          <label htmlFor="isRefundable">
          </label>
          <input type="checkbox" id="isRefundable" name="isRefundable" />
          &nbsp;Refunable?
        </div>
        <div className="md:col-span-3">
          <button disabled={predictData.loading} className={`${btnClassName} float-right`} type="submit">
            {btnLabel}
          </button>
        </div>
      </div>
  </form>
    {/* {predictData && predictData.recommendation? <div>{JSON.stringify(predictData.recommendation)}</div>: null} */}
    <PredictionResultTable 
      predictions={predictData && predictData.predictions } 
      recommendation={predictData.recommendation.bestFlightOption}
      startintAirport={startAirportVal}
      destinationAirport={endAirportVal}
    />
  </div>
}
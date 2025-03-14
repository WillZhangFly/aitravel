import { API_BASE_URL } from "@/app/utils/apiClient";
import AirportDropdown from "../airports/dropdown";
import { useState } from "react";

export default function FlightPredictForm(props) {

  const [startAirportVal, setStartAirportVal] = useState("jfk");
  const [endAirportVal, setEndAirportVal] = useState("lax");
  const [predictData, setPredictData] = useState({ loading: false, predictions: [] });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (predictData.loading) return;
    setPredictData(prev => ({ ...prev, loading: true }));

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
    const data = await response.json();
    setPredictData(prev => ({
      ...prev,
      loading: false,
      predictions: data && data.predict ? [...data.predict] : []
    }));
  };

  const btnClassName = predictData.loading ? "btn-disabled" : "btn-primary";
  const btnLabel = predictData.loading ? "Loading..." : "Predict";

  return <div><form onSubmit={handleSubmit}>
    <AirportDropdown
      value={startAirportVal}
      name='startingAirport' onChange={e => setStartAirportVal(e.target.value)} />
    <AirportDropdown
      name='destinationAirport'
      value={endAirportVal}
      onChange={e => setEndAirportVal(e.target.value)}
      filterval={startAirportVal} />
    <div>
      <label htmlFor="isNonStop">
        <input type="checkbox" id="isNonStop" name="isNonStop" />
        &nbsp;Non stop flight?
      </label>
    </div>
    <div>
      <label htmlFor="isBasicEconomy">
        <input type="checkbox" id="isBasicEconomy" name="isBasicEconomy" />
        &nbsp;Basic Economy?
      </label>
    </div>
    <div>
      <label htmlFor="isRefundable">
        <input type="checkbox" id="isRefundable" name="isRefundable" />
        &nbsp;Refunable?
      </label>
    </div>
    <button disabled={predictData.loading} className={btnClassName} type="submit">{btnLabel}</button>
  </form>
    {predictData?.predictions?.length > 0 && predictData.predictions.map((prediction, index) => {
        return <div key={`prediction-${index}`}>
          {JSON.stringify(prediction)}
        </div>
      }
    )}
  </div>
}
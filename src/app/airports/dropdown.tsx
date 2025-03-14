import performAPIGetRequest from "../utils/apiClient";

export default function AirportDropdown({ name, value, filterval = "", onChange }) {
  const { data, error, isLoading } = performAPIGetRequest("/airports");

  if (error) return <select><option>---Error---</option></select>;
  if (isLoading) return <select><option>---Loading...---</option></select>;

  const displayData = [...data].filter(x => x.value.toLocaleLowerCase() != `${filterval}`.toLocaleLowerCase());


  const handleChange = (event) => {
    if(onChange){
      onChange(event)
    }
  }

  return (<select name={name} onChange={handleChange}>{
    displayData.map((row, id) => {
      return <option key={`airport-${id}`} defaultValue={value} value={row.value}>{row.value} - {row.label}</option>
    })}
  </select>)
}
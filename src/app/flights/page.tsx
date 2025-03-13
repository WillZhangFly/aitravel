"use client" // make for frontend only

import Link from "@/app/utils/link";
import performAPIGetRequest from "../utils/apiClient";


export default function FlightListPage() {
  const { data, error, isLoading } = performAPIGetRequest("/flights");

  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  const renderListData = (row, id) => {
    const flightRowLink = `/flights/${row.id}`;
    return <div key={`flight-data-${id}`}>
      <p>
        <Link href={flightRowLink}>{row.flightDate}</Link>
      </p>
      <p>{row.startingAirport}</p>
      <p>{row.destinationAirport}</p>
      <p>{row.totalFare}</p>
    </div>
  }

  return (
    <div>
      {data && data.map(renderListData)}
    </div>
  );
}

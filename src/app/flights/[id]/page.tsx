"use client"
import performAPIGetRequest from "@/app/utils/apiClient";
import React from "react";
import notFound from "./not-found";
import Error from 'next/error'


export default function FlightDetailPage({ params}) {
  console.log("params", params);
  const { id } = React.use(params);
  const { data, error, isLoading } = performAPIGetRequest(`/flights/${id}`);

  if (error) {
    if (error.statusCode === 404) {
        notFound();
    }
    return <Error statusCode={error.status} />
  }
  if (isLoading) return <div>loading...</div>

  return (
  <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    <div>{JSON.stringify(data)}</div>
  </div>)
}
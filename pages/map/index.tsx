import React from 'react'
import Script from 'next/script';
import MapContainer from './mapContainer';

export default function MapPageController() {
  return (
    <>
      <Script
        src="//dapi.kakao.com/v2/maps/sdk.js?appkey=18a1a779c03cd51dc421996208ed9e7b&libraries=services,clusterer&autoload=false"
        strategy="beforeInteractive"
        defer
      />
      <MapContainer />
    </>
  )
}


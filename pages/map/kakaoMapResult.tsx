import React, { useEffect } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

type prop = {
  marker?: any;
};

export default function KakaoMapResult({ marker }: prop) {
  useEffect(() => console.log(`KakaoMapResult useEffect | content: ${marker.content} | lat: ${marker.lat} | lng: ${marker.lng}`), [marker])

  if (marker === undefined) return <div>not result</div>

  return (
    <Map
      center={{ lat: marker.lat, lng: marker.lng }}
      style={{
        width: "100%",
        height: "350px",
      }}
      level={3}
    >
      <MapMarker
        key={`marker-${marker.content}-${marker.lat},${marker.lng}`}
        position={{ lat: marker.lat, lng: marker.lng }}
      >
        <div style={{ color:"#000" }}>{marker.content}</div>
      </MapMarker>
    </Map>
  );
}

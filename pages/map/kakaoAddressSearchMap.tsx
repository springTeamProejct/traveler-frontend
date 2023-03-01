import React, { Dispatch, useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

type keywordProp = {
  propSearchAddress: string
  setSelectedAddressMarker: Dispatch<any>
};

export default function kakaoAddressSearchMap({ propSearchAddress, setSelectedAddressMarker }: keywordProp) {
  const [markers, setMarkers] = useState<any[]>([])
  const [map, setMap] = useState<any>()

  useEffect(() => {
    if (!map) return
    const geocoder = new kakao.maps.services.Geocoder()

    // propSearchAddress: '제주특별자치도 제주시 첨단로 242'
    geocoder.addressSearch(propSearchAddress, (data, status, _pagination) => {
      // 정상적으로 검색이 완료됐으면 
      if (status === kakao.maps.services.Status.OK) {
        const bounds = new kakao.maps.LatLngBounds()
        const markers: any[] = []

        for (var i = 0; i < data.length; i++) {
          // @ts-ignore
          markers.push({
            position: {
              lat: data[i].y,
              lng: data[i].x,
            },
            content: propSearchAddress,
          })
          // @ts-ignore
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x))
        }
        setMarkers(markers)
  
        map.setBounds(bounds)
      } 
    });
  }, [map, propSearchAddress])

  return (
    <Map // 로드뷰를 표시할 Container
      center={{
        lat: 37.566826,
        lng: 126.9786567,
      }}
      style={{
        width: "100%",
        height: "350px",
      }}
      level={3}
      onCreate={setMap}
    >
      {markers.map((marker) => (
        <MapMarker
          key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
          position={marker.position}
          onClick={() => setSelectedAddressMarker(marker)}
        >
        {/* {info && info?.content === marker.content && (
          <div style={{ color:"#000" }}>{marker.content}</div>
        )} */}
          <div style={{ color:"#000" }}>{marker.content}</div>
        </MapMarker>
      ))}
    </Map>
  )
}

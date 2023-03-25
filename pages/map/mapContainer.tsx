import React, { useEffect, useState } from 'react'
import SearchKeyword from './searchKeyword';
import KakaoKeywordSearchMap from './kakaoKeywordSearchMap';
import KakaoAddressSearchMap from './kakaoAddressSearchMap';
import KakaoMapResult from './kakaoMapResult';

export default function MapContainer() {
  const [keyword, setKeyword] = useState<string>('')
  const [selectedKeyeordMarker, setSelectedKeyeordMarker] = useState()

  const [address, setAddress] = useState<string>('')
  const [selectedAddressMarker, setSelectedAddressMarker] = useState()

  useEffect(() => console.log(`MapPageController keyword: ${keyword}`), [keyword])
  useEffect(() => console.log(`MapPageController setSelectedKeyeordMarker: ${JSON.stringify(selectedKeyeordMarker)}`), [selectedKeyeordMarker])


  useEffect(() => console.log(`MapPageController address: ${address}`), [address])
  useEffect(() => console.log(`MapPageController selectedAddressMarker: ${JSON.stringify(selectedAddressMarker)}`), [selectedAddressMarker])

  return (
    <div style={{ padding: '20px'}}>
      <KakaoKeywordSearchMap propSearchKeyword={keyword} setSelectedKeyeordMarker={setSelectedKeyeordMarker} />
      <SearchKeyword searchProp={keyword} setSerchProp={setKeyword} />
      <div style={{ backgroundColor: 'gray', width: '100%', height: '30px', margin: '20px 0px' }}></div>


      <KakaoAddressSearchMap propSearchAddress={address} setSelectedAddressMarker={setSelectedAddressMarker} />
      <SearchKeyword searchProp={address} setSerchProp={setAddress} />
      <div style={{ backgroundColor: 'gray', width: '100%', height: '30px', margin: '20px 0px' }}></div>


      <KakaoMapResult marker={{content: '케로로', lat: 37.8333430509277, lng: 126.993537446114 }} />
      <div style={{ backgroundColor: 'gray', width: '100%', height: '30px', margin: '20px 0px' }}></div>
    </div>
  )
}


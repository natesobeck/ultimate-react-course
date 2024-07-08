import { useNavigate, useSearchParams } from "react-router-dom"
import styles from "./Map.module.css"
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet"
import { useState, useEffect } from "react"
import { useCities } from "../contexts/CitiesContext"
import { useGeolocation } from "../hooks/useGeolocation"
import Button from "./Button"

const Map = () => {
  const { cities } = useCities()
  const [mapPosition, setMapPosition] = useState([40, 0])
  const [searchParams] = useSearchParams()
  const {isLoading: isLoadingPosition, position: geolocationPosition, getPosition } = useGeolocation()
  const lat = searchParams.get("lat")
  const lng = searchParams.get("lng")

  useEffect(() => {
    if (lat && lng) setMapPosition([lat, lng])
  }, [lat, lng])

  useEffect(() => {
    if (geolocationPosition) setMapPosition([geolocationPosition.lat, geolocationPosition.lng])
  }, [geolocationPosition])

  return (
    <div className={styles.mapContainer} >
      {!geolocationPosition && <Button type='position' onClick={getPosition}>{isLoadingPosition ? 'Loading...' : 'Use Your Position'}</Button>}
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>{" "}
              <span>
                {city.position.lat.toFixed(5)}, {city.position.lng.toFixed(5)}
              </span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
      {/* <button
        onClick={() => {
          setSearchParams({ lat: 23, lng: 50 })
        }}
      >
        Change position
      </button> */}
    </div>
  )
}

function ChangeCenter({ position }) {
  const map = useMap()
  map.setView(position)
  return null
}

function DetectClick() {
  const navigate = useNavigate()
  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  })
}

export default Map

import React, { useState, useEffect } from "react";
import { MapContainer, Polygon, TileLayer, Tooltip } from "react-leaflet";
import './map.css';
import borderData from './border-data'

// Makes adding CSS needed for leaflet much easier
import { Helmet } from 'react-helmet'

// set default lat, long and zoom, based on Rutland VT
const mapLat = '43.6106'
const mapLong = '-72.9726'
const mapZoom = '7'

// set map center
const center = [mapLat, mapLong]

// location of Covid case data by VT county
const vtCaseDataURL = 'https://services1.arcgis.com/BkFxaEFNwHqX3tAw/arcgis/rest/services/VIEW_EPI_CountyDailyCount_GEO_PUBLIC/FeatureServer/0/query?where=1%3D1&outFields=CNTYNAME,C_Total,date,D_Total,C_New,C_10k&outSR=4326&f=json'

function CovidMap() {

  const [countyData, setCountyData] = useState(null)

  // Use map function to extract coordinates that correspond to border of VT
  let vtBorder = borderData.geometry.coordinates[0].map(coordSet => {
    return [coordSet[1], coordSet[0]]
  })

  useEffect(() => {

    let dataObj = null

    // If data not fetched, read VT County geoJSON Data
    if (!countyData) {
      fetch(vtCaseDataURL)
        .then((res) => res.json())
        .then((data) => {
          // Pop last element out of data returned.  
          // Last element contains Pending case count info and no geometry data
          data.features.pop()
          dataObj = data
          setCountyData(dataObj)
        })
    }
  })

  // Render the Map 
  return (
    <div id="main-wrapper">
      <Helmet>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
          integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
          crossorigin=""
        />
      </Helmet>

      <MapContainer center={center} zoom={mapZoom} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Polygon positions={vtBorder} />

        <div>
          {countyData ? (
            countyData.features.map((points) => {
              let borders = points.geometry.rings[0].map(coordSet => {
                return [coordSet[1], coordSet[0]]
              })

              return (

                <Polygon positions={borders}>
                  <Tooltip><div>{points.attributes.CNTYNAME}</div>
                          <div>Total Cases To Date: {points.attributes.C_Total}</div> 
                          <div>New Cases: {points.attributes.D_Total}</div> 
                  </Tooltip>
                </Polygon>

              )
            })
          ) : (
              <p>...Loading</p>
            )}
        </div>
      </MapContainer>
    </div>
  );
}

export default CovidMap;

import React, { useState, useEffect } from "react";
import { Map, Polygon, TileLayer } from "react-leaflet";
import './App.css';
import borderData from './border-data'

// Makes adding CSS needed for leaflet much easier
import { Helmet } from 'react-helmet'

// set default lat, long and zoom, based on Rutland VT
const mapLat = '43.6106'
const mapLong = '-72.9726'
const mapZoom = '7'

// set map center
const center = [mapLat, mapLong]

// location of geoJSON file for VT county data
const vtGeoDataURL = "https://opendata.arcgis.com/datasets/2f289dbae90347c58cd1765db84bd09e_29.geojson"

function CovidMap() {

  const [countyData, setCountyData] = useState(null)

  let vtBorder = borderData.geometry.coordinates[0].map(coordSet => {
    return [coordSet[1], coordSet[0]]
  })

  useEffect(() => {

    let dataObj = null

    // If data not fetched, read VT County geoJSON Data
    if (!countyData) {
      fetch(vtGeoDataURL)
        .then((res) => res.json())
        .then((data) => {
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

      <Map center={center} zoom={mapZoom} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Polygon positions={vtBorder} />

        <div>
          {countyData ? (
            countyData.features.map((points) => {
              var borders = points.geometry.coordinates[0].map(coordSet => {
                return [coordSet[1], coordSet[0]]
              })
              return(
                <Polygon positions={borders}></Polygon>

              )})
          ) : (
              <p>...Loading</p>
            )}
        </div>
      </Map>
    </div>
  );
}

export default CovidMap;

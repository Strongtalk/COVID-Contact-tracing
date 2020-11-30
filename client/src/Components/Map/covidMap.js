import React, { useState, useEffect } from "react";
import { MapContainer, Polygon, TileLayer, Popup, Tooltip } from "react-leaflet";
import './map.css';
import borderData from './border-data'
import Footer from "../Contact/newFooter.js";

// Makes adding CSS needed for leaflet much easier
import { Helmet } from 'react-helmet'

// set default lat, long and zoom, based on Rutland VT
const mapLat = '44.0000'
const mapLong = '-72.5026'
const mapZoom = '7'

// set map center
const center = [mapLat, mapLong]

// location of Covid case data by VT county
const vtCaseDataURL = 'https://services1.arcgis.com/BkFxaEFNwHqX3tAw/arcgis/rest/services/VIEW_EPI_CountyDailyCount_GEO_PUBLIC/FeatureServer/0/query?where=1%3D1&outFields=CNTYNAME,C_Total,date,D_Total,C_New,C_10k&outSR=4326&f=json'

function CovidMap() {

  const [countyData, setCountyData] = useState(null)
  let [countyArticles, setCountyArticles] = useState([])

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

  async function getNewsLink(countyName) {

    let dataObj = null

    setCountyArticles([])
    // Read news articles
      await fetch('/news')
        .then((res) => res.json())
        .then((data) => {
          dataObj = data
          setCountyArticles(dataObj)
        })

    if (dataObj) {

      // Loop through each article
      for (const element of dataObj) {

        // loop and check if article is associated with current county
        for (const county of element.newsAudience) {

           // if article is associated with county that was clicked, place in array so it can be displayed
           if (county.toUpperCase() === countyName) {
            countyArticles.push(element)
          } 
        }
      }
    }
    setCountyArticles(countyArticles)
    return (countyArticles)

  }

  // Render the Map 
  return (
    <div id="mapPageContainer">
      <h2 id='mapTitle' >COVID-19 Vermont Map</h2>
      <h2 id='mapSubtitle' >Click on a County to see current case information</h2>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
          integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
          crossorigin=""
        />
      </Helmet>
      <div id='mapContainer'>
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
                  <Polygon
                    positions={borders}

                    eventHandlers={{

                      click: () => {
                        getNewsLink(points.attributes.CNTYNAME)
                      },
                    }}
                  >

                    <Popup>
                      <div>{points.attributes.CNTYNAME}</div>
                      <div>Total Cases To Date: {points.attributes.C_Total}</div>
                      <div>New Cases: {points.attributes.D_Total}</div>
                    </Popup>
                  </Polygon>

                )
              })
            ) : (
                <p>...Loading</p>
              )}
          </div>
        </MapContainer>
      </div>
      <h1 id='newsTitle'>News of Interest</h1>
        <div id="articleContainer">
          {countyArticles ? (
            countyArticles.map((id) => (
              <div id="newsLinks">
                <a  href={id.link} ><h4 id="articleLink" >{id.newsSummary.title}</h4></a>
              </div>
            ))
          ) : (
              <p>...Loading</p>
            )}
      </div>
      <Footer />
    </div>
  );
}

export default CovidMap;

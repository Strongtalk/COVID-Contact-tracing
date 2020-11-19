import React, { useState, useEffect } from "react";
import { MapContainer, Polygon, TileLayer, Popup, Tooltip } from "react-leaflet";
import './map.css';
import borderData from './border-data'

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

  function getNewsLink(countyName) {

    console.log(countyName)

    // Array to hold articles of interest for each county
    let countyArticles = []

    // Setup array for now to demo idea.  Article links could be stored in Mongo and could be fetched
    const newsArray =
      [
        {
          id: 1,
          headline: 'Pop up Testing Center',
          county: 'RUTLAND',
          link: 'wwww.google.com'
        },

        {
          id: 2,
          headline: 'Mayor implements curfew',
          county: 'CHITTENDEN',
          link: 'www.cnn.com'
        },

        {
          id: 3,
          headline: 'Restaurant Closures',
          county: 'RUTLAND',
          link: 'www.theatlantic.com'
        }
      ]

    for (const element of newsArray) {
      if (element.county === countyName) countyArticles.push(element)
    }
    console.log(countyArticles)
    setCountyArticles(countyArticles)
    return (countyArticles)
  }

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

      <h2>VT COVID Cases</h2>
      <div id='map-container'>
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
                      }
                    }}

                    onMouseOver={(e) => {
                      e.target.openPopup();
                      getNewsLink(points.attributes.CNTYNAME)
                    }}
                    onMouseOut={(e) => {
                      e.target.closePopup();
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
      <h4 id='news-header'>News of Interest</h4>

      <div>
      
        <div id="article-container">
          {countyArticles ? (
            countyArticles.map((id) => (
              <div id="news-links">
                <a id="article-link" href={id.link} >{id.headline}</a>
              </div>
            ))
          ) : (
              <p>...Loading</p>
            )}
        </div>
      </div>
    </div>
  );
}

export default CovidMap;

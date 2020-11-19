import React, { useState, useEffect } from "react";
import "./landingPage.css";
import Footer from "../Contact/newFooter.js";


function LandingPage() {

  const [newsArticles, setNewsArticles] = useState([])

  useEffect(() => {
    console.log('in use effect')

    let dataObj = []
    const newsDataURL = '/news'

    // If data not fetched, read news links from DB
    if (newsArticles.length === 0) {
      fetch(newsDataURL)
        .then((res) => res.json())
        .then((data) => {
          dataObj = data  
          console.log('Data is" ', data)
          setNewsArticles(dataObj)
        })
    }
  })

  return (
      <div id="articleContainer">
        <h1>COVID-19 News</h1>
        <div className="individualArticleContainer">

          <p>{newsArticles.length > 0 ? newsArticles.map((article) => {
            console.log('articles.url: ', article.url)
          return <ul href={article.url}>{article.headline}</ul>;
        }) : null}
          </p>
          <button className="continueReadingButton">Continue Reading</button>
        </div>
        <Footer />
      </div>
  );
}

export default LandingPage;

import React, { useState, useEffect } from "react";
import "./landingPage.css";
import Footer from "../Contact/newFooter.js";

function LandingPage() {

  const [isArticlesLoading, setArticlesLoading] = useState(false);
  const [newsArticles, setNewsArticles] = useState(null)
  
  // useEffect to read news links from app data store
  useEffect(() => {

    // endpoint for retrieving relevant news stored in App data store
    const newsDataURL = '/news'

    // If data not fetched, read news links from DB
    if (!newsArticles) {
      setArticlesLoading(true);
      fetch(newsDataURL)
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          setNewsArticles(data)
          setArticlesLoading(false)
        })
    }
    
  }, [newsArticles])

  // Render the page
  return (
    <div id="landingPageContainer">
      <h1 id='landingPageTitle' >COVID-19 News</h1>
      <div>
        {isArticlesLoading && (
          <div>
            <p>...Loading</p>
          </div>
        )}
        {!isArticlesLoading && newsArticles && newsArticles.length === 0 && (
          <div>
            <p>No current news ...</p>
          </div>
        )}
        {!isArticlesLoading && newsArticles && newsArticles.length > 0 && (
          <div className="articleContainer" >{newsArticles.map((article, index) => {
            console.log(newsArticles)
            console.log('render article is: ' , article)
            return (
              <div className='individualArticleContainers' key={index}>
              <h3 className="newsTitle">{article.newsSummary.title.toUpperCase()} </h3>
              <p className='newsText' >{article.newsSummary.description}</p>
              <a className='aTag'  rel="noreferrer" target='_blank' href={article.newsSummary.url}><h2 
              className="continueReadingButton" >Continue Reading</h2></a>
            </div>
          )
        })}
        </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default LandingPage;

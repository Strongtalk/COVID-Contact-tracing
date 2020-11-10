import "./App.css";

function LandingPage() {
  return (
    <div>
      <body>
        <div id="articleContainer">
          <h1>COVID-19 News</h1>
          <div class="individualArticleContainer">
            <h3 class="newsTitle">Article One</h3>
            <p>News News News</p>
          </div>
          <button class="continueReadingButton">Continue Reading</button>
          <div class="individualArticleContainer">
            <h3 class="newsTitle">Article Two</h3>
          </div>
          <button class="continueReadingButton">Continue Reading</button>
          <div class="individualArticleContainer">
            <h3 class="newsTitle">Article Three</h3>
          </div>
          <button class="continueReadingButton">Continue Reading</button>
        </div>
        <div id="footerContainer">
          <h2>Contact Contact Contact</h2>
        </div>
      </body>
    </div>
  );
}

export default LandingPage;

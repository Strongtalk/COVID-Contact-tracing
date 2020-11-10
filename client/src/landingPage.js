import "./App.css";

function LandingPage() {
  return (
    <div>
      <body>
        <h1 id="headerTitle">Header</h1>
        <div id="articleContainer">
          <div class="individualArticleContainer">
            <h3 class="newsTitle">Article One</h3>
            <p>News News News</p>
            <button class="continueReadingButton" >Continue Reading</button>
          </div>
          <div class="individualArticleContainer">
            <h3 class="newsTitle">Article Two</h3>
            <button class="continueReadingButton">Continue Reading</button>
          </div>
          <div class="individualArticleContainer">
            <h3 class="newsTitle">Article Three</h3>
            <button class="continueReadingButton">Continue Reading</button>
          </div>
        </div>
        <div id="footerContainer">
          <h2>Contact Contact Contact</h2>
        </div>
      </body>
    </div>
  );
}

export default LandingPage;
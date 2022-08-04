const qouteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');

// Get Quote From API
async function getQuote() {
  const apiURL = "https://api.quotable.io/random";
  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    // Reduce font-size of quote if it is too long
    if (data.content.length > 120) {
      quoteText.classList.add('long-quote');
    } else {
      quoteText.classList.remove('long-quote');
    }
    quoteText.innerText = data.content;
    // If Auhtor is not available, then display 'Unknown'
    quoteAuthor.innerText = data.author === '' ? 'Unknown' : data.author;
  } catch (error) {
    getQuote()
    console.log('Oops, something went wrong.', error);
  }

}

function tweetQuote() {
  const quote = quoteText.innerText;
  const author = quoteAuthor.innerText;
  const tweetUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(tweetUrl, '_blank');
}

twitterBtn.addEventListener('click', tweetQuote);

newQuoteBtn.addEventListener('click', getQuote)

// On Load
getQuote()
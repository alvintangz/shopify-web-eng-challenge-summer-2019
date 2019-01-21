# Shopify Web Engineering Challenge Summer 2019
A web application that searches for waste items using the Toronto Waste Wizard database, developed for Shopify's Web Engineer Challenge for the summer of 2019. View the hosted application [here](https://alvintang.me/shopify-web-eng-challenge-summer-2019/).

## Acknowledgments
I acknowledge that the libraries, services, or images listed below were used.
- Open Sans on Google Fonts
- jQuery
- mustache.js
- Toronto Waste Wizard Lookup data
- Search strong icon - MIT License
- [Font Awesome Solid Star](https://fontawesome.com/icons/star?style=solid) - [LICENSE](https://fontawesome.com/license)

## Short Insights
### Use of Hosted Resources
I always try to use minified resources that are CDN hosted whenever possible, because these resources will most likely be cached in a user's browser. For example, the jQuery library hosted by Google is very popular, so that means that the file could most likely be cached within a typical user's browser. Also, with that being hosted by Google, the jQuery library will be quickly and easily requested by the browser as Google has a strong CDN infrastructure around the world, and minified files allow for the file size to be smaller which makes the request by the browser quicker.
### Scripts at the Bottom
I always load scripts at the bottom so the most of the page can load earlier, rather than wait, if these script resources cannot be loaded.
### Expect the Unexpected
Always try to expect users that may not follow the browser requirements set forth by the code written by you, especially when your app has a large varying user base. For example, I have written a message for those users who don't have JavaScript enabled, which is very rare. This is just an example that was implemented to get my point across, and I am expecting that anyone using my application is not using it for practical terms, so new standards, that very few browsers haven't kept up with, like flexbox were implemented.

## Further Improvements
Since I was limited by the time and scope of the rules, I did not know what I could/should or could/should not implement. Here's a list of suggested further improvements:
- Ignore and remove those items in favourites that were saved before, but cannot be found now; cannot expect that the data provided will not change
- Make it such that the favourites section isn't completely refreshing after each change; can be disturbing if a user scrolls to a specific favourite and a change is made (they are scrolled back to the top of favourites as of this implementation)
- Test the app on older browsers and make adjustments; works on mobile and desktop chrome versions and firefox perfectly as of now
- Search input should be case insensitive (it is case sensitive to keywords for now)
- Search input should be checked against each keyword (it is checked against a list of keywords in a string for now)

## Suggestions for Improvements
Feel free to contact me at [alvin.tang@mail.utoronto.ca](mailto:alvin.tang@mail.utoronto.ca) if you have any advice about have I should have implemented this, or any suggestions for improvements.
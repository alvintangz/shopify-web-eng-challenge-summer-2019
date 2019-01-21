# Shopify Web Engineering Challenge Summer 2019
A web application that searches for waste items using the Toronto Waste Wizard database, developed for Shopify's Web Engineer Challenge for the summer of 2019. View the hosted application [here](https://alvintang.me/shopify-web-eng-challenge-summer-2019/).

## Acknowledgments
I acknowledge that the libraries, services, or images listed below were used.
- Google Fonts
- jQuery.js
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

## Improvements
Feel free to contact me at [alvin.tang@mail.utoronto.ca](mailto:alvin.tang@mail.utoronto.ca) if you have any advice about have I should have implemented this, or any suggestions for improvements.
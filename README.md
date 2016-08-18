# NewTHR

This is an experiment to see if I can rewrite
[Tar Heel Reader](http://tarheelreader.org) as a universal React app using
fluxible.

I started with the fluxible template.

My goal is a [progressive web app](https://developers.google.com/web/progressive-web-apps/) that is accessible, multi-lingual, compatible with old browsers and works even with with javascript disabled.

Ideas and things to do:

1. I can make choosing Favorites work even with js disabled using the :checked trick I found on MDN as illustrated [here](https://codepen.io/gbishop-1471544451/pen/jARbvd).
2. Setting is just another page.
3. I imagined I could make pages cacheable but it seems that if I put sufficient state in the URL to avoid cache issues, then the likelyhood of benefiting from it will be really small. For example, you do a search, then choose a book, and after reading it you want to go back. All of those pages must record the query parameters of the search in order to return to properly to the search results. I don't see a way around it unless I used some crazy iframe hack to keep the search results present while the book is read in a screen filling iframe. **Could that work?**
4. Does caching even matter? Try to estimate how many current THR users visit without js and how many we might serve in the future. About 3.4% of our non-bot ips over the last year had javascript disabled.


# NewTHR

This is an experiment to see if I can rewrite [Tar Heel Reader](http://tarheelreader.org) as a universal React app using [fluxible](http://fluxible.io/).

I started with the fluxible template.

My goal is a [progressive web app](https://developers.google.com/web/progressive-web-apps/) that is accessible, multi-lingual, compatible with old browsers and works even with with javascript disabled.

Ideas and things to do:

1. I can make choosing Favorites work even with js disabled using the :checked trick I found on MDN as illustrated [here](https://codepen.io/gbishop-1471544451/pen/jARbvd). Page urls could be /find/, /choose-favorites/, /favorites/, and /edit-favorites/.
2. Setting is just another page.
3. In order to make pages cacheable we'd need to put all the state in the URL. This wouldn't be so bad except for the list of favorites. It seems wrong to share a book URL and have it share the favorites also. Perhaps the favorites live in the cookie? I could proxy cache on the server and include the cookie content in the cache key. This helps take load off the server. Over the last year the longest favorites list were also 250 books long! Carry that in all the URLs would be crazy. 
4. Does caching even matter? Try to estimate how many current THR users visit without js and how many we might serve in the future. About 3.4% of our non-bot ips over the last year had javascript disabled. So caching to help the site hardly matters but it might help the poor user out there on the end of a terrible connection.


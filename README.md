# NewTHR

This is an experiment to see if I can rewrite [Tar Heel Reader](http://tarheelreader.org) as a universal React app using [fluxible](http://fluxible.io/).

I started with the fluxible template.

My goal is a [progressive web app](https://developers.google.com/web/progressive-web-apps/) that is accessible, multi-lingual, compatible with old browsers and works even with with javascript disabled.

Ideas and things to do:

1. I can make choosing Favorites work even with js disabled using the :checked trick I found on MDN as illustrated [here](https://codepen.io/gbishop-1471544451/pen/jARbvd). Page urls could be /find/, /choose-favorites/, /favorites/, and /edit-favorites/.
2. Setting is just another page.
3. In order to make pages cacheable we'd need to put all the state in the URL. This wouldn't be so bad except for the list of favorites. It seems wrong to share a book URL and have it share the favorites also. Perhaps the favorites live in the cookie? I could proxy cache on the server and include the cookie content in the cache key. This helps take load off the server. Over the last year the longest favorites list were also 250 books long! Carry that in all the URLs would be crazy. 
4. Does caching even matter? Try to estimate how many current THR users visit without js and how many we might serve in the future. About 3.4% of our non-bot ips over the last year had javascript disabled. So caching to help the site hardly matters but it might help the poor user out there on the end of a terrible connection.

Project Features/Current Progress - Spring 2017

isomorphic rendering (not part of current project)
	- Github link: 
	- Borrowed template from github repo: [isomorphic-500](https://github.com/wuTims/tarheel-reader)
		- Essentially used isomorphic500 as base and inserted NewTHR components into it
	- Render page even if Javascript is disabled
	- Decided by Professor Bishop that no longer needed
		- Very small percentage of requests had Javascript disabled
			- The few requests that did were outliers/strange	


handle held key presses (not part of current project)
	- Github link: [demo](https://github.com/wuTims/tarheel-reader/blob/master/src/components/About.jsx)
	- Used npm package 'react-key-handler'
	- Custom React component that accepts properties to handle key events
	- Only implemented small action as proof-of-concept 
	- Prevents held key-down from continuously firing events


service worker (current project)
	- Followed Google's 'First PWA' tutorial for setting up service worker
		- Link: [First PWA Tutorial](https://codelabs.developers.google.com/codelabs/your-first-pwapp/)
		- Recommends using 'sw-precache' package
	- Used to help cache application shell
		- Core components that make up application
		- Enables loading regardless of internet connection
	- Runs the script from Home.jsx component
		- Probably could have it run from 'client.js'
	- Had to make sure 'server.js' uses directory 'sw'
		- Otherwise, client-side is unable to locate the 'register-worker' script
	- Make sure to check if application is currently running on browser
		- Otherwise, node will throw errors
			- Not recognizing object 'navigator' since it only exists in browsers



cacheing/local storage (current project)
	- Still following Google's 'First PWA' tutorial
		- Recommends using 'idb' package
	- Used to store the files/data that may be needed for offline use
		- Store books/json data that can be loaded from cache
	- 'Find.jsx'
		- Changed base URL to 'http://test.tarheelreader.org' for testing requests
		- Modified jsx to display JSON data
			- Author name, Book Title, and Book Image
	- 'findBooks.js'
		- Modified base URL to 'http://test.tarheelreader.org/find?json=1' to get JSON data
	- Attempted to use idb-wrapper and localStorage
		- idb-wrapper
			- Used in 'bookDBservice.js'
			- Database registers successfully 
			- Can call the 'put' method to store JSON data
			- ERROR gets thrown at something that isn't defined
				- Unsure if setup is incorrect or the package itself
			- Couldn't get idb-wrapper to work, but looks promising
		- localStorage
			- Used in 'Find.jsx'
			- localStorage.books table can be viewed in Chrome developer console
			- Unfortunately the table is always empty
				- Tried storing books JSON in localStorage.books in other files but also didn't work
			- May be lack of complete understanding of how the BookStore works
				- Need to understand when the props.books object is populated 
				- Thought it should be populated by componentDidMount(), but isn't
				- Possible meet with Professor Bishop to understand exactly when and where books is populated on client-side
					- Then store in localStorage.books

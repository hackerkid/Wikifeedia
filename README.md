![Wikifeedia](https://github.com/hackerkid/Wikifeedia/blob/master/static/wikifeedia.png) 
##Wikipedia delivered as a Newsfeed

I love Wikipedia. It is the first place I would go in the World Wide Web  whenever I want to learn more about some stuff. Like me most of the netizens use Wikipedia only when they want to learn more about something and not for fun like Quora. I consider this as a problem.  [Wikifeedia](http://vishnuks.com/Wikifeedia) was made to fix that problem.  

##How it works?

The home page of Wikifeedia consist of a news feed of Featured articles. Featured articles are considered to be the best articles Wikipedia has to offer, as determined by Wikipedia's editors. As of now there is no API for getting a list of featured articles that changes each time one make a request. To facilitate this I had to to make a new API server along with some Javascript tweaks in Browser.  

The backend of Wikifeedia API can be found [here](https://github.com/hackerkid/Wikifeedia-Backend).

##Running in your system
```
git clone https://github.com/hackerkid/Wikifeedia/
cd Wikifeedia
python -m SimpleHTTPServer
```
Now browse to localhost:8000 to view the site. 
Note: Equivalent python3 command is python3 -m http.server

There is no backend as all the data is retrieved via external APIs. 

##Contributing
The website is made mostly of Javascript. It would be great if the new contributions are implemented in Browser rather than in server as I have no plan now for moving the website from Github pages as of now. There is a great amount of work to be done in improving the UI of the Website. The search results can be also improved. Wikipeedia uses `js-beautify` as the standard style. Check the code with it before sending pull requests. 

Send pull requests only to the master branch. 

##Contributors
* [Adarsh Nair](https://github.com/adarshnair01)
* [Anurag Sharma](https://github.com/anurageldorado)
* [Vishnu Ks](https://github.com/hackerkid)

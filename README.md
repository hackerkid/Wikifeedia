![Wikifeedia](https://github.com/hackerkid/Wikifeedia/blob/gh-pages/static/wikifeedia.png) 
##Wikipedia turned into a Newsfeed

![alt tag](https://github.com/gauthamzz/Wikifeedia/blob/gh-pages/gif.gif)

##How it works?

The home page of Wikifeedia consist of a news feed of Featured articles. Featured articles are considered to be the best articles in Wikipedia. As of now there is no API for getting a list of featured articles that changes each time one make a request. To facilitate this I had to to make a new API server along with some Javascript tweaks.

The backend of Wikifeedia can be found [here](https://github.com/hackerkid/Wikifeedia-backend).

##Installation 
```
git clone https://github.com/hackerkid/Wikifeedia/
cd Wikifeedia
python -m SimpleHTTPServer
```
Now browse to http://localhost:8000 . 

Equivalent python3 command is `python3 -m http.server` 


##Contributing
Your code goes live the moment it gets merged. Excited? Here is a small list of ToDos you can start working right now. 

###TODO
* Improve the UI.
* The search results can be improved.
* Custom home page
* Implement any MV* framework ( preferably Backbone / React )

Your own ideas are also welcome as pull requests. 

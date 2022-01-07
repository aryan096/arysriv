# Website Template 

This branch will hopefully allow people to just use my website by quickly changing values. I also attempt to simplify adding content to my website as much as possible. I could have used better ways to store website information but I chose to be lazy, and thought I wouldn't be editing my website that much. 

1. ~/src/public/data.js contains variables that change the information displayed on the home page, as well as the social media and resume buttons everywhere. Edit it! Put a link to a png file to be the logo in the navbar. 

2. ~/src/public/projectData.js is where you put in the content you want to be on the Work page. Edit it! Put in the id, title, description, and content. The content should be written in Markup. You can use a website like StackEdit to create the blogs and then put the markup code into the content variable. All images you mention within the markup should be put in the ~/public folder. In fact, every asset you use in the website goes in this folder.

3. That's it, really. You should now have a website that works and is yours. It is pretty basic but that might be what you want! :)


# Running and Publishing

This is where things get a little tricky. You need to have Node.JS and NPM installed. Do that first. 

Now, you need to build the website. The command for that is - 
```
npm run build 
```

Now, start the website - 
```
npm start 
```
This should start a local server and open up the webpage at the localhost. If it doesn't open automatically, you can just open the page at the localhost address in your browser.


Once you have a website that you are happy with and want to put it on the interwebz, reach out to me.
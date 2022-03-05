# rick-and-morty


## Project structure

    .
    ├── dist                                 # Compiled and minified files for production
    ├── public                               # Assets and static files of the project like icons
    ├── src                                  # Source files
    │   ├── App.tsx                          # Main/Root component which will be attached to the DOM
    │   ├── components                       # Global Components
    │   │   └── Card                         # Card component as an example
    │   │      ├── index.tsx                 # Every component has an index.tsx file
    │   │      ├── style.scss                # Every component has an style.scss file
    │   │      └── skeleton.tsx              # Skeleton for the component
    │   ├── api                              
    │   │   └── index.tsx                    # Makes an axios instance with our base url
    │   ├── routes                           # All components acting as page for routing
    │   │   └── Home                         
    │   │        └── index.tsx               # Home route as an example
    │   └── theme                            # All theme related files like our css global variables
    └── README.md




## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn dev
```

### Compiles and minifies for production
```
yarn build
```

### Customize configuration
See [Vite Configuration Reference](https://vitejs.dev/config/).

# Description

### Styles
- Every component has a style.scss file which is imported in index.tsx file.
- In style files, we select the class names which are written regarding BEM convention.
- In naming classes for each component we use a "ram" (short for rick and morty) prefix due to prevent conflicting with other libraries styles. Like "bootstrap" in our case.

### Components

#### Card
The card component renders a character's data like name, location, image... via it's prop: `character`<br>
The `fallback` prop handles showing the skeleton of the component while we're fetching the character's data. It's important to note that we're 
showing the skeleton of the component in two different phases, one is when we're fetching the character's data and there's no response yet.
another is when the data is ready, but the character's image has not been loaded yet. so these two phase occur after each other and when the
image loads then we show the full info including image. I believe we could improve this part by showing our texts
like character's name before the image fully loads because they are ready and better to be shown. 

#### Navbar
Simply renders the name of the project on top of each page which is wrapped by the link to the home page.


### hooks

#### useEpisodeNames
This hook was written supposing that the episode's data (specifically names) via the query is a pattern that will be used in other pages and components.

#### useIntersectionObserver
This hook sets an intersection observer on the received target element and calls the received onIntersect callback when the element intersects with the observer's root. The observer's will be removed with unmount.

### Routes
#### Home
The home page of the application. It makes the first query for getting characters when mounts, then renders a Card component per character. <br>
When we scroll to the end of first query response (here equals to 20) the request for getting next data is made. This part is implemented by Infinite Scroll of React query. For more info see [here](https://react-query.tanstack.com/examples/load-more-infinite-scroll).
#### Profile
The profile page is a dynamic route in the application. It gets the id of the character from router and with the id makes the specific character's request.<br>
After the character query's response we need two more requests here. The first one is the location's query in order to show character's location information if exists,
and the next one is episodes query.<br>
Considering that the number of episodes to request for their information may be a big number,
we implemented a hook for handling the logic of chunking these episode numbers and making request for each chunk.






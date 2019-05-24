
Introduction
Since we don't have an enormous amount of time, the approach we'll take is to first provide a high level overview of the Arc ecosystem and products, as well as the requirements necessary to build our first webpage in PageBuilder, and then treating this as more of a workshop, or hackathon, rather than just a group reading of documentation; learning through building, rather than just theory.

The goal at the end of these sessions will be to create a simple prototype resembling an actual homepage, which will highlight the powerful customization capabilities of PageBuilder, as well as innovative architectural approaches to rapidly build and deploy new types of content and views. By building this way we will also gain a deeper understanding of real world use cases from an end user's perspective.

Note: While this training will be conducted in Spanish, we will be referencing many technical terms in their native English, since that is how they will, as of this moment, be supported.


ARC Ecosystem
Products - 

ANS
Everything begins with data. 
JSON object model for all page content. Returned payload from endpoint querying


Sample Queries


PageBuilder

Creating a Feature Pack
Fusion applications are managed by the Arc Fusion CLI. The CLI is what we'll use to create and run our Feature Pack, as well as perform various maintenance tasks. It is similar to tools like create-react-app.


To install and run the CLI tool, first we need Node.js and its package manager, npm installed. If you don't have them already, go ahead and download and install Node.js (which includes npm).


While it's possible to install the Fusion CLI module globally (with npm i -g @arc-fusion/cli), we're instead going to install the CLI locally as a devDependency of our app and run it using NPM's script executor, <code>npx</code>. This gives us the benefits of 1) not having to worry about whether our globally installed Node modules are in our system PATH, and 2) being able to keep our CLI versions in sync across team members, since it will be tagged in our package.json.



Initializing a Feature Pack
Create a directory for the Feature Pack and cd into it. We'll call this one DevTraining.


$ mkdir DevTraining
$ cd DevTraining

Using npx, we're going to install the Fusion CLI and execute its init command to create the skeleton of our repository:


$ npx @arc-fusion/cli init
NOTE

If you installed the @arc-fusion/cli as a global module instead of via npx, you can simply run fusion init in the directory you created to initialize the repo. In the future, when this documentation references a command such as npx fusion some-command, you will simply run fusion some-command, without the npx prefix, to invoke its global equivalent.


Run ls on the directory now, you should see that there are several files and folders created in your directory, and that your package.json lists @arc-fusion/cli as a devDependency.

A description of what just happened:

npx downloaded the @arc-fusion/cli package and ran its init command, which created the skeleton of our repository's file structure
The init command also initialized the folder as an NPM package and created a package.json file
Finally, the @arc-fusion/cli was added to our package.json as a devDependency, so we can use it later to run further commands via npx.


Examining the Feature Pack
While you probably don't want to remove or rename any files or directories in the Feature Pack that are listed here (Fusion expects them to be there), it's ok to add more files or directories as needed (for example, maybe a /utils/ directory for utility functions).


Directory structure
/components/: 
chains/: Code for chain components.
features/: Code for feature components.
layouts/: Code for layout components.
output-types/: Code for output-type components.
/content/: 
schemas/: This directory holds GraphQL query objects that content sources can use to request specific data shapes.
(New version of Fusion no longer requires schemas, so can be ignored for now)
sources/: This directory holds code used to define content sources used by your Feature Pack.
/data/: 
dumps/: Directory where database dumps can be exported.
restore/: Allows you to manually restore your database from a tarball.
/environment/: Directory for defining environment values available on the server only. These values can be encrypted and used for secret values like credentials.
/node_modules/: You shouldn't have to edit this directory manually, and it is gitignored.
/properties/: This directory is meant for non-secret "site" properties whose values can differ on a per-site basis. They are available in components.
sites/: This directory holds the site specific overrides of the default site properties.
index.js{on}: This file holds the default site properties. It can either export a JavaScript object or be a simple JSON file.
/resources/: This directory is for static resources like images, CSS, fonts and more that don't need processing.
/.dockerignore: Reference. Consider this read-only.
/.env: This file is git-ignored and development environment specific. You'll specify environment variables here used by Docker and Fusion.
/.gitignore: Reference
/package-lock.json: A lockfile derived from installing the dependencies in package.json. Reference. Consider this read-only.
/package.json: Manifest file where you can declare dependencies or devDependencies you wish to use in your application, as well as for handy scripts. Reference.




Setting up Environment Variables
In the root directory of your new Fusion bundle, find the.envfile. Ensure that the values for the following variables are filled in correctly:


CONTENT_BASE=https://<redacted>:<redacted>@api.sandbox.demo.arcpublishing.com

For theCONTENT_BASEvariable, you can get the API username and password you need from the Arc Admin staging page to replace the "redacted" placeholders above. You'll need access to the Admin page first though. If you do not have the credentials handy, reach out to the account manager or contact the support team, who will be able to assist you with getting the credentials.


Populating the Admin Database
In order to populate existing configuration options the PageBuilder Admin relies on like pages, templates, resolvers and more, you'll need values for your database. If you are OK starting all this from scratch (i.e. with no data), you can skip this section.


You'll need to find an existing PageBuilder instance to download a database copy from. You can navigate to an existing PageBuilder instance from Arc Admin, or simply use PageBuilder Staging if you don't have an existing PageBuilder instance you'd like to pull data from.
Download the latest tar file by clicking on the "PB_DATA" tile in Trident Admin.
Drop the.tar.gzfile into your Fusion repo's/data/restoredirectory. The next time you run Fusion (or if you're already running it), Fusion will restore the values in this tarball as those in your DB.
You can confirm the data restoration worked by going to the"Pages" section of PageBuilder Adminto see a list of pages that were in your DB dump (assuming you had some).


Docker
The Fusion engine and servicesrun in Docker containers for local development. To do so, you'll need todownload and install Dockerif you haven't already. Once you've installed Docker, you'll probably want toallocate at least 6GB of RAMto run all the services Fusion requires.


Starting Fusion
To start the Fusion engine run:


$ npx fusion start

This will start up the Fusion engine, as well as a PageBuilder Admin instance. It may take a while for this command to run the first time, as Docker needs to download copies of all the correct images before starting them. In the future, this step will be much quicker as Docker will already have these images downloaded.


Accessing the Admin
You should see log messages in your command line console - once they stop updating, try visitinghttp://localhost/pf/adminto see the PageBuilder Admin. 

If you previouslydropped a <code>.tar.gz</code> file into the <code>/data/restore</code> directory of your Feature Pack, you should see the data from that database reflected in the Admin (for example, any pages, templates or resolvers in the DB should show up in the Admin). For now though, we'll assume you're starting your database without data.


Even though the Fusion engine is running, it's not doing anything yet because we don't have components for it to render. As we create components, Fusion will watch (hot reload) our feature pack and let the Admin know about changes to features, chains and layouts in our Feature Pack.


Note: If new files are added, Fusion must be stopped and restarted, hot reloading will not automatically detect new files.



Stopping the Server
Anytime you want to stop running Fusion, you can run:


$ npx fusion down

in your command line (you may also be able to simplyCTRL+Cin the same Terminal window as your initialnpx fusion startcommand). 

To check if all the Fusion services have stopped running, run:


$ docker ps

which will tell you a list of all running Docker services - if any entries show up, it means you're still running something on Docker.


Check out the list of"Helpful Commands" in our Local Fusion Development guidefor more ways to start, stop and troubleshoot Docker, or look in thepackage.jsonfile in the root of your repo for the definitions of the commands themselves.




Creating and Using Output Types
The first component to create in our Feature Pack is a default Output Type. You can think of an Output Type component as the outer "shell" of our HTML web page. It defines the<head>element and its contents, as well as parts of the<body>including the root element of our React application.


Every Fusion web page needs to have an Output Type. Output Types are the only type of component in our Feature Pack that areexclusivelyrendered server side - because they contain the actual root of the HTML web page itself - they can't be re-rendered client side. For this reason, Output Type components are a useful entry point for static resources like stylesheets, scripts and more that should be included in the HTML source code of our web page.


Using Output Types
We can have multiple Output Type components per Feature Pack. Common use cases for additional Output Types include rendering specifically for mobile devices, or for platforms like Google AMP that require special configuration. As long as the page the user requests has anoutputType=query parameter in the URL, the value of that parameter will be the name of the Output Type component used to render the page. If there is no Output Type component found by that name, Fusion falls back to the default Output Type component.


Writing our First Component
Create a new file in the/components/output-types/directory nameddefault.jsx. The namedefault is important because it denotes to Fusion that this is the Output Type we should use, unless a different one is specified.


Here is the code for our first Output Type component:


/*    /components/output-types/default.jsx    */
/* React */
import React from 'react'

export default (props) => {
  return (
    <html>
      <head>
        <title>{props.metaValue('title') || 'Default Title'}</title>
        <props.MetaTags />
        <props.Libs />
        <props.CssLinks />
        <link rel='icon' type='image/x-icon' href={props.deployment(`${props.contextPath}/resources/img/favicon.ico`)} />
        <link rel='stylesheet' href='https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css' />
      </head>
      <body>
        <h1>Welcome to Fusion!</h1>
        <div id='fusion-app' className='col-12'>
          {props.children}
        </div>
        <props.Fusion />
      </body>
    </html>
  )
}


Code Explained
A React functional component that accepts props as an argument, and immediately returns some JSX as its output. Most of this output is simply part of the standard HTML skeleton of our web page (the<html>,<head>, and<body>tags).

If we wanted to include static resources like links to stylesheets, third-party scripts or other code that should be rendered server side only at a specific point in the<head>or<body>tags, we could add that to our Output Type component like we normally would in an HTML web page. 

In this example, we're loadingBootstrap CSSinto our page from a CDN, so we can rapidly prototype with a grid system.


The parts of our component that are unique and interesting to Fusion are thepropswe are using to render dynamic portions of the page. 


<props.MetaValue name='title' />gets a meta value by name (in this case, the page title) that was set in the Admin and prints it. Here we're using plain JS to fallback to a Default Title if the metaValue doesn't exist.
<props.MetaTags />renders<meta>tags for any meta info provided to us by the Admin.
<props.Libs />includes the client side React library, as well as the component specific script for our single page app to render itself and handle events. Without this line, our code won't work client side!
<props.CssLinks />renders<link>tags for stylesheets that are generated based on any CSS files imported into the components being used on this page. We could have alternatively inlined our CSS for platforms like AMP that require it.
props.deploymentis a function that wraps our local resources with a version number, so static resources included with different deployment versions don't collide.
props.contextPathis a helper that returns the root web path of our page. We can use it to prefix URLs we want to include on the page, like for our favicon above.
props.childrenis a React standard prop, but for our purposes it will include all the other components (layouts, chains, and features) that were configured in the Admin to exist on the page. Without it, none of the content on our page gets displayed.
<props.Fusion />bootstraps data from the server that will hydrate our React components.

There are more Output Type-specific methods available to us that arelisted in the Output Type API documentation, along with those above, but this is enough to render something simple for now.


One more subtle but important piece of code is theid='fusion-app'attribute applied to the<div>tag in our page body. It's important that thisidexists and is preciselyfusion-app, as this will be the hook that Fusion looks for to re-mount the app on the client side. Without it, our application won't know what element to mount to on the page, and won't work client side.


Seeing Output
To do so, we'll need to go into thePageBuilder Admin and define a sample page to work with.


NOTE

Reminder - at this point, you may need to restart your Fusion application for it to find the new Output Type file you've created. To do so, hitCTRL+Cand then re-runnpx fusion start. Because of the way Webpack works, Fusion often doesn't know about newly created components until the application is restarted. If you create a new file and it doesn't show up in PageBuilder as expected, this may be the problem.



Create a new page called "Homepage" at the path/homepage

Once you've created your page, you should be redirected to the Page Editor view, with a preview on the right. 

That preview pane won't show any content from our Output Type component - the preview pane only shows contentwithinthe Output Type. However, if we publish the page and make it "live", then visithttp://localhost/homepage, we should see our webpage with a big "Welcome to Fusion" message at the top.


Now that we know our Output Type is working, we can remove the "Welcome to Fusion" header since we won't need it.


NOTE

If you see an error message about the Output Type component not being found, or if the page isn't rendering, you may need to trigger a manual rebuild of the bundle. You can do so by runningnpx fusion rebuildfrom the root of the repo.




Creating a Movie Detail feature
Let's create a simple Feature to display the title and details for a movie from a content source. 

Create a new directory named movies in the /components/features/ directory, and a file within that folder called movie-detail.jsx.


NOTE

Feature components, unlike other components, are stored in directories based on their "group". A "group" is just a namespace of related Features - you might have an article group that contains headline and mainStory Features, for example. Here, the "group" we're creating is called movies, so we create a directory with that name and store our MovieDetail Feature inside of it.

/*  /components/features/movies/movie-detail.jsx  */

/* React */
import React, { Component } from 'react'

class MovieDetail extends Component {
  render () {
    return (
      <div className='movie-detail col-sm-12 col-md-8'>
        <h1>Jurassic Park</h1>
        <p><strong>Director:</strong> Steven Spielberg</p>
        <p><strong>Actors:</strong> Sam Neill, Laura Dern, Jeff Goldblum, Richard Attenborough</p>
        <p><strong>Plot:</strong> Lorem ipsum</p>
        <p><strong>Rated:</strong> PG-13</p>
        <p><strong>Writer:</strong> Michael Crichton (novel), Michael Crichton (screenplay), David Koepp (screenplay)</p>
        <p><strong>Year:</strong> 1993</p>
        <img src='https://m.media-amazon.com/images/M/MV5BMjM2MDgxMDg0Nl5BMl5BanBnXkFtZTgwNTM2OTM5NDE@._V1_SX300.jpg' alt={`Poster for Jurassic Park`} />
      </div>
    )
  }
}

MovieDetail.label = 'Movie Detail'

export default MovieDetail


Using functional component and hooks
With the introduction of React 16.8 starting with Fusion 2.1.0, we can also write in functional component to use them with hooks in the future:


/*  /components/features/movies/movie-detail.jsx  */

import React from 'react'

const MovieDetail = (props) => {
    return (
      <div className='movie-detail col-sm-12 col-md-8'>
        <h1>Jurassic Park</h1>
        <p><strong>Director:</strong> Steven Spielberg</p>
        <p><strong>Actors:</strong> Sam Neill, Laura Dern, Jeff Goldblum, Richard Attenborough</p>
        <p><strong>Plot:</strong> Lorem ipsum</p>
        <p><strong>Rated:</strong> PG-13</p>
        <p><strong>Writer:</strong> Michael Crichton (novel), Michael Crichton (screenplay), David Koepp (screenplay)</p>
        <p><strong>Year:</strong> 1993</p>
        <img src='https://m.media-amazon.com/images/M/MV5BMjM2MDgxMDg0Nl5BMl5BanBnXkFtZTgwNTM2OTM5NDE@._V1_SX300.jpg' alt={`Poster for Jurassic Park`} />
      </div>
    )
}

MovieDetail.label = 'Movie Detail'

export default MovieDetail



Although there's not much difference between the two at the moment, we will expand upon the usage of hooks later on.

NOTE Later on, we will be covering Consumer function that is used to provide dynamic data. While we can use it as a higher-order component to wrap our functional component, because of the current limitation where it can access the context props but not the methods, you may not want to use it for more complicated components. However, we will include the examples with functional components to show that a feature can still use hooks

After creating this file, you should be able to go to the Page Editor in PageBuilder Admin and add this Feature to the homepage we created earlier - click on Add to button under the Layout section to add your new feature. Once you do, you should see it displayed on the page! Notice that the value set for MovieDetail.label is the name of the Feature displayed in the Page Editor. The label allows you to display this Feature in the PageBuilder Editor with a more human-friendly name. You could also set the value of label to be an Object that maps i18n locale codes to their translations:


MovieDetail.label = {
  en: 'Movie Detail',
  es: 'Los detalles de la pelicula'
}



If you provide a label in this format, the Feature will automatically be translated to either English or Spanish. If a translation is not provided for a locale, the Feature will be displayed using the filename. In this case, a web browser set to French will fall back to displaying MovieDetail.


NOTE

Remember, if you don't see your component show up right away, you may need to restart your Fusion app with CTRL+C and then re-running npx fusion start


While this very simple component will work, it doesn't really solve our problem since it doesn't render any dynamic content; just static information about a single movie. For now, we'll leave it static so we can see it rendered, and we'll fill it in with content later.


Rendering Features for different Output Types
Often times you will want your components to render differently based on Output Type. This is useful, for example, in situations where you want to render a desktop web version of a Feature, and then a different mobile web version, and maybe even a version for Google AMP. There are two main ways to achieve this:

1) You can name name your feature components after the output types they should correspond to, and then putting them all inside that Feature's specific directory.


In the example above, we created a movies/ directory and added a movie-detail.jsx file to it, indicating that this version of our Feature should be used with every outputType. If we wanted to create a different version of the feature for each outputType we had, we could make movie-detail a directory instead of a file. 

Then, within that directory we could create a default.jsx file that served as our "default" version of the component. If we then wanted to serve a different version of the component for Amp, and we had an output type named amp, we'd simply add an amp.jsx file to our movie-detail/ directory and write whatever AMP-specific Feature code we wanted in it.


Check out the Feature API docs to learn more about naming Features.


2) If a Feature should act very similarly across multiple Output Types, but has only a few small changes between each, you can simply render a single Feature component for all Output Types and add logical changes based on the props.outputType property proved by the Consumer. For example:


  render() {
    const { globalContent, outputType } = this.props

    if (outputType === 'amp') {
      return (
        <a href="/link-to-webpage-that-does-something">Click Me!</a>
      )
    }

    return <a onClick={ this.doSomething }>Click Me!</a>
  }

In this example, we render slightly different links if the provided outputType is amp or not. Since AMP doesn't allow JavaScript, we send the user to a link - in all other cases, some client side JS is invoked.

It's up to you whether it makes sense to create an entirely new version of a Feature for a different output type, or if the changes are small enough that they can be contained in one Feature definition.

Layout Component
Layouts are a unique type of component within Fusion - they serve as wrappers for the body of the webpage you're building, and they can encompass all other components (except output types) that may exist on the page. While Layouts are not required for Fusion to render content, they can be a useful for providing structure and style to your webpage.


Hierarchy of a Fusion Webpage


                    --------------------------
                    | Output Type (required) |
                    --------------------------
                      |         |         |
              ---------         |         ----------
              |        ---------------------        |
              |        | Layout (optional) |        |
              |        ---------------------        |
              |                 |                   |
              |               /   \                 |
              |            /         \              |
              |         |               |           |
             /|\       /|\             /|\         /|\
    -----------------------           --------------------
    | Features (required) |          | Chains (optional) |
    -----------------------           --------------------
                 \|/                        |
                  |                         |
                  ---------------------------

This diagram illustrates a few guidelines about how a page should be structured in Fusion:


Every Fusion webpage requires a single Output Type that serves as the root of the webpage.
Every Fusion webpage should contain Feature(s).
Output Types can have exactly one Layout per webpage, but don't have to. An Output Type could directly include Features and/or Chains and skip the Layout.
Chains can include Features, but are also optional.

So while we don't need a Layout component for our webpage to render, we can create one to serve as a container around the rest of the Features and Chains on our webpage.


How Layouts work
Layout components are divided into named "sections" defined in the component itself, which act like containers for Features and/or Chains. 

Within PageBuilder Admin, editors can drop the Features and Chains they'd like to exist on the page into the appropriate sections. There are multiple different ways to define a Layout component in Fusion - a Layout can be as simple as a mapping of section names to some HTML classes, or as complex as full React component with structured JSX.


Creating a simple Layout
If all you'd like is to list the sections your layout should contain and assign some classes to the containers for CSS purposes, your Layout can be a simple array of objects with the properties id, cssClass (or className alternatively), and element (this is optional, Fusion defaults to a DOM <section> element if not specified). 

We could define the following Layout inside the /components/layouts/ directory named basic.jsx:


/*  /components/layouts/basic.jsx  */

export default [
  {
    id: 'header',
    cssClass: 'col-xs-12 fixed-on-small',
    element: 'header'
  },
  {
    id: 'main',
    cssClass: 'col-xs-12 col-md-9',
    element: 'article'
  },
  {
    id: 'sidebar',
    cssClass: 'col-xs-12 col-md-3',
    element: 'aside'
  },
  {
    id: 'footer',
    cssClass: 'col-xs-12',
    element: 'footer'
  },
]

This Layout would then result in HTML resembling the following on the webpage:


<header id="header" class="col-xs-12 fixed-on-small">
  // Header Features/Chains
</header>
<article id="main" class="col-xs-12 col-md-9">
  // Main Features/Chains
</article>
<aside id="sidebar" class="col-xs-12 col-md-3">
  // Sidebar Features/Chains
</aside>
<footer id="footer" class="col-xs-12">
  // Footer Features/Chains
</footer>

This basic Layout provides some simple class names that we can apply styling to. In the PageBuilder Admin, editors will see the section names header, sidebar, main and footer available to drag and drop Features and Chains into.


There is even more syntactic sugar for defining simple Layouts outlined in the API docs.


Creating a JSX Layout
Sometimes you'll want more control over the structure of your Layout and its markup. For these situations, it's possible to define a Layout as a React component. 

Let's define a slightly more complex Layout called article-right-rail.jsx:


/*  /components/layouts/article-right-rail.jsx  */

/* React */
import React from 'react'

const ArticleRightRail = (props) => {
  return (
    <div className='row'>
      <header className='col-12 fixed-on-small'>
        {props.children[0]}
      </header>
      <section className='col-12'>
        <div className='row'>
          <article className='col-xs-12 col-md-8'>
            {props.children[1]}
          </article>
          <aside className='col-xs-12 col-md-4'>
            {props.children[2]}
          </aside>
        </div>
      </section>
      <footer className='col-12'>
        {props.children[3]}
        <p>Copyright &copy; 2018</p>
      </footer>
    </div>
  )
}

ArticleRightRail.sections = ['header', 'main', 'sidebar', 'footer']

export default ArticleRightRail

In the above component, we've defined a Layout that has 4 sections, just like the previous initial basic Layout. However, in this Layout we're able to structure the HTML however we want, add in extra elements (like the <p> in the footer) and then inject the child Feature and/or Chain components via props.children. 

For Layouts, props.children is an array of objects ordered by the list of section names provided in the component's .sections definition. We've also added some Bootstrap classes so our layout will work properly.


The .sections property here is necessary to provide the PageBuilder Admin with the names of the sections available in this Layout for editors to drag and drop Features into.




Chain Component
Chain components are meant to be simple wrapper elements surrounding a single group of Features. Like every other component, they are defined as React components in JSX. They are most commonly used for things like sidebars, or on Feature rich standalone pages (like a homepage) with multiple sections of content. Chains are similar to Layouts in that they contain multiple components within them, but are different in a few important ways:


Layouts have multiple named groups, or "sections" of Features - Chains only have a single group of Features, and thus aren't named
Layouts can contain both Features and Chains - Chains can only contain Features (not other nested Chains)
Only one Layout can be applied per page/template, whereas multiple Chains can exist on one page/template
Chains, like Features, can have custom fields defined on them. We'll talk more about custom fields later

Creating a Chain
To create a simple "sidebar" chain for our Feature Pack, in the /components/chains/ directory we would create a file called sidebar.jsx that looks like this:


/*  /components/chains/sidebar.jsx  */

/* React */
import React from 'react'
import PropTypes from 'prop-types'

const Sidebar = (props) => {
  const { hasBorder, heading } = props.customFields

  let classNames = 'col-xs-12 col-md-4'
  classNames = hasBorder ? `${classNames} border-left` : classNames

  return (
    <section className={classNames}>
      {heading &&
        <h3>{heading}</h3>
      }
      <div>
        {props.children}
      </div>
    </section>
  )
}

Sidebar.propTypes = {
  customFields: PropTypes.shape({
    heading: PropTypes.string,
    hasBorder: PropTypes.bool
  })
}

export default Sidebar


Explained:


We're defining a functional component and assigning it to const Sidebar
We use the hasBorder custom field (that we define at the bottom of the file) to determine whether or not to add border-left to the list of classNames for our <section> container
We return the <section> container with a custom heading (if one exists), and a div with props.children inside of it, which represents the Features that will be added to this Chain in the Admin

The most important thing to remember about Chains is that props.children is the property you need to actually render the Features that should be contained in the Chain.


Custom Fields here are simply values passed to the component that were defined for this Chain in the Admin. So an editor can decide in PageBuilder whether this specific instance of the Sidebar chain should have a heading (and what it should be), as well as whether or not our Sidebar should have a border.


If we go into PageBuilder Admin and refresh our page editor, we should see the "Sidebar" chain show up in the Layout panel now. We can add this Chain to the page (either inside a Layout or on its own), and then drop whatever Features we want into it.




Event Handling and Interaction
There's nothing special about handling events in Fusion - you should just use React as intended. With that in mind, let's adapt our MovieDetail component so we can prevent readers from seeing spoilers if they don't want to.


We'll add a simple feature that toggles the "Plot" to be shown or hidden based on a button click, and default it to hidden so readers don't see the plot on page load. To do that, we'll need a couple of things:

We need some state in our component that keeps track of whether or not the plot is currently shown or hidden. We'll call this boolean isPlotShown and default it to false.
We need a method that will toggle the show/hide state of the plot. Let's call it togglePlot.
We need something the user can interact with (probably a button) to invoke the toggle method.
We need to conditionally show the plot only if isPlotShown is true, and change the text of our button to "Show Plot" or "Hide Plot" depending on what state it's in.


Adding State
First, we'll add the isPlotShown key to the state of our component. This is how you would normally initialize some state in a React component - we need to accept props in the constructor and pass them to the super method as usual, then we can initialize the state object with whatever data we want. In this case, the only data we want to set is the isPlotShown key to false. We'll do that in the class constructor method like this:


/*  /components/features/movies/movie-detail.jsx  */

class MovieDetail extends Component {
  constructor (props) {
    super(props)
    this.state = { isPlotShown: false }
  }
  ...
}

export default MovieDetail


Adding a toggle method
Next, we'll need to create a method called togglePlot on our class to toggle the isPlotShown method when it's invoked.


/*  /components/features/movies/movie-detail.jsx  */

class MovieDetail extends Component {
  ...
  togglePlot () {
    this.setState(({ isPlotShown }) => ({ isPlotShown: !isPlotShown }))
  }
  ...
}

export default MovieDetail



Our method just destructures the isPlotShown key out of the state object, then uses React's <code>setState</code> method to set the new value to the inverse of the old one.



Invoking the method
So we've got our togglePlot method ready to go - but it's not being invoked by anything. We'd like it so that when a user clicks the "Show Plot" button, they see the plot shown, and when they click "Hide Plot", the plot goes away.

/*  /components/features/movies/movie-detail.jsx  */

class MovieDetail extends Component {
  constructor (props) {
    super(props)
    this.state = { isPlotShown: false }

    // Let's bind the togglePlot function so that a new function doesn't get created with each render
    this.togglePlot = this.togglePlot.bind(this)
  }

  ...
  render () {
    const { isPlotShown } = this.state

    const plotButton = (
      <button onClick={this.togglePlot}>
        {isPlotShown ? 'Hide Plot' : 'Show Plot'}
      </button>
    )

    const Plot = 'Lorem ipsum'
    ...
  }
}

export default MovieDetail
When the button is clicked, the setPlotShown function will set the isPlotShown variable to the parameter it was passed to. Here, we are simply having it be set to the opposite of the variable - setting it to true if it was false, and vice versa.


In both of these incomplete snippets from our method, we're creating a const named plotButton that is the button element users will click on. We're using the isPlotShown key to determine if the button should say "Hide Plot" or "Show Plot". Finally, we're setting a Plot const to the static value Lorem ipsum just for ease of use later. We'll use our plotButton in the next step. Only one more to go!


Displaying the data
Now all that's left to do is display our Plot and plotButton:


/*  /components/features/movies/movie-detail.jsx  */

class MovieDetail extends Component {
  ...
  render () {
    const { isPlotShown } = this.state

    const plotButton = (
      <button onClick={this.togglePlot}>
        {isPlotShown ? 'Hide Plot' : 'Show Plot'}
      </button>
    )

    const Plot = 'Lorem ipsum'

    return (
      <div className='movie-detail col-sm-12 col-md-8'>
        <h1>Jurassic Park</h1>
        <p><strong>Director:</strong> Steven Spielberg</p>
        <p><strong>Actors:</strong> Sam Neill, Laura Dern, Jeff Goldblum, Richard Attenborough</p>

        {/* We're displaying the plot only if `isPlotShown` is truthy, and then rendering the `plotButton` */}
        <p><strong>Plot:</strong> {isPlotShown && Plot} {plotButton}</p>
        ...
      </div>
    )
  }
}

export default MovieDetail

All that's changed here is we've replaced the hardcoded "Lorem ipsum" text for our plot with the Plot const above, and rendered it conditionally based on the isPlotShown value. Then we display the plotButton right afterward.

  ...
  return (
    <div className='movie-detail col-sm-12 col-md-8'>
      <h1>Jurassic Park</h1>
      <p><strong>Director:</strong> Steven Spielberg</p>
      <p><strong>Actors:</strong> Sam Neill, Laura Dern, Jeff Goldblum, Richard Attenborough</p>

      <p><strong>Plot:</strong> {isPlotShown && Plot} {plotButton} </p>
      ...
    </div>
  )
}

Same deal here - we've just replaced the plot text with the button from above, and rendered it conditionally based on the isPlotShown value.

Now if we refresh the page, we should see our "Show Plot" button where the "Lorem ipsum" text was, and be able to toggle the text back and forth by clicking "Show Plot" and "Hide Plot". Great job!



Complete Feature
/*  /components/features/movies/movie-detail.jsx  */

import React, { Component } from 'react'

class MovieDetail extends Component {
  constructor (props) {
    super(props)
    this.state = { isPlotShown: false }
  }

  togglePlot () {
    this.setState(({ isPlotShown }) => ({ isPlotShown: !isPlotShown }))
  }

  render () {
    const { isPlotShown } = this.state

    const plotButton = (
      <button onClick={this.togglePlot.bind(this)}>
        {isPlotShown ? 'Hide Plot' : 'Show Plot'}
      </button>
    )

    const Plot = 'Lorem ipsum'

    return (
      <div className='movie-detail col-sm-12 col-md-8'>
        <h1>Jurassic Park</h1>
        <p><strong>Director:</strong> Steven Spielberg</p>
        <p><strong>Actors:</strong> Sam Neill, Laura Dern, Jeff Goldblum, Richard Attenborough</p>
        <p><strong>Plot:</strong> {isPlotShown && Plot} {plotButton}</p>
        <p><strong>Rated:</strong> PG-13</p>
        <p><strong>Writer:</strong> Michael Crichton (novel), Michael Crichton (screenplay), David Koepp (screenplay)</p>
        <p><strong>Year:</strong> 1993</p>
        <img src='https://m.media-amazon.com/images/M/MV5BMjM2MDgxMDg0Nl5BMl5BanBnXkFtZTgwNTM2OTM5NDE@._V1_SX300.jpg' alt={`Poster for Jurassic Park`} />
      </div>
    )
  }
}

MovieDetail.label = 'Movie Detail'

export default MovieDetail

We could actually further optimize the functional component by writing the MoviePlot as its on component so that it only re-renders the plot when the button is pressed instead of the whole feature:

import React, { useState } from 'react'

const MoviePlot = (props) => {
  const [isPlotShown, setPlotShown] = useState(false)

  return <>
    {isPlotShown && props.plot}
    <button onClick={() => setPlotShown(!isPlotShown)}>
      {isPlotShown ? 'Hide Plot' : 'Show Plot'}
    </button>
  </>
}

const MovieDetail = (props) =>
  <div className='movie-detail col-sm-12 col-md-8'>
    <h1>Jurassic Park</h1>
    <p><strong>Director:</strong> Steven Spielberg</p>
    <p><strong>Actors:</strong> Sam Neill, Laura Dern, Jeff Goldblum, Richard Attenborough</p>
    <p><strong>Plot:</strong> <MoviePlot plot='Lorem ipsum' /></p>
    <p><strong>Rated:</strong> PG-13</p>
    <p><strong>Writer:</strong> Michael Crichton (novel), Michael Crichton (screenplay), David Koepp (screenplay)</p>
    <p><strong>Year:</strong> 1993</p>
    <img src='https://m.media-amazon.com/images/M/MV5BMjM2MDgxMDg0Nl5BMl5BanBnXkFtZTgwNTM2OTM5NDE@._V1_SX300.jpg' alt={`Poster for Jurassic Park`} />
  </div>

MovieDetail.label = 'Movie Detail'

export default MovieDetail
NOTE

The <></> tags are shorthand syntax for React Fragments


While this was a simple example of how to add client-side interactivity to a React component in Fusion, it should illustrate that there's nothing different about handling events in standard React vs. Fusion.






Defining a Content Source
At this point, we have 2 of the 3 inputs Fusion needs to function - we've defined some code for our components, and we're using PageBuilder Admin to provide configuration to our webpages. The last input we need is content to fill in our components with live data. To retrieve content, the first thing we need is a content source - a URI to fetch content from, along with some information about what data that URI needs to perform a query.


Defining a Content Source in JavaScript
A Fusion content source requires at least 2 pieces of information: a URL endpoint to request JSON from, and a list of params we need to craft the URL. A third piece of info is also often useful (but not required): a GraphQL schema that describes the response shape of the endpoint.


NOTE As of version 2.2, Fusion no longer uses GraphQL for schemas and instead uses a custom function that works similarly, but much less restrictive. The schema will effectively be ignored - however, filtering syntax will still work as before.

Since our website is supposed to be for movie lovers, let's see what a simple content source definition might look like if we were requesting some data from the OMDB API. For this content source, we want to be able to find a certain movie's information based on its title.


Let's create a file called movie-find.js in the /content/sources/ directory of our bundle. Because our file is named movie-find.js, we will refer to this content source as movie-find later in our code (and in PageBuilder Admin).


/*    /content/sources/movie-find.js    */

import { OMDB_API_KEY } from 'fusion:environment'

const resolve = (query) => {
  const requestUri = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&plot=full`

  if (query.hasOwnProperty('movieTitle')) return `${requestUri}&t=${query.movieTitle}`

  throw new Error('movie-find content source requires a movieTitle')
}

export default {
  resolve,
  params: {
    movieTitle: 'text'
  }
}

In the exported object above, we define both required pieces of data that we need for our content source:

Note: A Content Source should include exactly one of resolve or fetch.


resolve property (required, unless using the fetch property)

The resolve property is a function whose output is a URL which returns the JSON we want. It accepts a single argument we've named query here (but you could call it anything). The query object contains the values of the parameters we need to make a request - in this case, we only need the movieTitleparam. These values are either set in the PageBuilder Admin (for "global" content) and retried by resolvers, or if you're fetching your own content you will provide the values when you make the fetch call.

We're able to perform logic in our function to transform the URL however we want. In this example, if a movieTitle property exists in the query object that was passed to us, we want to use that param to find our movie. If it doesn't exist (meaning it skipped the if block), we will throw an error since we don't have the data we need to make our request.

Because this URL will typically require some sort of authentication to access, we have access to the fusion:environment in content sources, which gives us decrypted access to "secret" environment variables. Here, we are interpolating an OMDB_API_KEY environment variable into the URL to authenticate our request. We'll discuss more about "secrets" and environment variables later.


fetch property (required, unless using the resolve property)
The fetch property is an async function that, given a query object, will return JSON. fetch is used as an alternative to resolve when your content source can not be completely derived from a single URL. Starting in fusion release 2.2, all content sources (including those defined as fetch) are cached.

Below is an example of fetch being used instead of resolve:

import request from 'request-promise-native'
import { CONTENT_BASE } from 'fusion:environment'
import collectionFeed from './collection-feed'

const DEFAULT_SITE = 'leparisien'
const options = {
  gzip: true,
  json: true
}

// Add other required fields here which are not present above
const includedFields = [
  'additional_properties',
  'content_elements',
  'first_publish_date',
  'slug',
  'source'
].join()

const fetch = (query) => {
  return request({
    uri: `${CONTENT_BASE}${collectionFeed.resolve(query)}`,
    ...options
  }).then((collectionResp) => {
    const collectionResult = collectionFeed.transform(collectionResp, query)
    const {
      content_elements: contentElements = []
    } = collectionResult
    const ids = contentElements.map(({ _id }) => _id).join()
    const {
      website
    } = query

    return request({
      uri: `${CONTENT_BASE}/content/v4/ids?website=${website || DEFAULT_SITE}&ids=${ids}&included_fields=${includedFields}`,
      ...options
    }).then((idsResp) => {
      const {
        content_elements: stories = []
      } = idsResp

      if (stories.length) {
        collectionResult.content_elements = collectionResult.content_elements.map((collectionStory) => {
          return {
            ...stories.find(({ _id }) => _id === collectionStory._id),
            ...collectionStory
          }
        })
      }

      return collectionResult
    })
  })
}

export default {
  fetch,
  schemaName: collectionFeed.schemaName,
  ttl: collectionFeed.ttl,
  params: collectionFeed.params
}

params property (required)
The params property will contain a list of parameter names and data types that this content source needs to make a request. For example, in this content source we only have 1 param that we can use to make a request: the movieTitle param. Given either of these pieces of data (as part of the query object in our resolve method), we are able to craft a URL (in our resolve function) that gets us the data we want (e.g https://www.omdbapi.com/?apikey=<apiKey>&t=Jurassic%20Park will get us the info for the movie Jurassic Park).

params can be defined either as an object (as seen above) or as an array of objects. If defined as an object, each key of the object will be the name of a param, and its value will be the data type of that param. The allowed data types are text, number and site.

We need this list of params enumerated so that we can tell PageBuilder Admin that they exist. Then, editors can set values for those params - for "example" content in Templates and "global" content on Pages.




transform property (optional)
Another optional parameter that can be provided in the content source object is a transform function. The purpose of this function is to transform the JSON response received from our endpoint, in case you want to change the shape of the data somehow before applying a schema to it.

For example, let's say we wanted to count the number of words in the movie's plot and append a numPlotWords property to the payload for querying later. We could add the following to our exported object:

export default {
  resolve,
  schemaName: 'movies',
  params: { movieQuery: 'text' },
  transform: (data) => {
    return Object.assign(
      data,
      { numPlotWords: data.Plot ? data.Plot.split(' ').length : 0 }
    )
  }
}

The transform function's only input is the data object it receives from the endpoint you defined, and its only expected output is an object that you want to query against later.


Defining a Content Source in JSON
It's also possible to define a content source in JSON rather than JavaScript. This method of defining a content source should only be used if you don't need to perform any logic to craft your content source URL endpoint (other than interpolating variables, which you can still do). This option exists mostly to support legacy PageBuilder content source configurations. More info about this option will be documented in the near future.


Using CONTENT_BASE
Oftentimes, you will have multiple content sources that all share the same base domain. For example, if you are querying Arc's Content API, you may have a domain like https://username:password@api.client-name.arcpublishing.com that many of your content sources share. 

For this reason, Fusion allows you to define a special CONTENT_BASE environment variable that, when present, allows your resolve function to return a URL "path" rather than a fully qualified URL, and prefixes the CONTENT_BASE before those paths.

For example, let's say I have my CONTENT_BASE environment variable set to https://username:password@api.client-name.arcpublishing.com, and I want to define a content source for "stories" at that domain. In that case, my resolve function might look like this:

const resolve = function resolve (query) {
  const requestUri = `/content/v3/stories/?canonical_url=${query.canonical_url || query.uri}`

  return (query.hasOwnProperty('published'))
    ? `${requestUri}&published=${query.published}`
    : requestUri
}
As you can see, the requestUri string that we return in this case is not a fully qualified URL, but instead just a path (denoted by the starting / character). In this case, Fusion will see that this string is not a full URL and will prefix this path with the value of the CONTENT_BASE variable before making its request - so we don't have to retype the domain in every content source that shares this domain.

Please note, there is nothing preventing you from still returning fully qualified URLs from other content sources - using CONTENT_BASE is purely to keep your code DRY.








Using Environment Variables and "Secrets"
Environment variables are exactly what they sound like: variables that are set per environment. They are typically used for things like credentials or domains that may change from local to staging to production environments. In Fusion, environment variables are defined in a .env file for the local environment, and in the /environment/ directory for other environments.


Local vs. production environments
As mentioned previously, Fusion allows you to set environment variables differently depending on what environment you're in.

In local development, you can define whatever environment variables you want in the .env file in the root of your repository. These will override environment variables of the same name defined in the /environment/ directory. Variables defined in your .env file don't need to be encrypted since they are .gitignored and only exist on your local system. So in general, use .env for environment variables defined on your local.

In staging and/or production environments you'll define environment variables in the /environment/ directory. This provides the advantage of keeping them in the repository so you don't need to configure environment variables separately on the server - however, this presents its own problem as many of these variables should be secret and not stored in plaintext in the repository. To alleviate this concern, Fusion has the ability to decrypt secret variables at "deploy" time when provided the correct key.


Creating and using environment variables
Let's see how we can actually use environment variables in the sample Fusion app we've been building.

So far, the only environment variable we've used was the OMDB_API_KEY in our movie-find content source, so let's define that one. The first thing we'll do is go to our .env file and add it there:

#  /.env  #

OMDB_API_KEY=a1b2c3d4e5
NOTE

The OMDB_API_KEY value used above is fake - you'll need to get your own from the OMDB API and use that instead!

We now have everything we need for our content source to work locally!


To get it working in staging/production environments, we'll need to first encrypt our secret variable, then create an index.js file in our /environment/directory.

NOTE

There are a few different formats you can use for naming the environment variables file. You can define it as a top level file called /environment.jsor /environment.json, or alternatively in the /environment/ directory as /environment/index.js or /environment/index.json. Just make sure you only have one of these!

NOTE

You can also create environment-specific files such as /environment/bonnier.js or /environment/bonnier-sandbox.yml that will only be used when deployed to that specific environment. The values from these files will be merged with (and take precedence over) those in the generic file above.

Encrypting your secrets
To enable secret encryption for your Arc environment, PageBuilder's deployment tool Maestro comes with a simple application to encrypt and decrypt secrets based on your environment. Because the encryption values are based on a shared key that is provisioned per environment, and because Maestro has access to that key, Maestro is able to securely and statelessly encrypt and decrypt secrets for us - and this makes it the perfect tool for getting our Fusion application secrets ready for external environments.

To use the tool, simply go to your environment's Maestro "Secrets" page. Copy the "secret" value for our OMDB_API_KEY and paste it into the "encrypt" text input at the top of the page, then click the "encrypt" button. You should get an encrypted value that looks similar to this:

AQECAHhPwAyPK3nfERyAvmyWOWx9c41uht+ei4Zlv4NgrlmypwAAAMYwgcMGCSqGSIb3DQEHBqCBtTCBsgIBADCBrAYJKoZIhvcNAQcBMB4GCWCGSAFlAwQBLjARBAxwBJdfzqcQUpox1xsCARCAf2aXwBJ3pBUP12HWB3cdBboV1/qN0HFEsjNycADYIq7XSANeDYOlu2/Dwt/52R16hK4dbVOt0ofNKKx0b3vtZRaH9bX1Dkx6TDhmo5g32H0aWpiUW6PQIp72/g2CW1nr26T0zxmkxmX9u8ufoQGBXRd1pOfT2EliUhMKabNeSyk=
This encrypted value is now safe to be stored in our git repository and added to our /environment/index.js file inside of "percent bracket" control characters, like so:

/*  /environment/index.js  */

export default {
  OMDB_API_KEY: "%{AQECAHhPwAyPK3nfERyAvmyWOWx9c41uht+ei4Zlv4NgrlmypwAAAMYwgcMGCSqGSIb3DQEHBqCBtTCBsgIBADCBrAYJKoZIhvcNAQcBMB4GCWCGSAFlAwQBLjARBAxwBJdfzqcQUpox1xsCARCAf2aXwBJ3pBUP12HWB3cdBboV1/qN0HFEsjNycADYIq7XSANeDYOlu2/Dwt/52R16hK4dbVOt0ofNKKx0b3vtZRaH9bX1Dkx6TDhmo5g32H0aWpiUW6PQIp72/g2CW1nr26T0zxmkxmX9u8ufoQGBXRd1pOfT2EliUhMKabNeSyk=}"
}
Since this KMS key is assigned on a per-client, per-environment basis, Fusion will automatically decrypt this variable at deploy time so it can be used reliably. And while our app would work locally without the value stored in our /environment/index.js file (since its decrypted counterpart is already in our .env file), adding it now means we won't have to do it later when we deploy our application!


Restrictions
Environment values will only be accessible during server execution, not in the client, as they will be exposed to users. To ensure this, fusion:environmentwill return an empty object in the client.

Now that we have our content source and credentials set up, we can use them to retrieve and display some content!





Setting up a Resolver
A page in Pagebuilder is just that - it's just a statically served site that presents itself as how we have defined it on the Editor. While each feature on the page might fetch its own data for rendering and presenting the data, it isn't really suitable for receiving dynamic "global" content across the features.

For this purpose, we can leverage the use of templates and resolvers.

On the Template tab of the Pagebuilder page, you can create new templates. Let's create a new one and just name this movies. Once it's created, click on its name to go to the editor. Once at the editor, let's set this page up as you did on your first page you've created on the editor. On the Layout of your choice, add Movie Detail feature and let it show Jurassic Park. Afterwards, we will need to save this template - click on the preview commit in the Workflow section and then Stage and Commit.

Right now, this template will be blank and not do anything by itself. Don't fret! Now we will be using resolvers to populate this template with global content.

Let's go to the Developer Tools tab back in the Pagebuilder page, and Resolvers tab under it. Click on new resolver button to create your new resolver by filling out the fields as such:

Name: movie-find
Pattern: ^/movies/([\w\-]+)
Priority: 1
Template: movies
Content Source: movie-find
- MovieTitle: From Pattern: 1

Let's go more in-depth about what this does. As you might have noticed, the resolver relies on regex for matching the provided pattern. Essentially, this allows any URI in your page to be matched with the given pattern and be rendered by the designated template with the data provided by the Content Source. For example, if you have a URI http://localhost/pf/movies/jurassic_park, the above resolver will match with the movies/jurassic_park with the given Pattern ^/movies/([\w\-]+), and pass jurassic_park as the MovieTitle for the movie-find Content Source. the movie-find source will then use the MovieTitle param to fetch the data for the page as a global content.

Now that our resolver is fetching "global" content for us, let's see how we can use it in our component.



Using the Consumer Higher-Order Function
Back in our "Creating a Feature Component" guide, we created our first Feature and added it to the page - the only problem was, the content inside our component was hardcoded so it would always show the details for a single movie, Jurassic Park. Obviously the point of the component is to dynamically show movie details for any movie, based on the user's request. This guide will walk through how to fix our components to use dynamic data provided by Fusion instead of static data.

In Fusion, the Consumer higher-order function is what provides us dynamic data about the site and page the user requested, the outputType and layouts (if any) that are being used, any "global" content on the page, and more. Under the hood, Consumer is a higher-order function that wraps your components with props and instance methods that it can use to perform logic and render content.

It's not required for all features to be wrapped with Consumer if they don't require the data the Consumer provides - however, most of the time you'll need to since it's rare to have entirely static Feature components.



Adapting our Feature
Let's jump back to our movie-detail.jsx file we created in the "Creating a Feature Component" guide.

In this example, we want to access the title, director, list of actors, and more info associated with the movie the user requested. Now that we've fetched that content in our resolver, it should be available as this.props.globalContent provided by the Consumer. Let's wrap our component with the Consumerdecorator and see what changes:

/*  /components/features/movies/movie-detail.jsx  */

import Consumer from 'fusion:consumer'
import React, { Component } from 'react'

@Consumer
class MovieDetail extends Component {

  {/* The `constructor` and `togglePlot` methods remain unchanged */}
  ...

  render () {

    {/* The `isPlotShown` and `plotButton` constants remain unchanged */}
    ...

    {/* Here, we extract the data we want from `this.props.globalContent`, which we "short circuit" default to an empty object, just in case it doesn't exist */}
    const { Actors, Director, Plot, Poster, Rated, Title, Writer, Year } = this.props.globalContent || {}

    {/* Replace the static values with their dynamic equivalents, first checking if each necessary value exists */}
    return (
      <div className='movie-detail col-sm-12 col-md-8'>
        {Title && <h1>{Title}</h1>}
        {Director && <p><strong>Director:</strong> {Director}</p>}
        {Actors && <p><strong>Actors:</strong> {Actors}</p>}
        {Plot && <p><strong>Plot:</strong> {isPlotShown && Plot} {plotButton}</p>}
        {Rated && <p><strong>Rated:</strong> {Rated}</p>}
        {Writer && <p><strong>Writer:</strong> {Writer}</p>}
        {Year && <p><strong>Year:</strong> {Year}</p>}
        {Poster && Title && <img src={Poster} alt={`Poster for ${Title}`} />}
      </div>
    )
  }
}

export default MovieDetail

A few things have changed about our component:

We're now importing the Consumer object from fusion:consumer at the top of the file
On the line above our class definition we've added the Consumer decorator
Inside our render method we're extracting the pieces of data we need from this.props.globalContent as constants.
We then check whether each piece of data exists, and if so render the appropriate piece of markup.
Now we have our component and content source defined, and our resolver fetching content on page load - the last part is to add the Feature to a template and see it in action.

And just like that, our component is rendering content dynamically! Go ahead and publish the page and try requesting the URL defined in our resolver with different movie names to see it fetch different content.

NOTE

It's possible to wrap a functional component in the Consumer higher-order function and still get props passed as in the class-based syntax - however, only the class-based syntax allows you to use Consumer's instance methods.









Defining another content source
Let's say we want to add some functionality to our webpage. In addition to the main part of our page that shows us the details for 1 movie at a time, we also want to have a sidebar that shows a list of relevant movies.

You can see in the OMDB API docs that it support 2 main endpoints: one for finding individual movies (which we used in our movie-find.js source) and one for searching for movies based on a title. We'll define a new content source called movie-search.js to use the search endpoint:

/*  /content/sources/movie-search.js  */

import { OMDB_API_KEY } from 'fusion:environment'

const resolve = (query) => {
  const requestUri = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${query.movieQuery}`

  return (query.hasOwnProperty('page'))
    ? `${requestUri}&page=${query.page}`
    : requestUri
}

export default {
  resolve,
  schemaName: 'movies',
  params: {
    movieQuery: 'text'
  }
}
We won't go over what each piece of the content source does in detail, as that was covered in Defining a Content Source. But a short description of this content source is that, given a string that represent the search query (named movieQuery here) and an optional page parameter (for paginated results), this content source will return a list of movies to us.





"global" content vs. fetched content
It's important to remember that you only need to fetch content if the content you need has not already been provided to you by globalContent, or if you want to retrieve some content client-side. If the content you need in your feature is part of the "global" content of the page, meaning it is semantically identified by the URL the user requested, then you probably don't need to fetch at all.

A quick example: if you have a feature called authors whose purpose is to list the authors of the main story on the page, then you will want to use props.globalContent - since the information in the authors component is semantically tied to the main story. If, however, you are building an unrelated sports_scores component that shows the most recent scores from local sports games, that content will almost certainly not exist as part of your main story - so you'll need to fetch it separately.

NOTE Even though you may not need to fetch "feature specific" content in your Feature Pack, you still need to define content sources so resolvers can use them to fetch "global" content. Without content sources you can't get "global" content or "feature specific" content.
Fetching content and setting state
Once we've determined we need to fetch content, we need some more information:

when do we want to fetch the content (on the server only, the client only, or both?)
what content source do we want to fetch from?
what arguments do we need to pass to get the content we want?
what pieces of data from the returned content do we actually need?
For our purposes, let's say we want to fetch some content from the movie-search content source we defined in Using a GraphQL Schema. Specifically, we want to fetch a list of movies by their titles.

Let's define a simple component called MovieList for this purpose:

/*  /components/features/movies/movie-list.jsx  */

import Consumer from 'fusion:consumer'
import React, { Component } from 'react'

@Consumer
class MovieList extends Component {
  constructor (props) {
    super(props)
    this.state = { movies: [] }
  }

  render () {
    const { movies } = this.state
    return (
      <div className='movie-list col-sm-12 col-md-4'>
        <h2>Movies</h2>
        <div className='movie row'>
          {movies && movies.map((movie, idx) =>
            <div className='col-sm-12 border' key={`movie-${idx}`}>
              {/* display movie info here */}
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default MovieList
Right now, our component doesn't do much - we are initializing an empty movies array in our state object that the render method loops over, but the loop just outputs an empty <div> right now. So we need to 1) fetch some movies and add them to our state, and 2) output some content inside our movies loop. Let's add a method to the class to do the fetching:

  fetch () {
    const { movies } = this.state;
    this.fetchContent({
        movies: {
          source: 'movie-search', 
          query: { movieQuery: 'Jurassic' }, 
          filter: '{ totalResults Search { Title Year Poster } }',
          transform (data) {
            // Check if data is being returned
            if(data && data.Search)
              return { list: [...movies.list, ...data.Search] };

            // Otherwise just keep the current list of movies
            else
              return movies
          }
        }
    })
  }
Here, we're utilizing Fusion's fetchContent method to fetch some content and then set some state. The function takes in one object variable key we call contentConfigMap, with the key that you would like to use to retrieve in the state.

For our purpose, we will be putting three parameters in the contentConfigMap object:

source: The name of the content source (movie-search for now)
query: Object that contains the values we actually want to query on - in this case, a movieQuery param searching for movies with the word 'Jurassic' in them (this object will be the only argument passed to the resolve method in our content source).
filter: A string containing a GraphQL query object, which will filter the results of our JSON down to just the data we need for this component - you'll notice the key names in the filter match those in the schema we defined a couple steps ago.
transform: the function that will destructure the result of the query to cleanly insert them into the state.
This method should work great - except we haven't invoked it anywhere! Let's change that in our constructor method:

  constructor (props) {
    super(props)
    this.state = { movies: { list: [] }}
    this.fetch = this.fetch.bind(this)
    this.fetch();
  }
NOTE

Because we're invoking the fetch method in the constructor, our fetch will occur on both the server and the client side when we're rendering. If we had just wanted to invoke client side, we could have put the fetch call inside of componentDidMount instead of the constructor, since componentDidMount only occurs client side.

At this point our fetch should be working! The last problem is we aren't displaying any data. Let's fix that too:

  render () {
    const { list: movies } = this.state.movies
    return (
      <Fragment>
        <h2>Movies</h2>
        <div>
          {movies && movies.map((movie, idx) =>
            <div key={`movie-${idx}`}>
              <h4>{movie.Title}</h4>
              <p><strong>Year:</strong> {movie.Year}</p>
              <img src={movie.Poster} />
            </div>
          )}
        </div>
      </Fragment>
    )
  }
Because React will re-render automatically whenever there is a change to the state or props of our component, and we're triggering a state change when we fetch our new movies, we can simply iterate over the movies array in our state and output the information we want (Title, Year, Poster) for each movie as if they'd always been there. This should result in a working component that fetches and displays data about movies with the word 'Jurassic' in the title! Let's see the entire component together:

/*  /components/features/movies/movie-list.jsx  */

import Consumer from 'fusion:consumer'
import React, { Fragment, Component } from 'react'

@Consumer
class MovieList extends Component {
  constructor (props) {
    super(props);
    this.state = { movies: { list: [] }};
    this.fetch = this.fetch.bind(this)
    this.fetch();
  }

  fetch () {
    const { movies } = this.state;
    this.fetchContent({
        movies: {
          source: 'movie-search', 
          query: { movieQuery: 'Jurassic' }, 
          filter: '{ totalResults Search { Title Year Poster } }',
          transform (data) {
            // Check if data is being returned
            if(data && data.Search)
              return { list: [...movies.list, ...data.Search] }

            // Otherwise just keep the current list of movies
            else
              return movies;
          }
        }
    })
  }


  render () {
    const { list: movies } = this.state.movies
    return (
      <Fragment>
        <h2>Movies</h2>
        <div>
          {movies && movies.map((movie, idx) =>
            <div key={`movie-${idx}`}>
              <h4>{movie.Title}</h4>
              <p><strong>Year:</strong> {movie.Year}</p>
              <img src={movie.Poster} />
            </div>
          )}
        </div>
      </Fragment>
    )
  }
}

export default MovieList

Adding pagination
Unfortunately, this only fetches the first page of movies with "Jurassic" in the title from OMDB. But since OMDB's API allows us to send a page param, and our content source is already set up to accept such a param, it's easy to add pagination to this feature as such:

/*  /components/features/movies/movie-list.jsx  */

import Consumer from 'fusion:consumer'
import React, { Fragment, Component } from 'react'

@Consumer
class MovieList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      movies: {
        pages: []
      },
      page: 0
    }
    this.fetch = this.fetch.bind(this)
    this.fetch()
  }

  fetch () {
    const { page } = this.state;

    // Increment the page at each call
    this.state.page += 1;

    this.fetchContent({
      movies: {
        source: 'movie-search',
        query: {
          movieQuery: 'Jurassic',
          page: page + 1
        },
        filter: '{ totalResults Search { Title Year Poster } }',
        transform: (data) => {
          // Check if data is being returned
          if(data && data.Search) {
            // Add the results to the paginated list of movies
            this.state.movies.pages[page] = data.Search
            return this.state.movies
          }

          // Otherwise just keep the current list of movies
          else{
            return this.state.movies;
          }
        }
      }
    })
  }

  render () {
    // Concatenate the lists of the movies and filter duplicates - this would ensure that
    // a multiple clicks on the 'More' button wouldn't cause issues with incomplete and out-of-order fetches from
    // network issues
    const movies = [].concat(...this.state.movies.pages).filter(movie => movie);

    return (
      <Fragment>
        <h2>Movies</h2>
        <div>
          {movies && movies.map((movie, idx) =>
            <div key={`movie-${idx}`}>
              <h4>{movie.Title}</h4>
              <p><strong>Year:</strong> {movie.Year}</p>
              <img src={movie.Poster} />
            </div>
          )}
          <button onClick={ this.fetch }>More</button>
        </div>
      </Fragment>
    )
  }
}

export default MovieList
With this, all we had to do to get pagination working was:

add a page property to our state object and initialize it to 0 - this will be incremented at the first call to the fetch function.
increment the page whenever we fetch, so next time we'll fetch the following page - since it's not necessary to re-render the component, we can increment it directly.
include the page variable with 1 added to it (note that we are not passing the state's incremented page value) - this is so that we can preserve the ordering of the paginated list of the movies and make sure the list starts properly at the index of 0 when we assign the result of the fetch request to the list.
Add a button at the bottom of the component that allows us to call the fetch method, which should get the next page of results, display the new results, and increment the page all at once.







Dynamically Configuring Content
Now we're really cooking with gas! We've written and rendered components, we've set up content sources, we've defined schemas, and we've used both "global" content and fetched new content ourselves. Give yourself a high five!

But believe it or not, we can make our content fetching even more dynamic. Currently inside our MovieList component, we're hardcoding the name of our content source and the values it is using to query for content. Here's the relevant snippet in our MovieList component:

/*  /components/features/movies/movie-list.jsx  */

  ...
  fetch () {
    const { page } = this.state;

    // Increment the page at each call
    this.state.page += 1;

    this.fetchContent({
      // fetchContent's call to `setState` will only set `movies` and will not affect `page`
      movies: {
        source: 'movie-search',
        query: {
          movieQuery: 'Jurassic',
          page: page + 1
        },
        filter: '{ totalResults Search { Title Year Poster } }',
        transform: (data) => {
          // Check if data is being returned
          if(data && data.Search) {
            // Add the results to the paginated list of movies
            this.state.movies.pages[page] = data.Search
            return this.state.movies
          }

          // Otherwise just keep the current list of movies
          else{
            return this.state.movies;
          }
        }
      }
    })
  }
  ...
See how movie-search is hardcoded as the name of our content source, and we'll always be searching based on the movieQuery parameter set to Jurassic? What if later on we add a different movie API, or we want to search for movies that aren't Jurassic Park? Wouldn't it be great if all of those values were configurable in the PageBuilder Admin? Say no more!



Setting the contentConfig Custom Field PropType
One important use of Custom Fields is to allow PageBuilder editors to configure how individual Features fetch content. Because Features are simply React components that rely on content, they are largely agnostic of where the content they receive comes from as long as it has the correct keys and values (i.e. data "shape").

With this in mind, Fusion gives you the ability to specify a contentConfig propType that is essentially a list of acceptable schemas that this feature could work with. Then in PageBuilder Admin, an editor will be given a list of content sources that match that schema which they can select from.

Let's see how that works:

/*  /components/features/movies/movie-list.jsx  */

// We have to import the `PropTypes` module so we can use it later
import PropTypes from 'prop-types'
import Consumer from 'fusion:consumer'
import React, { Fragment, Component } from 'react'

@Consumer
class MovieList extends Component {
  ...
}

MovieList.propTypes = {
  customFields: PropTypes.shape({
    // We're using the Fusion-specific PropType `contentConfig` and passing it the name(s) of the GraphQL schemas this component will work with
    movieListConfig: PropTypes.contentConfig('movies')
  })
}

export default MovieList
As you can see above, we're defining a set of Custom Fields for our MovieList component, then creating a single Custom Field named movieListConfig. The interesting part here is the PropTypes.contentConfig type that we're using - this is a Fusion-specific PropType that takes in a list of GraphQL schemas that we've defined that should work with this component.

If we refresh our PageBuilder Admin at this point and look in the Custom Fields panel for the MovieList component, we should see the following:

As you can see, now we have a movieListConfig dropdown option available in the Admin populated with a list of content sources (in our case there is just 1, movie-search). These content sources are the ones that match the GraphQL schema we specified in the PropTypes.contentConfig() call (in this case, the schema name is movies).

While we only have one content source that matches the movies schema right now, in the future we may have multiple content sources that match, and we could then select from any of them as the content source of this component!


Using the contentConfig values from PageBuilder Admin
The contentConfig propType should return us an object with 2 properties.

The first is a contentService key, whose value is a string representing the name of the content source (in this case, movie-search).

The second key is contentConfigValues, whose value is an object containing the key/value pairs representing the data we need to query our content source. The key names of this object are the param names defined in our content source, and their values are whatever were entered by the editor in PageBuilder Admin.

Armed with this knowledge, let's see how we can use the movieListConfig prop in our fetch method to make things more dynamic:

/*  /components/features/movies/movie-list.jsx  */

  ...
  fetch () {
    // We're destructuring the `contentService` and `contentConfigValues` keys out of the `movieListConfig` prop inside `this.props.customFields`...
    const { contentService, contentConfigValues } = this.props.customFields.movieListConfig;
    const { page } = this.state;

    // Increment the page at each call
    this.state.page += 1;

    // ...then we can use these values to replace our hardcoded content source name with `contentService` and our query object with `contentConfigValues` (merged with the `page` param)
    this.fetchContent({
      movies: {
        source: contentService,
        query: Object.assign(contentConfigValues, { page: page + 1}),
        filter: '{ totalResults Search { Title Year Poster } }',
        transform: (data) => {
          // Check if data is being returned
          if(data && data.Search) {
            // Add the results to the paginated list of movies
            this.state.movies.pages[page] = data.Search
            return this.state.movies
          }

          // Otherwise just keep the current list of movies
          else{
            return this.state.movies;
          }
        }
      }
    })
  }
  ...
We've made 2 small, but important, changes.

First, we replaced the source to the movies object in fetchContent (the hardcoded movie-search value) with the key contentService that we extracted from this.props.customFields.movieListConfig.

Then, we replaced the static { movieQuery: 'Jurassic'} query object with Object.assign(contentConfigValues, { page: page + 1}), which merges the contentConfigValues object with the page param that we already had, and sends the whole thing as the new query object to our resolve function.


Multiple content sources


Since we are able to fetch content as many times as we want in a Feature, and since we can add as many contentConfig custom fields as we want, there is nothing stopping us from adding multiple content sources to a single feature. For example, let's imagine we had defined another content source (call it theater-search.js) and schema (call it theaters.js) for finding movie theaters, and we wanted to list local movie theaters alongside our list of movies; we could do something like this:

NOTE

We won't actually add the following code to our movie-list component since we didn't really define the corresponding content source and schema - this is just an example.

/*  /components/features/movies/movie-list.jsx  */

// We have to import the `PropTypes` module so we can use it later
import PropTypes from 'prop-types'
import Consumer from 'fusion:consumer'
import React, { Fragment, Component } from 'react'

@Consumer
class MovieList extends Component {
  ...

  fetchTheaters () {
    // Extract the `contentService` and `contentConfigValues` from the `theaterConfig` custom field, just like before
    const { contentService, contentConfigValues } = this.props.customFields.theaterConfig;

    // Here, we're using the `fetchContent` API to fetch our list of theaters and set them into component state
    this.fetchContent({
      theaters: {
        source: contentService,
        query: contentConfigValues
      }
    })
  }
  ...
  render () {
    // Now we can use the `theaters` object that we got back from the `fetchContent` call above!
    const { theaters } = this.state
    ...
  }
}

MovieList.propTypes = {
  customFields: PropTypes.shape({
    movieListConfig: PropTypes.contentConfig('movies'),
    // Adding a new `contentConfig` for fetching movie theaters
    theaterConfig: PropTypes.contentConfig('theaters')
  })
}

export default MovieList
As you can see above, it's entirely possible to have a single component with multiple content configurations (in this case movieListConfig and theaterConfig) that we can then use to fetch and render content.

It should be noted that you may not want to bloat your components by adding too much fetching and rendering code into a single component; instead, you may find it useful to have one component responsible for content fetching from multiple sources (similar to a "Container" component in Redux), and then delegate the rendering logic to stateless child components (similar to "Presentational" components).


Wrapping up
It may not seem like a huge change, but what we've done is completely decoupled our component code from the content source it relies on. As long as we have a content source that supplies data matching our movies schema, we can let the PageBuilder editors select the source of our content and which data is needed to query it.

For the purposes of our MovieList component, the resulting output is the same - but this is a very common use case when working with Arc's Content API, when multiple content sources may return similarly structured data.






Using Site Properties
Since Fusion applications can support multiple websites with the same Feature Pack, it's often necessary for different sites in the application to have different values for certain pieces of data - and for that, we have site properties. Site properties are site-specific values that may be accessed anywhere in your bundle, and can hold any data type. Good use cases for site properties might include Twitter handles, mailto addresses for contact info, or even just the human-readable name of the site itself.


Site properties vs. environment variables
Site properties and environment variables serve similar purposes, so it can be easy to get confused between which one you want to use in a given situation. But there are a few key distinctions between the two that can help determine which is the right tool for the job:

Environment variables can be encrypted locally and decrypted on the server. For this reason, they are ideal for "secret" variables like API credentials that you don't want to be exposed in plain text in your code repository. Site properties do not have this capability.
Site properties can be set on a "per-site" basis in multisite Fusion applications, meaning each site can have its own unique value for a given property. Environment variables, on the other hand, are universal across sites (not to be confused with environments).

Global values
Site properties have "global" values that will exist until they are overriden by more specific "site" values - this way, if a "site" value does not exist for a given piece of data, it can fall back to the "global" value. Global values should be defined in /properties/index.js (or /properties/index.json if you don't need to compute any values). These values will be the defaults and will be included for all sites, unless explicitly overridden.

Let's define a "global" property here for a fake media conglomerate with many holdings, Acme Media Group:

/*  /properties/index.js  */

export default {
  contactEmail: 'contact@acmemedia.com',
}
In this case, the only "global" value we want is a contact email address; no other value (like Twitter handle or site name) makes sense to set on a global scale, since we'd rather show nothing at all than inaccurate data for those fields.



Site specific values
Site-specific values should be defined in properties/sites/${site}.js (or properties/sites/${site}.json), where ${site} is the "slug" of the website the reader is making a request to. The site "slug" will be determined by whatever the value of the _website query parameter is on the URI of the page that was requested; you'll probably use some proxy server to redirect requests and append that query param (but that's outside the scope of these docs).

These values will override any global values when the site is loaded. So let's define some for a specific site owned by Acme Media Group, AcmeFeed (a listicle site for millenials).

/*  /properties/sites/acmefeed.js  */

export default {
  siteName: "AcmeFeed: You're Here for the Puppies",
  twitter: 'acmefeed',
  contactEmail: 'editor@acmefeed.com'
}
Here, siteName and twitter are properties that only exist for AcmeFeed, and contactEmail will override the "global" contactEmail property when the acmefeed site is being requested.

Using properties
Now, we're able to use our site properties in a component by using the getProperties method provided to us by fusion:properties. We just pass in the site name that we get from props like so:

/*  /components/features/my-group/my-component.jsx  */

import React, { Component } from 'react'
import Consumer from 'fusion:consumer'
import getProperties from 'fusion:properties'

@Consumer
class MyComponent extends Component {
  render() {
    const siteVars = getProperties(props.arcSite)

    return (
      <div>
        {siteVars.twitter && <a href={`https://twitter.com/${siteVars.twitter}`}>Twitter</a>}
        {siteVars.contactEmail && <a href={`mailto:${siteVars.contactEmail}`}>Contact</a>}
      </div>
    )
  }
}

export default MyComponent
Now, when a user requests a webpage on AcmeFeed's website that contains this component, they'll see links to AcmeFeed's Twitter handle (acmefeed) and their contact email address (editor@acmefeed.com). If AcmeFeed hadn't had a specific contact email address, that value would have fallen back to the "global" value contact@acmemedia.com.

Next:Adding Styling to Components



Adding Styling to Components
Unfortunately, modern internet users will not abide webpages without frivolities like colors, fonts that aren't Times New Roman, and layouts with more than 1 column. In order to satisfy the evolving demands of readers, you may be forced to add styling to your website with CSS.

There are two different approaches to adding styling to a Fusion site: adding global, static CSS in<link>tags, and importing styling directly into components.

Using statictags
By far the easiest way to add styling to your Fusion site is to write static CSS and include it via<link>tags in the head of your document, defined in the Output Type. This approach has the advantage of being easy to implement and understand.

Let's say we wanted to add some simple CSS to add common heights and classes to certain classes of images. To do so, let's create a directory calledcss/in our/resources/directory and a file calledmain.csswithin it.

NOTE

The/resources/directory is where Fusion expects static assets to be kept - things like images, fonts, CSS, and static JavaScript that can be served directly to the browser without being processed.

Here's some simple CSS for our site:

/*  /resources/css/main.css  */

.image-sm {
  height: 250px;
  width: 250px;
}
Now in ourdefault.jsxOutput Type, we can add a<link>tag to our new CSS file.

/*  /components/output-types/default.jsx  */

export default (props) => {
  return (
    <html>
      <head>
        <title>{props.metaValue('title') || 'Default Title'}</title>
        {props.metaTag}
        {props.libs}
        {props.cssLinks}
        <link rel='icon' type='image/x-icon' href={`${props.contextPath}/resources/img/favicon.ico`} />
        <link rel='stylesheet' href='https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css' />

        {/*  Adding a link to our new CSS file  */}
        <link rel='stylesheet' href={`${props.contextPath}/resources/css/main.css`} />
      </head>
      <body>
        <div className='container'>
          <div id='fusion-app'>
            {props.children}
          </div>
        </div>
        {props.fusion}
      </body>
    </html>
  )
}
We're using theprops.contextPathhelper above to prefix our path based on the environment we're in (e.g. in the "staging" environment, paths are prefixed with/pf/, whichcontextPathhandles for us). But other than that, this is a normal<link>tag.

All that's left is to actually apply our class to the images we want to resize:

/*  /components/features/movies/movie-list.jsx  */

...
class MovieList extends Component {
  ...
  render () {
    const { movies } = this.state
    return (
      <Fragment>
        <h2>Movies</h2>
        <div>
          {movies && movies.map((movie, idx) =>
            <div key={`movie-${idx}`}>
              <h4>{movie.Title}</h4>
              <p><strong>Year:</strong> {movie.Year}</p>

              {/*  Adding our class on the image below  */}
              <img src={movie.Poster} className='image-sm' />
            </div>
          )}
          <button onClick={ this.fetch }>More</button>
        </div>
      </Fragment>
    )
  }
}

export default MovieList
Now the poster images in ourMovieListcomponent should all be a standard size!


Importing Styling into Components
While including<link>tags is a dead simple way to add CSS, it doesn't offer the benefits of modern tooling like CSS preprocessing or module bundling to reduce CSS payload size. An alternative approach is to import CSS or SCSS files directly into our React components. This gives us the following benefits:


provides all the capabilities of SCSS (variables, importing, mixins, etc.)
prevents extraneous HTTP requests, since all our CSS will be bundled into a single file
removes any CSS from components not included on the page, reducing payload size
allows us to write CSS on a modular, per-component basis for easy re-use

Because Fusion usesWebpackunder-the-hood to bundle module dependencies, it's possible for us to import CSS or SCSS directly into any of our components - features, chains, layouts, and output types - and they will be included on the page automatically.


The more specific the styling is to a certain component, the more targeted we can be about where we import it. In other words, if a style is used across many components on the page, it may be best to import it at the Output Type level; however, styles that are specific to a certain Feature can be imported into that Feature alone, so they won't be included unnecessarily.


Let's re-implement the same image resizing we did above, but this time by importing the styling into the relevant Feature.


Since we're going to create a new file related to ourMovieListcomponent, let's create a directory for both the component definition and the style to live in, instead of just having our top-level component definition.


create a directory inside/components/features/movies/namedmovie-list/
then, move what used to be ourmovie-list.jsxfile into the new directory and rename itdefault.jsx(it's important that it's nameddefault, so Fusion knows what output type to use!)
finally, create astyle.scssinside the newmovie-list/directory


The resulting structure should now be:


components/
  features/
    movies/
      movie-list/
        default.jsx
        style.scss

You'll notice that style.scss is a SCSS file instead of plain CSS, and that we're creating it directly in the relevant component's directory, rather than in the/resources/directory.



/*  /components/features/movies/movie-list/style.scss  */

$image-size: 250px;

.image-sm {
  height: $image-size;
  width: $image-size;
}

In this very simple example, we're creating exactly the same styles as we did in the first example - except here you can see we're using SCSS variables to DRY up some of our code.



Now, in our MovieList component we can simply import the relevant file and use it as we did before:



/*  /components/features/movies/movie-list/default.jsx  */

// We import the style here...
import './style.scss'

...
class MovieList extends Component {
  ...
  render () {
    const { movies } = this.state
    return (
      <Fragment>
        <h2>Movies</h2>
        <div>
          {movies && movies.map((movie, idx) =>
            <div key={`movie-${idx}`}>
              <h4>{movie.Title}</h4>
              <p><strong>Year:</strong> {movie.Year}</p>

              {/*  ...and add our class on the image below, just as before  */}
              <img src={movie.Poster} className='image-sm' />
            </div>
          )}
          <button onClick={ this.fetch }>More</button>
        </div>
      </Fragment>
    )
  }
}

export default MovieList


Our style should now be applied, just as it was in the first example - except in this case, this CSS won't be included on any page that doesn't contain this Feature, reducing our payload size and keeping our code modular.



It's important to note that this only works because of the{props.cssLinks}line that we have in our Output Type - this code is responsible for injecting the compiled CSS code from Webpack into each page. Without it, our CSS would not have been added to the page at all!




Adding Custom Fields to Components
Custom Fields are an especially useful tool when building websites with Fusion and PageBuilder. As their name suggests, Custom Fields allow developers and editors to set arbitrary (i.e. "custom") data (i.e. "fields") on individual instances of Features and Chains in Fusion, which can then be used to change the look, feel or behavior of that particular component.


What are Custom Fields?
Custom Fields are simply key/value pairs assigned to an individual Feature or Chain. The key names are defined in their respective components, and the values for each component instance are set in the PageBuilder Admin. This allows Feature Pack developers to define and use data relevant to their components, and for PageBuilder editors to decide how individual components should behave.


Common use cases for Custom Fields include setting headings or text that should be customizable for each Feature, styling attributes, and content configurations that allow PageBuilder editors to assign content sources to components.



Custom Fields as PropTypes
Custom Fields can be added to either Features or Chains in a Feature Pack. Both define Custom Fields in the same way - using React's PropTypes standard to denote the name and type of data the Custom Field is expecting.


Custom Fields can be added to both functional components and class-based components. Here's an example using the MovieDetail component we defined in the "Creating a Feature Component" guide:



/*  /components/features/movies/movie-detail.jsx  */

import PropTypes from 'prop-types'
import Consumer from 'fusion:consumer'
import React, { Component, Fragment } from 'react'

@Consumer
class MovieDetail extends Component {
  render () {
    const { Actors, Director, Plot, Poster, Rated, Title, Writer, Year } = this.props.globalContent

    // We can extract our custom field values here, and even set default values if desired...
    const { moviePrefix = 'Movie', showExtendedInfo = false } = this.props.customFields

    return (
      <div className='movie-detail col-sm-12 col-md-8'>
        {/* We use the `moviePrefix` value before the Title */}
        <h1><span>{moviePrefix}:</span> {Title}</h1>
        ...
        {/* we can use our boolean value `showExtendedInfo` to determine if certain data gets displayed or not */}
        {showExtendedInfo &&
          <Fragment>
            {Rated && <p><strong>Rated:</strong> {Rated}</p>}
            {Writer && <p><strong>Writer:</strong> {Writer}</p>}
            {Year && <p><strong>Year:</strong> {Year}</p>}
          </Fragment>
        }
        ...
      </div>
    )
  }
}

MovieDetail.propTypes = {
  customFields: PropTypes.shape({
    moviePrefix: PropTypes.string.isRequired,
    showExtendedInfo: PropTypes.bool
  })
}

export default MovieDetail

As you can see in the code and comments above, we defined a required moviePrefix custom field that should contain some text to prefix our movie title, and an optional showExtendedInfo field that is a boolean determining whether to show certain data in this view. These values will now be configurable in the PageBuilder Admin by editors, and we can use them just like any other data in our component to change its behavior!



Inline Editing
When we're adding custom fields to a component, it's easy for us as developers to think of how that custom field will work and what changing it will do to the component. But remember: PageBuilder is built for editors too! Our editors might not know what our moviePrefix custom field is meant to do, or any other custom field for that matter.


To make it clearer and easier for editors to configure custom fields, PageBuilder has "editable" custom fields. An editable field is one that can be edited inline from our "preview" in PageBuilder on the rendered page itself, rather than from a panel in the sidebar.


However, custom fields aren't inline editable by default; it's up to the Feature Pack developer to denote a custom field that should be inline editable, and which DOM element it is tied to. We can do that using the editableField prop that gets passed to Consumer decorated components. It's a function takes the name of the field we want to edit as a string, and returns an array of attributes that PageBuilder uses to identify the element. Rather than printing the attributes out manually, it is considered best practice to use the ES6 spread operator to enumerate the attributes directly on the element we want to edit.



/*  /components/features/movies/movie-detail.jsx  */

...
@Consumer
class MovieDetail extends Component {
  render () {
    return (
      <div className='movie-detail col-sm-12 col-md-8'>
        {/* Invoking the `editableField` method with `moviePrefix` as the custom field it is tied to */}
        <h1><span {...this.props.editableField('moviePrefix')}>{moviePrefix}:</span> {Title}</h1>
        ...
      </div>
    )
  }
}

MovieDetail.propTypes = {
  customFields: PropTypes.shape({
    moviePrefix: PropTypes.string,
    showExtendedInfo: PropTypes.bool
  })
}

export default MovieDetail


In the above code, the<span>that contains our moviePrefix content will now be editable in the Admin Preview. When a PageBuilder editor focuses on the field and edits, whatever they type inside the<span>will be saved as the new value of the moviePrefix custom field.


You can find the complete list of Custom Field types, along with their options, in the API documentation here.



Working with Display Properties
One of the things that makes PageBuilder and the Fusion Engine unique is how it can be adapted to serve multiple different Output Types. Output Types allow us to display content in a variety of different formats without refactoring all of the components included within them (for clarity, in this document "components" will mean Features, Chains and Layouts). Common use cases for different Output Types include a standard desktop Output Type, a separate "mobile web" Output Type, and different Output Types for proprietary platforms such as Google Amp, Facebook Instant Articles and more.


While Output Types are useful, they do present a challenge: how can we write components that are generic enough to work in every Output Type, but also able to be rendered differently in each Output Type depending on our needs? The answer, as you may have guessed, is "Display Properties".


What are display properties?
Display Properties are a set of keys defined in the Output Type whose values are set on a per-component basis in the PageBuilder Admin. Another way to think of Display Properties is "custom fields, but defined per Output Type". Using this pattern, we can write our components generically and then define any qualities that are specific to an Output Type with a Display Property.


Defining in the Output Type
For example, let's say in addition to our default Output Type, we also want to create a mobile Output Type that (among other things) selectively hides or shows which content should fit in a mobile view. We can create that new Output Type by adding a mobile.jsx file to the/components/output-types/directory. Since the JSX definition of our mobileOutput Type doesn't actually differ from that of our default Output Type, we can simply import the default Output Type into our mobile one for now, and extend it later.


/*  /components/output-types/mobile.jsx  */

import OutputType from './default.jsx'

However, we also want to add some displayPropTypes to our Output Type before actually exporting it. displayPropTypes are the way we define the "keys" of our Display Properties, which become form items that can be set on a per-component basis in PageBuilder. We can add our displayPropTypes by importing the PropTypes library and defining the property that we care about inside a static property called displayPropTypes, which is an object:



/*  /components/output-types/mobile.jsx  */
import PropTypes from 'prop-types'
import OutputType from './default.jsx'

OutputType.displayPropTypes = {
  hideOnMobile: PropTypes.bool.tag({
    name: 'Hide on Mobile?'
  })
}

export default OutputType

Above, we've defined a boolean property named hideOnMobile which we can use to determine whether each of our components should be hidden in a mobile Output Type. 

Since displayPropTypes use the same Fusion-specific version of the PropTypes library as Custom Fields do, we can also chain the<code>.tag</code> method to our property. We pass an object containing a name property as the argument, which is the human-readable version of the key; this will be the label that editors see in PageBuilder.


Using display properties in a component
Now that we've defined the property we care about in our Output Type, we can see the option in our PageBuilder instance. When we open the editor view of our "homepage" and select the MovieList component in the sidebar, and then select the "Display" tab in the sidebar, we will see our "Hide on Mobile?" checkbox is displayed! Why don't we set this to true for now by selecting the checkbox on the MovieList component, so it won't be shown in the mobile view.


Even though we can now set this value for each of our components, we aren't actually using it yet. That's because we need to write some code in each of our components that consumes the displayProperties prop, which will contain the value set in PageBuilder.


That's easy enough to do - we just have to use the props.displayProperties object in a Consumer wrapped component, and we'll have access to the value we need. Let's see how we can use that in our MovieList component:


import Consumer from 'fusion:consumer'
import React, { Component } from 'react'

@Consumer
class MovieList extends Component {

  ...

  render () {
    // Extract the `hideOnMobile` value from props.displayProperties, which we default to an empty object
    const { hideOnMobile } = this.props.displayProperties || {}
    // Before anything else, if hideOnMobile is true, we return null so nothing else gets rendered
    if (hideOnMobile) return null

    ...
  }
}

export default MovieList

Since hideOnMobile is a boolean, we simply need to extract it from the displayProperties object and check for its existence; if it's true, we want to return null from this component so nothing gets rendered.



Despite the simplicity of this example, hopefully you can see how Display Properties can be used to provide differentiated logic between multiple Output Types in a single component.




Isomorphic vs. Server vs. SPA rendering
One of the enormous benefits of writing Fusion Feature Packs as React components is the ability to render them "isomorphically"- meaning on both the server-side and again on the client-side. However, isomorphic rendering isn't the only option when writing Features - Fusion gives you the flexibility to choose what context you want each of your Features to render in.



For Fusion's purposes, Output Types will always be rendered server-side only, since they are the HTML shell of the page itself. Layouts and Chains will always be rendered isomorphically, since they may contain multiple Features - some that are server-side only, and some client-side only. Features, however, can be configured to render isomorphically, server-side only, or client-side only. Let's talk about why you'd want to use each rendering option, and how to do so.


Rendering isomorphically / universally
Isomorphic rendering offers lots of benefits when building a modern Single Page Application - you get the rich interactivity and performance benefits of running a client-side web application, without losing SEO-optimization or the ability to render in non-JavaScript-enabled clients.



If a Feature you're building has some sort of client-side interaction (onClick, onSubmit, keyPress events, etc.), but you also need to render it server-side, you'll want to render isomorphically.

The good news is isomorphic rendering is the default in Fusion - if you'd like to render a Feature isomorphically, simply write your components normally and they'll render in both contexts.


Rendering server-side only
Sometimes, isomorphic rendering won't be appropriate for a certain component. Perhaps you're writing a component that uses some code that shouldn't be exposed to the client, or maybe you just don't want to send the extra bytes of JavaScript to the browser for this component since it never gets updated client-side. For these situations, you may want to render server-side only.



If you'd like to mark a Feature to be rendered on the server only, you can add a.static = true property to it like so:

/*  /components/features/movies/movie-detail.jsx  */

import React, { Component } from 'react'

class MovieDetail extends Component {
  ...
}

MovieDetail.static = true

export default MovieDetail

This will tell Fusion that this component should be rendered into HTML on the server-side, but then not re-hydrated as a React component client-side.



WARNING

There are downsides to rendering server-side only - your content may become stale if it changes before Fusion's CDN has expired it.



Good candidates for static components meet the following criteria:


They have no client-side interactivity implemented by React or Fusion
They don't use any content from a content source at all, OR they use only globalContent, not feature-level content, as it's easier to purge caches for globalContent and therefore less likely to serve stale content

Rendering client-side only
The final option available to us is rendering client-side only. This is a bit of a misnomer with Fusion, as your React component's render function will get invoked on the server no matter what. However, you can choose to render empty markup (without content) on the server, and then fill in the component with content on the client-side later. This may offer a small performance benefit, as you'll avoid fetching content for this component server-side. This option is best for Features that are not crucial to the content of the page and can be loaded with a small delay.



In Fusion, there are two ways to ensure that code only gets run on the client side: use a conditional to check for the window object (which is only available on the client), or to put client-side code inside the componentDidMount React lifecycle method. This method will get triggered once your component gets mounted on the page client-side, but does not get executed server-side.


Let's see how that might look in our MovieList component:



/*  /components/features/movies/movie-list/default.jsx  */
import Consumer from 'fusion:consumer'
import React, { Fragment, Component } from 'react'
import './style.scss'

@Consumer
class MovieList extends Component {
  constructor (props) {
    super(props)
    this.state = { movies: [], page: 1 }
  }

  componentDidMount() {
    // We moved our `this.fetch()` call to `componentDidMount` from `constructor`
    this.fetch()
  }

  fetch () {
    ... // All our fetching logic from earlier is still here
  }

  render () {
    // If the window object doesn't exist, we will return an empty Fragment
    if (typeof window === 'undefined') return null

    ... // All our rendering logic for the rest of the component is still here
  }
}

MovieList.propTypes = {
  customFields: PropTypes.shape({
    movieListConfig: PropTypes.contentConfig('movies')
  })
}

export default MovieList


We've done two things to ensure our component doesn't fetch or render server side:


We moved our content fetch call inside of componentDidMount, so now it will only occur client-side
Additionally, we added a check in the render method to render an empty Fragment if the window object doesn't exist, which will only be true on the server.

The effect of both these changes is that the HTML rendered from our component on the server will be empty initially, and content will only be fetched and fill the component on the client-side!



WARNING

Rendering client-side only could affect SEO negatively, since web crawlers typically have difficulty reading AJAX-only web pages - although they have been improving.



Using Third-Party Libraries
One of the huge benefits of Fusion Feature Packs being written entirely in JavaScript is that developers have access to the vast JavaScript ecosystem and community. At a practical level, that means the ability for Feature Pack developers to use third-party libraries and code available via modern JavaScript package managers in their Feature Packs.


Fusion currently supports NPM as its package management option for developers. We do not support Yarn.


Installing and using a module
With that in mind, let's install a module from NPM. I'd like to use a simple helper method from lodash to help shuffle items in a collection around:



$ npm install lodash.shuffle

Now if we look in our /package.json file, we should see lodash.shuffle listed in the dependencies!



Now we can use this module in our Feature Pack. Remember our movies.jsx component? Let's see if we can find a place to use our new shuffle helper method:



/*  /components/features/movies/movie-list.jsx  */

import Consumer from 'fusion:consumer'
import React, { Fragment, Component } from 'react'

// We import our shuffle method here...
import shuffle from 'lodash.shuffle'

@Consumer
class MovieList extends Component {
  ...

  fetch () {
    const { page } = this.state;

    // Increment the page at each call
    this.state.page += 1;

    this.fetchContent({
      movies: {
        source: 'movie-search',
        query: {
          movieQuery: 'Jurassic',
          page: page + 1
        },
        filter: '{ totalResults Search { Title Year Poster } }',
        transform: (data) => {
          // Check if data is being returned
          if(data && data.Search) {
            // ...then we can use it here to shuffle new movies fetched from our content source!
            this.state.movies.pages[page] = shuffle(data.Search);
            return this.state.movies;
          }

          // Otherwise just keep the current list of movies
          else{
            return this.state.movies;
          }
        }
      }
    })
  }
  ...
}

export default MovieList

You can see in the snippet above (the constructor and render methods have been removed for brevity) that we can import our module by its name, just like we would any other module, and use it right in our component.



Modules can be used in any code in your Feature Pack that gets bundled by Webpack - in components, content sources, schemas, even in environment.js and site property definitions.


Considerations
It's important to remember that while you can import nearly any code available on NPM into your Feature Pack, that doesn't mean you always should.



One consideration when evaluating whether to install a module is its size - you have to remember that Fusion uses isomorphic rendering, so any modules that get included in a component get included both server-side and client-side unless you tell Fusion differently. It may be tempting to install a module like moment.js for its ease of use, but do you really want to include a 227.5kb module into your client side code just for a single function invocation?



Another consideration is simply whether the module you are including is intended for client-side use at all. Many modules on NPM are intended for node, server-side use only, and wouldn't make sense to install into a client-side component.



Finally, security and reliability are always concerns when using third-party code. It's common for third-party libraries to have security vulnerabilities, or even for the packages to be removed entirely from NPM. When installing third-party libraries, make sure the code is from a reputable source, check it as thoroughly as possible, and keep your versions up-to-date!




Messaging Between Components
In any software application of sufficient size and complexity, you'll have to deal with state management - the getting and setting of common data between disparate components. Fusion applications are no different - but they do come with an interesting set of challenges.


The problem with state
In a typical web application using React, sharing state between components would be solved by either lifting state up to a common ancestor, or in more complicated scenarios by some sort of state management library like Redux, Mobx or others.



But Fusion applications are not typical web applications. The chief difference (and difficulty) in building Fusion apps vs. typical web apps is that Fusion does not know which components will be on the page at build time. Because PageBuilder editors are the ones who control which components go on which pages/templates, Feature Pack developers can't be sure which components will coexist when they are writing those components. As a result, state management between components becomes difficult, since we can't reliably depend on any other components to exist on the page!



Because of this, it's considered a Fusion "best practice" to try and write your components in such a way that they are totally self-sufficient and don't depend on the existence or non-existence of any other components on your webpage.



However, because we live in a flawed world, sometimes it will become necessary for two components to share small amounts of information between one another. Fusion offers a dead-simple messaging mechanism for one component on the page to notify another (or several others) that a change has occurred.

How to message
Let's say we have an urgent need for our movie summary application: users are telling us that when they're reading the plot of a movie, it's distracting to see a list of so many other great movies in the sidebar. So we want to hide the list of movies when the plot of a movie is shown, and display it only when the plot is hidden. The only problem: the MovieList lives in a different component than the MovieDetail, which is where we toggle the plot to be hidden or shown! Does this sound like a use case contrived to prove a point? You betcha!



The Consumer provides two simple utility methods to help us send and receive messages between components: dispatchEvent and addEventListener. These methods mimic the methods of the same name that are included on browser DOM nodes; the difference is that these methods are invoked on React components wrapped by the Consumer, not DOM nodes.



The first thing we'll want to do is to dispatch an event from our MovieDetail component whenever the plot of our movie is hidden or shown. That's easy enough, we'll just add a couple lines to the togglePlot method in our component:



/*  /components/features/movies/movie-detail.jsx  */

@Consumer
class MovieDetail extends Component {
  ...
  togglePlot () {
    const { isPlotShown } = this.state
    // Create a common const `newPlotShown` for the next 2 lines to use
    const newPlotShown = !isPlotShown
    this.setState({ isPlotShown: newPlotShown })

    // Dispatch an event called `moviePlotToggled` whose value is the new state of the plot's visibility
    this.dispatchEvent('moviePlotToggled', newPlotShown)
  }
  ...
}

export default MovieDetail

As you can see, we can use the dispatchEvent method just like we would on a DOM node to notify any subscribers to the moviePlotToggled event what state the movie plot's visibility is in.



Now, we have to listen for that change in our MovieList component:



/*  /components/features/movies/movie-list.jsx  */

@Consumer
class MovieList extends Component {
  constructor (props) {
    super(props)
    // Adding the `showList: true` property
    this.state = { movies: [], page: 1, showList: true }
    this.fetch = this.fetch.bind(this)
    this.fetch();
  }

  ...

  // Adding our eventListener inside `componentDidMount` ensures it only happens client-side
  componentDidMount () {
    // Define an event handler that sets the `showList` property to the opposite of the `plotShown` value we receive
    const msgHandler = (plotShown) => {
      this.setState({ showList: !plotShown })
    }
    // Trigger the event handler when the `moviePlotToggled` event is triggered
    this.addEventListener('moviePlotToggled', msgHandler)
  }

  ...

  render () {
    const { movies, showList } = this.state
    // Use the `showList` state to determine whether to show the movie list or not
    return showList ? (
      <Fragment>
        ...
      </Fragment>
    ) : null
  }
}

export default MovieList

Explained:


In order to determine whether or not we should show the MovieList or not, we add a showList property to our component state that will track whether it should be displayed.
Inside a componentDidMount lifecycle hook, we invoke our addEventListener method and pass it the name of the event we're listening for, and a handler for when the event is triggered.
The handler method receives an argument representing the event payload, which in this case is a boolean of whether or not the plot is shown. If the plot is shown we want to hide the movie list, and vice versa.
In our render method, we use the showList property that we toggled in our event handler to determine whether or not to display the movie list.

The effect of this code should be that when the moviePlotToggled event is dispatched in the MovieDetail component, our MovieList component will listen to that change and toggle its display to be the opposite of whatever the movie plot's state is! Our users can now read the plots of their movies without distraction.



There's no reason we couldn't have several other components listening to this same event if we needed to; this makes the simple messaging API provided by Fusion very flexible.

Removing listeners
In addition to dispatching events and listening to them, Fusion offers a way to remove listeners as needed. This is not only a good way to prevent multiple triggers of an event handler (if desired); it's also good practice to remove listeners from the page once they (or their parent components) aren't needed anymore, to prevent phantom listeners from causing memory leaks.



Let's say in this instance we only want to toggle the MovieList component one time and never again; we can simply add a removeEventListener method invocation inside our event handler.



/*  /components/features/movies/movie-list.jsx  */

@Consumer
class MovieList extends Component {
  ...
  componentDidMount () {
    const msgHandler = (plotShown) => {
      this.setState({ showList: !plotShown })
      // Remove the `msgHandler` event handler function (which is the parent function of this block) as a subscriber from the 'moviePlotToggled' event
      this.removeEventListener('moviePlotToggled', msgHandler)
    }

    this.addEventListener('moviePlotToggled', msgHandler)
  }
  ...
}

export default MovieList

In the simple example above, we remove the msgHandler event handler inside of itself. This will have the effect of the handler being removed after it is invoked the very first time, meaning in our case that the first time a user clicks "Show Plot" the MovieList will go away and not come back until the page is refreshed. It's important that the 2nd argument to removeEventListener is a reference to the exact same function instance that was passed to the addEventListener method.



A more common use of removeEventListener might be to remove any listeners from the component inside a componentWillUnmount lifecycle method. This should work fine, as long as the event handling functions are made instance methods of the component so they can be referenced in both the addEventListener and removeEventListener calls.




Helpful Commands
Here is a list of helpful commands you can run from your Terminal while developing with Fusion, mostly provided by the Fusion CLI.

All of these commands should be run from the root directory of your Feature Pack repo.



Creating a new repo
# First we need to create a directory for our Feature Pack to exist in. We'll call this one My-Fusion-Repo
$ mkdir My-Fusion-Repo
$ cd My-Fusion-Repo

# You need to decide whether to install the @arc-fusion/cli package locally (recommended) or globally. Only perform ONE of the following sets of commands:

# LOCALLY INSTALLED
$ npx @arc-fusion/cli init # Downloads and runs the `@arc-fusion/cli` script to init a new repo and install `@arc-fusion/cli` as a devDependency.

# GLOBALLY INSTALLED
$ npm i -g @arc-fusion/cli # Installs the `@arc-fusion/cli` package as a global binary under the namespace `fusion`
$ fusion init # Invokes the `fusion init` command to init a new repo


For the rest of the commands below, we will expect that you've installed the Fusion CLI locally, so we'll execute the commands via npx. However, if you installed globally, simply run the commands below without the npx prefix (e.g. fusion start instead of npx fusion start) for the same result.

Starting and stopping Docker
$ npx fusion start # Builds and starts all containers. You can add the `--no-admin` flag to run the command without the PageBuilder Admin
$ npx fusion daemon # Runs the application in daemon mode (i.e. in the background)
$ npx fusion stop # Stops running containers without removing them
$ npx fusion down # Stops and removes all running containers
Developing
$ npx fusion rebuild # Manually rebuilds the webpack bundle (good to run when code changes aren't reflected)
$ npx fusion verify # This will run Webpack on your source code to see if there are any errors in the build.
Keeping up to date
$ docker-compose pull # Pulls the latest Docker images running Fusion. This command gets run whenever you invoke the `start` command, but you can also run it manually
$ npx fusion version # This will tell you the version of the Fusion CLI you are using. This is *NOT* the same thing as the Fusion engine version you are running! For that info, go to `http://localhost/release` while running Fusion.
Cleaning up Docker artifacts
$ npx fusion cleanContainers # Removes all exited containers
$ npx fusion cleanImages # Removes all unused images
$ npx fusion cleanNetworks # Prunes all unused networks
$ npx fusion cleanVolumes # Removes docker volumes
$ npx fusion nuke # Runs all of the 'clean' commands above to ensure no Docker artifacts remain

Exporting data
$ npx fusion dump # Creates a timestamped DB export in .tar.gz format in the ./data/dumps directory. Docker must be running.
$ npx fusion zip # Creates a timestamped zip of the Feature Pack (without node_modules) inside the ./dist directory



Deploying a Feature Pack
As a developer, it's natural to be protective of your code - but you can't keep it on localhost forever. Eventually you'll need to release it to the Internet, and in order to do so you'll need to deploy it via PageBuilder's deployment tool, Maestro.



Deployment process
Deploying your Feature Pack to Fusion is simple in concept: you'll create a .zip file that contains all the code in your Feature Pack, and then you'll upload that to Maestro. Maestro will handle the process of building your code and deploying it to the various services that work together to make Fusion run. We'll call an instance of a deployed Feature Pack a "bundle".



One of the capabilities of Fusion's architecture is the ability to have multiple different deployed bundles running simultaneously, while only one of them is "live" (i.e. the one users can see). This has several benefits, most notably the ability to "hot swap" from one running bundle to another without users experiencing any downtime. You can even preview a running bundle before it goes "live" so that you can test your code on a running server before users see it.



Zipping and uploading
When your code is ready to be deployed, run the npx fusion zip command from the root of your Feature Pack directory. This will build your code (to verify that it doesn't have any compilation errors) and then create a timestamped .zip file in the /dist/ directory.



Once you see the .zip file is created, go to https://${endpoint}/deployments/fusion/, where endpoint is the domain of the Arc client instance. Click the "upload bundle" button on the right side of the "BUNDLES" section. This will open up a sidebar asking for the name of your bundle and a file uploader to select the .zip file with. Be sure to name your bundle something descriptive so you can differentiate it from other bundles easily (i.e. if this bundle is linked to a Github PR, perhaps include the PR number for reference).



Once you click the "upload" button, Maestro will upload your Feature Pack, and you can see it in the list of "Bundles" at the bottom of the page - however, at this point it is not "deployed" to a server anywhere.



Deploying and promoting
To deploy your code, find the bundle you just uploaded in the list, and then click the vertical ellipsis icon on the right. From there, click the "Deploy" link in the menu - this will bring up a dialog that asks you to choose what version of Fusion you'd like to deploy this bundle on. If you have a specific version of Fusion you'd like to deploy with, choose it here - otherwise, select the latest version and click "Deploy".

If there is an error during deploy, you will see an error message at this point that you may need to resolve before deploying again. If everything goes OK, you should see your bundle displayed in the list of "RUNNING" bundles.


At this point, your code is on a server but not yet "live" for users to see. In order to make this the "live" instance, go to the vertical ellipsis icon on the right of the bundle name - click the icon, and then click the "Promote" button in the list that is displayed. Now, you should see a "live" message in green next to your running bundle, and your Feature Pack is live for users to see at your Arc client's endpoint!

CI/CD integration
It's possible to automate your deploy process using a Continuous Integration/Continuous Deployment strategy. While setting this process up goes beyond the scope of this guide, the generic steps would be:

Configure your CI/CD tool of choice (CircleCI, Jenkins, Travis CI, etc.) to run the npx fusion zip command (or equivalent) when code changes to the desired branch are pushed.
Use your CI/CD tool to collect the generated .zip file from the previous command and send it via an HTTP POST request to https://${username}:${password}@${endpoint}/deployments/fusion/bundles, where username and password are the credentials for this Arc client instance, and endpoint is the domain of the instance. The Content Type of the request should be multipart/form-data, and the format of the body of the request should be in the format:
{
  name: 'nameOfDeployedBundle',
  bundle: fs.createReadStream('bundle.zip')
}

You can add other steps into your CI/CD pipeline that include testing, code linting and more as needed.





Subscriptions
Deck
https://docs.google.com/presentation/d/1cRMwd989CEkuAnqX2r8V7c5HKyUPMfRc628_ngHMPRo/edit#slide=id.p

Technical documentation
https://redirector.arcpublishing.com/alc/docs/api/arc-sdks/index.html

JWT:
we haven't implemented any variation from standard JWT signing or expiration,  stored as localstorage or cookie, expiration defined in token,  - refresh token (default 1 hour, configurable), 

window.Identity
Google + Facebook login supported. (User Interface - Work in progress) WIP Amazon, LinkedIn, etc, coming)



























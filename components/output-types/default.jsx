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

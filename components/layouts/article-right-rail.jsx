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

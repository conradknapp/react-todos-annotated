import React, {Component} from 'react';
import createHistory from 'history/createBrowserHistory';

export class Link extends Component {

  render () {
    const history = createHistory();
    const handleClick = (e) => {
      e.preventDefault();
      history.push(this.props.to)
    }
    const activeClass = this.context.route === this.props.to ? 'active' : ''
    return <a href="#" className={activeClass} onClick={handleClick}>{this.props.children}</a>
  }
}
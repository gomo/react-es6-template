import {Component, PropTypes} from 'react';

export default class BaseItem extends Component
{
  constructor(props) {
    super(props);
  }

  render(){
    const style = {
      backgroundColor: "#ccc",
      width: '60px',
      height: '30px',
      lineHeight: '30px',
      textAlign: 'center',
      userSelect: 'none',
      cursor: 'move'
    }

    return (
      <div style={style}>
        {this.props.text}
      </div>
    );
  }
}

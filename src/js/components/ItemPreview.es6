import React from 'react';
import DragLayer from 'react-dnd/lib/DragLayer';
import BaseItem from './BaseItem';

function collect (monitor){
  const item = monitor.getItem();
  return {
    text: item ? item.id : null,
    clientOffset: monitor.getSourceClientOffset()
  };
}

class ItemPreview extends React.Component {
  getItemStyles (clientOffset) {
    if (!clientOffset) {
      return {
        display: 'none'
      };
    }

    const parentBounds = this.refs.preview.parentNode.getBoundingClientRect();
    //borderの幅を引く
    const borderHeight = parentBounds.height - this.refs.preview.parentNode.clientHeight;
    const borderWidth = parentBounds.width - this.refs.preview.parentNode.clientWidth;
    const x = clientOffset.x - parentBounds.left - (borderWidth ? borderWidth / 2 : 0);
    const y = clientOffset.y - parentBounds.top - (borderHeight ? borderHeight / 2 : 0);
    const transform = `translate(${x}px, ${y}px)`;

    return {
      position:'absolute',
      top: 0,
      left: 0,
      transform: transform,
      WebkitTransform: transform
    };
  }

  render () {
    return (
      <div ref="preview" style={this.getItemStyles(this.props.clientOffset)}>
        <BaseItem text={this.props.text} />
      </div>
    );
  }
}

export default DragLayer(collect)(ItemPreview);

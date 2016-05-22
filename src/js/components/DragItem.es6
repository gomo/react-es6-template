import {Component, PropTypes} from 'react';
import {DragSource} from 'react-dnd';
import BaseItem from './BaseItem';

var dragItemSource = {
  beginDrag: function (props) {
    return props;
  }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

class DragItem extends Component
{
  constructor(props) {
    super(props);
  }

  render(){
    const {connectDragSource} = this.props;

    const style = {
      display: this.props.isDragging ? 'none' : 'block',
      position: 'absolute',
      top: this.props.top + "px",
      left: this.props.left + "px"
    }

    return connectDragSource(
      <div style={style}>
        <BaseItem text={this.props.id} />
      </div>
    );
  }
}

DragItem.propTypes = {
  connectDragSource: PropTypes.func.isRequired
}

export default DragSource("DragItem", dragItemSource, collect)(DragItem);

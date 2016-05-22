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
    this.props.itemComponents[this.props.id] = this;
    this.state = {
      top: parseInt(this.props.initialTop, 10),
      left: parseInt(this.props.initialLeft, 10)
    }
  }

  moveTo(top, left){
    this.setState({
      top: parseInt(top, 10),
      left: parseInt(left, 10)
    });
  }

  render(){
    const {connectDragSource} = this.props;

    const style = {
      display: this.props.isDragging ? 'none' : 'block',
      position: 'absolute',
      top: this.state.top + "px",
      left: this.state.left + "px"
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

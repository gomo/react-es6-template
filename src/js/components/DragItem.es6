import {Component, PropTypes} from 'react';
import {DragSource} from 'react-dnd';

var dragItemSource = {
  beginDrag: function (props) {
    return props;
  }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource()
  };
}

const style = {
   backgroundColor: "#ccc",
   width: '60px',
   height: '30px',
   textAlign: 'center',
   position: 'absolute'
}

class DragItem extends Component
{
  constructor(props) {
    super(props);
  }

  render(){
    const {connectDragSource} = this.props;

    const style = {
       backgroundColor: "#ccc",
       width: '60px',
       height: '30px',
       textAlign: 'center',
       position: 'absolute',
       top: this.props.top + "px",
       left: this.props.left + "px"
    }


    return connectDragSource(
      <div style={style}>
        FooBar
      </div>
    );
  }
}

DragItem.propTypes = {
  top: PropTypes.number.isRequired,
  left: PropTypes.number.isRequired,
  connectDragSource: PropTypes.func.isRequired
}

export default DragSource("DragItem", dragItemSource, collect)(DragItem);

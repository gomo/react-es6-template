import {Component, PropTypes} from 'react';
import DragItem from './DragItem';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { DropTarget } from 'react-dnd';

const style = {
   border: "1px solid #666",
   width: '500px',
   height: '500px',
   position: 'relative'
}

const areaTarget = {
  drop(props, monitor, component) {
    const item = monitor.getItem();
    const delta = monitor.getDifferenceFromInitialOffset();
    const left = Math.round(item.left + delta.x);
    const top = Math.round(item.top + delta.y);

    component.moveBox(left, top);
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}

class Area extends Component
{
  constructor(props) {
    super(props);

    this.state = {
      top: 0,
      left: 0
    }
  }

  moveBox(left, top){
    this.setState({top: top, left: left});
  }

  render(){
    const { connectDropTarget } = this.props;
    return connectDropTarget(
      <div style={style}>
        <DragItem top={this.state.top} left={this.state.left} />
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(DropTarget("DragItem", areaTarget, collect)(Area));

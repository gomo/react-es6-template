import {Component, PropTypes} from 'react';
import DragItem from './DragItem';
import ItemPreview from './ItemPreview';
import { DragDropContext } from 'react-dnd';
import DndBackend from 'react-dnd-touch-backend';
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
    const itemComponent = component.itemComponents[item.id];
    const delta = monitor.getDifferenceFromInitialOffset();
    const top = Math.round(itemComponent.state.top + delta.y);
    const left = Math.round(itemComponent.state.left + delta.x);

    itemComponent.moveTo(top, left);
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
    this.itemComponents = {};
  }

  render(){
    const { connectDropTarget } = this.props;
    return connectDropTarget(
      <div style={style}>
        <DragItem id="foo" initialTop="0" initialLeft="0" itemComponents={this.itemComponents} />
        <DragItem id="bar" initialTop="0" initialLeft="100" itemComponents={this.itemComponents} />
        <DragItem id="baz" initialTop="200" initialLeft="150" itemComponents={this.itemComponents} />
        <ItemPreview />
      </div>
    )
  }
}

export default DragDropContext(DndBackend({ enableMouseEvents: true }))(DropTarget("DragItem", areaTarget, collect)(Area));

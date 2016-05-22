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
    const delta = monitor.getDifferenceFromInitialOffset();
    const left = Math.round(item.left + delta.x);
    const top = Math.round(item.top + delta.y);

    component.moveBox(item.id, top, left);
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
      items: [
        {id: "1", top:0, left: 0},
        {id: "2", top:0, left: 100},
      ]
    }
  }

  moveBox(id, top, left){
    var currentItems = this.state.items;
    var item = currentItems.find(item => item.id == id);
    item.top = top;
    item.left = left;
    this.setState({items: currentItems});
  }

  render(){
    const { connectDropTarget } = this.props;
    return connectDropTarget(
      <div style={style}>
        {this.state.items.map(item => {
          return <DragItem key={item.id} id={item.id} top={item.top} left={item.left} />
        })}
        <ItemPreview />
      </div>
    )
  }
}

export default DragDropContext(DndBackend({ enableMouseEvents: true }))(DropTarget("DragItem", areaTarget, collect)(Area));

import Board from '../src/js/components/Board';
var observe = require('../src/js/components/Game').observe;

window.onload = () => {
  var rootEl = document.getElementById('root');
  observe(function (knightPosition) {
    ReactDOM.render(
      <Board knightPosition={knightPosition} />,
      rootEl
    );
  });
}

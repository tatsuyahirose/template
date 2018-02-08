// export文を使ってhello関数を定義する。
export function hello() {
  alert('helloメソッドが実行された。');
}

// reactの実装
import React from 'react';
import {render} from 'react-dom';

class App extends React.Component {
  render () {
    return <p> Hello React!</p>;
  }
}
export App;

import './App.css';
import React from 'react'
import {useState, useEffect} from 'react'

function App() {
  return (
    <div className="container">
      <h1>Hello World</h1>
      <FuncComp initNumber={2}></FuncComp>
      <ClassComp initNumber={2}></ClassComp>
    </div>
  );
}
var funcStyle = 'color:blue'
var funcId = 0;
function FuncComp(props){
  var numberState = useState(props.initNumber)
  var number = numberState[0];
  var setNumber = numberState[1];
  console.log('numberState',numberState)

  // var dateState = useState((new Date().toString()));
  // var date = dateState[0];
  // var setDate = dateState[1];

  var [date, setDate] = useState((new Date().toString()))

  // side Effect
  useEffect(function(){
    console.log('%cfunc => useEffect '+(++funcId), funcStyle)
    document.title = number+' : ' +date; 
  })

  console.log('%cfunc => render '+(++funcId), funcStyle)
  return (
    <div className="container">
      <h2>function style component</h2>
      <p>Number : {number}</p>
      <input type="button" value="random" onClick={
        function(){
          setNumber(Math.random())
        }
      }></input>
      <p>date: {date}</p>
        <input type="button" value="date" onClick={
          function(){
            setDate((new Date().toString()))
          }
        }></input>  
    </div>
  );
}
var classStyle = 'color:red'
class ClassComp extends React.Component{
  state = {
    number:this.props.initNumber,
    date:(new Date().toString())
  }
  componentWillMount(){
    console.log('%cclass => componentWillMount', classStyle);
  }
  componentDidMount(){
    console.log('%cclass => componentDidMount;', classStyle)
  }
  render(){
    console.log('%cclass => render', classStyle)
    return(
      <div className="container">
        <h2>class style compponent</h2>
        <p>Number : {this.state.number}</p>
        <p>date: {this.state.date}</p>
        <input type="button" value="random" onClick={
          function(){
            this.setState({number:Math.random()})
          }.bind(this) 
        }></input>
        <input type="button" value="date" onClick={
          function(){
            this.setState({date:(new Date().toString())})
          }.bind(this)
        }></input>
      </div>
    )
  }
}

export default App;

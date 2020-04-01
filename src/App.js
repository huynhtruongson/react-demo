import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import TodoItem from './components/todoItem';
import TrafficLights from './components/trafficLights';
import checkall from './imgs/check-all.svg';
import rmcheckall from './imgs/rm-check-all.svg';
import classNames from'classnames';
const GREEN= 0;
const RED= 1;
const YELLOW= 2;

class App extends Component {
  constructor() {
    super();
    this.state = {
      color : GREEN,
      newItem : '',
      checkAll : false,
      optionFilter : 'all', //all,active,completed
      items : [
        {name : 'Irene',isComplete : false},
        {name : 'Joy',isComplete : true},
        {name : 'Tzuyu',isComplete : true}
      ]
    };
    // setInterval(()=> {
    //   this.setState({color : this.changeColor(this.state.color)});
    // },1000);
    // this.onKeyDown = this.onKeyDown.bind(this);
    // this.inputText = this.inputText.bind(this);
    // this.checkAllClick =  this.checkAllClick.bind(this);
    // this.allFilter = this.allFilter.bind(this);
    // this.activeFilter = this.activeFilter.bind(this);
    // this.completedFilter = this.completedFilter.bind(this);
    // this.clearCompleted = this.clearCompleted.bind(this);
  }
  changeColor(color) {
    if(color === GREEN)
      return RED;
    else if(color === RED)
      return YELLOW
    else
      return GREEN
  }
  
  onItemClick(item) {
    return (event) => {
      let {items} = this.state;
      // let index = items.indexOf(item);
      // this.setState({
      //   items : [
      //     ...items.slice(0,index),
      //     {...item,isComplete : !item.isComplete},
      //     ...items.slice(index+1)
      //   ]
      // })
      this.setState({
        items : items.map(x => x !== item ? {...x} : {...x,isComplete : !item.isComplete})
      })
    }
  }
  onKeyDown = (event) => {
    let {items} = this.state
    const text = event.target.value.trim()
    if(!text)
      return  
    if(event.keyCode === 13) { // keyCodeEnter : 13
      this.setState({
        items : [
          {name : text,isComplete : false},
          ...items
        ],
        newItem : ''
      })
    }
  }
  inputText = (event) => {  
    this.setState({
      newItem : event.target.value
    })
  }
  checkAllClick = (event) => {
    const {items,checkAll} = this.state
    if(!checkAll) {
      this.setState({
        items : items.map(x => {
          return {...x,isComplete:true}
        }),
        checkAll : true
      })
    }
    else {
      this.setState({
        items : items.map(x => {
          return {...x,isComplete:false}
        }),
        checkAll : false
      })
    }
  }
  removeClick(item){
    return (event) => {
      const {items} = this.state
      this.setState({
        items : items.filter(x => x!==item)
      })
    }
  }
  allFilter = (event) =>{
    this.setState({
      optionFilter : 'all'
    })
  }
  activeFilter = (event) =>{
    this.setState({
      optionFilter : 'active'
    })
  }
  completedFilter = (event)=>{
    this.setState({
      optionFilter : 'completed'
    })
  }
  clearCompleted = (event) => {
    const {items} = this.state;
    this.setState({
      optionFilter : 'all',
      items : items.filter(x => x.isComplete === false)
    })
  }
  componentDidMount() {
    console.log('didmount')
    // setInterval(()=> {
    //   this.setState({color : this.changeColor(this.state.color)});
    // },1000);
  }
  componentWillMount() {
    console.log('willmount')
  }
  render() {
    console.log('render')
    let {color,items,newItem,checkAll,optionFilter} = this.state
    let check = rmcheckall
    let itemsLeft = items.reduce((a,b) => a+!b.isComplete,0)
    if(optionFilter === 'all')
      items = items.filter(x => x)
    if(optionFilter === 'active')
      items = items.filter(x => x.isComplete === false)
    if(optionFilter === 'completed')
      items = items.filter(x => x.isComplete === true)
    if(!checkAll)
      check = checkall
    let imgClass = classNames({'hide' : items.length < 1})
    return (
      <div className="App">
        <TrafficLights color={color}/>
        <h1>todos</h1>
        <div className='todos-field'>
          <div className="input-feild">
            <img src={check} width={32} height={32}
            className={imgClass}
            onClick={this.checkAllClick}/>
            <input 
            type="text" 
            placeholder="Add new item" 
            onKeyDown={this.onKeyDown}
            value={newItem}
            onChange={this.inputText}/>
          </div>
          {
            items.map(
              (item,index) => <TodoItem key= {index} 
              item= {item} 
              onclick= {this.onItemClick(item)}
              removeClick= {this.removeClick(item)}/>)
          }
          <div className={classNames('option-footer')}>
            <ul>
              <span>{itemsLeft} items left</span>
              <li onClick={this.allFilter}>All</li>
              <li onClick={this.activeFilter}>Active</li>
              <li onClick={this.completedFilter}>Completed</li>
              <li onClick={this.clearCompleted}>Clear completed</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

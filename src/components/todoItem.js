import React, {Component} from 'react'
import './todoItem.css'
import classNames from'classnames';
import check from '../imgs/check.svg'
import checked from '../imgs/checked.svg'
import remove from '../imgs/remove.svg'
class TodoItem extends Component {
  constructor() {
    super();
  }
  render() {
    const { item,onclick,removeClick} = this.props;
    let className= classNames('TodoItem',{'TodoItem-complete' : item.isComplete});
    let url = check;
    if(item.isComplete)
      url = checked;
    return (
      <div className={className}>
        <img src={url} onClick={onclick} />
        <p>{this.props.item.name}</p>
        <img src={remove} width={18} height={18} onClick={removeClick}/>
      </div>
    );
  }
}

export default TodoItem
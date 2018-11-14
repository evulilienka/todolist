import './AddItem.css';
import React from 'react';

/*
Class AddItem:
~ sets up the initial display of the page
~ handles interaction with input field
~ adds task to the list of tasks
*/

class AddItem extends React.Component {

  constructor(props) {
      super(props);
      this.handleClick = this.handleClick.bind(this);
      this.handleChange = this.handleChange.bind(this);
  }

  //handles adding a task to the list of tasks
  handleClick(e) {
    this.props.addItem(this.props.newItem, false);
    this.props.countUncheckedTasks();
    this.inpt = e.srcElement;
    document.getElementsByName("placehold")[0].value="";
    this.props.changeItem('');

  }

  //handles change in the input field and its storing
  handleChange(e) {
    const name = e.target.value;
    this.props.changeItem(name);
  }

  render() {
    return (
      <div className="AddItem">
        <h2>to<span className="Do">DO</span>list</h2>
        <input className="Placeholder" name="placehold" placeholder="What do you need to do?"
         onChange={this.handleChange}/>
        <button className="DoButton" onClick={this.handleClick}>do!</button>
      </div>
    );
  }
}

export default AddItem;

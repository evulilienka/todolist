import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Item from './components/item/Item.js';
import AddItem from './components/AddItem/AddItem.js';

/*
Class App:

*/

class App extends Component {

  constructor(props) {
      super(props);
      this.state = {list: [], //list of tasks
                    newItem: '', //string stored in initial input field
                    uncheckedTasks: 0 //number of uncompleted tasks
                    };
      this.addItem = this.addItem.bind(this);
      this.changeItem = this.changeItem.bind(this);
      this.deleteItem = this.deleteItem.bind(this);
      this.checkItem = this.checkItem.bind(this);
      this.countUncheckedTasks = this.countUncheckedTasks.bind(this);
      this.deleteAllFinishedItems = this.deleteAllFinishedItems.bind(this);
      this.editItem = this.editItem.bind(this);
  }

  //adds a new task the list of tasks
  addItem(item, state)
  {
    let task = {
      task:item,
      checked: state
    }

    let newList = this.state.list;
    if (task.task.length > 0)
      {newList.push(task);}
    this.setState((state) => {
      return {list: newList};
    });
  }

  //stores the string/task which potentially being added in input field
  changeItem(item)
  {
    this.setState((state) => {
      return {newItem: item};
    });
  }

  //deletes the task from the list of tasks
  deleteItem(key,countList) {

    let newList = countList;
    newList.splice(key,1);

    this.state.list = [];

    this.setState((state) => {

      return {list: newList};
    });
  }

  //updates the status(checked/unchecked) of the task, based on checkbox status
  checkItem(key,countList) {
    let updatedTask = countList[key];
    updatedTask.checked = !updatedTask.checked;

    let newList = countList;
    newList[key] = updatedTask;
    this.setState((state,props) => {

      return {list: newList};
    });
  }

  //counts the num of uncompleted tasks in the list
  countUncheckedTasks(list) {
    let c = 0;
    for(let i = 0; i < list.length; i++)
    {
      if (list[i].checked === false)
      {
        c += 1;
      }
    }

    this.setState((state, props) => {
      return {
        uncheckedTasks : c
      }
    });
  }

  //deletes all completed tasks from the list
  deleteAllFinishedItems() {
    let newList = [];
    for(let i = 0; i < this.state.list.length; i++)
    {
      if (this.state.list[i].checked === false)
      {
        newList.push(this.state.list[i]);
      }
    }
    this.setState((state, props) => {
      return {
        list : newList
      }
    });
  }

  //updates the string of the task after being updated in the input field
  editItem(list,name,key) {
    list[key].task = name;

    this.setState((state, props) => {
      return {
        list : list
      }
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <a
            className="App-link"
          >
            <AddItem listItems={this.state.list}
                     addItem={this.addItem}
                     newItem={this.state.newItem}
                     changeItem={this.changeItem}
                     countUncheckedTasks={this.countUncheckedTasks}/>
            <Item listItems={this.state.list}
                  deleteItem={this.deleteItem}
                  checkItem={this.checkItem}
                  countUncheckedTasks={this.countUncheckedTasks}
                  unchecked={this.state.uncheckedTasks}
                  deleteAllFinishedItems={this.deleteAllFinishedItems}
                  editItem={this.editItem}/>

          </a>
        </header>
        <br/>

      </div>
    );
  }
}

export default App;

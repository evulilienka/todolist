import './Item.css';
import React from 'react';

/*
Class Item:
~ sets up the part of page which display list of tasks and work with them
*/

class Item extends React.Component {

  constructor(props) {
      super(props);

      this.handleDeleteItemClick = this.handleDeleteItemClick.bind(this);
      this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
      this.isChecked = this.isChecked.bind(this);
      this.handleDeleteAllFinishedItems = this.handleDeleteAllFinishedItems.bind(this);
      this.handleEdit = this.handleEdit.bind(this);
  }

  //handles editing already created task in input field
  handleEdit(e) {

    const name = e.target.value;
    const key = e.target.name;

    this.props.editItem(this.props.listItems,name,key);
  }

  //handles deleting of the task by clicking on delete button on the left
  handleDeleteItemClick(e) {
    const key = e.target.value;

    this.props.deleteItem(key);
    this.props.countUncheckedTasks();
  }

  //handles checking and unchecking of the task by clicking on the checbox on the right
  handleCheckboxChange(e) {
    const key = e.target.value;

    this.props.checkItem(key);
    this.props.countUncheckedTasks();
  }

  //checks if checkbox of the task is checked
  isChecked(key) {
    if (this.props.listItems[key].checked === true)
    {
      return true;
    }
    else {
      return false;
    }
  }

  handleDeleteAllFinishedItems() {
    this.props.deleteAllFinishedItems();
  }

  render() {
    return(
      <div>
        <table className="ItemTable">
          <tbody>
            {(this.props.listItems).map((item, index) => {
              return <tr className="Item">
                      <td className="Cancel">
                        <button className="CancelButtons"
                                onClick={this.handleDeleteItemClick}
                                value={index}>&#10006;</button>
                      </td>
                      <td className="Task">
                      {
                        this.isChecked(index) ?
                          (<li key={index}>
                            <span>
                              <del className="CheckedTask">
                                {item.task}
                              </del>
                            </span>
                          </li>)
                        :
                          (<li key={index}>
                            <input className="EditableTask"
                                   value={item.task}
                                   name={index}
                                   onChange={this.handleEdit}/>
                          </li>)
                      }
                      </td>
                      <td className="Check">
                      {
                        this.isChecked(index) ?
                          (<input className="Checkbox"
                                  type="checkbox"
                                  value={index}
                                  onChange={this.handleCheckboxChange}
                                  checked></input>)
                        :
                          (<input className="Checkbox"
                                  type="checkbox"
                                  value={index}
                                  onChange={this.handleCheckboxChange}
                                  unchecked></input>)
                      }
                      </td>
                  </tr>;
              })}
            </tbody>
          </table>
          <table className="ItemTable">
            <tfoot>
              <tr>
                <td><p className="InfoFoot">Not completed: {this.props.unchecked}</p></td>
                <td><button className="DeleteAllButton"
                            onClick={this.handleDeleteAllFinishedItems}>Delete completed</button>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>)
      }
}

export default Item;

import {
  AppRegistry,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Component} from 'react';

import AddView from './components/AddView';
import Counter from './components/Counter';
import TaskFlatList from './components/TaskFlatList';
import {createStore} from 'redux';

//state
let appState = {number: 1};

//action
const add = {type: 'ADD', value: 1};
const sub = {type: 'SUB', value: 1};
//reducer
const numberReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      state.number += action.number;
      break;

    case 'SUB':
      state.number -= action.number;
      break;
  }
  return state;
};
//store
const store = createStore(numberReducer, appState);

//test
store.dispatch(add);
store.subscrible(() => {
  console.log('state updated',store.getState());
});

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [
        {title: 'Go to the office', isFinished: true},
        {title: 'Prepare tasks for today', isFinished: false},
        {title: 'Team meeting', isFinished: false},
        {title: 'Commit tasks changed', isFinished: false},
      ],
    };
  }

  onAddNewTask = (taskName) => {
    const newTask = {title: taskName, isFinished: false};
    const newTaskList = [...this.state.data, newTask];

    this.setState({data: newTaskList});
  };

  onFinishedItem = (index) => {
    let newTaskList = this.state.data;
    newTaskList[index].isFinished = true;
    this.setState({data: newTaskList});
  };

  onDeleteItem = (index) => {
    let newTaskList = this.state.data.filter((item, i) => i != index);
    this.setState({data: newTaskList});
  };

  render() {
    return (
      <View style={styles.container}>
        <AddView onAddNewTask={this.onAddNewTask} />
        <Counter />
        <TaskFlatList
          listData={this.state.data}
          onFinishedItem={this.onFinishedItem}
          onDeleteItem={this.onDeleteItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E1F5FE',
  },
});

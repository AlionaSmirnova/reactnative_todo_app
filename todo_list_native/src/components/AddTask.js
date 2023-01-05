import { connect } from 'react-redux';
import * as action from '../store/app/actions';
import React, { useState, useEffect, useCallback } from 'react';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';

import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Platform,
  Button,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const AddTask = ({ setTask, navigation }) => {
  const [taskText, setTaskText] = React.useState('');
  const [taskHeader, setTaskHeader] = useState('');
  const [timePicker, setTimePicker] = useState(false);
  const [time, setTime] = useState(new Date(Date.now()));
  const [error, setError] = useState('Заповнiть усi поля');

  const showTimePicker = () => {
    setTimePicker(true);
  };

  const onTimeSelected = (event, value) => {
    setTime(value);
    setTimePicker(false);
  };

  const onChangeHeader = (header) => {
    setTaskHeader(header);
  };

  const onChangeText = (text) => {
    setTaskText(text);
  };

  const onAddNewTask = useCallback(() => {
    if (taskHeader && taskText !== '')
      setTask({ title: taskHeader, time: moment(time).format('LT'), task: taskText });
  
    setTaskHeader('');
    setTaskText('');
    navigation.navigate('Main');
  }, [error, taskHeader, taskText]);

  const clearFields = () => {
    setTaskHeader('');
    setTaskText('');
  };

  return (
    <ImageBackground source={require('../img/background.jpeg')} style={styles.image}>
      <View style={styles.container}>
        <Text style={styles.headerStyle}>Додати нову задачу</Text>
        <SafeAreaView style={styles.inputContainer}>
        
          <Text style={styles.highlight}>Обраний час = {moment(time).format('LT')}</Text>
          {timePicker && (
            <DateTimePicker
              value={time}
              mode={'time'}
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              is24Hour={false}
              onChange={onTimeSelected}
              style={styles.datePicker}
            />
          )}
          <View style={styles.timeContainer}>
            {!timePicker && (
              <View style={{ margin: 10 }}>
                <Button title="Обрати час" color="green" onPress={showTimePicker} />
              </View>
            )}

            <TextInput
              value={taskHeader}
              placeholder="Заголовок..."
              style={styles.textHeader}
              editable
              // multiline
              maxLength={25}
              onChangeText={onChangeHeader}/>
          </View>
          <TextInput
            value={taskText}
            placeholder="введiть текст..."
            style={styles.textArea}
            multiline
            numberOfLines={2}
            onChangeText={onChangeText}/>
          <TouchableOpacity
            style={styles.addTaskButton}
            disabled={!taskText.length && !taskHeader.length}
            onPress={onAddNewTask}>
            <Text style={styles.highlight}>Додати</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addTaskButton} onPress={clearFields}>
            <Text style={styles.highlight}>Очистити</Text>
          </TouchableOpacity>
          <Text style={{ color: 'red', fontSize:20 }}> {!taskText.length || !taskHeader.length ? error : ''}</Text>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  headerStyle: {
    fontSize: 30,
    textAlign: 'center',
    justifyContent: 'flex-start',
    color: 'purple',
    padding: 5,
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    alignItems: 'center',
  },
  timeContainer: {
    // flex:0,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textArea: {
    height: 'auto',
    maxHeight: 180,
    backgroundColor: 'white',
    width: 300,
    margin: 10,
    borderWidth: 2,
    borderRadius: 10,
    padding: 5,
    fontSize: 20,
    borderColor: '#7a42f4',
  },
  textHeader: {
    height: 50,
    maxWidth: 200,
    margin: 5,
    borderWidth: 2,
    borderRadius: 10,
    padding: 5,
    fontSize: 20,
    borderColor: '#7a42f4',
  },
  datePicker: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: 320,
    height: 260,
    display: 'flex',
  },
  highlight: {
    fontWeight: 'bold',
    fontSize: 20,
  
  },
  addTaskButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 40,
    borderRadius: 20,
    borderColor: '#7a42f4',
    borderWidth: 2,
    backgroundColor: 'lightpink',
  },
  disabledButton: {
    backgroundColor: 'grey',
  },
});

const mapStateToProps = (state) => ({
  userTasks: state.userReducer.userTasks,
});
const mapDispatchToProps = (dispatch) => {
  return {
    setTask: (userTask) => {
      dispatch(action.setTask(userTask));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTask);

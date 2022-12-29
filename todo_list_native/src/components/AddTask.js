import { connect } from 'react-redux';
import * as action from '../store/app/actions';
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Platform,
  Pressable,
  Button,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const AddTask = (
  { userTasks, setTask, navigation
  },
) => {
    const [taskId, setTaskId] = React.useState(0);
  const [taskText, setTaskText] = React.useState('');
  const [taskHeader, setTaskHeader] = useState('');
  const [allTasks, setAllTasks] = useState([]);

  const [datePicker, setDatePicker] = useState(false);
  const [timePicker, setTimePicker] = useState(false);
  const [time, setTime] = useState(new Date(Date.now()));

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

  const onAddNewTask = (id) => {
     if (taskHeader && taskText !== '') setTask({ title:taskHeader,  time:moment(time).format('LT'), task:taskText });
setTaskHeader('');
setTaskText('');
navigation.navigate('Main');
  };

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
              multiline
              numberOfLines={2}
              onChangeText={onChangeHeader}
            ></TextInput>
          </View>
          <TextInput
          value={taskText}
            placeholder="введiть текст..."
            style={styles.textArea}
            multiline
            numberOfLines={3}
            onChangeText={onChangeText}
            ></TextInput>
          <TouchableOpacity style={styles.addTaskButton}  disabled={!taskText.length} onPress={onAddNewTask} >
            <Text style={styles.highlight}>Додати</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addTaskButton} onPress={clearFields} >
            <Text style={styles.highlight}>Очистити</Text>
          </TouchableOpacity>
        </SafeAreaView>
        <SafeAreaView></SafeAreaView>
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
    backgroundColor: 'white',
    // marginBottom:70,
  },
});

const mapStateToProps = (state) => ({
    userTasks: state.userReducer.userTasks
   
   });
   const mapDispatchToProps = (dispatch) => {
     return {
       setTask: (userTask) => {
         dispatch(action.setTask(userTask));
       },
     }
   };
   
   export default connect(mapStateToProps, mapDispatchToProps)(AddTask);

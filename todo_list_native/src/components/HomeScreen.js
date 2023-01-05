import { connect } from 'react-redux';
import * as action from '../store/app/actions';
import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Pressable,
  FlatList,
  TouchableHighlight,
  Modal,
  Switch,
} from 'react-native';

const HomeScreen = ({ navigation, userTasks, removeTask }) => {
  const [currentTaskId, setCurrentTaskId] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);


  const openModalToDelete = (item) => {
    setModalVisible(true);
    setCurrentTaskId(item);
  };

  const closeModal = () => {
    removeTask(currentTaskId);
    setModalVisible(false);
  };

  return (
    <ImageBackground source={require('../img/background.jpeg')} style={styles.image}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerStyle}>Задачі на день</Text>
        </View>
        <View style={styles.containerButton}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Create')}>
            <Text style={{ fontSize: 30 }}>Додати задачу</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.listStyle}>
          <FlatList
            data={userTasks}
            renderItem={({ item }) => (
              <View style={styles.todoView}>
                <View style={styles.todoList}>
                  <SafeAreaView style={styles.buttonBlock}>
                    <Switch
                      trackColor={{ false: '#767577', true: '#81b0ff' }}
                      thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={toggleSwitch}
                      value={isEnabled}
                  />

                    <TouchableHighlight
                      activeOpacity={0.6}
                      style={styles.opacityStyleRemove}
                      onPress={() => openModalToDelete(item)}>
                      <Text style={{ fontSize: 20, color: 'black' }}> ✘ </Text>
                    </TouchableHighlight>
                  </SafeAreaView>
                  <SafeAreaView style={isEnabled ? styles.todoListDone : styles.todoStyle}>
                    <Text style={{ color: 'purple', fontSize: 24 }}>{item.title}</Text>
                    <Text style={{ color: 'black', fontSize: 20, textDecorationLine: 'underline' }}>
                      {item.time}
                    </Text>
                    <Text style={{ color: 'black', fontSize: 18 }}>{item.task}</Text>
                  </SafeAreaView>
                </View>
              </View>
            )}
          />
        </View>
      </View>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Pressable
                style={[styles.buttonModal, styles.buttonClose]}
                onPress={() => closeModal()}>
                <Text style={styles.textStyle}>Видалити задачу</Text>
              </Pressable>

              <Pressable
                style={[styles.buttonModal, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Закрити модалку</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerStyle: {

    fontSize: 30,
    textAlign: 'center',
    justifyContent: 'flex-start',
    color: 'purple',
    padding: 10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 'auto',
    minHeight: 60,
    borderRadius: 20,
    backgroundColor: 'lightpink',
    marginBottom: 70,
    padding: 10,
  },
  containerButton: {
    flex: 1,
    flexDirection: 'row',
    width: 400,
    height: 200,
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',

  },
  todoList: {
    borderWidth: 2,
    borderRadius: 10,
    width: 300,
    height: 'auto',
    borderColor: 'purple',
    backgroundColor: 'white',
  },
  todoListDone: {
    borderWidth: 2,
    borderRadius: 10,
    width: 300,
    height: 'auto',
    borderColor: 'black',
    backgroundColor: 'grey',
  },
  todoView: {

    flexDirection: 'row',
    margin: 5,
    padding: 5,
    maxHeight: 220,
  },
  listStyle: {
    flex: 5,
  },
  buttonBlock: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    margin: 5,
  },
  opacityStyle: {
    maxHeight: 25,
    width: 25,
    backgroundColor: 'lightblue',
    borderRadius: 10,
    alignItems: 'center',
    marginRight: 5,
  },
  opacityStyleRemove: {
    maxHeight: 25,
    width: 25,
    backgroundColor: 'red',
    borderRadius: 10,
    alignItems: 'center',
  },
  centeredView: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 50,
  },
  modalView: {
    margin: 100,
    flexDirection: 'column',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  buttonModal: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 10,
    marginBottom: 5,
  },
  todoStyle: {
    marginLeft: 10,
    marginBottom: 5,
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

    removeTask: (userTask) => {
      dispatch(action.removeTask(userTask));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

import React, { useState } from 'react';
import {StyleSheet, View, Text} from 'react-native';
import { theme } from '../theme';
import PropTypes from 'prop-types';
import IconButton from './IconButton';
import { images } from './image';
import Input from './Input';

const Task = ({ item, deleteTask, toggleTask, updateTask }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(item.text);
   
    const _handleUpdateButtonPress = () => {
        setIsEditing(true);
    };
    const _onSubmitEditing = () => {
        if(isEditing){
            const editedTask = Object.assign({}, item, {text});
            setIsEditing(false);
            updateTask(editedTask);
        }
    };
    const _onBlur = () => {
        if(isEditing) {
            setIsEditing(false);
            setText(item.text);
        }
    };

    return isEditing ? (
        <Input value={text} onChangeText={text => setText(text)}
        onSubmitEditing={_onSubmitEditing} onBlur={_onBlur}/>
    ):(
        <View style = {taskStyle.container}>
            <IconButton 
            style={taskStyle.contents}
            type={item.completed ? images.completed : images.uncompleted}
            id = {item.id} onPressOut = {toggleTask} completed={item.completed}/>
            <Text style={[taskStyle.contents,
            {textDecorationLine: (item.completed ? 'line-through' : 'none')}]}>
            {item.text}</Text>
            {item.completed || <IconButton type={images.update}
            onPressOut={_handleUpdateButtonPress}/>}
            <IconButton 
            type={images.delete} 
            id={item.id} onPressOut={deleteTask}
            completed={item.completed}/>
        </View>

    );
};

const taskStyle = StyleSheet.create({
    container:{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.itemBackground,
        borderRadius: 10,
        padding: 5,
        marginTop: 3,
        marginLeft: 5,
    },
    contents:{
        flex: 1,
        fontSize: 24,
        marginLeft : 10,
        width:'10%'
    },
    
});
Task.propTypes = {
    item : PropTypes.object.isRequired,
    deleteTask: PropTypes.func.isRequired,
    toggleTask: PropTypes.func.isRequired,
    selectTask: PropTypes.func.isRequired,
};
export default Task;

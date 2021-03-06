import React, {ChangeEvent, useCallback} from "react";
import {EditableSpan} from "../../common/components/EditableSpan";
import IconButton from "@material-ui/core/IconButton";
import Checkbox from "@material-ui/core/Checkbox";
import Delete from "@material-ui/icons/Delete";
import {TaskStatuses, TaskType} from "../../api/todolist-api";
import {RequestStatusType} from "../../reducers/AppReducer";

type TaskPropsType = {
    todoListID: string
    entityStatus: RequestStatusType
    removeTask: (id: string, todoListID: string) => void
    changeTaskStatus: (todoListID: string, taskID: string, status: TaskStatuses) => void
    changeTaskTitle: (taskID: string, newTitle: string, todoListID: string) => void
    task: TaskType
}

export const Task = React.memo((props: TaskPropsType) => {
    const onClickRemoveHandler = useCallback(() => {
        props.removeTask(props.task.id, props.todoListID)
    }, [props.removeTask])


    const onChangeCheckBoxHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.todoListID, props.task.id, e.currentTarget.checked
            ? TaskStatuses.Completed
            : TaskStatuses.New)
    }, [props.changeTaskStatus])

    const onChangeTitleHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todoListID)
    }, [props.changeTaskTitle, props.todoListID, props.task.id])

        return (
        <tr className={'tdCheckbox'} key={props.task.id}>
            <td className={'tdCheckbox'}>

                <Checkbox
                    checked={props.task.status === TaskStatuses.Completed}
                    color="primary"
                    onChange={onChangeCheckBoxHandler}
                    disabled={props.entityStatus === 'loading'}
                />
            </td>
            <td className={'tdTask'}><EditableSpan
                title={props.task.title}
                onChange={onChangeTitleHandler}/>
            </td>
            <td className={'tdButton'}>
                <IconButton aria-label="delete"
                            onClick={onClickRemoveHandler}
                            disabled={props.entityStatus === 'loading'}>
                    <Delete/>
                </IconButton>
            </td>
        </tr>
    )
})
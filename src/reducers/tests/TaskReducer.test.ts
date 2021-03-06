import {v1} from "uuid";
import {
    addTaskTC,
    deleteTaskTC,
    fetchTasksTC,
    TasksReducer,
    updateTaskStatusTC,
    updateTaskTitleTC
} from "../TasksReducer";
import {removeTodoListTC} from "../TodoListsReducer";
import {TaskPriorities, TaskStatuses} from "../../api/todolist-api";
import {TaskObjectType} from "../../components/todolist/TodoLists";

let todoListId1: string
let todoListId2: string
let taskId1: string
let taskId2: string
let taskId3: string
let startState: TaskObjectType

beforeEach(() => {
    todoListId1 = v1()
    todoListId2 = v1()

    taskId1 = v1()
    taskId2 = v1()
    taskId3 = v1()

    startState = {
        [todoListId1]: [
            {
                id: taskId1,
                title: "HTML&CSS",
                status: TaskStatuses.Completed,
                description: '',
                todoListId: "todolistId1",
                order: 0,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                addedDate: '',
            },
            {
                id: taskId2,
                title: "JS/ES6",
                status: TaskStatuses.Completed,
                description: '',
                todoListId: "todolistId1",
                order: 0,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                addedDate: '',
            },
            {
                id: taskId3,
                title: "React",
                status: TaskStatuses.New,
                description: '',
                todoListId: "todolistId1",
                order: 0,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                addedDate: '',
            },
        ],
        [todoListId2]: [
            {
                id: taskId1,
                title: "Milk",
                status: TaskStatuses.Completed,
                description: '',
                todoListId: "todolistId2",
                order: 0,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                addedDate: '',
            },
            {
                id: taskId2,
                title: "Sugar",
                status: TaskStatuses.Completed,
                description: '',
                todoListId: "todolistId2",
                order: 0,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                addedDate: '',
            },
            {
                id: taskId3,
                title: "Book",
                status: TaskStatuses.New,
                description: '',
                todoListId: "todolistId2",
                order: 0,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                addedDate: '',
            },
        ],
    }
})

test("task should add", () => {

    const newTitle = "Redux"
    const action = addTaskTC.fulfilled({task: {
            todoListId: todoListId1,
            title: newTitle,
            status: TaskStatuses.New,
            addedDate: '',
            description: "",
            order: 0,
            deadline: "",
            priority: 0,
            startDate: "",
            id: "1-sfvsdfv-sdfbdf-sdf"
        }},'', {todoListId: todoListId1,
        title: newTitle,} )
    const endState = TasksReducer(startState, action)

    expect(endState[todoListId1][0].title).toBe(newTitle)
    expect(endState[todoListId1].length).toBe(4)
    expect(endState[todoListId2].length).toBe(3)
    expect(endState[todoListId1][0].id).toBeDefined()
    expect(endState[todoListId1][0].status).toBe(TaskStatuses.New)
})

test("correct task should remove", () => {
    let param = {todoListID: todoListId1, taskID: taskId2};
    const action = deleteTaskTC.fulfilled(param,'',param)
    const endState = TasksReducer(startState, action)
    expect(endState).toEqual({
        [todoListId1]: [
            {
                id: taskId1,
                title: "HTML&CSS",
                status: TaskStatuses.Completed,
                description: '',
                todoListId: "todolistId1",
                order: 0,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                addedDate: '',
            },
            {
                id: taskId3,
                title: "React",
                status: TaskStatuses.New,
                description: '',
                todoListId: "todolistId1",
                order: 0,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                addedDate: '',
            },
        ],
        [todoListId2]: [
            {
                id: taskId1,
                title: "Milk",
                status: TaskStatuses.Completed,
                description: '',
                todoListId: "todolistId2",
                order: 0,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                addedDate: '',
            },
            {
                id: taskId2,
                title: "Sugar",
                status: TaskStatuses.Completed,
                description: '',
                todoListId: "todolistId2",
                order: 0,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                addedDate: '',
            },
            {
                id: taskId3,
                title: "Book",
                status: TaskStatuses.New,
                description: '',
                todoListId: "todolistId2",
                order: 0,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                addedDate: '',
            },
        ],
    })
})

test("correct task should change status", () => {
    const newStatus = TaskStatuses.New
    const param = {todoListID: todoListId1, taskID:taskId2, status:newStatus}
    const action = updateTaskStatusTC.fulfilled(param,'',param)
    const endState = TasksReducer(startState, action)

    expect(endState[todoListId1][1].status).toBe(newStatus)
})

test("correct task should change it's title", () => {

    const newTaskTitle = "RestAPI"
    const param = {todoListID:todoListId1, taskID:taskId2, newTitle: newTaskTitle}
    const action = updateTaskTitleTC.fulfilled(param, 'requestId',param)
    const endState = TasksReducer(startState, action)

    expect(endState[todoListId1][1].title).toBe(newTaskTitle)
})

test('property with todolistId should be deleted', () => {

    const param = {todoListID: todoListId1}
    const action = removeTodoListTC.fulfilled(param,'', param)
    const endState = TasksReducer(startState, action)
    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId1"]).not.toBeDefined();
});

test('tasks should be added for todoLists', () => {

    const action = fetchTasksTC.fulfilled({todoListID:todoListId1, tasks: startState[todoListId1]}, '',todoListId1)
    const endState = TasksReducer({
        todoListId1: [],
    }, action)
    expect(endState[todoListId1].length).toBe(3)
});


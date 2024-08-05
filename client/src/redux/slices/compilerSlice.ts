import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CompilerSliceStateType {
    fullCode: {
        html: string,
        css: string
        javascript: string
    }
    currentLanguage: "html" | "css" | "javascript";
    // currentCode: string
}

const initialState: CompilerSliceStateType = {
    fullCode: {
        html:
            `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>To-Do List</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h1>To-Do List</h1>
        <input type="text" id="taskInput" placeholder="Add a new task">
        <button onclick="addTask()">Add</button>
        <ul id="taskList"></ul>
    </div>
    <script src="script.js"></script>
</body>
</html>`,

        css:
            `body {
    font-family: Arial, sans-serif;
    background-color: #121212; /* Dark background color */
    color: #e0e0e0; /* Light text color */
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
}

.container {
    background: #1e1e1e; /* Dark background for the container */
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3); /* Darker shadow */
    width: 300px;
    text-align: center;
}

h1 {
    margin-bottom: 20px;
}

input {
    width: calc(100% - 40px);
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #333; /* Darker border */
    border-radius: 3px;
    background: #2c2c2c; /* Dark background for input */
    color: #e0e0e0; /* Light text color */
}

button {
    padding: 10px 20px;
    border: none;
    background-color: #4caf50; /* Dark green for button */
    color: white;
    border-radius: 3px;
    cursor: pointer;
}

button:hover {
    background-color: #45a049; /* Slightly darker green on hover */
}

ul {
    list-style: none;
    padding: 0;
}

li {
    padding: 10px;
    background: #333; /* Dark background for list items */
    border-bottom: 1px solid #444; /* Slightly lighter border */
    display: flex;
    justify-content: space-between;
    align-items: center;
}

li.completed {
    text-decoration: line-through;
    color: #888; /* Light gray for completed items */
}

li button {
    background: none;
    border: none;
    color: #f44336; /* Red for button text */
    cursor: pointer;
}

li button:hover {
    color: #d32f2f; /* Darker red on hover */
}
`,
        javascript:
        `document.getElementById('taskInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const taskList = document.getElementById('taskList');

        const li = document.createElement('li');
        li.textContent = taskText;

        const completeBtn = document.createElement('button');
        completeBtn.textContent = 'Complete';
        completeBtn.onclick = function() {
            li.classList.toggle('completed');
        };

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = function() {
            taskList.removeChild(li);
        };

        li.appendChild(completeBtn);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
        taskInput.value = '';
    }
}`,
    },
    currentLanguage: "html",
    // currentCode: ""
}

const compilerSlice = createSlice({
    name: "compilerSlice",
    initialState,
    reducers: {
        updateCurrentLanguage: (state, action: PayloadAction<CompilerSliceStateType["currentLanguage"]>) => {
            state.currentLanguage = action.payload
        },
        updateCodeValue: (state, action: PayloadAction<string>) => {
            state.fullCode[state.currentLanguage] = action.payload
        },
        // updateCurrentCode: (state, action: PayloadAction<string>) => {
        //     state.currentCode = action.payload
        // }
    }
})

export default compilerSlice.reducer
export const { updateCurrentLanguage, updateCodeValue, } = compilerSlice.actions
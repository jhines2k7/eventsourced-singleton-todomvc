export default function reduce(events) {
    "use strict";

    return events.reduce( (state, event) => {        
        if(event.topic === 'todo.add') {            
            state.todos.push({
                label: event.data.label,
                complete: false
            });

            state.itemsLeft++;            
        }

        if(event.topic === 'todo.remove') {            
            if(!state.todos[event.data.idx].complete) {
                state.itemsLeft--;
            }

            state.todos.splice(event.data.idx, 1);
                        
            state.numCompletedTodos--;
        }

        if(event.topic === 'todo.toggle') {
            state.todos[event.data.idx].complete = !state.todos[event.data.idx].complete;

            if(state.todos[event.data.idx].complete) {
                state.itemsLeft--;
                state.numCompletedTodos++;
            } else {
                state.itemsLeft++;
                state.numCompletedTodos--;
            } 
        }

        if(event.topic === 'todo.clear.completed') {
            let notCompleted = state.todos.filter( (todo) => {
                if(!todo.complete) {
                    return !todo.complete;
                }
                
            });

            state.todos = notCompleted;
            state.numCompletedTodos = 0;
        }

        if(event.topic === 'todo.filter') {
            state.currentFilter = event.data;   
        }

        return state;
    }, {
        todos: [],
        itemsLeft: 0,
        currentFilter: 'all',
        numCompletedTodos: 0
    });
}

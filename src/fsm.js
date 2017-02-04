class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if (!config) {
            throw new Error();
        }
        this.config = config;
        this.state = {
         prev: [],
         current: null,
         next: []
        }
        this.state.current = this.config.initial;
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.state.current;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if(!this.config.states[state])
            throw new Error();
         this.state.prev.push(this.state.current);
        this.state.current = state;
        this.state.next = [];
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if(!this.config.states[this.state.current].transitions[event])
            throw new Error();
        this.state.prev.push(this.state.current);
        this.state.current = this.config.states[this.state.current].transitions[event];
        this.state.next = [];
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
         this.state.current = this.config.initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        var arrStates = [];
        if(!event){
            for(var value in this.config.states){
                arrStates.push(value);
            }
        }
        for(var value in this.config.states){
            for(var x in this.config.states[value].transitions){
                if(x == event)
                    arrStates.push(value);
            }
        }
        return arrStates;        
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.state.prev.length === 0) {
            return false;
        }
        this.state.next.push(this.state.current);
        this.state.current = this.state.prev.pop();
        return true;
   }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.state.next.length === 0) {
            return false;
        }
        this.state.prev.push(this.state.current);
        this.state.current = this.state.next.pop();
        return true;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        return this.state.prev = this.state.next = [];
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/

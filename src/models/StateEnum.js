const StateEnum = {
    NOT_STARTED : {
        name: "Not_Started",
        value : "Not Started",
        NOT_STARTED : undefined,
        IN_PROGRESS : true,
        FINISHED : true
    },
    IN_PROGRESS : {
        name: "In_Progress",
        value : "In Progress",
        NOT_STARTED : false,
        IN_PROGRESS : undefined,
        FINISHED : true
    },
    FINISHED : {
        name: "Finished",
        value : "Finished",
        NOT_STARTED : false,
        IN_PROGRESS : false,
        FINISHED : undefined
    }
}

function getStateEnumByValue(stateString) {
    // console.log(stateString.toUpperCase());
    switch(stateString.toUpperCase()) {
        case "NOT STARTED":
            return StateEnum.NOT_STARTED
        case "IN PROGRESS":
            return StateEnum.IN_PROGRESS
        case "FINISHED":
            return StateEnum.FINISHED
        default:
            return undefined
    }
}
module.exports = {StateEnum, getStateEnumByValue}
const bracketLevels = {
    A : 4,
    B : 3,
    C : 2,
    D : 1
}

function toLevel(int) {
    return Object.keys(bracketLevels).find(key => bracketLevels[key] === int)
}

function toValue(value) {
    return bracketLevels[value]
}

module.exports = {
    bracketLevels, 
    toLevel, 
    toValue
}
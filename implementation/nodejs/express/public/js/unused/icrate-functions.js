const perfectFrameTime = 1000 / 60;
let proximityTimer = 0, inputEntryTimer = [], requirementVisualState = [], requirementVisualRunning, deltaTime = 0, lastTimestamp = 0, deltaTimeSum = 0;
var placeholderNodeUsed, placeholderValueBackup = "", placeholderValueCurrent = "", placeholderValueIndex = 0, placeholderValueTarget = ["R", "e", "q", "u", "i", "r", "e", "d", "!"];

export function EnrichInteractiveExpierience() {

}

export function BeginRequirementVisualization(element) {
    if (placeholderNodeUsed != element && requirementVisualRunning == "") {
        placeholderNodeUsed = element;
        requirementVisualRunning = element.id;
        requirementVisualState[element.id] = "run";
        inputEntryTimer[requirementVisualRunning] = 0;
        start();
    } else if (requirementVisualRunning != "" && ) {

    } else {
        setTimeout(BeginRequirementVisualization(element), 500);
    }
}

export function RegisterStopRequirementVisualization(element) {
    requirementVisualRunning = "";
}

export function start(element) {
    if (requirementVisualState[element.id] == "run") {
        requirementVisualState[element.id] = "update";
        requestAnimationFrame(update);
    }
}



export function update(timestamp) {
    requestAnimationFrame(update);
    deltaTime = (timestamp - lastTimestamp) / perfectFrameTime;
    lastTimestamp = timestamp;
    deltaTimeSum += deltaTime;
    inputEntryTimer[requirementVisualRunning] += deltaTime;

    // YOUR FRAME CODE HERE!
    if (deltaTimeSum > 20 && placeholderValueCurrent.indexOf("!") < 0) {
        deltaTimeSum = 0;
        placeholderValueCurrent += placeholderValueTarget[placeholderValueIndex++];
        if (placeholderNodeUsed && placeholderNodeUsed.getAttribute("placeholder") != placeholderValueCurrent) {
            placeholderNodeUsed.setAttribute("placeholder", placeholderValueCurrent);
        }
    } else if (placeholderNodeUsed && placeholderValueCurrent.indexOf("!") > 0) {
        if (placeholderNodeUsed.getAttribute("placeholder") != placeholderValueCurrent) {
            placeholderNodeUsed.setAttribute("placeholder", placeholderValueCurrent);
        }
    }
    console.log(deltaTimeSum);
}
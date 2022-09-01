let isDebugMode = true;
let isInitialized = false;
let validationPhase = "required";
let textInputNodes = {};
let submitButtonNode;
let formStatusReflectionNode;
let appendixClassName = "icrate-append";
let appendixInterval = 50;
let lastCheckedValue = { "insert": "", "change": "" };
let plannedTimedCalls = [];

const iCrateInit = function () {
    // Login Site
    if (window.location.pathname == "/") {
        var loginInputNodes = {};
        loginInputNodes.name = document.getElementById("name");
        loginInputNodes.password = document.getElementById("password");

        var loginSubmitButtonNode = document.getElementsByClassName("icrate-button-submit")[0];

        var loginFormStatusReflectionNode = document.getElementById("icrate-auth-input-reflection");

        if (loginInputNodes.name && loginInputNodes.password && loginSubmitButtonNode) {
            textInputNodes.name = {
                "node": loginInputNodes.name, "placeholder": loginInputNodes.name.getAttribute("placeholder"), "mandatory": typeof loginInputNodes.name.getAttribute("required") === 'string' ? true : false, "descriptionNode": document.getElementById("input-mandatory-description-name")
            }
            textInputNodes.password = {
                "node": loginInputNodes.password, "placeholder": loginInputNodes.password.getAttribute("placeholder"), "mandatory": typeof loginInputNodes.password.getAttribute("required") === 'string' ? true : false, "descriptionNode": document.getElementById("input-mandatory-description-password")
            }
            submitButtonNode = loginSubmitButtonNode;
            formStatusReflectionNode = loginFormStatusReflectionNode;
            if (isDebugMode) {
                console.log("Initialized with --->");
                console.log("    Login Formular Fields:");
                console.log(textInputNodes);
                console.log("    Submitted by:");
                console.log(submitButtonNode);
                console.log("    Reflected in:");
                console.log(formStatusReflectionNode);
            }
            isInitialized = true;
            toggleDebugMode();
        }
        else {
            if (isDebugMode) {
                console.log("Not initialized yet!");
            }
            setTimeout(iCrateInit, 200);
        }
    }
};

const toggleDebugMode = function () {
    isDebugMode = !isDebugMode;
    console.log("Debug Mode is now ->");
    console.log(isDebugMode == true ? " ACTIVATED" : "  DEACTIVATED");
};

const setMouseEnterTransitionClass = function (element) {
    if (!element.value || element.value == "") {
        if (element.classList) {
            if (document.activeElement !== element) {
                implyInteractiveClassesForElement(element, "hovering-input");
            }
        }
    }
    else {
        changedContent(element, false, true);
    }
};

const processMouseLeaveTransitionClass = function (element) {
    if (!element.value || element.value == "") {
        if (element.classList) {
            if (document.activeElement !== element) {
                implyInteractiveClassesForElement(element, "");
            }
        }
    }
    else {
        changedContent(element, false, true);
    }
};

const signalizeCorrectness = function (element) {
    if (!element.value || element.value == "") {
        if (element.classList) {
            implyInteractiveClassesForElement(element, "focusing-input");
            textInputNodes[element.id].descriptionNode.innerHTML = "Got Focus";
        }
    }
    else {
        changedContent(element, true, true);
    }
};

const revertCorrectness = function (element) {
    if (!element.value || element.value == "") {
        if (element.classList) {
            implyInteractiveClassesForElement(element, "");
            textInputNodes[element.id].descriptionNode.innerHTML = "Required!";
        }
    }
    else {
        changedContent(element, true, false);
    }
};

const changedContent = function (element, shouldUseReflection, isMouseEvent) {
    if (!element.value || element.value == "") {
        if (element.classList) {
            if (document.activeElement === element) {
                implyInteractiveClassesForElement(element, "focusing-input");
                textInputNodes[element.id].descriptionNode.innerHTML = "Got Focus";
            }
            else {
                implyInteractiveClassesForElement(element, "");
                textInputNodes[element.id].descriptionNode.innerHTML = "Required!";
            }
        }
    }
    else {
        if (element.classList && !isMouseEvent) {
            implyInteractiveClassesForElement(element, "entered-input");
            textInputNodes[element.id].descriptionNode.innerHTML = "<b>Value -&gt; Set</b>";
        }
    }
    convertSumbitButtonConformity();

    if (shouldUseReflection && element.id == "name") {
        if (isDebugMode) {
            console.log("Should use reflection after changedContent called");
        }
        if (lastCheckedValue.change != element.value) {
            if (isDebugMode) {
                console.log("Reflecting changes ->");
                console.log("   element.value:[" + element.value + "] against lastCheckedValue.change:[" + lastCheckedValue.change + "]");
            }
            updateReflectionText(false, false);
        }
        else {
            if (isDebugMode) {
                console.log("Skipping reflection due to equalness ->");
                console.log("   element.value:[" + element.value + "] against lastCheckedValue.change:[" + lastCheckedValue.change + "]");
            }
        }
    }
    if (shouldUseReflection && element.id == "password") {
        if (document.activeElement === element) {
            implyInteractiveClassesForElement(element, "focusing-input");
            textInputNodes[element.id].descriptionNode.innerHTML = "Got Focus";
        }
        if (formStatusReflectionNode.innerHTML == loginNowText && (!element.value || element.value == "")) {
            setReflectionText("process", loginPossibleText, false);
        }
        else if (formStatusReflectionNode.innerHTML == loginPossibleText && (element.value && element != "")) {
            setReflectionText("process", loginNowText, true);
        }
    }
    else if (element.id == "password") {
        if (document.activeElement === element) {
            implyInteractiveClassesForElement(element, "focusing-input");
            textInputNodes[element.id].descriptionNode.innerHTML = "Got Focus";
        }
    }

    if (!isMouseEvent && element.id == "name") {
        lastCheckedValue.change = element.value;
    }
};

const checkUserNameBlankness = function (element) {
    if (element.value && element.value != "") {
        if (!formStatusReflectionNode.classList.contains(appendixClassName) && formStatusReflectionNode.innerHTML != preValidateText) {
            setReflectionText("validate", preValidateText, false);
        }
    }
    else {
        setReflectionText("require", requireText, false);
    }
    if (document.activeElement === element) {
        implyInteractiveClassesForElement(element, "focusing-input");
        textInputNodes[element.id].descriptionNode.innerHTML = "Got Focus";
    }
};

const checkDeletionInProgress = function (element, event) {
    if (event.key === "Backspace" || event.key === "Delete") {
        if (isDebugMode) {
            console.log("Processing deletion Event ->");
            console.log("   event:")
            console.log(event);
            console.log("   for element:");
            console.log(element);
        }
        implyInteractiveClassesForElement(element, "focusing-input");
        textInputNodes[element.id].descriptionNode.innerHTML = "Got Focus";
        if (element.id == "name") {
            lastCheckedValue.insert = element.value;
            lastCheckedValue.change = element.value;
        } else if (element.id == "password") {
            if (!element.value || element.value == "") {
                switch (formStatusReflectionNode.innerHTML) {
                    case loginNowText:
                        setReflectionText("process", loginPossibleText);
                        break;
                    default:
                        break;
                }
            }
        }
    }
};

const insertedUserName = function (element) {

    if (element.value && element.value != "") {
        if (isDebugMode) {
            console.log("Update Reflection Text after insertUserName called to element.value:[" + element.value + "]");
        }
        plannedTimedCalls.push({
            "function": "update-on-insert", "timerId": setTimeout(updateReflectionText, 3500, true, checkAccountNameValidity(element.value))
        });
    }
    else {
        if (isDebugMode) {
            console.log("Value empty after insertUserName called ->");
            console.log("   element.value:[" + element.value + "], cancelling all previous plannedTimedCalls:[" + plannedTimedCalls + "]");
        }
        for (var timer of plannedTimedCalls) {
            if (isDebugMode) {
                console.log("Cancelling callback ->");
                console.log("   timer:[" + timer + "]");
            }
            clearTimeout(timer.timerId);
        }
        if (isDebugMode) {
            console.log("Resetting reflection field");
        }
        formStatusReflectionNode.classList.remove(appendixClassName);
        formStatusReflectionNode.innerHTML = resetText;
        plannedTimedCalls = [];
        setTimeout(updateReflectionText, 100, false, false);
    }
    lastCheckedValue.insert = element.value;
}

const convertSumbitButtonConformity = function () {
    var isMandatorySet = false;

    for (let inputElement in textInputNodes) {

        var curInputElement = textInputNodes[inputElement];
        var curValue = curInputElement.node.value;

        // Is the Value for this Element mandatoy and set to some value
        if (curInputElement.mandatory && curValue && curValue != "") {
            isMandatorySet = true;
        }
        else {
            isMandatorySet = false;
            break;
        }
    }

    if (isMandatorySet) {
        submitButtonNode.classList.add("validate-input");
    }
    else {
        submitButtonNode.classList.remove("validate-input");
    }
}

// Variables for Text Control
const resetText = "Wird zurückgesetzt...";
const requireText = "Eingaben erforlerlich!";
const preValidateText = "Feld 'Name' wird gelesen...";
const validateText = "Existenz des Accounts wird geprüft...";
const loginImpossibleText = "Account existiert nicht! Login unmöglich...";
const loginPossibleText = "Account existiert";
const loginNowText = "Account existiert - einloggen";
const appendOnlyText = " - einloggen";

const setReflectionText = function (textType, textValue, isAppendOnly) {
    if (textValue && textValue != "") {
        if (textType == "require") {
            formStatusReflectionNode.classList.remove("validate-input");
            formStatusReflectionNode.classList.remove("possible-input");
        }
        else if (textType == "validate") {
            formStatusReflectionNode.classList.add("validate-input");
            formStatusReflectionNode.classList.remove("possible-input");
        }
        else if (textType == "process") {
            formStatusReflectionNode.classList.remove("validate-input");
            formStatusReflectionNode.classList.add("possible-input");
        }

        if (isAppendOnly) {
            appendCharactersToInnerByTime(formStatusReflectionNode, appendOnlyText, appendixInterval, true);
        }
        else {
            appendCharactersToInnerByTime(formStatusReflectionNode, textValue, appendixInterval, false);
        }
    }
    else {
        if (isDebugMode) {
            console.log("Was trying to set empty value on reflection ->");
            console.log("   for textType:[" + textType + "], textValue:[" + textValue + "]");
        }
    }
};

const updateReflectionText = function (isValidationPhase, isValid) {
    var isInputComplete = true;
    var isInputEmpty = true;
    var isNameFieldSet = false;

    for (let inputElement in textInputNodes) {
        var curInputElement = textInputNodes[inputElement];
        if (curInputElement.node.value && curInputElement.node.value != "") {
            if (curInputElement.node.id == "name") {
                isNameFieldSet = true;
            }
            isInputEmpty = false;
        }
        else {
            isInputComplete = false;
        }
    }

    var textToAppend = "";
    var typeOfAppend = "require";
    if (isValidationPhase) {
        if (isDebugMode) {
            console.log("Starting validation phase on reflection");
        }

        if (!isValid) {
            textToAppend = loginImpossibleText;
            typeOfAppend = "require";
        }
        else if (isValid && !isInputComplete) {
            textToAppend = loginPossibleText;
            typeOfAppend = "process";
        }
        else if (isValid && isInputComplete) {
            textToAppend = loginNowText;
            typeOfAppend = "process";
        }
    }
    else {
        if (isDebugMode) {
            console.log("Starting revertion phase on reflection");
        }

        if (isNameFieldSet) {
            textToAppend = validateText;
            typeOfAppend = "validate";
        }
        else {
            textToAppend = requireText;
            typeOfAppend = "require";
        }
    }

    if (!formStatusReflectionNode.classList.contains(appendixClassName) && textToAppend != "") {
        if (isDebugMode) {
            console.log("Appending ->");
            console.log("   for isValidationPhase:[" + isValidationPhase + "], isValid:[" + isValid + "], typeOfAppend:[" + typeOfAppend + "], textToAppend:[" + textToAppend + "]");
        }
        setReflectionText(typeOfAppend, textToAppend, false);
    }
    else if (formStatusReflectionNode.classList.contains(appendixClassName) && textToAppend != "") {
        if (isDebugMode) {
            console.log("Rescheduling Reflection Update ->");
            console.log("   for isValidationPhase:[" + isValidationPhase + "], isValid:[" + isValid + "], typeOfAppend:[" + typeOfAppend + "], textToAppend:[" + textToAppend + "]");
        }
        setTimeout(updateReflectionText, appendixInterval, isValidationPhase, isValid);
    }
    else if (textToAppend == "") {
        if (isDebugMode) {
            console.log("Cannot append empty value - no changes were reflected ->");
            console.log("   for typeOfAppend:[" + typeOfAppend + "] with runtime of isInputComplete:[" + isInputComplete + "], isInputEmpty:[" + isInputEmpty + "], isNameFieldSet:[" + isNameFieldSet + "]");
        }
    }
    else {
        if (isDebugMode) {
            console.log("Unknown state - no changes were reflected ->");
            console.log("   for typeOfAppend:[" + typeOfAppend + "] with runtime of isInputComplete:[" + isInputComplete + "], isInputEmpty:[" + isInputEmpty + "], isNameFieldSet:[" + isNameFieldSet + "]");
        }
    }
};

const checkAccountNameValidity = function (userNameInput) {
    var userNameListNodes = document.getElementsByClassName("icrate-user-entry");
    var isEntryFound = false;

    var curUserName = userNameInput;
    for (var userNameElement of userNameListNodes) {
        if (curUserName.toLowerCase() == userNameElement.innerHTML.toLowerCase()) {
            isEntryFound = true;
        }
    }

    return isEntryFound;
}

const implyInteractiveClassesForElement = function (element, className) {
    if (!isInitialized) {
        setTimeout(implyInteractiveClassesForElement, 200, element, className);
        return;
    }
    var classNameList = ["hovering-input", "focusing-input", "entered-input"];
    for (cName of classNameList) {
        element.classList.remove(cName);
        textInputNodes[element.id].descriptionNode.classList.remove(cName);
    }
    if (className) {
        element.classList.add(className);
        textInputNodes[element.id].descriptionNode.classList.add(className);
    }
};

const appendCharactersToInnerByTime = function (element, remainingText, millisecondInterval, isAppendOnly) {
    if (element.innerHTML == remainingText) {
        return;
    }
    var appendString = "";

    if (isAppendOnly) {
        if (!element.classList.contains(appendixClassName)) {
            element.classList.add(appendixClassName);
        }
        appendString = element.innerHTML;
    }
    else {
        if (element.classList.contains(appendixClassName)) {
            appendString = element.innerHTML;
        }
        else {
            element.classList.add(appendixClassName);
        }
    }

    appendString += remainingText.substring(0, 1);
    element.innerHTML = appendString;

    if (remainingText.length > 1) {
        setTimeout(appendCharactersToInnerByTime, millisecondInterval, element, remainingText.substring(1, remainingText.length), millisecondInterval, false);
    }
    else {
        element.classList.remove(appendixClassName);
    }
};

// Code Execution
iCrateInit();
let textInputNodes = {};

const iCrateInit = function () {
    // Login Site
    if (window.location.pathname == "/") {
        var loginInputNodes = {};
        loginInputNodes.name = document.getElementById("name");
        loginInputNodes.password = document.getElementById("password");

        if (loginInputNodes.name && loginInputNodes.password) {
            textInputNodes.name = {
                "node": loginInputNodes.name, "placeholder": loginInputNodes.name.getAttribute("placeholder"), "mandatory": loginInputNodes.name.getAttribute("required") ? true : false, "descriptionNode": document.getElementById("input-mandatory-description-name")
            }
            textInputNodes.password = {
                "node": loginInputNodes.password, "placeholder": loginInputNodes.password.getAttribute("placeholder"), "mandatory": loginInputNodes.password.getAttribute("required") ? true : false, "descriptionNode": document.getElementById("input-mandatory-description-password")
            }
            console.log("Initialized with:");
            console.log(textInputNodes);
        } else {
            console.log("Not initialized yet!");
            setTimeout(iCrateInit, 200);
        }
    }
}

const setMouseEnterTransitionClass = function (element) {
    if (!element.value || element.value == "") {
        if (element && element.classList) {
            element.classList.add("hovering-input");
            textInputNodes[element.id].descriptionNode.classList.add("hovering-input");
        }
    } else {
        changedContent(element);
    }
};

const processMouseLeaveTransitionClass = function (element) {
    if (!element.value || element.value == "") {
        if (element && element.classList) {
            element.classList.remove("hovering-input");
            textInputNodes[element.id].descriptionNode.classList.remove("hovering-input");
        }
    } else {
        changedContent(element);
    }
};

const signalizeCorrectness = function (element) {
    if (!element.value || element.value == "") {
        if (element && element.classList) {
            element.classList.remove("hovering-input");
            element.classList.add("focusing-input");
            textInputNodes[element.id].descriptionNode.classList.remove("hovering-input");
            textInputNodes[element.id].descriptionNode.classList.add("focusing-input");
            textInputNodes[element.id].descriptionNode.innerHTML = "Got focused.";
        }
    } else {
        changedContent(element);
    }
};

const revertCorrectness = function (element) {
    if (!element.value || element.value == "") {
        if (element && element.classList) {
            element.classList.remove("focusing-input");
            textInputNodes[element.id].descriptionNode.classList.remove("focusing-input");
            textInputNodes[element.id].descriptionNode.innerHTML = "Required!";
        }
    } else {
        changedContent(element);
    }

};

const changedContent = function (element) {
    if (!element.value || element.value == "") {
        if (element && element.classList) {
            element.classList.remove("focusing-input");
            element.classList.remove("entered-input");
            textInputNodes[element.id].descriptionNode.classList.remove("focusing-input");
            textInputNodes[element.id].descriptionNode.classList.remove("entered-input");
            textInputNodes[element.id].descriptionNode.innerHTML = "Required!";
        }
    } else {
        if (element && element.classList) {
            element.classList.remove("hovering-input");
            element.classList.remove("focusing-input");
            element.classList.add("entered-input");
            textInputNodes[element.id].descriptionNode.classList.remove("hovering-input");
            textInputNodes[element.id].descriptionNode.classList.remove("focusing-input");
            textInputNodes[element.id].descriptionNode.classList.add("entered-input");
            textInputNodes[element.id].descriptionNode.innerHTML = "<b>Value set</b>";
        }
    }
};


iCrateInit();
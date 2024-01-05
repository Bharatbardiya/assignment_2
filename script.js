function forSelect() {
    console.log("forSelect");
    const fieldType = document.getElementById("field-type");
    const field = document.getElementById("field-type-pr");

    if (fieldType.value == "select") {
        const newDiv = document.createElement('div');
        newDiv.id = "select_form";

        const label = document.createElement("label");
        label.textContent = "add options";
        label.id = "option_label";

        const input = document.createElement("input");
        input.type = "text";
        input.id = "option_name";

        const button = document.createElement("button");
        button.textContent = "add";
        button.id = "add-option";
        button.addEventListener("click", addOption);
        
        newDiv.appendChild(label);
        
        newDiv.appendChild(input);
        newDiv.appendChild(button);

        field.appendChild(newDiv);
    } else {
        options = [];
        document.getElementById("option_label")?.remove();
        document.getElementById("option_name")?.remove();
        document.getElementById("add-option")?.remove();
    }
}

let options = [];
function addOption() {
    
    const val = document.getElementById("option_name");
    options.push(val.value);
    val.value = "";
    
}

let formFields = [];

function generateForm() {
    const generatedFormContainer = document.getElementById("generated-form");
    generatedFormContainer.innerHTML = "<h2>Generated Form</h2>"; // Clear previous content

    const generatedForm = document.createElement("form");
    
    generatedForm.submit(function(e) {
        e.preventDefault();
    });

    formFields.forEach((field) => {
        generatedForm.appendChild(field.cloneNode(true));
        generatedForm.appendChild(document.createElement("br"));
    });
    const button = document.createElement("button");
    button.textContent = "submit";
    button.id = "final_submit";
    button.type="submit";
    generatedForm.appendChild(button);

    generatedFormContainer.appendChild(generatedForm);
}

function addField() {
    const fieldLabel = document.getElementById("field-label").value;
    const fieldType = document.getElementById("field-type").value;
    const fieldRequired = document.getElementById("field-required").checked;

    const field = document.createElement("div");

    if (fieldType == "select") {

        const label = document.createElement("label");
        label.textContent = fieldLabel;

        const select = document.createElement("select");
        select.setAttribute("id", "mySelect");

        options.forEach((ele) => {
            var z = document.createElement("option");
            z.setAttribute("value", ele);

            var t = document.createTextNode(ele);
            z.appendChild(t);
            select.appendChild(z);
        });

        field.append(label);
        field.append(select);
    } else {
        const label = document.createElement("label");
        label.textContent = fieldLabel;

        const input = document.createElement("input");
        
        input.type = fieldType;
        input.name = "field_" + formFields.length;
        
        if(fieldType=="password"){
            input.minLength="8";
        }
        if (fieldRequired) {
            input.required = true;
        }

        field.appendChild(label);
        field.appendChild(input);

    }

    formFields.push(field);

    const formFieldsContainer = document.getElementById("form-fields");
    formFieldsContainer.appendChild(field);

    options=[];

}
function resetField(){
    document.getElementById("field-label").value = "";
    document.getElementById("field-type").value = "text";
    document.getElementById("field-required").checked = false;

    options = [];
    document.getElementById("option_label")?.remove();
    document.getElementById("option_name")?.remove();
    document.getElementById("add-option")?.remove();

}

function validateEmail(emailInput) {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value);

    return isValid;
}

function validatePassword(password) {
    console.log(password, typeof password);
    const isValid = (password?.length >= 8);
    return isValid;
}

let index = 0;
let emp = 1;
let vehicleType;
let selectedType;
let passNo = 1;
let passString;

let conversionRates = {
    "rupee": 1, "dollar": 0.012, "yen": 1.73   
};

let cyclePrices = [5, 100, 500];
let motorcyclePrices = [10, 200, 1000];
let fourwheelerPrices = [200, 500, 3500];


const pass = document.getElementById("password");

const employeeElement = document.getElementById("employee-form");
const employeeElementDiv=employeeElement.getElementsByTagName("div");

const vehicleElement = document.getElementById("vehicle-form");
const vehicleElementDiv=vehicleElement.getElementsByTagName("div");

employeeElementDiv[index].lastElementChild.focus();


// element.addEventListener("keypress", handleEmployee);

const handleSelectInput = (event) => {
    const types = document.getElementById("vehicle-type");
    if(types.options[types.selectedIndex] == -1){
        return;
    }
    selectedType = types.value;
    vehicleElementDiv[index].classList.remove("show-element");
    vehicleElementDiv[index].classList.add("hide-element");

    if(selectedType == "cycle"){
        index++;
    }
    index++;
    vehicleElementDiv[index].classList.add("show-element");
    vehicleElementDiv[index].classList.remove("hide-element");
    vehicleElementDiv[index].lastElementChild.focus();
    vehicleElementDiv[index].lastElementChild.addEventListener("keypress", handleVehicleInput);
};

const handleVehicleInput = (event) => {  
    if (event.target.value.length < 2) return;  

    if (event.key === "Enter") {  
        event.preventDefault();  
        vehicleElementDiv[index].lastElementChild.removeEventListener("keypress", handleVehicleInput);  
        vehicleElementDiv[index].classList.remove("show-element");  
        vehicleElementDiv[index].classList.add("hide-element");  
        index++;  

        if (index === vehicleElementDiv.length) {  
            document.querySelector(".currency-changer").classList.remove("hide-element");  
            document.getElementById(selectedType).classList.remove("hide-element");  
            return;  
        }  

        if (employeeElementDiv[index].contains(document.getElementById("vehicle-type"))) {  
            vehicleElementDiv[index].classList.remove("hide-element");  
            vehicleElementDiv[index].classList.add("show-element");  
        } else {  
            vehicleElementDiv[index].classList.add("show-element");  
            vehicleElementDiv[index].classList.remove("hide-element");  
            vehicleElementDiv[index].lastElementChild.focus();  
            vehicleElementDiv[index].lastElementChild.addEventListener("keypress", handleVehicleInput);  
        }  
    }  
};

const handleEmployeeInput = (event) => {
    const phoneno = /^\d{8,}$/;

    if (event.key === "Enter" && document.getElementById("contact").value.match(phoneno)) {
        event.preventDefault();
        employeeElementDiv[index].lastElementChild.removeEventListener("keypress", handleEmployeeInput);
        employeeElementDiv[index].classList.remove("show-element");
        employeeElementDiv[index].classList.add("hide-element");
        document.getElementById("register-id").classList.remove("hide-element");
        document.getElementById("register-id").innerHTML = `Your Employee id : E${emp}`;
        index = 0;
        vehicleElementDiv[index].classList.remove("hide-element");
        vehicleElementDiv[index].classList.add("show-element");
        vehicleElementDiv[index].lastElementChild.focus();
        vehicleElementDiv[index].lastElementChild.addEventListener("keypress", handleVehicleInput);
    }
};

const handleConfirmPassword = (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        const confirmPass = document.getElementById("confirm-password");

        if (pass.value === confirmPass.value) {
            employeeElementDiv[index].classList.remove("show-element");
            employeeElementDiv[index].classList.add("hide-element");
            index++;
            employeeElementDiv[index].classList.remove("hide-element");
            employeeElementDiv[index].classList.add("show-element");
            employeeElementDiv[index].lastElementChild.focus();
            employeeElementDiv[index].lastElementChild.addEventListener("keypress", handleEmployeeInput);
        } else {
            pass.value = "";
            confirmPass.value = "";
            employeeElementDiv[index].classList.remove("show-element");
            employeeElementDiv[index].classList.add("hide-element");
            index--;
            employeeElementDiv[index].classList.remove("hide-element");
            employeeElementDiv[index].classList.add("show-element");
            employeeElementDiv[index].lastElementChild.focus();
            employeeElementDiv[index].lastElementChild.addEventListener("keypress", handlePasswordInput);
        }
    }
};

const handlePasswordInput = (event) => {
    let strength = 0;
    const indicator = document.getElementById("password-strength-indicator");
    const lowerCaseLetters = /[a-z]/g;
    const upperCaseLetters = /[A-Z]/g;
    const numbers = /[0-9]/g;
    let color = "red";
    let message = "Weak";

    if (pass.value.length <= 9) {
        color = "red";
        message = "Weak";
    } else if (pass.value.length > 9 && pass.value.length < 12) {
        color = "orange";
        message = "Medium";
    } else if (pass.value.length >= 12) {
        color = "green";
        message = "Strong";
    }

    if (pass.value.match(lowerCaseLetters)) strength++;
    if (pass.value.match(upperCaseLetters)) strength++;
    if (pass.value.match(numbers)) strength++;
    if (pass.value.length >= 7) strength++;

    if (strength !== 4) {
        document.getElementById("password").style.borderColor = "red";
        indicator.style.color = "red";
        indicator.textContent = "Should have Uppercase, Lowercase, number, and length >= 8";
        return;
    }

    document.getElementById("password").style.borderColor = color;
    indicator.textContent = message;
    indicator.style.color = color;

    if (event.key === "Enter") {
        employeeElementDiv[index].classList.remove("show-element");
        employeeElementDiv[index].classList.add("hide-element");
        index++;

        employeeElementDiv[index].classList.remove("hide-element");
        employeeElementDiv[index].classList.add("show-element");
        employeeElementDiv[index].lastElementChild.focus();
        employeeElementDiv[index].lastElementChild.addEventListener("keypress", handleConfirmPassword);
    }
};

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);  

const handleEmailInput = (event) => {  
    if(event.key == "Enter"){  
        event.preventDefault();  
        if(!validateEmail(document.getElementById("email").value)){  
            employeeElementDiv[index].lastElementChild.focus();  
            alert("Enter valid email");  
        } else {  
            employeeElementDiv[index].classList.remove("show-element");  
            employeeElementDiv[index].classList.add("hide-element");  
            index++;  
            employeeElementDiv[index].classList.remove("hide-element");  
            employeeElementDiv[index].classList.add("show-element");  
            employeeElementDiv[index].lastElementChild.focus();  
            employeeElementDiv[index].lastElementChild.addEventListener("keypress", handlePasswordInput);  
        }  
    }  
};

const handleGenderInput = (event) => {  
    employeeElementDiv[index].classList.remove("show-element");  
    employeeElementDiv[index].classList.add("hide-element");  
    index++;  
    employeeElementDiv[index].classList.remove("hide-element");  
    employeeElementDiv[index].classList.add("show-element");  
    employeeElementDiv[index].lastElementChild.focus();  
    employeeElementDiv[index].lastElementChild.addEventListener("keypress", handleEmailInput);  
};  

const handleNameInput = (event) => {  
    if(event.key == "Enter"){  
        event.preventDefault();  
        if(document.getElementById("Name").value === ""){  
            employeeElementDiv[index].lastElementChild.focus();  
            alert("Name field is empty.");  
        } else {  
            const name = document.getElementById("Name").value;  
            document.getElementById("input-name").innerHTML = name;  
            passString = name.substring(0, 3);  
            employeeElementDiv[index].classList.remove("show-element");  
            employeeElementDiv[index].classList.add("hide-element");  
            index++;  
            employeeElementDiv[index].classList.remove("hide-element");  
            employeeElementDiv[index].classList.add("show-element");  
            const radioInputs = document.querySelectorAll("input[name='Gender']");  
            radioInputs.forEach(btn => btn.addEventListener("click", handleGenderInput));  
        }  
    }  
};


const changePrices = (currency) => {
    const selectedRate = conversionRates[currency];
    console.log("in function");
    let priceArray;

    switch (selectedType) {
        case "cycle":
            priceArray = cyclePrices;
            break;
        case "motorcycle":
            priceArray = motorcyclePrices;
            break;
        case "fourwheeler":
            priceArray = fourwheelerPrices;
            break;
        default:
            return;
    }

    document.querySelectorAll(".price").forEach((priceElement, ind) => {
        console.log(priceArray[ind]);
        console.log(selectedRate);
        const convertedPrice = (priceArray[ind] * selectedRate).toFixed(2);

        console.log("3" + conversionRates);
        priceElement.textContent = `${currency === "rupee" ? "₹" : currency === "yen" ? "¥" : "$"}${convertedPrice}`;
    });
};

const selectPlan = (event) => {
    document.querySelectorAll(".select-plan button").forEach((btn) => {
        btn.textContent = "Select Plan";
        btn.classList.remove("selected");
    });

    event.target.classList.add("selected");
    event.target.textContent = "Selected";
    document.getElementById("pass").classList.remove("hide-element");
};

generatePass = () => {
    alert(`Your pass no is : ${passString}${passNo} for your ${selectedType}`);
    
}
                
employeeElementDiv[index].lastElementChild.addEventListener("keypress", handleNameInput);
                
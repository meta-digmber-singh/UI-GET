let index = 0;
let emp= 1;
let vehicleType : string;
let selectedType : string;
let selectedPlan = false;
let passNo = 1;
let passString : string;

const employeeData: Partial<Employee> = {};
const vehicleData: Partial<Vehicle> = {};
const passData: Partial<ParkingPass> = {};


let conversionRates = {
    "rupee": 1, "dollar": 0.012, "yen": 1.73   
};

let cyclePrices = [5, 100, 500];
let motorcyclePrices = [10, 200, 1000];
let fourwheelerPrices = [200, 500, 3500];


const pass = document.getElementById("password") as HTMLInputElement;

const employeeElement = document.getElementById("employee-form") as HTMLFormElement;
const employeeElementDiv=employeeElement?.getElementsByTagName("div");

const vehicleElement = document.getElementById("vehicle-form");
const vehicleElementDiv=vehicleElement?.getElementsByTagName("div");

(employeeElementDiv[index].lastElementChild as HTMLInputElement).focus();


const handleSelectInput = (event) => {
    const types = document.getElementById("vehicle-type") as HTMLSelectElement;
    if(types.selectedIndex === -1){
        return;
    }
    selectedType = types.value;
    if(vehicleElementDiv){
        vehicleElementDiv[index].classList.remove("show-element");
        vehicleElementDiv[index].classList.add("hide-element");
    }

    if(selectedType == "cycle"){
        index++;
    }
    index++;
    vehicleData.type = types.value;

    if(vehicleElementDiv){
        vehicleElementDiv[index].classList.add("show-element");
        vehicleElementDiv[index].classList.remove("hide-element");
        (vehicleElementDiv[index].lastElementChild as HTMLInputElement).focus();
        (vehicleElementDiv[index].lastElementChild as HTMLInputElement).addEventListener("keypress", handleVehicleInput);
    }
};

const handleVehicleInput = (event: KeyboardEvent) => {  
    if ((event.target as HTMLInputElement).value.length < 2) return;  

    if (event.key === "Enter") {  
        event.preventDefault();  

        if(index == 0){
            vehicleData.company = (event.target as HTMLInputElement).value;
        } else if(index == 1){
            vehicleData.model = (event.target as HTMLInputElement).value;
        } else if(index == 3){
            vehicleData.vNumber = (event.target as HTMLInputElement).value;
        }

        if(vehicleElementDiv){
            (vehicleElementDiv[index].lastElementChild as HTMLInputElement).removeEventListener("keypress", handleVehicleInput);  
            vehicleElementDiv[index].classList.remove("show-element");  
            vehicleElementDiv[index].classList.add("hide-element");  
        }
        index++;  

        if (vehicleElementDiv && index === vehicleElementDiv.length) {  
            vehicleData.specification = (event.target as HTMLInputElement).value;

            const currencyDiv = document.querySelector(".currency-changer") as HTMLDivElement;
            currencyDiv.classList.remove("hide-element");  
            (document.getElementById(selectedType) as HTMLDivElement).classList.remove("hide-element");  
            return;  
        }  

        if(vehicleElementDiv){
            if (employeeElementDiv[index].contains(document.getElementById("vehicle-type"))) {  
                vehicleElementDiv[index].classList.remove("hide-element");  
                vehicleElementDiv[index].classList.add("show-element");  
            } else {  
                vehicleElementDiv[index].classList.add("show-element");  
                vehicleElementDiv[index].classList.remove("hide-element");  
                (vehicleElementDiv[index].lastElementChild as HTMLInputElement).focus();  
                (vehicleElementDiv[index].lastElementChild as HTMLInputElement).addEventListener("keypress", handleVehicleInput);  
            }
        }  
    }  
};

const handleEmployeeInput = (event) => {
    const phoneno = /^\d{8,}$/;

    if (event.key === "Enter" && (document.getElementById("contact") as HTMLInputElement).value.match(phoneno)) {
        event.preventDefault();
        (employeeElementDiv[index].lastElementChild as HTMLInputElement).removeEventListener("keypress", handleEmployeeInput);
        employeeElementDiv[index].classList.remove("show-element");
        employeeElementDiv[index].classList.add("hide-element");
        
        const contactEle = document.getElementById("contact") as HTMLInputElement;

        employeeData.phone = Number(contactEle.value);

        const labelEmpId = document.getElementById("register-id") as HTMLElement;
        labelEmpId.classList.remove("hide-element");
        labelEmpId.innerHTML = `Your Employee id : E${emp}`;

        vehicleData.empId = `E${emp}`;
        passData.empId = `E${emp}`;
        
        index = 0;
        
        if(vehicleElementDiv){
            const vehicleDiv = vehicleElementDiv[index] as HTMLDivElement;
            vehicleDiv.classList.remove("hide-element");
            vehicleDiv.classList.add("show-element");
            (vehicleDiv.lastElementChild as HTMLInputElement).focus();
            (vehicleDiv.lastElementChild as HTMLInputElement).addEventListener("keypress", handleVehicleInput);
        }
    }
};

const handleConfirmPassword = (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        const confirmPass = document.getElementById("confirm-password") as HTMLInputElement;

        if (pass.value === confirmPass.value) {

            employeeData.password = pass.value;
            employeeElementDiv[index].classList.remove("show-element");
            employeeElementDiv[index].classList.add("hide-element");
            index++;
            employeeElementDiv[index].classList.remove("hide-element");
            employeeElementDiv[index].classList.add("show-element");
            (employeeElementDiv[index].lastElementChild as HTMLInputElement).focus();
            (employeeElementDiv[index].lastElementChild as HTMLInputElement).addEventListener("keypress", handleEmployeeInput);
        } else {
            pass.value = "";
            confirmPass.value = "";
            employeeElementDiv[index].classList.remove("show-element");
            employeeElementDiv[index].classList.add("hide-element");
            index--;
            employeeElementDiv[index].classList.remove("hide-element");
            employeeElementDiv[index].classList.add("show-element");
            (employeeElementDiv[index].lastElementChild as HTMLInputElement).focus();
            (employeeElementDiv[index].lastElementChild as HTMLInputElement).addEventListener("keypress", handlePasswordInput);
        }
    }
};

const handlePasswordInput = (event) => {
    let strength = 0;
    const indicator = document.getElementById("password-strength-indicator") as HTMLParagraphElement;
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
        (document.getElementById("password") as HTMLInputElement).style.borderColor = "red";
        indicator.style.color = "red";
        indicator.textContent = "Should have Uppercase, Lowercase, number, and length >= 8";
        return;
    }

    (document.getElementById("password") as HTMLInputElement).style.borderColor = color;
    indicator.textContent = message;
    indicator.style.color = color;

    if (event.key === "Enter") {

        employeeElementDiv[index].classList.remove("show-element");
        employeeElementDiv[index].classList.add("hide-element");
        index++;

        employeeElementDiv[index].classList.remove("hide-element");
        employeeElementDiv[index].classList.add("show-element");
        (employeeElementDiv[index].lastElementChild as HTMLInputElement).focus();
        (employeeElementDiv[index].lastElementChild as HTMLInputElement).addEventListener("keypress", handleConfirmPassword);
    }
};

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);  

const handleEmailInput = (event : KeyboardEvent) => {  
    if(event.key == "Enter"){  
        event.preventDefault();
        
        const emailElement = document.getElementById("email") as HTMLInputElement;
        if(!validateEmail(emailElement.value)){  
            (employeeElementDiv[index].lastElementChild as HTMLInputElement).focus();  
            alert("Enter valid email");  
        } else {  

            employeeData.email = emailElement.value;

            employeeElementDiv[index].classList.remove("show-element");  
            employeeElementDiv[index].classList.add("hide-element");  
            index++;  
            employeeElementDiv[index].classList.remove("hide-element");  
            employeeElementDiv[index].classList.add("show-element");  
            (employeeElementDiv[index].lastElementChild as HTMLInputElement).focus();  
            (employeeElementDiv[index].lastElementChild as HTMLInputElement).addEventListener("keypress", handlePasswordInput);  
        }  
    }  
};

const handleGenderInput = (event: Event) => {  

    employeeData.gender = (event.target as HTMLInputElement).value;

    employeeElementDiv[index].classList.remove("show-element");  
    employeeElementDiv[index].classList.add("hide-element");  
    index++;  
    employeeElementDiv[index].classList.remove("hide-element");  
    employeeElementDiv[index].classList.add("show-element");  
    (employeeElementDiv[index].lastElementChild as HTMLInputElement).focus();  
    (employeeElementDiv[index].lastElementChild as HTMLInputElement).addEventListener("keypress", handleEmailInput);  
};  

const handleNameInput = (event) => {  
    if(event.key == "Enter"){  
        event.preventDefault();
        
        const nameElement = document.getElementById("Name") as HTMLInputElement;
        if(nameElement.value === ""){  
            (employeeElementDiv[index].lastElementChild as HTMLInputElement).focus();  
            alert("Name field is empty.");  
        } else {  
            const name = nameElement.value;  
            (document.getElementById("input-name") as HTMLParagraphElement).innerHTML = name;  
            employeeData.name = name;

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
        selectedPlan = true;
    });

    event.target.classList.add("selected");
    event.target.textContent = "Selected";
    (document.getElementById("pass") as HTMLButtonElement).classList.remove("hide-element");
};

const generatePass = () => {
    if(selectedPlan){
        console.log("pass");
        console.log(employeeData);
        console.log(vehicleData);
        console.log(passData);
        alert(`Pass for your ${selectedType} is : ${passString}${passNo}`);
    }else{
        alert("Please choose a plan");
    }
}
                
(employeeElementDiv[index].lastElementChild as HTMLInputElement).addEventListener("keypress", handleNameInput);


interface Employee {
    name: string,
    gender: string,
    email: string,
    password: string,
    phone: number
}

interface Vehicle{
    company: string,
    model: string,
    type: string,
    vNumber: string,
    empId: string,
    specification: string
}

interface ParkingPass{
    empId: string,
    vType: string,
    plan: string,
}
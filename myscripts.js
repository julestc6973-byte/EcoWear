/* =====================================================================
   Ecowear - myscripts.js
   One external JavaScript file, linked with defer on the 12 pages.

   Contents:
     1. Every page: the year in the footer, showMessage() and the newsletter form
     2. Show and hide (Principles and FAQ pages)
     3. Carbon footprint calculator (Products page)
     4. Certificate check (Certified Brands page)
     5. Registration form (Register & Pay page)
     6. Payment form (Register & Pay page)
     7. Feedback form (FAQ page)
     8. Live certificate check with Teachable Machine (Live Check page)
   ===================================================================== */

// A message in the Console proves that this file is linked (JS guide, section 1.2)
console.log("Ecowear: myscripts.js is running");


/* ---------- 1. EVERY PAGE ---------- */

// Write the current year in the footer (JS guide, section 1.8)
document.getElementById("year").innerHTML = new Date().getFullYear();

// The colors of our messages: dark green = success, red = error or missing information
const SUCCESS = "#0a5c36";
const ERROR = "#b42318";

// showMessage() writes a text in the paragraph whose id is given, in the given color.
// Every form below uses it, so the answer always appears on the page.
function showMessage(boxId, text, color) {
    const box = document.getElementById(boxId);
    box.innerHTML = text;
    box.style.color = color;
}

// Newsletter sign-up form, in the footer of every page
function subscribeNewsletter() {
    const emailField = document.getElementById("newsletterEmail");
    const email = emailField.value.trim();
    const resultBox = document.getElementById("newsletterResult");

    // includes("@") checks that the text contains an @, like every email address
    if (email === "" || !email.includes("@")) {
        resultBox.innerHTML = "Please enter a valid email address.";
    } else {
        resultBox.innerHTML = "Thanks! We'll send transparency updates to " + email + ".";
        emailField.value = "";
    }
    return false;   // stops the page from reloading
}


/* ---------- 2. SHOW AND HIDE (JS guide, section 1.6) ---------- */

// Principles page: shows or hides the detailed principles
function toggleDetails() {
    document.getElementById("details").classList.toggle("hidden");
    document.getElementById("details").classList.toggle("highlight");
}

// FAQ page: the same idea for any answer, whose id is given between the brackets
function toggleFAQ(id) {
    document.getElementById(id).classList.toggle("hidden");
    document.getElementById(id).classList.toggle("highlight");
}


/* ---------- 3. CARBON FOOTPRINT CALCULATOR (products.html) ---------- */

// The metrics are explained under the calculator on the Products page:
// - Making a conventional garment: ADEME, quoted by L'info durable
//   https://www.linfodurable.fr/environnement/education-les-tenues-uniques-repondront-elles-des-exigences-ecologiques-43858
// - Transport by truck: ADEME Base Carbone, 0.0675 kg CO2 per tonne and per km
//   https://www.banque-france.fr/system/files/2026-07/Methodologie_fret.pdf
// - The share kept by each material and the weights are our own estimates.
function calculateCarbon() {
    // 1. Read the inputs and convert the numbers from text to numbers
    const garment = document.getElementById("garment").value;
    const materialShare = Number(document.getElementById("material").value);
    const garments = Number(document.getElementById("garments").value);
    const distance = Number(document.getElementById("distance").value);

    // 2. Validate: both values must be numbers greater than 0
    if (isNaN(garments) || isNaN(distance) || garments <= 0 || distance <= 0) {
        showMessage("result", "Enter a number above 0 in both boxes.", ERROR);
        return false;
    }

    // 3. The metrics of the chosen garment: kg of CO2 when made with conventional new materials, and weight in kg
    let conventionalKg = 30;   // sweatshirt, unless one of the tests below is true
    let weightKg = 0.6;
    if (garment === "tshirt") {
        conventionalKg = 6;
        weightKg = 0.2;
    } else if (garment === "shirt") {
        conventionalKg = 12;
        weightKg = 0.3;
    } else if (garment === "sweater") {
        conventionalKg = 12;
        weightKg = 0.5;
    }

    // 4. Calculate with arithmetic operators. One kg is 0.001 tonne, so the weight is divided by 1000.
    const transportKg = (weightKg / 1000) * distance * 0.0675 * garments;
    const totalKg = conventionalKg * materialShare * garments + transportKg;
    const conventionalTotalKg = conventionalKg * garments + transportKg;
    const savedKg = conventionalTotalKg - totalKg;

    // 5. Choose a rating with if / else if / else
    let rating;
    if (totalKg <= 5) {
        rating = "Low impact";
    } else if (totalKg <= 15) {
        rating = "Medium impact";
    } else {
        rating = "High impact";
    }

    // 6. Show the result on the page. toFixed(1) rounds to one decimal.
    let text = "Your order: about " + totalKg.toFixed(1) + " kg of CO2 (" + rating + "). ";
    if (savedKg > 0) {
        text = text + "With conventional new materials it would be " + conventionalTotalKg.toFixed(1) +
            " kg, so you avoid " + savedKg.toFixed(1) + " kg.";
    } else {
        text = text + "Choose a certified material to see how much you could avoid.";
    }
    showMessage("result", text, SUCCESS);
    return false;
}


/* ---------- 4. CERTIFICATE CHECK (brands-directory.html) ---------- */

// Compares the number typed by the customer with the certificates we issued
function lookupCertificate() {
    // toUpperCase() accepts "ew-24-002" as well as "EW-24-002"
    const number = document.getElementById("certNumber").value.trim().toUpperCase();

    if (number === "") {
        showMessage("certResult", "Please type the number printed on the label, for example EW-24-002.", ERROR);
    } else if (number === "EW-24-002") {
        showMessage("certResult", "Valid: Maison Verte, Lyon. Material, fair-wage and carbon audits passed. Valid until March 2027.", SUCCESS);
    } else if (number === "EW-24-005") {
        showMessage("certResult", "Valid: Atelier Fil & Trame, Roubaix. Material, fair-wage and carbon audits passed. Valid until June 2027.", SUCCESS);
    } else if (number === "EW-25-009") {
        showMessage("certResult", "Valid: Nord Textile Co., Lille. Material, fair-wage and carbon audits passed. Valid until September 2027.", SUCCESS);
    } else {
        showMessage("certResult", "We did not issue the certificate " + number +
            ". A label without a valid number is not an Ecowear label.", ERROR);
    }
    return false;   // stops the page from reloading
}


/* ---------- 5. REGISTRATION FORM (regpay.html) ---------- */

// On the Register & Pay page we declare variables with "var" (JS guide). Each function combines
// variables (var), if statements and operators (===, !==, ||, &&, *, +, -, >=).

// Button "Register": checks the form, then gives the next step for each type of account
function registerUser() {
    var accountType = document.getElementById("accountType").value;   // "customer" or "brand"
    var fullName = document.getElementById("fullName").value.trim();
    var email = document.getElementById("email").value.trim();
    var brand = document.getElementById("brandName").value.trim();
    var material = document.getElementById("material").value;

    if (accountType === "" || fullName === "" || email === "") {
        showMessage("registrationResult", "Please choose an account type and fill in your name and email address.", ERROR);
    } else if (!email.includes("@")) {
        showMessage("registrationResult", "Please enter a valid email address.", ERROR);
    } else if (accountType === "brand" && brand === "") {
        // && means "and": a brand account needs a brand name
        showMessage("registrationResult", "Please write the name of your brand.", ERROR);
    } else if (accountType === "brand") {
        showMessage("registrationResult", "Thank you for registering, " + fullName + "! Your certification request for " + brand +
            " (" + material + ") has been received. We will reply to " + email + " within 5 working days.", SUCCESS);
    } else {
        showMessage("registrationResult", "Thank you for registering, " + fullName + "! Your customer account is ready: " +
            "you can now buy certified garments in our shop.", SUCCESS);
    }
    return false;   // stops the page from reloading
}


/* ---------- 6. PAYMENT FORM (regpay.html) ---------- */

// getTotal() calculates the price of the order and gives it back with return
function getTotal() {
    var item = document.getElementById("payItem").value;
    var quantity = Number(document.getElementById("payQuantity").value);
    var delivery = Number(document.getElementById("payDelivery").value);

    var unitPrice = 250;   // Ecowear audit, per product line, unless one of the tests below is true
    if (item === "sweater") {
        unitPrice = 89;
    } else if (item === "jacket") {
        unitPrice = 135;
    } else if (item === "overshirt") {
        unitPrice = 79;
    } else if (item === "pouch") {
        unitPrice = 29;
    }

    var itemsTotal = unitPrice * quantity;
    // 10% off from 3 garments (!== means "is not": the discount is not for audits)
    if (quantity >= 3 && item !== "audit") {
        itemsTotal = itemsTotal - itemsTotal * 0.1;
    }
    return itemsTotal + delivery;
}

// quantityIsWrong() gives back true when the quantity is not a whole number of at least 1.
// quantity % 1 is the remainder of a division by 1: it is 0 only for whole numbers.
function quantityIsWrong() {
    var quantity = Number(document.getElementById("payQuantity").value);
    return isNaN(quantity) || quantity < 1 || quantity % 1 !== 0;
}

// Button "Check my total": shows the total without paying
function showTotal() {
    if (quantityIsWrong()) {
        showMessage("paymentResult", "Please choose a whole quantity of at least 1.", ERROR);
    } else {
        showMessage("paymentResult", "Your total is €" + getTotal().toFixed(2) + ", delivery included.", SUCCESS);
    }
}

// Button "Pay now": checks the form, then confirms the payment
function payNow() {
    var name = document.getElementById("payName").value.trim();

    if (name === "") {
        showMessage("paymentResult", "Please write your name.", ERROR);
    } else if (quantityIsWrong()) {
        showMessage("paymentResult", "Please choose a whole quantity of at least 1.", ERROR);
    } else {
        showMessage("paymentResult", "Payment of €" + getTotal().toFixed(2) + " confirmed. Thank you, " + name +
            "! A confirmation email is on its way.", SUCCESS);
    }
    return false;   // stops the page from reloading
}


/* ---------- 7. FEEDBACK FORM (faq.html) ---------- */

function submitFeedback() {
    const name = document.getElementById("fbName").value.trim();
    const email = document.getElementById("fbEmail").value.trim();
    const message = document.getElementById("fbMessage").value.trim();

    if (name === "" || email === "" || message === "") {
        showMessage("feedbackResult", "Please fill in your name, your email address and your question.", ERROR);
    } else {
        showMessage("feedbackResult", "Thanks " + name + ", we received your message and will reply to " + email +
            " within two working days.", SUCCESS);
    }
    return false;   // stops the page from reloading
}


/* ---------- 8. LIVE CERTIFICATE CHECK (live-check.html) ---------- */
// Reference (external code): adapted from the JavaScript export code of Google Teachable Machine,
// https://teachablemachine.withgoogle.com/ . It uses the TensorFlow.js and @teachablemachine/image
// libraries (Apache 2.0 licence), loaded in live-check.html. tmImage.load(), tmImage.Webcam()
// and model.predict() come from these libraries.
// Our model was trained on two classes: "certified label" and "no label".
const VERIFIER_MODEL_URL = "https://teachablemachine.withgoogle.com/models/AWFpArmvt/";
let verifierModel, verifierWebcam, verifierLabelContainer, verifierMaxPredictions;

// "async" and "await" let the page wait for the model to download and for the camera to start
async function initVerifier() {
    const startBtn = document.getElementById("verifyStartBtn");
    startBtn.disabled = true;
    startBtn.textContent = "Loading model...";

    try {
        // Load the model and the names of its classes
        verifierModel = await tmImage.load(VERIFIER_MODEL_URL + "model.json", VERIFIER_MODEL_URL + "metadata.json");
        verifierMaxPredictions = verifierModel.getTotalClasses();

        // Start a 224 x 224 webcam, flipped like a mirror
        verifierWebcam = new tmImage.Webcam(224, 224, true);
        await verifierWebcam.setup();   // asks the visitor for permission to use the camera
        await verifierWebcam.play();
        window.requestAnimationFrame(verifierLoop);

        // Show the camera image, and one empty row per class for the probabilities
        const webcamContainer = document.getElementById("webcam-container");
        webcamContainer.innerHTML = "";
        webcamContainer.appendChild(verifierWebcam.canvas);

        verifierLabelContainer = document.getElementById("label-container");
        verifierLabelContainer.innerHTML = "";
        for (let i = 0; i < verifierMaxPredictions; i++) {
            const row = document.createElement("div");
            row.className = "label-row";
            verifierLabelContainer.appendChild(row);
        }

        startBtn.textContent = "Camera running";
        showMessage("verifyMessage", "Hold the label in front of the camera.", SUCCESS);
    } catch (err) {
        startBtn.disabled = false;
        startBtn.textContent = "Start camera";
        showMessage("verifyMessage", "Could not start the camera or load the model. Check your internet connection " +
            "and allow the camera in your browser.", ERROR);
    }
}

// Runs again and again: takes a new camera image, then asks the model what it sees
async function verifierLoop() {
    verifierWebcam.update();
    await predictVerifier();
    window.requestAnimationFrame(verifierLoop);
}

// Writes the probability of each class, in %, in its row
async function predictVerifier() {
    const prediction = await verifierModel.predict(verifierWebcam.canvas);
    for (let i = 0; i < verifierMaxPredictions; i++) {
        const pct = Math.round(prediction[i].probability * 100);
        verifierLabelContainer.childNodes[i].innerHTML =
            "<span>" + prediction[i].className + "</span><span>" + pct + "%</span>";
    }
}

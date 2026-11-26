/* =====================================================================
   EcoWear - myscripts.js
   One external JavaScript file, linked with defer on every page.

   Contents:
     1. Runs on every page: the year in the footer, and showMessage()
     2. Show and hide (home, creators, products, stories and FAQ pages)
     3. Carbon footprint calculator (products page)
     4. Certificate check (label page)
     5. Find a creator (creators page)
     6. Self-assessment for creators (certification page)
     7. Feedback form (FAQ page)
     8. Contact form (contact page)
     9. Registration form (Register & Pay page)
    10. Payment form (Register & Pay page)
    11. AI Label Scanner and "Was the AI right?" form (AI Scanner page)
   ===================================================================== */

// A message in the Console proves that this file is linked (JS guide, section 1.2)
console.log("EcoWear: myscripts.js is running");


/* ---------- 1. RUNS ON EVERY PAGE ---------- */

// Write the current year in the footer (JS guide, section 1.8).
// Every page has <span id="year"></span> in its footer, so this line always finds it.
document.getElementById("year").innerHTML = new Date().getFullYear();

// The three colors of our messages, matching style.css
const GOLD = "#f5b700";   // success
const GREY = "#dbe2ee";   // information
const RED = "#e09a88";    // error or missing information

// showMessage() writes a text in the paragraph whose id is given, in the given color.
// Every form below uses it, so each answer takes one line instead of two.
function showMessage(boxId, text, color) {
    const box = document.getElementById(boxId);
    box.innerHTML = text;
    box.style.color = color;
}


/* ---------- 2. SHOW AND HIDE ---------- */

// toggleDetails() shows or hides the element whose id is written between the brackets.
// Example in the HTML: onclick="toggleDetails('answer1')"
// elementId is an input of the function (a parameter), so ONE function can open
// any FAQ answer, list of facts or story.
function toggleDetails(elementId) {
    // classList.toggle adds the class "hidden" if it is missing, and removes it if it is there (JS guide, section 1.6)
    document.getElementById(elementId).classList.toggle("hidden");
}


/* ---------- 3. CARBON FOOTPRINT CALCULATOR (products.html) ---------- */

// The metrics are explained under the calculator on the products page.
// Footprint of a conventional garment: ADEME, quoted by L'info durable.
// Source: https://www.linfodurable.fr/environnement/education-les-tenues-uniques-repondront-elles-des-exigences-ecologiques-43858
// Delivery by truck: ADEME Base Carbone, 0.0675 kg CO2e per tonne and per km.
// Source: https://www.banque-france.fr/system/files/2026-07/Methodologie_fret.pdf
// The savings for each kind of material and the weights are our estimates.

function calculateCarbon() {
    // 1. Read the inputs
    const garment = document.getElementById("garment").value;                  // "tshirt", "shirt", "sweater" or "sweatshirt"
    const materialShare = Number(document.getElementById("material").value);   // share of the conventional footprint
    const quantity = Number(document.getElementById("quantity").value);
    const distance = Number(document.getElementById("distance").value);        // km from the creator to the customer

    // 2. Validate: the quantity and the distance must be numbers above 0
    if (isNaN(quantity) || isNaN(distance) || quantity <= 0 || distance <= 0) {
        showMessage("result", "Please enter a quantity and a distance above 0.", RED);
        return false;   // stop the function here, and do not reload the page
    }

    // 3. The metrics of the chosen garment: kg CO2e with new conventional materials (ADEME), and weight in kg
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

    // 4. Calculate with arithmetic operators. One kg is 0.001 tonne, so we divide the weight by 1000.
    const deliveryKg = (weightKg / 1000) * distance * 0.0675 * quantity;                  // delivery of the whole order by truck
    const totalKg = conventionalKg * materialShare * quantity + deliveryKg;               // with the chosen material
    const conventionalTotalKg = conventionalKg * quantity + deliveryKg;                   // with conventional materials
    const savedKg = conventionalTotalKg - totalKg;

    // 5. Choose a rating and a color
    let rating = "high impact";
    let color = RED;
    if (totalKg <= 5) {
        rating = "low impact";
        color = GOLD;
    } else if (totalKg <= 15) {
        rating = "medium impact";
        color = GREY;
    }

    // 6. Show the result. toFixed(1) rounds a number to one decimal.
    let text = "Your order: about " + totalKg.toFixed(1) + " kg of CO2e (" + rating + "). ";
    if (savedKg > 0) {
        text = text + "With conventional new materials it would be " + conventionalTotalKg.toFixed(1) +
            " kg, so you avoid about " + savedKg.toFixed(1) + " kg.";
    } else {
        text = text + "Choose another material to see how much a certified creator helps you avoid.";
    }
    showMessage("result", text, color);

    return false;   // keep the result visible: do not reload the page
}


/* ---------- 4. CERTIFICATE CHECK (label.html) ---------- */

// Every certified creator has a certificate number, shown in our directory and on their labels.
function lookupCertificate() {
    // trim() removes spaces at the start and at the end
    const number = document.getElementById("certNumber").value.trim();

    if (number === "") {
        showMessage("certResult", "Please type the certificate number, for example EW-2026-003.", RED);
    } else if (number === "EW-2026-003") {
        showMessage("certResult", "Valid: Indigo Second, Lyon. Score 26/30. Certified until September 2027.", GOLD);
    } else if (number === "EW-2026-006") {
        showMessage("certResult", "Valid: True Wool, Annecy. Score 24/30. Certified until October 2027.", GOLD);
    } else if (number === "EW-2026-008") {
        showMessage("certResult", "Valid: Northern Linen, Lille. Score 22/30. Certified until October 2027.", GOLD);
    } else if (number === "EW-2026-011") {
        showMessage("certResult", "Valid: Shoreline Studio, Marseille. Score 25/30. Certified until November 2027.", GOLD);
    } else if (number === "EW-2026-014") {
        showMessage("certResult", "Valid: Studio Retaille, Lyon. Score 23/30. Certified until November 2027.", GOLD);
    } else if (number === "EW-2026-019") {
        showMessage("certResult", "Valid: Fair Cotton, Nantes. Score 21/30. Certified until November 2027.", GOLD);
    } else if (number === "EW-2026-007") {
        showMessage("certResult", "Suspended: the yearly audit of this creator has not been carried out. " +
            "The label may not be used until a new audit is passed.", RED);
    } else {
        showMessage("certResult", "We do not know the number " + number + ". Check that it is written in capitals, " +
            "like EW-2026-003. A label without a valid number is not an EcoWear label.", RED);
    }

    return false;   // do not reload the page
}


/* ---------- 5. FIND A CREATOR (creators.html) ---------- */

// Reads the kind of piece chosen in the drop-down list and names the certified creators who make it.
// if / else if / else tests the choices one after the other and runs only the first one that is true.
function findCreator() {
    const category = document.getElementById("category").value;   // the value of the chosen option

    if (category === "") {
        showMessage("findResult", "Please choose what you are looking for.", RED);
    } else if (category === "jewelry") {
        showMessage("findResult", "Shoreline Studio, in Marseille, makes jewelry from recovered copper wire and sea glass.", GOLD);
    } else if (category === "bags") {
        showMessage("findResult", "Studio Retaille, in Lyon, sews pouches and bags from printed-cotton offcuts.", GOLD);
    } else if (category === "jackets") {
        showMessage("findResult", "Indigo Second, in Lyon, cuts its jackets from old jeans.", GOLD);
    } else if (category === "shirts") {
        showMessage("findResult", "Northern Linen, in Lille, makes shirts in European linen, and Fair Cotton, " +
            "in Nantes, makes T-shirts in organic cotton.", GOLD);
    } else {
        showMessage("findResult", "True Wool, in Annecy, knits sweaters from recycled wool.", GOLD);
    }

    return false;   // do not reload the page
}


/* ---------- 6. SELF-ASSESSMENT FOR CREATORS (certification.html) ---------- */

// Each criterion is scored from 0 to 5. The label needs 20 points out of 30,
// and at least 2 points in every criterion.
function checkEligibility() {
    // Number() turns the value of each chosen option into a number
    const materials = Number(document.getElementById("crMaterials").value);
    const production = Number(document.getElementById("crProduction").value);
    const transparency = Number(document.getElementById("crTransparency").value);
    const transport = Number(document.getElementById("crTransport").value);
    const durability = Number(document.getElementById("crDurability").value);
    const endOfLife = Number(document.getElementById("crEndOfLife").value);
    const total = materials + production + transparency + transport + durability + endOfLife;

    if (materials < 2 || production < 2 || transparency < 2 || transport < 2 || durability < 2 || endOfLife < 2) {
        showMessage("eligibilityResult", "Your score is " + total + "/30, but at least one criterion is under 2/5. " +
            "Work on it first: the label needs 2 points in every criterion.", RED);
    } else if (total >= 20) {
        showMessage("eligibilityResult", "Your score is " + total + "/30: you can apply! " +
            "Create a creator account on the Register & Pay page to send your file.", GOLD);
    } else {
        showMessage("eligibilityResult", "Your score is " + total + "/30. You need 20 points: " + (20 - total) +
            " more to apply. Our FAQ explains each criterion.", GREY);
    }

    return false;   // do not reload the page
}


/* ---------- 7. FEEDBACK FORM (faq.html) ---------- */

// Checks that every box is filled in, then thanks the visitor by name.
function sendFeedback() {
    // Read what the visitor typed. trim() removes spaces at the start and at the end.
    const fullName = document.getElementById("fbName").value.trim();
    const email = document.getElementById("fbEmail").value.trim();
    const topic = document.getElementById("fbTopic").value;          // the value of the chosen option
    const message = document.getElementById("fbMessage").value.trim();

    // || means "or": the first message appears if ANY of the three boxes is empty
    if (fullName === "" || email === "" || message === "") {
        showMessage("feedbackResult", "Please fill in your name, your email and your message.", RED);
    } else if (topic === "") {
        showMessage("feedbackResult", "Please choose a topic so that the right person reads your message.", RED);
    } else {
        // + joins the pieces of text and the variables into one sentence
        showMessage("feedbackResult", "Thank you, " + fullName + "! We have received your message about " + topic +
            " and will reply to " + email + " within two working days.", GOLD);
    }

    return false;   // do not reload the page, so the message stays visible
}


/* ---------- 8. CONTACT FORM (contact.html) ---------- */

// The message goes to the team member in charge of the topic, as on our team page
function sendMessage() {
    const fullName = document.getElementById("ctName").value.trim();
    const email = document.getElementById("ctEmail").value.trim();
    const topic = document.getElementById("ctTopic").value;    // "certification", "fees", "website" or "other"
    const message = document.getElementById("ctMessage").value.trim();

    // || means "or": the visitor must fill in all three boxes
    if (fullName === "" || email === "" || message === "") {
        showMessage("contactResult", "Please fill in your name, your email and your message.", RED);
        return false;
    }
    // The drop-down list is still on its first option, which has an empty value
    if (topic === "") {
        showMessage("contactResult", "Please choose a topic so that the right person answers you.", RED);
        return false;
    }

    let teammate = "the whole team";   // used when the topic is "other"
    if (topic === "certification") {
        teammate = "Jules, who looks after our criteria and the audits";
    } else if (topic === "fees") {
        teammate = "Josh, who looks after fees, payments and partnerships";
    } else if (topic === "website") {
        teammate = "Joseph, who looks after the website, the directory and our stories";
    }
    showMessage("contactResult", "Thank you, " + fullName + "! Your message goes to " + teammate +
        ". We will reply to " + email + " within two working days.", GOLD);

    return false;   // do not reload the page
}


/* ---------- 9. REGISTRATION FORM (regpay.html) ---------- */

// On the Register & Pay page we declare variables with "var" (JS guide): each function below
// combines variables (var), comparison and arithmetic operators (===, !==, ||, *, -, +, %) and if statements.

// Checks the registration form, then gives the next step for each type of account.
function registerUser() {
    // Variables that store what the visitor typed
    var fullName = document.getElementById("regName").value.trim();
    var email = document.getElementById("regEmail").value.trim();
    var accountType = document.getElementById("regType").value;    // "customer", "creator" or "auditor"
    var password = document.getElementById("regPassword").value;
    var confirmation = document.getElementById("regConfirm").value;

    if (fullName === "" || email === "" || accountType === "" || password === "") {
        showMessage("registerResult", "Please fill in every field and choose an account type.", RED);
    } else if (password !== confirmation) {
        // !== means "not equal to": the two passwords are different
        showMessage("registerResult", "The two passwords are different. Please type them again.", RED);
    } else {
        // Everything is correct: choose the next step for each type of account
        var nextStep = "Use the code WELCOME10 for 10% off your first piece from a certified creator.";
        if (accountType === "creator") {
            nextStep = "Send us your file and Jules will plan your independent audit.";
        } else if (accountType === "auditor") {
            nextStep = "Josh will send you our auditor charter.";
        }
        showMessage("registerResult", "Thank you for registering, " + fullName + "! Your " + accountType +
            " account is ready. " + nextStep, GOLD);
    }

    return false;   // do not reload the page
}


/* ---------- 10. PAYMENT FORM (regpay.html) ---------- */

// getItemsTotal() calculates the price of the pieces (without delivery) and gives it back with return.
function getItemsTotal() {
    var piece = document.getElementById("payPiece").value;   // which piece was chosen
    var quantity = Number(document.getElementById("payQuantity").value);
    var code = document.getElementById("payCode").value.trim();

    var unitPrice = 110;   // price of one piece in euros (sweater), unless one of the tests below is true
    if (piece === "cuff") {
        unitPrice = 35;
    } else if (piece === "pouch") {
        unitPrice = 29;
    } else if (piece === "jacket") {
        unitPrice = 140;
    } else if (piece === "shirt") {
        unitPrice = 95;
    } else if (piece === "tshirt") {
        unitPrice = 38;
    }

    var itemsTotal = unitPrice * quantity;
    if (code === "WELCOME10") {
        itemsTotal = itemsTotal - itemsTotal * 0.1;   // 10% off for new customers
    }
    return itemsTotal;   // send the result back to the function that asked for it
}

// getOrderTotal() adds the delivery to the price of the pieces
function getOrderTotal() {
    var delivery = Number(document.getElementById("payDelivery").value);   // delivery cost in euros
    return getItemsTotal() + delivery;
}

// quantityIsWrong() gives back true when the quantity is not a whole number of at least 1.
// quantity % 1 is the remainder of a division by 1: it is 0 only for whole numbers.
function quantityIsWrong() {
    var quantity = Number(document.getElementById("payQuantity").value);
    return isNaN(quantity) || quantity < 1 || quantity % 1 !== 0;
}

// Button "Check my total" (onclick): shows the total without paying
function showTotal() {
    if (quantityIsWrong()) {
        showMessage("payResult", "Please choose a whole quantity of at least 1.", RED);
    } else {
        showMessage("payResult", "Your total is €" + getOrderTotal().toFixed(2) + ", delivery included.", GREY);
    }
}

// Button "Pay now" (onsubmit of the payment form)
function payNow() {
    var cardName = document.getElementById("cardName").value.trim();
    var cardNumber = document.getElementById("cardNumber").value.trim();

    if (quantityIsWrong()) {
        showMessage("payResult", "Please choose a whole quantity of at least 1.", RED);
    } else if (cardName === "" || cardNumber === "") {
        showMessage("payResult", "Please enter the name and the number on the card.", RED);
    } else {
        // Our 15% commission is taken on the price of the pieces, not on the delivery
        var commission = getItemsTotal() * 0.15;
        var creatorPart = getItemsTotal() - commission;

        // A delivery cost of 0 means the pick-up at our pop-up market
        var deliveryNote = "The creator ships your piece.";
        if (Number(document.getElementById("payDelivery").value) === 0) {
            deliveryNote = "Your piece waits for you at our Lyon pop-up market.";
        }

        showMessage("payResult", "Payment of €" + getOrderTotal().toFixed(2) + " confirmed. Thank you, " + cardName +
            "! " + deliveryNote + " €" + creatorPart.toFixed(2) + " goes to the creator and €" +
            commission.toFixed(2) + " to EcoWear, to run the label.", GOLD);
    }

    return false;   // do not reload the page
}


/* ---------- 11. AI LABEL SCANNER (scanner.html) ---------- */
// Session 8 practical: a machine learning model trained with Google Teachable Machine.
// After training, Teachable Machine gives a link with "Export Model" > "Upload (shareable link)".
// Paste that link between the quotes below, keeping the / at the end, for example:
// const MODEL_URL = "https://teachablemachine.withgoogle.com/models/AbCdEfGhI/";
const MODEL_URL = "https://teachablemachine.withgoogle.com/models/OK7F07TtQ/";

// The trained model is downloaded only once, the first time a visitor scans a photo
let scannerModel;

// Called when a photo is chosen: shows it on the page so that the model can look at it
function showPhoto() {
    const fileInput = document.getElementById("scanPhoto");
    if (fileInput.files.length === 0) {
        return;
    }

    // FileReader reads the photo on the visitor's device: nothing is sent to a server
    const reader = new FileReader();
    reader.onload = function () {
        const preview = document.getElementById("scanPreview");
        preview.src = reader.result;
        preview.classList.remove("hidden");
    };
    reader.readAsDataURL(fileInput.files[0]);

    showMessage("scanResult", "Photo ready. Click \"Scan my photo\".", GREY);
}

// Called by the "Scan my photo" button.
// "async" and "await" let the page wait for the model to download and to answer,
// as in the code that Teachable Machine gives with its export.
// Reference (external code): adapted from the JavaScript export code of Google Teachable Machine,
// https://teachablemachine.withgoogle.com/ - it uses the TensorFlow.js and @teachablemachine/image
// libraries (Apache 2.0 licence), loaded in scanner.html. tmImage.load() and model.predict() come from them.
async function scanLabel() {
    const preview = document.getElementById("scanPreview");

    if (MODEL_URL === "") {
        showMessage("scanResult", "The AI model is not connected yet: paste the Teachable Machine link in myscripts.js (MODEL_URL).", RED);
        return;
    }
    if (preview.classList.contains("hidden")) {
        showMessage("scanResult", "Please choose a photo of a label first.", RED);
        return;
    }
    showMessage("scanResult", "The AI is looking at your photo...", GREY);

    try {
        // Download the model and the names of its classes (once)
        if (scannerModel === undefined) {
            scannerModel = await tmImage.load(MODEL_URL + "model.json", MODEL_URL + "metadata.json");
        }

        // The model returns one probability (between 0 and 1) for each class, in the order of Teachable Machine:
        // class 1 = "EcoWear Label", class 2 = "No EcoWear Label". We turn them into whole percentages.
        const predictions = await scannerModel.predict(preview);
        const labelPercent = (predictions[0].probability * 100).toFixed(0);
        const otherPercent = (predictions[1].probability * 100).toFixed(0);

        // Show the names of the classes and draw the two bars
        document.getElementById("classNameA").innerHTML = predictions[0].className + ": " + labelPercent + "%";
        document.getElementById("classNameB").innerHTML = predictions[1].className + ": " + otherPercent + "%";
        document.getElementById("barA").style.width = labelPercent + "%";
        document.getElementById("barB").style.width = otherPercent + "%";

        // Turn the probability into a sentence
        if (labelPercent >= 80) {
            showMessage("scanResult", "The AI recognizes an EcoWear label (" + labelPercent +
                "% sure). To be certain, check the certificate number of the creator on our label page.", GOLD);
        } else if (labelPercent >= 50) {
            showMessage("scanResult", "The AI thinks it may be an EcoWear label, but it is not sure (" +
                labelPercent + "%). Try a sharper photo, closer to the label.", GREY);
        } else {
            showMessage("scanResult", "The AI does not see an EcoWear label (" + otherPercent +
                "% sure). If the seller says the piece is certified, ask for the certificate number.", RED);
        }
    } catch (error) {
        showMessage("scanResult", "The AI model could not be loaded. Check your internet connection and the link in MODEL_URL.", RED);
    }
}

// "Was the AI right?" form: reads the radio button that is checked
function rateScan() {
    if (document.getElementById("rateYes").checked) {
        showMessage("rateResult", "Thank you! Your answer confirms that the model works on photos like yours.", GOLD);
    } else if (document.getElementById("rateNo").checked) {
        showMessage("rateResult", "Thank you! Wrong answers show us which photos to add the next time we train the model.", GREY);
    } else {
        showMessage("rateResult", "Thank you! When in doubt, the certificate number on our label page always gives the right answer.", GREY);
    }

    return false;   // do not reload the page
}

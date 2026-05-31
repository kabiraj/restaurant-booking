
const RESTAURANTS = [
  {
    id: 1,
    name: "Ember & Oak",
    cuisine: "Modern Australian",
    dietary: ["None"],
    purpose: ["Business", "Date"],
    budget: "high",
    deposit: 30,
    priceRange: "$60-$90 pp",
    description: "Ember & Oak brings fire-kissed contemporary Australian cuisine to the heart of the city. Think dry-aged steaks, wood-roasted seasonal vegetables and a wine list that champions small Victorian producers. The intimate dining room—all dark timbers and candlelight—makes it ideal for a special occasion or an important business dinner.",
    dishes: [
      { name: "Dry-Aged Wagyu Sirloin", price: 82 },
      { name: "Wood-Roasted Rack of Lamb", price: 68 },
      { name: "Charred Cauliflower Steak (V)", price: 34 }
    ]
  },
  {
    id: 2,
    name: "Lotus Garden",
    cuisine: "Cantonese & Dim Sum",
    dietary: ["None", "Halal"],
    purpose: ["Family", "Date"],
    budget: "mid",
    deposit: 20,
    priceRange: "$30-$55 pp",
    description: "Lotus Garden is a beloved family-run Cantonese restaurant serving handcrafted dim sum by day and elegant banquet-style dinners by night. From delicate har gow to rich barbecue pork buns, every dish honours a century-old recipe passed down through generations. Halal-certified options available throughout the menu.",
    dishes: [
      { name: "Har Gow (4 pcs)", price: 9 },
      { name: "Peking Duck (half)", price: 48 },
      { name: "Silken Tofu with XO", price: 18 }
    ]
  },
  {
    id: 3,
    name: "Verde Cucina",
    cuisine: "Plant-Based Italian",
    dietary: ["Vegan"],
    purpose: ["Date", "Family"],
    budget: "mid",
    deposit: 15,
    priceRange: "$35-$55 pp",
    description: "Verde Cucina proves that vegan food can be every bit as indulgent as its traditional counterpart. The kitchen produces pillowy house-made pasta, wood-fired Neapolitan pizzas with cashew mozzarella and richly layered tiramisu made without a single animal product. A relaxed, sun-drenched space perfect for leisurely lunches or romantic dinners.",
    dishes: [
      { name: "Truffle Porcini Tagliatelle", price: 29 },
      { name: "Napoli Margherita (vegan)", price: 24 },
      { name: "Cashew Tiramisu", price: 14 }
    ]
  },
  {
    id: 4,
    name: "Saffron & Spice",
    cuisine: "Contemporary Indian",
    dietary: ["Halal", "Vegan"],
    purpose: ["Family", "Business"],
    budget: "mid",
    deposit: 20,
    priceRange: "$35-$60 pp",
    description: "Saffron & Spice elevates the Indian dining experience with modern plating and bold, aromatic flavours. Drawing on culinary traditions from across the subcontinent, the menu offers everything from fragrant lamb biryanis to richly spiced vegan dals. Fully Halal-certified and highly accommodating of dietary needs.",
    dishes: [
      { name: "Lamb Rogan Josh", price: 34 },
      { name: "Paneer Tikka Masala", price: 28 },
      { name: "Chana Saag Dal (V, Halal)", price: 22 }
    ]
  },
  {
    id: 5,
    name: "The Bao House",
    cuisine: "Taiwanese Street Food",
    dietary: ["None", "Vegan"],
    purpose: ["Family", "Date"],
    budget: "low",
    deposit: 10,
    priceRange: "$20-$35 pp",
    description: "Inspired by Taipei's legendary night markets, The Bao House serves fluffy steamed bao, crispy scallion pancakes and bubble tea in a lively, neon-lit space. The casual, sharing-plates format makes it a favourite for groups and families. Excellent vegan options available alongside the classic pork belly bao.",
    dishes: [
      { name: "Pork Belly Bao (2 pcs)", price: 16 },
      { name: "Mushroom & Tofu Bao (V)", price: 14 },
      { name: "Taiwanese Fried Chicken", price: 19 }
    ]
  },
  {
    id: 6,
    name: "Coastline",
    cuisine: "Modern Seafood",
    dietary: ["None", "Halal"],
    purpose: ["Business", "Date", "Family"],
    budget: "high",
    deposit: 35,
    priceRange: "$65-$110 pp",
    description: "Coastline's rotating menu follows the daily catch from Victorian and Tasmanian waters, prepared with minimal fuss to let the freshness shine. Whether it's a whole grilled snapper, a chilled seafood tower or a sublime lobster bisque, every dish feels like a celebration of the ocean. The panoramic harbour-view terrace is spectacular at sunset.",
    dishes: [
      { name: "Grilled Whole Snapper", price: 58 },
      { name: "Seafood Tower (for 2)", price: 120 },
      { name: "Lobster Bisque", price: 22 }
    ]
  }
];

//reservation form validation, deposit and payment
function initReservationForm() {
  const form = document.getElementById("reservation-form");
  if (!form) return;

  const restaurantSelect = document.getElementById("res-restaurant");
  const depositDisplay = document.getElementById("deposit-display");
  const depositHidden = document.getElementById("deposit-hidden");
  const voucherSection = document.getElementById("voucher-section");
  const cardSection = document.getElementById("card-section");
  const cardNumberSection = document.getElementById("card-number-section");
  const cardType = document.getElementById("card-type");
  const cardNumber = document.getElementById("card-number");
  const paymentRadios = form.querySelectorAll('input[name="payment-method"]');
  const nameInput = document.getElementById("res-name");
  const phoneInput = document.getElementById("res-phone");
  const dateInput = document.getElementById("res-datetime");
  const peopleInput = document.getElementById("res-people");
  const paymentError = document.getElementById("payment-error");
  const userEmail = document.getElementById("res-email");
  const billingEmail = document.getElementById("billing-email");
  const sameEmail = document.getElementById("same-email");

  function showFieldError(field, message) {
    //Find the form-group class name and find error-msg span 
    const group = field.closest(".form-group");
    const errorEl = group ? group.querySelector(".error-msg") : null;
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.add("visible");
    }
    //red border when there is error
    field.classList.add("error");
  }

  //clear error message
  function clearFieldError(field) {
    const group = field.closest(".form-group");
    const errorEl = group ? group.querySelector(".error-msg") : null;
    if (errorEl) {
      errorEl.textContent = "";
      errorEl.classList.remove("visible");
    }
    field.classList.remove("error");
  }

  function clearAllErrors() {
    form.querySelectorAll(".error-msg").forEach((el) => {
      el.textContent = "";
      el.classList.remove("visible");
    });
    form.querySelectorAll(".error").forEach((el) => el.classList.remove("error"));
  }

  //populate all the restaurant from the array
  restaurantSelect.innerHTML =
    '<option value="">Select a restaurant</option>' +
    RESTAURANTS.map((r) => `<option value="${r.id}">${r.name}</option>`).join("");


  function emailChecker() {
    //set the user email when checked
    if (sameEmail.checked) {
      billingEmail.value = userEmail.value;
      billingEmail.readOnly = true;
    } else {
      billingEmail.readOnly = false;
    }
  }

  function updateDeposit() {
    //Find the restaurant from the array of RESTAURANTS
    const selectedRestaurant = RESTAURANTS.find(
      (r) => r.id === Number(restaurantSelect.value)
    );
    //if no restaurant is selected hide the deposit content
    if (!selectedRestaurant) {
      depositDisplay.textContent = "—";
      depositHidden.value = "";
      return;
    }
    //if restaurant is selected, we display the deposit corresponding to that restaurant
    depositDisplay.textContent = `$${selectedRestaurant.deposit}`;
    depositHidden.value = selectedRestaurant.deposit;
  }

  //Get the restaurant id from Url and set the restaurant id
  const idFromUrl = new URLSearchParams(window.location.search).get("restaurant");
  if (idFromUrl) {
    restaurantSelect.value = idFromUrl;
  }

  updateDeposit();
  restaurantSelect.addEventListener("change", updateDeposit);

  function updatePaymentUI() {
    //Get checked radio button
    const selectedRadio = form.querySelector('input[name="payment-method"]:checked');
    const method = selectedRadio ? selectedRadio.value : "";

    voucherSection.classList.add("hidden");
    cardSection.classList.add("hidden");
    cardNumberSection.classList.add("hidden");

    if (method === "voucher") {
      voucherSection.classList.remove("hidden");
    } else if (method === "online") {
      cardSection.classList.remove("hidden");
      cardNumberSection.classList.remove("hidden");
    }
  }

  function updateCardMaxLength() {
    const isAmex = cardType.value === "amex";
    cardNumber.maxLength = isAmex ? 15 : 16;
    cardNumber.placeholder = isAmex
      ? "e.g. 378282246310005"
      : "e.g. 4111111111111111";
  }

//for every radio button it listens for a radio button switch and calls the update
//payment method
  paymentRadios.forEach((radio) => {
    radio.addEventListener("change", () => {
      paymentError.textContent = "";
      paymentError.classList.remove("visible");
      updatePaymentUI();
    });
  });

  cardType.addEventListener("change", updateCardMaxLength);

  sameEmail.addEventListener("change", emailChecker);

  userEmail.addEventListener("input", () => {
    if (sameEmail.checked) {
      billingEmail.value = userEmail.value;
    }
    clearFieldError(userEmail);
  });

  function validateReservationForm() {
    clearAllErrors();
    //track the form correctness
    let isValid = true;

    if (!nameInput.value.trim()) {
      showFieldError(nameInput, "Full name is required.");
      isValid = false;
    } else if (nameInput.value.trim().length< 3) {
      showFieldError(nameInput, "Name must me at least 3 characters");
      isValid = false;
    }

    if (!userEmail.value.trim()) {
      showFieldError(userEmail, "Email is required.");
      isValid = false;
    } else if (!userEmail.checkValidity()) {
      showFieldError(userEmail, "Please enter a valid email address.");
      isValid = false;
    }

    const phoneDigits = phoneInput.value.replace(/\D/g, "");
    if (!phoneInput.value.trim()) {
      showFieldError(phoneInput, "Phone number is required.");
      isValid = false;
    } else if (phoneDigits.length < 10) {
      showFieldError(phoneInput, "Phone number must contain at least 10 digits.");
      isValid = false;
    }

    if (!restaurantSelect.value) {
      showFieldError(restaurantSelect, "Please select a restaurant.");
      isValid = false;
    }

    if (!dateInput.value) {
      showFieldError(dateInput, "Date and time are required.");
      isValid = false;
    } else if (new Date(dateInput.value) < new Date()) {
      showFieldError(dateInput, "Reservation date cannot be in the past.");
      isValid = false;
    }

    const people = Number(peopleInput.value);
    if (!peopleInput.value.trim() || Number.isNaN(people) || people < 1) {
      showFieldError(peopleInput, "Number of people must be greater than 0.");
      isValid = false;
    }

    const paymentMethod = form.querySelector('input[name="payment-method"]:checked');
    if (!paymentMethod) {
      paymentError.textContent = "Please select a payment method.";
      paymentError.classList.add("visible");
      isValid = false;
    } else if (paymentMethod.value === "online") {
      const cardDigits = cardNumber.value.replace(/\D/g, "");
      if (!cardDigits) {
        showFieldError(cardNumber, "Card number is required.");
        isValid = false;
      } else if (!/^\d+$/.test(cardNumber.value.trim())) {
        showFieldError(cardNumber, "Card number must contain digits only.");
        isValid = false;
      } else {
        const requiredLength = cardType.value === "amex" ? 15 : 16;
        if (cardDigits.length !== requiredLength) {
          showFieldError(
            cardNumber,
            `Card number must be exactly ${requiredLength} digits for the selected card type.`
          );
          isValid = false;
        }
      }
    }

    if (!billingEmail.value.trim()) {
      showFieldError(billingEmail, "Billing email is required.");
      isValid = false;
    } else if (!billingEmail.checkValidity()) {
      showFieldError(billingEmail, "Please enter a valid billing email address.");
      isValid = false;
    }

    return isValid;
  }
  form.addEventListener("submit", (e) => {
    if (sameEmail.checked) {
      billingEmail.value = userEmail.value;
    }
    if (!validateReservationForm()) {
      e.preventDefault();
    }
  });

  //Clear error once user starts typing or selecting.
  form.querySelectorAll("input, select, textarea").forEach((field) => {
    const clearHandler = () => {
      clearFieldError(field);
      if (field === userEmail && sameEmail.checked) {
        billingEmail.value = userEmail.value;
      }
    };
    field.addEventListener("input", clearHandler);
    field.addEventListener("change", clearHandler);
  });

  updatePaymentUI();
  updateCardMaxLength();
  emailChecker();
}

//validation for registration form
function initRegisterForm() {
  const form = document.getElementById("register-form");
  if (!form) return;

//get all the field as a variable
  const usernameInput = document.getElementById("reg-username");
  const emailInput = document.getElementById("reg-email");
  const phoneInput = document.getElementById("reg-phone");
  const passwordInput = document.getElementById("reg-password");
  const confirmInput = document.getElementById("reg-confirm");
  const countrySelect = document.getElementById("reg-country");
  const genderError = document.getElementById("gender-error");
  const dietaryError = document.getElementById("dietary-error");
  const successBanner = document.getElementById("register-success");

  //accept field and message to put visible class on span and error class on field
  function showFieldError(field, message) {
    const group = field.closest(".form-group");
    const errorEl = group ? group.querySelector(".error-msg") : null;
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.add("visible");
    }
    field.classList.add("error");
  }

  //clear error per field
  function clearFieldError(field) {
    const group = field.closest(".form-group");
    const errorEl = group ? group.querySelector(".error-msg") : null;
    if (errorEl) {
      errorEl.textContent = "";
      errorEl.classList.remove("visible");
    }
    field.classList.remove("error");
  }

  //clear all errors on the field
  function clearAllErrors() {
    form.querySelectorAll(".error-msg").forEach((el) => {
      el.textContent = "";
      el.classList.remove("visible");
    });
    form.querySelectorAll(".error").forEach((el) => el.classList.remove("error"));
  }


  function validateRegisterForm() {
    clearAllErrors();
    let isValid = true;

    const username = usernameInput.value.trim();
    if (!username) {
      showFieldError(usernameInput, "Username is required.");
      isValid = false;
    } else if (username.length < 5) {
      showFieldError(usernameInput, "Username must be at least 5 characters.");
      isValid = false;
    } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      showFieldError(
        usernameInput,
        "Username may only contain letters, numbers, and underscores."
      );
      isValid = false;
    }

    const email = emailInput.value.trim();
    if (!email) {
      showFieldError(emailInput, "Email is required.");
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showFieldError(
        emailInput, 
        "Please enter a valid email address.");
      isValid = false;
    }

    const phone = phoneInput.value.trim();
    const phoneDigits = phone.replace(/\D/g, "");
    if (!phone) {
      showFieldError(
        phoneInput,
        "Phone number is required.");
      isValid = false;
    } else if (!/^\d+$/.test(phone)) {
      showFieldError(
        phoneInput, 
        "Phone number must contain digits only.");
      isValid = false;
    } else if (phoneDigits.length < 8 || phoneDigits.length > 15) {
      showFieldError(
        phoneInput, 
        "Phone number must be between 8 and 15 digits.");
      isValid = false;
    }

    const password = passwordInput.value;
    if (!password) {
      showFieldError(
        passwordInput, 
        "Password is required.");
      isValid = false;
    } else if (password.length < 10) {
      showFieldError(
        passwordInput, 
        "Password must be at least 10 characters.");
      isValid = false;
    } else if (!/[A-Z]/.test(password)) {
      showFieldError(
        passwordInput, 
        "Password must include at least one uppercase letter.");
      isValid = false;
    } else if (!/[a-z]/.test(password)) {
      showFieldError(
        passwordInput, 
        "Password must include at least one lowercase letter.");
      isValid = false;
    } else if (!/[0-9]/.test(password)) {
      showFieldError(
        passwordInput, 
        "Password must include at least one number.");
      isValid = false;
    } else if (!/[^a-zA-Z0-9]/.test(password)) {
      showFieldError(
        passwordInput,
        "Password must include at least one special character."
      );
      isValid = false;
    }

    const confirm = confirmInput.value;
    if (!confirm) {
      showFieldError(
        confirmInput, 
        "Please confirm your password.");
      isValid = false;
    } else if (confirm !== password) {
      showFieldError(
        confirmInput, 
        "Passwords do not match.");
      isValid = false;
    }

    const genderSelected = form.querySelector('input[name="gender"]:checked');
    if (!genderSelected) {
      showFieldError(
        genderError, 
        "Please select a gender.");
      isValid = false;
    }

    const dietaryChecked = form.querySelectorAll('input[name="dietary"]:checked');
    if (dietaryChecked.length === 0) {
      showFieldError(
        dietaryError, 
        "Please select at least one dietary preference.");
      isValid = false;
    }

    if (!countrySelect.value) {
      showFieldError(
        countrySelect, 
        "Please select your country / region.");
      isValid = false;
    }

    return isValid;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    successBanner.classList.remove("visible");

    if (validateRegisterForm()) {
      successBanner.classList.add("visible");
      form.reset();
      clearAllErrors();
    }
  });

  //listen for user even on the form and clear the error border and text
  form.querySelectorAll("input, select, textarea").forEach((field) => {
    const clearHandler = () => {
      clearFieldError(field);
    };
    field.addEventListener("input", clearHandler);
    field.addEventListener("change", clearHandler);
  });
}

//Restaurant recommendation script
function renderRecommended(candidate){
  const container = document.getElementById("recommendation-results");
  if(!container) return;

  if (!candidate) {
    container.innerHTML = `
    <article class="restaurant-card">
      <div class="card-body">
        <p class="card-cuisine">No match found</p>
      </div>
    </article>
    `
    return;
  }
  container.innerHTML = `
    <article class="restaurant-card">
      <div class="card-body">
        <h2>${candidate.name}</h2>
        <p class="card-cuisine">${candidate.cuisine}</p>
        <p class="card-desc">${candidate.description}</p>
        <div class="card-dishes">
        <ul>
        ${candidate.dishes
          .map((dish) => (`<li>${dish.name}<span>$${dish.price}</span></li>`))
          .join("")}
        </ul>
        </div>
        <div class="card-meta">
          <span class="card-price">${candidate.priceRange}</span>
        </div>
        <a href="reservation.html?restaurant=${candidate.id}" class="btn btn-primary reserve-btn">
          Reserve This Restaurant
        </a>
      </div>
    </article>
  `
}


function getrecommendedRestaurant(preferences) {
  const {dietary, budget, purpose} = preferences;

  const candidates = RESTAURANTS.filter((restaurant) => {
    return  restaurant.dietary.includes(dietary) &&
            restaurant.budget === budget &&
            restaurant.purpose.includes(purpose)
  });
  renderRecommended(candidates[0]);
}

//recommend form submit handler
function initRecommendForm() {
  const form = document.getElementById("recommend-form")
  if(!form) return;
//after form submit, block default behaviour of the browser and call getrecommendedrestaurant
//with preferences object
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const preferences = {
      dietary: document.getElementById("pref-dietary").value,
      budget: document.getElementById("pref-budget").value,
      purpose: document.getElementById("pref-purpose").value
    };

    const result = getrecommendedRestaurant(preferences)
  })
}

function formatMoney(amount) {
  return `$${amount.toFixed(2)}`;
}

//bill estimate calculator
function initBillCalculator() {
  //declared varable which needed changing
  const restaurantSelect = document.getElementById("bill-restaurant");
  const dishesList = document.getElementById("bill-dishes-list");
  const receipt = document.getElementById("bill-receipt-content");
  if (!restaurantSelect || !dishesList || !receipt) return;

  //list all the restaurant
  restaurantSelect.innerHTML =
    '<option value="">Select a restaurant</option>' +
    RESTAURANTS.map((r) => `<option value="${r.id}">${r.name}</option>`).join("");

  function renderEmptyReceipt(message) {
    receipt.innerHTML = `
      <div class="bill-paper-header">
        <p class="bill-brand">FINDDINE</p>
        <p class="bill-title">ESTIMATED RECEIPT</p>
        <p class="bill-meta">${new Date().toLocaleDateString("en-AU")}</p>
      </div>
      <div class="bill-divider"></div>
      <p class="bill-empty">${message}</p>
      <div class="bill-divider"></div>
      <p class="bill-footer-note">Thankyou for Dining with us</p>
    `;
  }

  function updateReceipt() {
    //Get the selected restaurant from array
    const restaurant = RESTAURANTS.find(
      (r) => r.id === Number(restaurantSelect.value)
    );

    if (!restaurant) {
      renderEmptyReceipt("Select a restaurant and menu items.");
      return;
    }


    const checked = dishesList.querySelectorAll('input[name="bill-dish"]:checked');
    if (checked.length === 0) {
      renderEmptyReceipt("Tick one or more dishes to calculate your estimate.");
      return;
    }

    let subtotal = 0;
    const lines = [];

    //Get price, name of the selected dish and push it to lines array
    checked.forEach((input) => {
      const price = Number(input.dataset.price);
      const name = input.dataset.name;
      subtotal += price;
      lines.push({ name, price });
    });


    const deposit = restaurant.deposit;
    //Render each item from lines array. .join("") joins the div. 
    const linesHtml = lines
      .map(
        (line) => `
        <div class="bill-line">
          <span class="bill-item-name">${line.name}</span>
          <span class="bill-item-price">${formatMoney(line.price)}</span>
        </div>
      `
      )
      .join("");

    receipt.innerHTML = `
      <div class="bill-paper-header">
        <p class="bill-brand">FINDDINE</p>
        <p class="bill-title">ESTIMATED RECEIPT</p>
        <p class="bill-meta">${restaurant.name}</p>
        <p class="bill-meta">${new Date().toLocaleDateString("en-AU")}</p>
      </div>
      <div class="bill-divider"></div>
      ${linesHtml}
      <div class="bill-divider"></div>
      <div class="bill-line">
        <span>Subtotal</span>
        <span>${formatMoney(subtotal)}</span>
      </div>
      <div class="bill-line bill-line-muted">
        <span>Reservation deposit</span>
        <span>${formatMoney(deposit)}</span>
      </div>
    `;
  }

  function renderDishes() {
    //Get the restaurant selected by user
    const restaurant = RESTAURANTS.find(
      (r) => r.id === Number(restaurantSelect.value)
    );

    if (!restaurant) {
      dishesList.innerHTML =
        '<p class="bill-hint">Select a restaurant to view dishes.</p>';
      updateReceipt();
      return;
    }

    //List all the dishs from the array
    dishesList.innerHTML = `
      <div class="bill-dish-options">
        ${restaurant.dishes
          .map(
            (dish, index) => `
          <label class="checkbox-option bill-dish-option">
            <input
              type="checkbox"
              name="bill-dish"
              data-name="${dish.name}"
              data-price="${dish.price}"
            />
            <span class="bill-dish-name">${dish.name}</span>
            <span class="bill-dish-price">$${dish.price}</span>
          </label>
        `
          )
          .join("")}
      </div>
    `;

    //Run updateRecipt function when every time user checks or unchecks the checkbox.
    dishesList.querySelectorAll('input[name="bill-dish"]').forEach((input) => {
      input.addEventListener("change", updateReceipt);
    });

    updateReceipt();
  }
//Listen for restaurant change to call renderDishes funciton
  restaurantSelect.addEventListener("change", renderDishes);
  renderEmptyReceipt("Select a restaurant and menu items.");
}


//recommend page which filter restaurants by user preferences
initRecommendForm();
//reservation page which validate booking form and handle payment
initReservationForm();
//register page which validate sign up form
initRegisterForm();
//bill page which build dish list and update receipt
initBillCalculator();
COS10005 Web Development – Assignment 2, Semester 1 2026

Student ID: 105263125
GitHub: https://github.com/kabiraj/restaurant-booking



1. WEBSITE STRUCTURE
assignment2/
├── index.html          Home – platform intro, features, target users
├── restaurants.html    Six restaurants with menus, prices, deposits
├── recommend.html      Preference form and recommended restaurant
├── register.html       Account registration (front-end only)
├── reservation.html    Booking form – posts to Mercury server
├── bill.html           Estimated bill calculator (bonus)
├── css/style.css       All styling (responsive layout)
├── js/script.js        Validation and page behaviour
├── images/             Photos and graphics for the site
└── Readme.txt          current file


2. JAVASCRIPT LOGIC (PLAIN ENGLISH)

All JavaScript is in js/script.js. Each page only runs its own setup if the
relevant form or element exists on that page.

Registration (register.html)
When the user clicks Create Account, the form does not submit until every rule
passes. Username must be at least 5 characters and letters, numbers, or
underscores only. Email must look like a valid address. Phone must be digits
only, between 8 and 15 digits. Password must be at least 10 characters with
uppercase, lowercase, a number, and a special character. Confirm password must
match. Gender, at least one dietary checkbox, and a country must be selected.
If something fails, a red message appears under the field and the input gets a
red border. Errors clear when the user edits that field. If everything is
valid, a success message shows and the form resets.

Reservation (reservation.html)
When the user clicks Confirm Reservation, invalid data blocks submit. Required
fields are checked: name, email, phone (at least 10 digits), restaurant, date
and time (not in the past), number of people (at least 1), and payment method.
If Online Payment is chosen, the card number must be digits only – 16 for
Visa/Mastercard, 15 for Amex. Billing email is required. If Same as email is
checked, billing email copies from the main email and becomes read-only.
Choosing Voucher shows a 12-digit code box and hides card fields (code is not
validated). The deposit amount updates when a restaurant is picked, using
values in the RESTAURANTS array. The restaurant dropdown can be pre-filled from
the URL (e.g. reservation.html?restaurant=2).

Recommendation (recommend.html)
The user picks dietary preference, budget, and occasion. The script finds
restaurants in RESTAURANTS that match all three choices. The first match is
shown with a Reserve link that opens the reservation page with that restaurant
selected. If nothing matches, a no match message is shown.

Bill estimate (bill.html)
The user selects a restaurant. Signature dishes appear as checkboxes from the
RESTAURANTS array. When items are ticked, the receipt updates automatically with
each dish as a line item, a subtotal, and the restaurant deposit shown separately.
No form submit is used for the calculation.


3. KNOWN ISSUES AND LIMITATIONS
- Restaurant list is hard coded into js file as an array.
- No database is connected to this project.
- Recommendation only shows a result when all three preferences match exactly;
  some combinations return no match.


4. REFERENCES

Fonts
- Playfair Display and Lato from Google Fonts (https://fonts.google.com)

Images
- Feature icons and restaurant images in images are from free source Upsplach.
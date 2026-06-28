# Vivah - Wedding Planning Portal

Vivah is a responsive static wedding-planning website built with HTML, CSS, and JavaScript. It presents a polished landing page for wedding services, vendors, guest management, planning checklists, budget tracking, gallery inspiration, and simple login/signup preview pages.

## Features

- Responsive landing page with hero section, navigation, and mobile menu
- Wedding countdown timer for the event date
- Animated statistics and scroll reveal effects
- Searchable and filterable services section
- Interactive wedding checklist with progress tracking
- Budget tracker with custom item entry
- Vendor cards with category filters and booking status
- Inspiration gallery with image lightbox
- Guest management table with add, delete, search, filter, and sort controls
- Login and signup pages with client-side form feedback

## Project Structure

```text
Project/
├── README.md
└── Wedding/
    ├── Vivah.html
    ├── login.html
    ├── signup.html
    ├── stylee.css
    ├── Script.js
    └── images/
        ├── Candle_light.png
        ├── Garden.png
        ├── Grand_wed.png
        ├── Minimilist.png
        ├── Royal_Floral.png
        └── toon_couple.png
```

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- Google Fonts

## How to Run

No installation is required because this is a static frontend project.

1. Open the project folder.
2. Go to the `Wedding` folder.
3. Open `Vivah.html` in a web browser.

You can also use a local server, for example with VS Code Live Server, and open:

```text
Wedding/Vivah.html
```

## Pages

- `Vivah.html` - Main wedding portal page
- `login.html` - Login preview page
- `signup.html` - Signup preview page

## Notes

- The project currently stores data in JavaScript arrays and page state only. Guest additions, checklist changes, and budget entries reset when the page reloads.
- For deployment on case-sensitive hosting, make sure the JavaScript filename matches the script reference in `Vivah.html`.
- The login and signup forms are frontend previews and do not connect to a backend.

## Author

Created by Kartik.

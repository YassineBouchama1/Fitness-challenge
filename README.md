# Click Fit - Sport and Fitness Website

Thank you for applying to the Full Stack Developer position at On Wave Group. As part of the technical test, the task is to build a one-page sport website called "Click Fit" that includes the following features and functionalities.

## Project Overview

**Click Fit** is a sport and fitness website designed to showcase technical skills. The main features of the website are:

- **UI Design:** Responsive UI using HTML, CSS, Bootstrap, JavaScript, and jQuery.
- **Animations:** Smooth and appealing animations that enhance the user experience.
- **AJAX Call:** On page load, an AJAX call fetches data from the Numbers API to display information dynamically.
- **Drag and Drop Image Upload:** Users can either click to select images or drag and drop to upload images to the server.
- **Backend:** Node.js server handles the image upload functionality, saving images to an `upload_images` folder.
- **Database Task:** Includes creating a MySQL table for users and a stored procedure to add new users.

---

## Features

1. **Responsive UI:**
   - The website’s layout adjusts smoothly for mobile, tablet, and desktop views.
   - Uses Bootstrap and custom CSS for styling.

2. **AJAX Integration:**
   - An AJAX call to `http://numbersapi.com/1/30/date?json` is made on page load, retrieving random facts that are displayed on the page.

3. **Image Upload:**
   - A drag-and-drop image upload feature allows users to upload images to the server.
   - Images are saved in the `upload_images` folder at the root of the project using Node.js as the backend.

4. **Backend (Node.js):**
   - The server handles the image upload functionality and saves images in the project folder without relying on cloud storage.

5. **MySQL Database:**
   - A MySQL script creates a `users` table with columns: `ID`, `email`, `password`, `type`, and `active`.
   - A stored procedure `addUser` is created to insert new users into the `users` table.

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/YassineBouchama1/Fitness-challenge.git```

2. Navigate to the project folder::

   ```bash
   cd Fitness-challenge```

3. Install dependencies::
   ```bash
  npm install```

4. Copy the .env.example file to .env and fill in the necessary environment variables:::
   ``` cp .env.example .env```

5. Install dependencies::
   ``` node index.js```
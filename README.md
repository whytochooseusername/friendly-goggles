# Personal Portfolio Website

This is a simple, modern, and animated personal portfolio website template. It's built with HTML, Tailwind CSS, and vanilla JavaScript.

## Features

- **Single-page layout:** All sections are on a single page for easy navigation.
- **Responsive design:** The layout adapts to different screen sizes, from mobile to desktop.
- **Interactive animations:**
  - Floating, blurred, colored balls in the "About" section that react to mouse movement.
  - 3D tilt effect on the portfolio cards.
- **Easy to customize:** The content is in a single `index.html` file, and the styles and scripts are separated into `assets/css/style.css` and `assets/js/main.js` respectively.

## Sections

- **Header:** With navigation links to different sections.
- **Hero/Intro:** A section to introduce yourself with a profile picture.
- **About:** A section to write a short bio about yourself.
- **Portfolio:** A section to showcase your projects.
- **Contact:** A contact form for visitors to get in touch.
- **Footer:** With social media links.

## Technologies Used

- **HTML5**
- **Tailwind CSS:** For styling. The project uses the Tailwind CSS CDN, so there is no need to install anything.
- **Vanilla JavaScript:** For the interactive animations.
- **Google Fonts:** For the "Inter" font.

## How to Customize

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    ```
2.  **Open `index.html` in your favorite code editor.**
3.  **Customize the content:**
    - **Title:** Change the `<title>` in the `<head>` section.
    - **Header:** Change "Your Name" and the navigation links.
    - **Hero section:**
      - Replace `photo.jpg` with your own profile picture.
      - Change "Your Name" and the introductory text.
    - **About section:** Update the text with your personal information.
    - **Portfolio section:**
      - Replace the placeholder images (`https://placehold.co/...`) with your own project images.
      - Update the project titles, descriptions, and links.
    - **Contact section:** The contact form is a dummy form. To make it functional, you can use a service like [Formspree](https://formspree.io/) or [Netlify Forms](https://www.netlify.com/products/forms/).
    - **Footer:** Update the copyright year and your social media links.
4.  **Customize the styles (optional):**
    - The main styles are in `assets/css/style.css`. You can change the colors, fonts, etc. there.
    - The website uses Tailwind CSS classes directly in the HTML. You can learn more about Tailwind CSS at [tailwindcss.com](https://tailwindcss.com/).
5.  **Customize the animations (optional):**
    - The JavaScript code for the animations is in `assets/js/main.js`. You can tweak the animation parameters, such as the number of balls, colors, speed, etc.

## License

This project is open-source and available under the [MIT License](LICENSE).

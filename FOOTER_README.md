# Footer System Documentation

## Overview
The footer has been separated into a dedicated file (`footer.html`) that can be included on all pages of the Fulrani website.

## Files
- `footer.html` - Contains the footer HTML code
- `script.js` - Contains JavaScript to load the footer dynamically
- All HTML pages now include a footer placeholder

## How It Works

### 1. Footer Content (`footer.html`)
The footer contains:
- Quick Links section
- Our Offerings section
- Contact Us section (with "Hire a Planner" button)
- Follow Us section
- Copyright and Terms

### 2. JavaScript Loading (`script.js`)
The footer is loaded dynamically using JavaScript:
```javascript
function loadFooter() {
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        })
        .catch(error => {
            console.error('Error loading footer:', error);
        });
}
```

### 3. Page Integration
Each page includes:
```html
<!-- Footer -->
<div id="footer-placeholder"></div>

<script src="script.js"></script>
```

## Benefits
- **Consistency**: Same footer across all pages
- **Maintenance**: Update footer in one place
- **Scalability**: Easy to add new pages
- **Performance**: Footer loads after page content

## Adding to New Pages
To add the footer to a new page:
1. Add the footer placeholder: `<div id="footer-placeholder"></div>`
2. Include the script: `<script src="script.js"></script>`
3. The footer will automatically load

## Customization
To modify the footer:
1. Edit `footer.html`
2. Changes will appear on all pages automatically
3. No need to update individual pages

## Notes
- The "Hire a Planner" button has been moved to the Contact Us section in the footer
- The button links to the contact form on the contact page
- All styling is handled by the existing CSS

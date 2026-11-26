# Ecowear

Final project of the course *Introduction to Information Systems and Web* (4S1ISW), emlyon business school, based on the EcoBrand case.

Ecowear is an independent certification body and platform. Brands apply and pay for an audit of their materials, wages and carbon footprint; brands that pass are listed in our directory and sell their garments through Ecowear; customers can check any certificate number, or scan a label with our live camera check, before they buy.

## How to open the site

Open `index.html` in a web browser. No installation is needed.
The Live Check page needs an internet connection (it downloads the trained model and TensorFlow.js) and permission to use the camera.

## Team

| Member | Contributions |
|---|---|
| Joseph [Surname] | Site structure, the 12 pages, design, video and live camera check |
| Jules Taton-Chapuis | Review against the brief: products and supply chain profiles, sourced calculator metrics, registration and payment, certificate check, FAQ |
| Josh [Surname] | [to complete] |

## Pages

`index.html` (story, mission, platform, contact) · `products.html` (certified garments, supply chain profiles, certification services, carbon calculator) · `principles.html` · `founders.html` · `material-verification.html` · `fair-wage-audit.html` · `carbon-report.html` · `live-check.html` · `brands-directory.html` (certificate check) · `regpay.html` · `faq.html` (10 questions and a feedback form) · `contact.html`

One stylesheet (`style.css`) and one JavaScript file (`myscripts.js`) are shared by every page. Photos are in `images/`, the video in `media/`.

## References

- Live Check: adapted from the Google Teachable Machine export code (https://teachablemachine.withgoogle.com/), with TensorFlow.js 1.3.1 and @teachablemachine/image 0.8.5 (Apache 2.0 licence).
- Calculator metrics: ADEME, quoted by L'info durable, and the ADEME Base Carbone truck factor, quoted by Banque de France. The links are on the Products page and in `myscripts.js`.
- Brands, products, prices, founders and contact details are invented for the project.

# EcoWear

**The label for independent eco-creators.**
Final project of the course *Introduction to Information Systems and Web* (4S1ISW), emlyon business school, based on the EcoBrand case.

EcoWear certifies the environmental approach of small independent fashion creators against six public criteria, checked by an independent auditor and renewed every year. The website is also a platform: certified creators are listed in a directory, sell in a shop and appear in our stories, and customers can check any certificate number.

## Team and contributions

| Member | Role | Main contributions |
|---|---|---|
| Jules Taton-Chapuis | Head of Certification | The six criteria and audit process, the Our Label and Get Certified pages, the AI Label Scanner (Teachable Machine model and scanner page) |
| Josh [Surname] | Head of Business | Business model and fees, the Register & Pay page (registration and payment forms and their JavaScript) |
| Joseph [Surname] | Head of Product | Site structure, navigation and design (style.css), the Creators, Products and Stories pages, the carbon footprint calculator |

## How to open the site

No installation is needed: download or clone the folder and open `index.html` in a web browser.
The AI scanner needs an internet connection, because it downloads the trained model and the TensorFlow.js library.

## Files

| File | Content |
|---|---|
| `index.html` | Home: who we are, our mission, how it works, contact details |
| `label.html` | Our Label: the six criteria and a certificate checker |
| `scanner.html` | AI Scanner: a machine learning model that recognizes our label on a photo |
| `creators.html` | Directory of certified creators, with a search by kind of piece |
| `products.html` | Products with their eco facts, three supply chain profiles and a carbon footprint calculator |
| `certification.html` | Get Certified: the audit steps and a self-assessment for creators |
| `stories.html` | Stories of our creators |
| `team.html` | The team |
| `faq.html` | 10 questions and a feedback form |
| `contact.html` | Contact form and map |
| `regpay.html` | Register & Pay: registration and payment forms (demo, no real payment) |
| `style.css` | The one stylesheet shared by every page |
| `myscripts.js` | The one JavaScript file shared by every page |
| `images/` | Photos and the logo |

Every file is commented in English.

## Artificial intelligence

The AI Scanner uses an image classification model that we trained with [Google Teachable Machine](https://teachablemachine.withgoogle.com/) on two classes: *EcoWear Label* (60 photos) and *No EcoWear Label* (71 photos).
The model is hosted by Teachable Machine at `https://teachablemachine.withgoogle.com/models/OK7F07TtQ/` and runs in the visitor's browser, so the photo never leaves their device.
The AI gives a probability, never a proof: only the certificate number on the Our Label page proves that a label is valid.

## References

- Google Teachable Machine export code, TensorFlow.js 1.3.1 and @teachablemachine/image 0.8.5 (Apache 2.0 licence), loaded from the jsDelivr CDN in `scanner.html`.
- Carbon footprint metrics: ADEME, quoted by L'info durable, and ADEME Base Carbone (truck freight factor), quoted by Banque de France. The links are in `myscripts.js` and on the products page.
- Map: Google Maps embed.
- Creators, products, prices and contact details are invented for the project.

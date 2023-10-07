import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";
const hamburgerButton = document.getElementById("hamburgerButton");
const listContent = document.getElementById("listContent");

hamburgerButton.addEventListener("click", () => {
  if (listContent.style.display === "block") {
    listContent.style.display = "none";
  } else {
    listContent.style.display = "block";
  }
});

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAnh7YCRntVx0Vv8BFLjoggmfmhmglV9W4",
  authDomain: "portonew-2a33b.firebaseapp.com",
  projectId: "portonew-2a33b",
  storageBucket: "portonew-2a33b.appspot.com",
  messagingSenderId: "529251769077",
  appId: "1:529251769077:web:c9442d23807585f81703bc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function createPortfolioCard(title, imageSrc, description, technology) {
  console.log(imageSrc);
  const card = document.createElement("div");
  card.classList.add("rounded-lg", "shadow-lg", "overflow-hidden");

  const image = document.createElement("img");
  image.classList.add("object-cover", "h-48", "w-full", "opacity-50");
  image.src = imageSrc;
  image.alt = title;

  const cardContent = document.createElement("div");
  cardContent.classList.add("bg-white", "py-2", "px-4");

  const cardTitle = document.createElement("h4");
  cardTitle.classList.add("text-sm", "font-medium", "text-gray-800");
  cardTitle.textContent = title;

  const cardTech = document.createElement("h5");
  cardTech.classList.add("text-sm", "font-mono");
  cardTech.textContent = technology;

  const cardDescription = document.createElement("p");
  cardDescription.textContent = description;

  cardContent.appendChild(cardTitle);
  cardContent.appendChild(cardTech);
  card.appendChild(image);
  card.appendChild(cardContent);

  return card;
}

const retrievePortfolioData = async () => {
  const portfolioContainer = document.querySelector("#portofolio-content"); // Get the container to append the cards
  try {
    const querySnapshot = await getDocs(collection(db, "portofolio"));

    querySnapshot.forEach((doc) => {
      const portfolioItem = doc.data();
      console.log(portfolioItem);

      // Create a portfolio card using the template and populate it with data
      const card = createPortfolioCard(
        portfolioItem.title,
        portfolioItem.image,
        portfolioItem.description,
        portfolioItem.technology
      );

      console.log(card);
      // Append the card to the portfolio container
      portfolioContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Error retrieving portfolio data:", error);
  }
};

retrievePortfolioData();

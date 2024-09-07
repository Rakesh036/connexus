// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();

// // Check if the URL has a fragment identifier
// if (window.location.hash === "#comment-section") {
//   // Scroll to the comment section
//   document
//     .getElementById("comment-section")
//     .scrollIntoView({ behavior: "smooth" });
//   // Focus on the comment textarea
//   document.getElementById("comment").focus();
// }


// for toggling nav bar
    function toggleMenu() {
        const navLinks = document.querySelector(".nav-links");
        const buttons = document.querySelector(".buttons");
        navLinks.classList.toggle("show");
        buttons.classList.toggle("show");
    }


    
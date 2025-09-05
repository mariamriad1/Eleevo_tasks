document.getElementById("contactForm").addEventListener("submit", function(e) {
      e.preventDefault(); // prevent page reload

      let isValid = true;

      // get values
      const fullname = document.getElementById("fullname").value.trim();
      const email = document.getElementById("email").value.trim();
      const subject = document.getElementById("subject").value.trim();
      const message = document.getElementById("message").value.trim();

      // clear old errors
      document.getElementById("nameError").innerText = "";
      document.getElementById("emailError").innerText = "";
      document.getElementById("subjectError").innerText = "";
      document.getElementById("messageError").innerText = "";

      // validate name
      if (fullname === "") {
        document.getElementById("nameError").innerText = "Full Name is required.";
        isValid = false;
      }

      // validate email
      const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
      if (email === "") {
        document.getElementById("emailError").innerText = "Email is required.";
        isValid = false;
      } else if (!emailPattern.test(email)) {
        document.getElementById("emailError").innerText = "Enter a valid email.";
        isValid = false;
      }

      // validate subject
      if (subject === "") {
        document.getElementById("subjectError").innerText = "Subject is required.";
        isValid = false;
      }

      // validate message
      if (message === "") {
        document.getElementById("messageError").innerText = "Message is required.";
        isValid = false;
      }

      // if all good
      if (isValid) {
        alert("Form Submitted Successfully ✅");
        document.getElementById("contactForm").reset();
      }
    });
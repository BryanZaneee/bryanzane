// Motion One imports
import { animate, stagger } from "motion";

// DOM helpers
const $ = <T extends Element = Element>(sel: string, root = document) =>
  root.querySelector<T>(sel);

const $$ = <T extends Element = Element>(sel: string, root = document) =>
  Array.from(root.querySelectorAll<T>(sel));

// Intersection Observer for reveal-on-scroll
(function setupReveals() {
  const els = $$(".reveal") as HTMLElement[];
  const io = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).classList.add("in-view");
          io.unobserve(entry.target); // animate once
        }
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -10% 0px",
    }
  );

  els.forEach(el => io.observe(el));
})();

// Motion One animations for about cards
(function setupCardAnimations() {
  const cardsContainer = $(".cards-grid");

  if (!cardsContainer) return;

  const cards = $$(".hover-card", cardsContainer);

  // Set initial state
  cards.forEach(card => {
    (card as HTMLElement).style.opacity = "0";
    (card as HTMLElement).style.transform = "translateY(40px)";
  });

  const io = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Animate cards with Motion One
          animate(
            cards,
            {
              opacity: [0, 1],
              transform: ["translateY(40px)", "translateY(0px)"]
            },
            {
              delay: stagger(0.15),
              duration: 0.8,
              easing: "ease-out"
            }
          );
          io.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -10% 0px",
    }
  );

  io.observe(cardsContainer);
})();

// Intersection Observer for animated text highlights
(function setupAnimatedText() {
  const els = $$(".animated-text") as HTMLElement[];
  const io = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).classList.add("in-view");
          io.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: "0px 0px -10% 0px",
    }
  );

  els.forEach(el => io.observe(el));
})();

// Reduce motion respects user preference
(function respectReducedMotion() {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  const apply = () => {
    if (mq.matches) {
      $$(".reveal").forEach(el => {
        (el as HTMLElement).style.transition = "none";
        el.classList.add("in-view");
      });
      $$(".animated-text").forEach(el => {
        (el as HTMLElement).style.transition = "none";
        el.classList.add("in-view");
      });
      // Disable BZS pattern animation
      $$(".bzs-row").forEach(el => {
        (el as HTMLElement).style.animation = "none";
      });
    }
  };
  if ("addEventListener" in mq) {
    mq.addEventListener("change", apply);
  } else {
    // @ts-expect-error: addListener for older browsers
    mq.addListener(apply);
  }
  apply();
})();

// Interactive chat form
(function setupChatForm() {
  const chatInput = $("#chat-input") as HTMLInputElement;
  const sendButton = $("#send-button") as HTMLButtonElement;
  const skipButton = $("#skip-button") as HTMLButtonElement;
  const chatContainer = $(".chat-container") as HTMLElement;
  const form = $("#contact-form") as HTMLFormElement;

  if (!chatInput || !sendButton || !chatContainer || !form) return;

  let currentStep = 0;
  let chatStarted = false;
  const userData: {
    name?: string;
    email?: string;
    phone?: string;
    workplace?: string;
    role?: string;
  } = {};

  const scrollToBottom = () => {
    setTimeout(() => {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }, 100);
  };

  const showMessage = (id: string) => {
    const msg = $(`#${id}`) as HTMLElement;
    if (msg) {
      msg.style.display = "flex";
      scrollToBottom();
    }
  };

  const hideMessage = (id: string) => {
    const msg = $(`#${id}`) as HTMLElement;
    if (msg) msg.style.display = "none";
  };

  const updateMessageText = (id: string, text: string) => {
    const msg = $(`#${id} .message-bubble`) as HTMLElement;
    if (msg) msg.textContent = text;
  };

  const validateEmail = (email: string): boolean => {
    // More strict email validation
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!re.test(email)) return false;

    // Additional checks
    const parts = email.split('@');
    if (parts.length !== 2) return false;

    const domain = parts[1];
    // Check for valid TLD (at least 2 characters after the last dot)
    const domainParts = domain.split('.');
    if (domainParts.length < 2) return false;
    if (domainParts[domainParts.length - 1].length < 2) return false;

    // Check for common typos
    if (email.includes('..') || email.includes(',')) return false;

    return true;
  };

  const validatePhone = (phone: string): boolean => {
    const cleaned = phone.replace(/\D/g, "");
    return cleaned.length >= 10;
  };

  const steps = [
    {
      prompt: () => {
        showMessage("lets-do-it-message");
        setTimeout(() => showMessage("name-question"), 500);
      },
      process: (input: string) => {
        userData.name = input;
        updateMessageText("user-name-message", input);
        showMessage("user-name-message");
        updateMessageText("greeting-message", `Nice to meet you, ${input}! 👋`);
        showMessage("greeting-message");
        setTimeout(() => showMessage("email-question"), 500);
      },
      skipMessageId: null,
      onSkip: null,
      canSkip: false,
    },
    {
      prompt: () => {},
      process: (input: string) => {
        if (!validateEmail(input)) {
          updateMessageText("email-validation", "Hmm, that doesn't look like a valid email. Let's try again!");
          showMessage("email-validation");
          return false;
        }
        userData.email = input;
        updateMessageText("user-email-message", input);
        showMessage("user-email-message");
        hideMessage("email-validation");
        updateMessageText("email-validation", "Perfect! Got it.");
        showMessage("email-validation");
        setTimeout(() => showMessage("phone-question"), 500);
        return true;
      },
      skipMessageId: null,
      onSkip: null,
      canSkip: false,
    },
    {
      prompt: () => {},
      process: (input: string) => {
        if (!validatePhone(input)) {
          updateMessageText("phone-validation", "That doesn't look quite right. Can you double-check your phone number?");
          showMessage("phone-validation");
          return false;
        }
        userData.phone = input;
        updateMessageText("user-phone-message", input);
        showMessage("user-phone-message");
        hideMessage("phone-validation");
        updateMessageText("phone-validation", "Thanks! 📱");
        showMessage("phone-validation");
        setTimeout(() => showMessage("work-question"), 500);
        return true;
      },
      skipMessageId: "skip-phone-message",
      onSkip: () => {
        setTimeout(() => showMessage("work-question"), 500);
      },
      canSkip: true,
    },
    {
      prompt: () => {},
      process: (input: string) => {
        userData.workplace = input;
        updateMessageText("user-work-message", input);
        showMessage("user-work-message");
        updateMessageText("role-question", `Cool! What's your role at ${input}?`);
        setTimeout(() => showMessage("role-question"), 500);
        return true;
      },
      skipMessageId: "skip-work-message",
      onSkip: () => {
        updateMessageText("final-message", `Awesome! Thanks for sharing, ${userData.name}. I'll be in touch soon! 🚀`);
        setTimeout(() => showMessage("final-message"), 500);
      },
      canSkip: true,
    },
    {
      prompt: () => {},
      process: (input: string) => {
        userData.role = input;
        updateMessageText("user-role-message", input);
        showMessage("user-role-message");
        updateMessageText("final-message", `Awesome! Thanks for sharing, ${userData.name}. I'll be in touch soon! 🚀`);
        setTimeout(() => {
          showMessage("final-message");
          submitForm();
        }, 500);
        return true;
      },
      skipMessageId: "skip-role-message",
      onSkip: () => {
        updateMessageText("final-message", `Awesome! Thanks for sharing, ${userData.name}. I'll be in touch soon! 🚀`);
        setTimeout(() => showMessage("final-message"), 500);
      },
      canSkip: true,
    },
  ];

  const submitForm = async () => {
    // Double-check email validation before submission
    if (userData.email && !validateEmail(userData.email)) {
      console.error("Invalid email format, aborting submission");
      return;
    }

    const formData = new FormData();
    formData.append("name", userData.name || "");
    formData.append("_replyto", userData.email || "");
    formData.append("email", userData.email || "");
    formData.append("phone", userData.phone || "");
    formData.append("workplace", userData.workplace || "");
    formData.append("role", userData.role || "");

    try {
      const response = await fetch("https://formspree.io/f/xkgqkwbg", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
        mode: "cors",
        credentials: "omit",
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        console.log("Form submitted successfully!", data);
      } else {
        console.error("Form submission failed:", response.status, data);
        // Show error to user in chat if needed
        if (data.errors && data.errors.length > 0) {
          console.error("Validation errors:", data.errors);
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      // Form submission failed but we don't redirect - just log it
    }
  };

  const handleInput = () => {
    const input = chatInput.value.trim();
    if (!input) return;

    const result = steps[currentStep].process(input);
    if (result !== false) {
      chatInput.value = "";
      currentStep++;

      if (currentStep < steps.length) {
        setTimeout(() => steps[currentStep].prompt(), 800);
        skipButton.style.display = steps[currentStep].canSkip ? "block" : "none";
      } else {
        chatInput.disabled = true;
        sendButton.disabled = true;
        skipButton.style.display = "none";
      }
    }
  };

  const handleSkip = () => {
    const step = steps[currentStep];
    if (!step.canSkip || !step.onSkip || !step.skipMessageId) return;

    // Show "i'm opting for mystery" message for this specific step
    showMessage(step.skipMessageId);
    scrollToBottom();

    // Execute the skip action for this step
    step.onSkip();

    currentStep++;

    // Update UI state
    if (currentStep >= steps.length) {
      // Conversation is complete
      setTimeout(() => {
        chatInput.disabled = true;
        sendButton.disabled = true;
        skipButton.style.display = "none";
        submitForm();
      }, 1000);
    } else {
      // Move to next step
      skipButton.style.display = steps[currentStep].canSkip ? "block" : "none";
    }
  };

  const startChat = () => {
    if (chatStarted) return;
    chatStarted = true;
    steps[0].prompt();
    skipButton.style.display = steps[0].canSkip ? "block" : "none";
  };

  // Prevent default form submission
  form.addEventListener("submit", (e: Event) => {
    e.preventDefault();
    return false;
  });

  chatInput.addEventListener("focus", startChat);
  chatInput.addEventListener("click", startChat);
  sendButton.addEventListener("click", handleInput);
  skipButton.addEventListener("click", handleSkip);
  chatInput.addEventListener("keypress", (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleInput();
    }
  });
})();

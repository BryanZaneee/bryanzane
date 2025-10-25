// Motion One imports
import { animate, stagger, inView, scroll } from "motion";

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

// Scroll-linked project animations
(function setupProjectAnimations() {
  const projectSections = $$(".project-section");

  projectSections.forEach((section, index) => {
    const projectContent = $(".project-content", section) as HTMLElement;
    const projectNumber = $(".project-number", section) as HTMLElement;
    const projectTags = $$(".project-tag", section);
    const projectIcon = $(".project-icon-inline", section) as HTMLElement;
    const projectButton = $(".live-app-button", section) as HTMLElement;

    if (!projectContent) return;

    // Set initial states
    if (projectNumber) projectNumber.style.opacity = "0";
    if (projectIcon) {
      projectIcon.style.opacity = "0";
      projectIcon.style.transform = "scale(0.5) rotate(-180deg)";
    }
    projectTags.forEach((tag) => {
      (tag as HTMLElement).style.opacity = "0";
      (tag as HTMLElement).style.transform = "translateY(20px)";
    });
    if (projectButton) {
      projectButton.style.opacity = "0";
      projectButton.style.transform = "translateY(20px)";
    }

    // Animate on scroll into view
    inView(projectContent, () => {
      // Animate project number with counter effect
      if (projectNumber) {
        const targetNumber = parseInt(projectNumber.textContent || "0");
        animate(
          (progress) => {
            const current = Math.floor(progress * targetNumber);
            projectNumber.textContent = current.toString().padStart(2, "0");
          },
          {
            duration: 0.8,
            easing: [0.34, 1.56, 0.64, 1]
          }
        );
        animate(
          projectNumber,
          { opacity: [0, 1] },
          { duration: 0.5, easing: "ease-out" }
        );
      }

      // Animate icon with rotation and scale
      if (projectIcon) {
        animate(
          projectIcon,
          {
            opacity: [0, 1],
            transform: ["scale(0.5) rotate(-180deg)", "scale(1) rotate(0deg)"]
          },
          {
            duration: 0.8,
            easing: [0.34, 1.56, 0.64, 1]
          }
        );
      }

      // Stagger project tags with spring physics
      if (projectTags.length > 0) {
        animate(
          projectTags,
          {
            opacity: [0, 1],
            transform: ["translateY(20px)", "translateY(0px)"]
          },
          {
            delay: stagger(0.1, { start: 0.3 }),
            duration: 0.6,
            easing: [0.34, 1.56, 0.64, 1]
          }
        );
      }

      // Animate button
      if (projectButton) {
        animate(
          projectButton,
          {
            opacity: [0, 1],
            transform: ["translateY(20px)", "translateY(0px)"]
          },
          {
            delay: 0.4,
            duration: 0.6,
            easing: [0.34, 1.56, 0.64, 1]
          }
        );
      }

      return () => {}; // Cleanup function
    }, {
      margin: "0px 0px -100px 0px"
    });
  });
})();

// Enhanced button micro-interactions
(function setupButtonAnimations() {
  const buttons = $$(".live-app-button");

  buttons.forEach(button => {
    const buttonEl = button as HTMLElement;

    buttonEl.addEventListener('mouseenter', () => {
      animate(
        buttonEl,
        {
          transform: 'scale(1.05) translateY(-2px)',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
        },
        {
          duration: 0.4,
          easing: [0.34, 1.56, 0.64, 1] // Spring easing
        }
      );
    });

    buttonEl.addEventListener('mouseleave', () => {
      animate(
        buttonEl,
        {
          transform: 'scale(1) translateY(0px)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
        },
        {
          duration: 0.3,
          easing: 'ease-out'
        }
      );
    });

    buttonEl.addEventListener('mousedown', () => {
      animate(
        buttonEl,
        {
          transform: 'scale(0.95) translateY(0px)'
        },
        {
          duration: 0.1,
          easing: 'ease-out'
        }
      );
    });

    buttonEl.addEventListener('mouseup', () => {
      animate(
        buttonEl,
        {
          transform: 'scale(1.05) translateY(-2px)'
        },
        {
          duration: 0.2,
          easing: [0.34, 1.56, 0.64, 1]
        }
      );
    });
  });
})();

// Parallax effect for hero section
(function setupHeroParallax() {
  const heroSection = $(".hero") as HTMLElement;
  const heroContent = $(".hero-content") as HTMLElement;
  const bzsPattern = $(".hero-bzs-pattern") as HTMLElement;

  if (!heroSection || !heroContent || !bzsPattern) return;

  scroll(
    animate(heroContent, {
      transform: ["translateY(0px)", "translateY(100px)"],
      opacity: [1, 0.3]
    }),
    {
      target: heroSection,
      offset: ["start start", "end start"]
    }
  );

  scroll(
    animate(bzsPattern, {
      transform: ["translateY(0px)", "translateY(-150px) rotate(-15deg)"]
    }),
    {
      target: heroSection,
      offset: ["start start", "end start"]
    }
  );
})();

// Interactive marquee effects
(function setupMarqueeInteractions() {
  const marqueeWrappers = $$(".marquee-wrapper");

  marqueeWrappers.forEach(wrapper => {
    const wrapperEl = wrapper as HTMLElement;
    const content = $(".marquee-content", wrapperEl) as HTMLElement;

    if (!content) return;

    // Pause/slow on hover
    wrapperEl.addEventListener('mouseenter', () => {
      animate(
        content,
        {
          animationPlayState: 'paused'
        },
        {
          duration: 0.3,
          easing: 'ease-out'
        }
      );
      // Slow down animation
      content.style.animationDuration = '80s';
    });

    wrapperEl.addEventListener('mouseleave', () => {
      // Resume normal speed
      content.style.animationDuration = '40s';
    });
  });
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
      // Disable project animations
      $$(".project-number, .project-tag, .project-icon-inline, .live-app-button").forEach(el => {
        (el as HTMLElement).style.opacity = "1";
        (el as HTMLElement).style.transform = "none";
      });
      // Disable parallax
      const heroContent = $(".hero-content") as HTMLElement;
      const bzsPattern = $(".hero-bzs-pattern") as HTMLElement;
      if (heroContent) heroContent.style.transform = "none";
      if (bzsPattern) bzsPattern.style.transform = "none";
      // Disable marquee interactions
      $$(".marquee-content").forEach(el => {
        (el as HTMLElement).style.animationDuration = "40s";
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
    service?: string;
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
      msg.style.opacity = "0";
      msg.style.transform = "translateY(20px) scale(0.95)";

      animate(
        msg,
        {
          opacity: [0, 1],
          transform: ["translateY(20px) scale(0.95)", "translateY(0px) scale(1)"]
        },
        {
          duration: 0.5,
          easing: [0.34, 1.56, 0.64, 1] // Spring easing
        }
      );

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

  const getServiceLabel = (service: string): string => {
    const labels: Record<string, string> = {
      'ai-consulting': 'AI Consulting & Integration',
      'full-stack': 'Full-Stack Development',
      'maintenance': 'Website Maintenance',
      'general': 'General Inquiry'
    };
    return labels[service] || service;
  };

  const getServiceResponse = (service: string): string => {
    const responses: Record<string, string> = {
      'ai-consulting': "Perfect! I specialize in AI integration and can help you implement cutting-edge AI systems for your business. Let's get your contact info so we can discuss your AI needs.",
      'full-stack': "Awesome! I build robust, scalable web and mobile applications. Let's connect so we can discuss your project.",
      'maintenance': "Great! I offer comprehensive website maintenance packages to keep your site running smoothly. Let's get in touch to discuss your needs.",
      'general': "Sure thing! Let's get your contact information and we can chat about how I can help."
    };
    return responses[service] || "Great! Let's get your contact info so we can discuss further.";
  };

  const steps = [
    // Step 0: Initial greeting and name
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
        setTimeout(() => {
          showMessage("service-question");
          setTimeout(() => showMessage("service-options"), 500);
        }, 500);
      },
      skipMessageId: null,
      onSkip: null,
      canSkip: false,
      requiresInput: true,
    },
    // Step 1: Service selection (handled by button clicks, not text input)
    {
      prompt: () => {},
      process: (input: string) => {
        // This is handled by button clicks, not direct input
        return false;
      },
      skipMessageId: null,
      onSkip: null,
      canSkip: false,
      requiresInput: false,
    },
    // Step 2: Email
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
      requiresInput: true,
    },
    // Step 3: Phone
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
      requiresInput: true,
    },
    // Step 4: Workplace
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
        updateMessageText("final-message", `Awesome! Thanks for sharing, ${userData.name}. I'll be in touch soon to discuss ${getServiceLabel(userData.service || 'your needs')}! 🚀`);
        setTimeout(() => showMessage("final-message"), 500);
      },
      canSkip: true,
      requiresInput: true,
    },
    // Step 5: Role
    {
      prompt: () => {},
      process: (input: string) => {
        userData.role = input;
        updateMessageText("user-role-message", input);
        showMessage("user-role-message");
        updateMessageText("final-message", `Awesome! Thanks for sharing, ${userData.name}. I'll be in touch soon to discuss ${getServiceLabel(userData.service || 'your needs')}! 🚀`);
        setTimeout(() => {
          showMessage("final-message");
          submitForm();
        }, 500);
        return true;
      },
      skipMessageId: "skip-role-message",
      onSkip: () => {
        updateMessageText("final-message", `Awesome! Thanks for sharing, ${userData.name}. I'll be in touch soon to discuss ${getServiceLabel(userData.service || 'your needs')}! 🚀`);
        setTimeout(() => showMessage("final-message"), 500);
      },
      canSkip: true,
      requiresInput: true,
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
    formData.append("service", userData.service || "");
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

  const handleServiceSelection = (service: string) => {
    userData.service = service;
    updateMessageText("user-service-message", getServiceLabel(service));
    showMessage("user-service-message");

    updateMessageText("service-response", getServiceResponse(service));
    showMessage("service-response");

    setTimeout(() => showMessage("email-question"), 500);

    currentStep = 2; // Move to email step
    skipButton.style.display = steps[currentStep].canSkip ? "block" : "none";

    // Re-enable input for next step
    if (steps[currentStep].requiresInput) {
      chatInput.disabled = false;
      chatInput.focus();
    }
  };

  const handleInput = () => {
    const input = chatInput.value.trim();
    if (!input) return;

    // Skip step 1 (service selection) as it's handled by buttons
    if (currentStep === 1) return;

    const result = steps[currentStep].process(input);
    if (result !== false) {
      chatInput.value = "";
      currentStep++;

      // Skip service selection step when advancing
      if (currentStep === 1) {
        currentStep++;
      }

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

  // Set up service option button listeners
  const setupServiceButtons = () => {
    const serviceButtons = $$(".service-option-btn");
    serviceButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const service = btn.getAttribute("data-service");
        if (service) {
          handleServiceSelection(service);
        }
      });
    });
  };

  // Call this after a short delay to ensure buttons are in DOM
  setTimeout(setupServiceButtons, 100);

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

  // Disable input initially for service selection step
  chatInput.addEventListener("focus", () => {
    if (currentStep === 1) {
      chatInput.blur();
    }
  });
})();

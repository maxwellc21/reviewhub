// assets/data.js
(function () {
  const items = [
    {
      id: "svc_laptop",
      name: "KastomTek Laptop Repair",
      category: "IT Services",
      kind: "Service",
      price: "From K120",
      desc: "Repair, diagnostics, OS install, and performance tune-ups for students & staff.",
      tags: ["Warranty", "Fast turnaround", "Professional"]
    },
    {
      id: "svc_wifi",
      name: "Campus Wi-Fi Access",
      category: "Digital Services",
      kind: "Service",
      price: "Included / Plans",
      desc: "Connectivity experience across lecture rooms, dorms, and staff offices.",
      tags: ["Reliability", "Speed", "Coverage"]
    },
    {
      id: "good_coffee",
      name: "Madang Roast Coffee",
      category: "Food & Beverage",
      kind: "Good",
      price: "K10–K18",
      desc: "Local roast coffee — review taste, price, and service quality.",
      tags: ["Taste", "Value", "Service"]
    },
    {
      id: "svc_print",
      name: "Printing & Copy Centre",
      category: "Student Services",
      kind: "Service",
      price: "From K0.50/page",
      desc: "Printing, scanning, and binding. Review wait times and quality.",
      tags: ["Queue time", "Quality", "Support"]
    },
    {
      id: "good_usb",
      name: "USB Flash Drive (32GB)",
      category: "Electronics",
      kind: "Good",
      price: "K25–K45",
      desc: "Storage device durability and speed for assignments and backups.",
      tags: ["Durability", "Speed", "Compatibility"]
    },
    {
      id: "svc_moodle",
      name: "Online Learning Portal",
      category: "Digital Services",
      kind: "Service",
      price: "Free",
      desc: "Course pages, submissions, and announcements. Review usability and stability.",
      tags: ["Usability", "Stability", "Support"]
    }
  ];

  const seedUsers = [
    { username: "student", password: "1234", fullname: "Demo Student", email: "student@example.com", role: "student" }
  ];

  const seedReviews = [
    {
      id: (crypto.randomUUID ? crypto.randomUUID() : String(Date.now()) + "_1"),
      itemId: "svc_wifi",
      user: "public_user",
      rating: 3,
      title: "Good in some spots, weak in others",
      body: "Works well near the library, but drops in some lecture rooms. Needs better coverage.",
      recommend: "yes",
      aspects: ["coverage"],
      createdAt: Date.now() - (1000 * 60 * 60 * 8)
    },
    {
      id: (crypto.randomUUID ? crypto.randomUUID() : String(Date.now()) + "_2"),
      itemId: "svc_laptop",
      user: "student",
      rating: 5,
      title: "Fast fix and clear communication",
      body: "Diagnosed the issue quickly and explained what was replaced. Laptop runs smoothly now.",
      recommend: "yes",
      aspects: ["speed", "support", "quality"],
      createdAt: Date.now() - (1000 * 60 * 60 * 30)
    },
    {
      id: (crypto.randomUUID ? crypto.randomUUID() : String(Date.now()) + "_3"),
      itemId: "good_coffee",
      user: "public_user",
      rating: 4,
      title: "Nice flavour, fair price",
      body: "Good aroma and taste. Service was friendly. Would like a larger cup option.",
      recommend: "yes",
      aspects: ["quality", "value"],
      createdAt: Date.now() - (1000 * 60 * 60 * 52)
    }
  ];

  window.ReviewHubData = { items, seedUsers, seedReviews };
})();

const schema = [
  {
    id: "identity",
    title: "identity",
    fields: [
      {
        key: "fullname",
        label: "Fullname",
        type: "text",
        placeholder: "Enter your Name",
      },
      {
        key: "role",
        label: "Professional Title",
        type: "text",
        placeholder: "Enter your tittle",
      },
      {
        key: "summary",
        label: "Summary",
        type: "text",
        placeholder: "Enter your description",
      },
    ],
  },
  {
    id: "contact",
    title: "contact",
    fields: [
      {
        key: "email",
        label: "Email",
        type: "text",
        placeholder: "Enter your email",
      },
      {
        key: "phone",
        label: "Phone",
        type: "text",
        placeholder: "Enter your phone",
      },
      {
        key: "location",
        label: "Location",
        type: "text",
        placeholder: "Enter your location",
      },
      {
        key: "website",
        label: "Website",
        type: "text",
        placeholder: "https://",
      },
    ],
  },
  {
    id: "skills",
    title: "skills",
    fields: [
      {
        key: "skills",
        label: "Skills",
        type: "text",
        placeholder: "Enter your skills",
      },
    ],
  },
  {
    id: "experience",
    title: "experience",
    repeatable: true,
    fields: [
      { key: "company", label: "company", type: "text" },
      { key: "title", label: "Role", type: "text" },
      { key: "location", label: "Location", type: "text" },
      {
        key: "period",
        label: "Period",
        type: "text",
        placeholder: "2022- present",
      },
      {
        key: "highlights",
        label: "highlightes per bullet line",
        type: "textarea",
        rows: 3,
      },
    ],
  },
  {
    id: "education",
    title: "education",
    repeatable: true,
    fields: [
      { key: "school", label: "school", type: "text" },
      { key: "degree", label: "degree", type: "text" },
      { key: "location", label: "Location", type: "text" },
      { key: "period", label: "Period", type: "text" },
      { key: "details", label: "details", type: "textarea", rows: 2 },
    ],
  },
];
//TEMPLATE

const Template = {
  modern: {
    label: "Modern",
    className: "template-modern",

    render: (data) => {
      // Extract sections safely
      const identity = data.identity || {};
      const contact = data.contact || {};
      const skills = data.skills || {};
      const experience = data.experience || [];
      const education = data.education || [];

      return `
      <header class="resume-header">
        <h1 class="name">${identity.fullname || "Your Name"}</h1>
        <p class="role">${identity.role || "Your Title"}</p>

        <div class="contact-info">
            ${joinValue(
        [
          contact.email && `<span>${contact.email}</span>`,
          contact.phone && `<span>${contact.phone}</span>`,
          contact.location && `<span>${contact.location}</span>`,
          contact.website && `<span>${contact.website}</span>`,
        ],
        " | "
      )}
        </div>

        <p class="summary">${identity.summary || "A short professional summary about yourself."
        }</p>
      </header>

      <section class="resume-section">
        <h2>Skills</h2>
        <div class="skills-list">
          ${(skills.skills || "")
          .split(",")
          .map((skill) => `<span class="skill-chip">${skill.trim()}</span>`)
          .join("") || "<p>No skills provided.</p>"
        }
        </div>
      </section>

      <section class="resume-section">
        <h2>Experience</h2>
        ${experience.length
          ? experience
            .map(
              (exp) => `
          <div class="experience-item">
            <h3>${exp.company || "Company Name"}</h3>
            <p class="meta">${exp.title || "Role"} • ${exp.location ? exp.location + " • " : ""}${exp.period || "Period"
                }</p>
            <ul>
              ${exp.highlights
                  ? exp.highlights
                    .split("\n")
                    .map((h) => `<li>${h}</li>`)
                    .join("")
                  : "<li>No highlights added.</li>"
                }
            </ul>
          </div>
        `
            )
            .join("")
          : "<p>No experience added.</p>"
        }
      </section>

      <section class="resume-section">
        <h2>Education</h2>
        ${education.length
          ? education
            .map(
              (edu) => `
          <div class="education-item">
            <h3>${edu.school || "School / University"}</h3>
            <p class="meta">${edu.degree || "Degree"} • ${edu.location ? edu.location + " • " : ""}${edu.period || "Years"
                }</p>
            <p>${edu.details || ""}</p>
          </div>
        `
            )
            .join("")
          : "<p>No education details added.</p>"
        }
      </section>
      `;
    },
  },
};

const state = {
  data: {},
  templateKey: "modern",
};

const EXPORT_STYLES = `
  body {
    font-family: "Inter", "Segoe UI", system-ui, -apple-system, sans-serif;
    margin: 0;
    padding: 0;
    color: #222;
  }

  h1 {
    font-size: 2rem;
    margin-bottom: 0.75rem;
  }

  h2 {
    font-size: 1.25rem;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    color: #4f46e5;
    margin-top: 1.5rem;
    margin-bottom: 1rem;
  }

  .resume-header {
    border-bottom: 4px solid #4f46e5;
    padding-bottom: 1.5rem;
    margin-bottom: 2rem;
  }

  .name {
    font-size: 2rem;
    font-weight: 700;
  }

  .role {
    font-size: 1.1rem;
    color: #555;
  }

  .contact-info {
    font-size: 0.9rem;
    color: #666;
    margin-top: 0.5rem;
  }

  .contact-info span {
    margin-right: 12px;
  }

  .summary {
    margin-top: 1rem;
    font-size: 1rem;
    color: #333;
  }

  .resume-section h2 {
    border-bottom: 1px solid #ddd;
    padding-bottom: 6px;
  }

  /* SKILLS */
  .skills-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .skill-chip {
    background: rgba(79, 70, 229, 0.12);
    color: #4f46e5;
    padding: 6px 12px;
    border-radius: 999px;
    font-size: 0.85rem;
    margin-bottom: 4px;
  }

  /* EXPERIENCE */
  .experience-item {
    margin-bottom: 1.5rem;
  }

  .experience-item h3 {
    font-size: 1.05rem;
    margin: 0;
    font-weight: 600;
  }

  .experience-item .meta {
    font-size: 0.9rem;
    color: #555;
    margin-bottom: 0.5rem;
  }

  .experience-item ul {
    padding-left: 20px;
    margin-top: 6px;
  }

  .experience-item li {
    margin-bottom: 4px;
    line-height: 1.4;
  }

  /* EDUCATION */
  .education-item {
    margin-bottom: 1.5rem;
  }

  .education-item h3 {
    font-size: 1.05rem;
    font-weight: 600;
    margin-bottom: 2px;
  }

  .education-item .meta {
    font-size: 0.9rem;
    color: #555;
    margin-bottom: 0.5rem;
  }
`;

//actual js part

const form = document.getElementById("form");
const preview = document.getElementById("preview");
const templateSelect = document.getElementById("templateSelect");
const downloadBtn = document.getElementById("downloadBtn");
const resetBtn = document.getElementById("resetBtn");
const templatePills = document.getElementById("templatePills");
const templateCount = document.getElementById("templateCount");
const sectionCount = document.getElementById("sectionCount");
const fieldProgress = document.getElementById("fieldProgress");
const sectionNav = document.getElementById("sectionNav");
const liveMeta = document.getElementById("liveMeta");
const previewPane = document.getElementById("previewPane");
const previewBgButtons = document.querySelectorAll("#previewBgButtons button");
const themeToggle = document.getElementById("themeToggle");

const collection = {};
const navButton = new Map();
const templateButton = new Map();

let sectionObserver;

document.addEventListener("DOMContentLoaded", startApp);

function startApp() {
  setUpTemplate();
  buildForm();
  bindUI();
  setPreviewBg("plain");
  markTemplate(state.templateKey);
  drawPreview();
  refreshStates();
}

function setUpTemplate() {
  templateSelect.innerHTML = "";
  if (templatePills) {
    templatePills.innerHTML = "";
  }
  Object.entries(Template).forEach(([key, template]) => {
    const option = document.createElement("option");
    option.value = key;
    option.textContent = template.label;
    templateSelect.appendChild(option);
    const pill = document.createElement("button");
    pill.type = "button";
    pill.className = "template-pill";
    pill.textContent = template.label;

    pill.addEventListener("click", () => {
      state.templateKey = key;
      markTemplate(key);
      drawPreview();
      refreshStates();
    });
    templatePills?.appendChild(pill);
    templateButton.set(key, pill);
  });
  templateSelect.value = state.templateKey;
  templateSelect.addEventListener("change", (e) => {
    state.templateKey = e.target.value;
    markTemplate(state.templateKey);
    drawPreview();
    refreshStates();
  });
}

function buildForm() {
  sectionObserver = new IntersectionObserver(watchSection, {
    root: null,
    threshold: 0.35,
  });

  schema.forEach((section) => {
    const wrapper = document.createElement("section");
    wrapper.className = "vstack gap-3 border-bottom pb-4";
    wrapper.dataset.sectionId = section.id;
    wrapper.id = section.id;

    const heading = document.createElement("div");
    heading.className = "form-section-tittle";
    heading.textContent = section.title;
    wrapper.appendChild(heading);

    // Append the wrapper to the form early so it's in the DOM
    form.appendChild(wrapper);

    if (section.repeatable) {
      const controls = document.createElement("div");
      controls.className = " d-flex justify-content-end";
      const addBtn = document.createElement("button");
      addBtn.type = "button";
      addBtn.className = "btn btn-sm btn-outline-primary";
      addBtn.textContent = `${section.title}`;
      addBtn.addEventListener("click", () => addRepeater(section, collection));
      controls.appendChild(addBtn);
      wrapper.appendChild(controls);
      addRepeater(section, collection);
    } else {
      const SectionBody = document.createElement("div");
      SectionBody.className = "vstack gap-3";
      section.fields.forEach((field) => {
        SectionBody.appendChild(buildField(section, field));
      });
      wrapper.appendChild(SectionBody);
    }
    addSectionLink(section);
    sectionObserver.observe(wrapper);
  });
}

function buildField(section, field, index = null) {
  const fieldId =
    index != null
      ? `${section.id}-${field.key}-${index}`
      : `${section.id}-${field.key}`;
  const container = document.createElement("div");
  const label = document.createElement("label");
  label.setAttribute('for', fieldId);
  label.textContent = field.label;

  let input;
  if (field.type == "textarea") {
    input = document.createElement("textarea");
    input.rows = field.rows || 4;
    input.className = "form-control";
  } else {
    input = document.createElement("input");
    input.type = field.type || "text";
    input.className = "form-control";
  }
  input.placeholder = field.placeholder || "";
  input.id = fieldId;
  input.dataset.section = section.id;
  input.dataset.key = field.key;

  if (index != null) {
    input.dataset.index = index;
  }
  input.addEventListener("input", handleInput);
  container.appendChild(label);
  container.appendChild(input);
  return container;
}

function handleInput(event) {
  const { section, key, index } = event.target.dataset;
  const value = event.target.value;

  if (isRepeater(section)) {
    const idx = Number(index);
    state.data[section] = state.data[section] || {};
    state.data[section][idx] = state.data[section][idx] || {};
    state.data[section][idx][key] = value;
  } else {
    state.data[section] = state.data[section] || {};
    state.data[section][key] = value;
  }
  drawPreview();
  refreshStates();
}

function isRepeater(sectionId) {
  return schema.find((section) => section.id === sectionId)?.repeatable;
}
function addRepeater(section, collectionMap) {
  const sectionId = section.id;

  // Create container if not exist
  if (!collectionMap[sectionId]) {
    const container = document.createElement("div");
    container.className = "vstack gap-3 repeater-collection";
    collectionMap[sectionId] = container;
    document.getElementById(sectionId).appendChild(container);
  }

  const container = collectionMap[sectionId];
  const index = container.children.length;

  // Create card
  const card = document.createElement("div");
  card.className = "p-3 border rounded repeater-card";
  card.dataset.index = index;

  // Add fields
  section.fields.forEach((field) => {
    const fieldEl = buildField(section, field, index);
    card.appendChild(fieldEl);
  });

  // Remove button
  const removeBtn = document.createElement("button");
  removeBtn.type = "button";
  removeBtn.className = "btn btn-sm btn-danger mt-2";
  removeBtn.textContent = "Remove";
  removeBtn.addEventListener("click", () => removeRepeater(sectionId, card));
  card.appendChild(removeBtn);

  // Push into container
  container.appendChild(card);

  // Initialize state
  if (!state.data[sectionId]) state.data[sectionId] = {};
  state.data[sectionId][index] = {};

  drawPreview();
  refreshStates();
}

function removeRepeater(sectionId, card) {
  const container = card.parentElement;
  const indexToRemove = parseInt(card.dataset.index);

  // 1. Remove from DOM
  card.remove();

  // 2. Sync State: Convert object to array, remove item, convert back to object
  if (state.data[sectionId]) {
    const items = Object.values(state.data[sectionId]);
    items.splice(indexToRemove, 1);
    
    // Rebuild the object to ensure no "holes" in keys (0, 1, 2...)
    state.data[sectionId] = {};
    items.forEach((item, i) => {
      state.data[sectionId][i] = item;
    });
  }

  // 3. Re-index remaining DOM elements
  Array.from(container.children).forEach((child, newIdx) => {
    child.dataset.index = newIdx;
    child.querySelectorAll("[data-index]").forEach(input => {
      input.dataset.index = newIdx;
    });
  });

  drawPreview();
  refreshStates();
}

function drawPreview() {
  const template = Template[state.templateKey];
  if (!template) return; // Safety check

  const prepared = preparedData();
  
  // Ensure the preview element exists and update it
  if (preview) {
    preview.className = `resume preview ${template.className || ""}`;
    preview.innerHTML = template.render(prepared);
  }
  refreshMeta();
}

function preparedData() {
  // Deep clone the state to avoid mutating the original data
  const payload = JSON.parse(JSON.stringify(state.data));

  // Identity and Contact (Objects)
  payload.identity = payload.identity || {};
  payload.contact = payload.contact || {};
  payload.skills = payload.skills || {};

  // Convert Repeatable Sections (Experience/Education) from Objects to Arrays
  // state.data.experience is { 0: {...}, 1: {...} } -> payload.experience is [{...}, {...}]
  payload.experience = payload.experience ? Object.values(payload.experience) : [];
  payload.education = payload.education ? Object.values(payload.education) : [];

  return payload;
}
function bindUI() {
  if (templateCount) {
    templateCount.textContent = Object.keys(Template).length;
  }
  if (sectionCount) {
    sectionCount.textContent = schema.length;
  }
  previewBgButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      setPreviewBg(btn.dataset.previewBg)
    })
  });
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme)
  }
  if (downloadBtn) {
    downloadBtn.addEventListener("click", savePDF);
  }
  if (resetBtn) {
    resetBtn.addEventListener("click", resetForm);
  }
}

function resetForm() {
  state.data = {};

  // Clear non-repeatable inputs
  form.querySelectorAll("input[data-key], textarea[data-key]").forEach(input => {
    input.value = "";
  });

  // Remove all repeaters
  schema.filter(s => s.repeatable).forEach(section => {
    const container = collection[section.id];
    if (container) {
      container.innerHTML = '';
      // Re-add one empty repeater
      addRepeater(section, collection);
    }
  });

  drawPreview();
  refreshStates();
}

function markTemplate(key) {
  templateButton.forEach((pill, templateKey) => {
    pill.classList.toggle("active", templateKey === key);
  });
}

function addSectionLink(section) {
  if (!sectionNav) return;
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = section.title;
  button.addEventListener("click", () => {
    document.getElementById(section.id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",

    });
  });
  sectionNav.appendChild(button);
  navButton.set(section.id, button);

}

function watchSection(entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      setActiveSection(entry.target.id);

    }

  });
}

function setActiveSection(sectionId) {

  navButton.forEach((button, id) => {

    if (id === sectionId) {
      button.classList.add("active-section");
    } else {
      button.classList.remove("active-section");
    }
  });
}

function setPreviewBg(mode) {
  previewBgButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.previewBg === mode);
  });
  if (!previewPane) return;

  previewPane.classList.remove("grid", "slate");

  if (mode === "grid") {
    previewPane.classList.add("grid");
  } else if (mode === "slate") {
    previewPane.classList.add("slate");

  }


}

function toggleTheme() {
  const enableDark = document.body.dataset.mode != "dark";
  document.body.dataset.mode = enableDark ? "dark" : "";
  themeToggle.textContent = enableDark ? "lightMode" : "darkMode";

}

function syncForm() {
  Object.entries(collection).forEach(([sectionId, collection]) => {
    const targetLength = (state.data[sectionId] || []).length || 1;
    const section = schema.find(item => item.id === sectionId);
    while (collection.childElementCount < targetLength) {
      addRepeater(section, collection);
    }
  });

  form.querySelectorAll("[data-key]").forEach((input) => {
    const { section, key, index } = input.dataset;
    if (isRepeater(section)) {
      const entries = state.data[section] || [];
      const value = entries[Number(index)]?.[key] || "";
      input.value = value;
    } else {
      input.value = state.data[section]?.[key] || "";
    }
  });
}

function refreshStates() {
  const filled = countFilled();
  if (fieldProgress) {
    fieldProgress.textContent = filled
  }
  refreshMeta();
  refreshSection();
}
function countFilled() {
  let filled = 0;
  form.querySelectorAll("input[data-key], textarea[data-key]").forEach((input) => {
    if (input.value.trim()) {
      filled += 1;
    }
  });
  return filled;
}

function refreshSection() {
  schema.forEach((section) => {
    const complete = sectionHasData(section);
    const btn = navButton.get(section.id);
    if (btn) {
      btn.classList.toggle("complete", complete);

    }
  })
}

async function savePDF() {
  const printArea = document.getElementById("printArea");
  const preview = document.getElementById("preview");

  // Clear old content
  printArea.innerHTML = "";

  // Clone preview content for PDF rendering
  const clone = preview.cloneNode(true);
  clone.style.width = "800px";  // Good width for A4
  clone.style.padding = "30px";

  // Apply EXPORT_STYLES into the print area
  const styleTag = document.createElement("style");
  styleTag.textContent = EXPORT_STYLES;

  printArea.appendChild(styleTag);
  printArea.appendChild(clone);

  // Give browser time to render the hidden area
  await new Promise((resolve) => setTimeout(resolve, 200));

  // Convert the printArea into canvas
  const canvas = await html2canvas(printArea, {
    scale: 2, // High quality
    useCORS: true,
  });

  const imgData = canvas.toDataURL("image/png");

  // Determine the best way to access jsPDF regardless of how it's loaded
  const { jsPDF } = window.jspdf || window;
  const pdf = new jsPDF("p", "mm", "a4");

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  const imgWidth = pageWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  let heightLeft = imgHeight;
  let position = 0;

  // Add first page
  pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);

  heightLeft -= pageHeight;

  // Add extra pages if needed
  while (heightLeft > 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }

  pdf.save("Resume.pdf");
}

function refreshMeta() {
  if (!liveMeta) return;
  const filled = countFilled();
  const readySections = schema.filter(s => sectionHasData(s)).length;
  liveMeta.textContent = `${readySections}/${schema.length} sections ready · ${filled} fields filled`;
}

function sectionHasData(section) {
  const sectionData = state.data[section.id];
  if (!sectionData) return false;

  if (section.repeatable) {
    // Check if there are any keys in the object and if the first item has any data
    const keys = Object.keys(sectionData);
    return keys.length > 0 && Object.values(sectionData[keys[0]]).some(val => val.trim() !== "");
  }
  
  return section.fields.some(field => {
    const val = sectionData[field.key];
    return val && val.toString().trim() !== "";
  });
}

function joinValue(arr, joiner) {
  return arr.filter(Boolean).join(joiner);
}

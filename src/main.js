import "./style.css";

const form = document.querySelector("#request-form");
const status = document.querySelector("#form-status");
const details = document.querySelector("#details-count");
const previewName = document.querySelector("#preview-name");
const previewType = document.querySelector("#preview-type");
const previewDetails = document.querySelector("#preview-details"); 
const requestList = document.querySelector("#request-list");  

// TODO 1: query preview/status/list elements

// TODO 2: readForm()
function readForm(form) {
  return Object.fromEntries(new FormData(form).entries());
}
// TODO 3: renderPreview(data)
function renderPreview(data) {
  previewName.textContent = data.requesterName || "ยังไม่ระบุชื่อ";
  previewType.textContent = data.requestType || "ยังไม่เลือกประเภท";
  previewDetails.textContent = data.details || "ยังไม่มีรายละเอียด";
}
// TODO 4: validate(data)
function validate(data) {
  const errors = {};

  if ((data.requesterName || "").trim().length < 2) {
    errors.requesterName = "กรุณากรอกชื่อผู้ขอรับบริการ";
  }

  if (!data.requestType) {
    errors.requestType = "กรุณาเลือกประเภทคําขอ";
  }

  if (data.details.trim().length < 10) {
    errors.details = "กรุณาอธิบายอย่างน้อย 10 ตัวอักษร";
  }

  return errors;
}
// TODO 5: renderErrors(errors)
function renderErrors(errors) {
  for (const name of ["requesterName", "requestType", "details"]) {
    const field = document.querySelector(`[name="${name}"]`);
    const output = document.querySelector(`#${name}-error`);
    const message = errors[name] ?? "";
    output.textContent = message;
    field.setAttribute("aria-invalid", String(Boolean(message)));
  }
}

form.addEventListener("input", (event) => {
  // currentTarget คือ form; target คือ input/select/textarea ที่เปลี่ยน
  const data = Object.fromEntries(new FormData(event.currentTarget).entries());
  renderPreview(data);
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  handleSubmit(event.currentTarget);
});

// TODO 6: input and submit listeners
function handleSubmit(form) {
  const data = readForm(form);
  const errors = validate(data);
  renderErrors(errors);
  if (Object.keys(errors).length > 0) {
    renderStatus("invalid", "กรุณาตรวจสอบข้อมูลที่ระบุ");
    return;
  }
  addRequest(data);
  renderStatus("success", "บันทึกคําขอเรียบร้อย");
  form.reset();
  renderPreview(readForm(form));
}

function renderStatus(state, message) {
  status.dataset.state = state;
  status.textContent = message;
}

function addRequest(data) {
  const item = document.createElement("li");
  const title = document.createElement("strong");
  const details = document.createElement("span");
  title.textContent = `${data.requesterName} • ${data.requestType}`;
  details.textContent = data.details;
  item.append(title, details);
  requestList.prepend(item);
}



console.log("LAB 3 starter ready", form);

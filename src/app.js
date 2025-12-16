import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// 🔐 Supabase credentials
const SUPABASE_URL = "https://gpjwdvulzecbpfqgugzr.supabase.co";
const SUPABASE_KEY = "sb_publishable_FE9JDVBTVGbCTzox6RN89Q_4WHT3zyK";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("studentForm");
  const tableBody = document.getElementById("tableBody");
  const emptyMessage = document.getElementById("emptyMessage");

  // Load data on page load
  loadStudents();

  // Save student
  form.addEventListener("submit", saveStudent);

  async function saveStudent(e) {
    e.preventDefault();

    const student = {
      name: document.getElementById("name").value.trim(),
      student_class: document.getElementById("class").value.trim(),
      admission_no: document.getElementById("admission_no").value.trim(),
      phone: document.getElementById("phone").value.trim(),
      address: document.getElementById("address").value.trim(),
    };

    const { error } = await supabase.from("students").insert([student]);

    if (error) {
      console.error(error);
      alert("Error saving student");
      return;
    }

    form.reset();
    loadStudents(); // refresh table
  }

  async function loadStudents() {
    const { data, error } = await supabase
      .from("students")
      .select("*");

    if (error) {
      console.error(error);
      return;
    }

    tableBody.innerHTML = "";

    if (!data || data.length === 0) {
      emptyMessage.style.display = "block";
      return;
    }

    emptyMessage.style.display = "none";

    data.forEach((s) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${s.name}</td>
        <td>${s.student_class}</td>
        <td>${s.admission_no}</td>
        <td>${s.phone}</td>
        <td>${s.address}</td>
      `;
      tableBody.appendChild(row);
    });
  }
});

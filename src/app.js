import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL = "https://gpjwdvulzecbpfqgugzr.supabase.co";
const SUPABASE_KEY = "sb_publishable_FE9JDVBTVGbCTzox6RN89Q_4WHT3zyK";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    loadStudents();
        document.getElementById('saveBtn').addEventListener('click', saveStudent);
            document.getElementById('studentForm').addEventListener('reset', clearForm);
            });

            // Save to Supabase
            async function saveStudent() {
                const name = document.getElementById('name').value.trim();
                    const studentClass = document.getElementById('class').value.trim();
                        const admissionNumber = document.getElementById('admissionNumber').value.trim();
                            const phone = document.getElementById('phone').value.trim();
                                const address = document.getElementById('address').value.trim();

                                    if (!name || !studentClass || !admissionNumber || !phone || !address) {
                                            alert("⚠️ Please fill all fields");
                                                    return;
                                                        }

                                                            const { data, error } = await supabase
                                                                    .from('students')
                                                                            .insert([
                                                                                        { name, class: studentClass, admission_no: admissionNumber, phone, address }
                                                                                                ]);

                                                                                                    if (error) {
                                                                                                            alert("❌ Error saving data: " + error.message);
                                                                                                                    return;
                                                                                                                        }

                                                                                                                            addRowToTable(data[0]);
                                                                                                                                document.getElementById('studentForm').reset();
                                                                                                                                }

                                                                                                                                // Load data from Supabase
                                                                                                                                async function loadStudents() {
                                                                                                                                    const { data, error } = await supabase.from('students').select('*');

                                                                                                                                        if (error) {
                                                                                                                                                console.error("Error loading data:", error);
                                                                                                                                                        return;
                                                                                                                                                            }

                                                                                                                                                                data.forEach(student => addRowToTable(student));
                                                                                                                                                                }

                                                                                                                                                                // Add row to table
                                                                                                                                                                function addRowToTable(student) {
                                                                                                                                                                    const tbody = document.querySelector('#studentTable tbody');

                                                                                                                                                                        const row = document.createElement('tr');
                                                                                                                                                                            row.dataset.id = student.id;

                                                                                                                                                                                row.innerHTML = `
                                                                                                                                                                                        <td>${student.name}</td>
                                                                                                                                                                                                <td>${student.class}</td>
                                                                                                                                                                                                        <td>${student.admission_no}</td>
                                                                                                                                                                                                                <td>${student.phone}</td>
                                                                                                                                                                                                                        <td>${student.address}</td>
                                                                                                                                                                                                                                <td><button onclick="deleteStudent('${student.id}')">Delete</button></td>
                                                                                                                                                                                                                                    `;

                                                                                                                                                                                                                                        tbody.appendChild(row);
                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                        // Delete from Supabase
                                                                                                                                                                                                                                        async function deleteStudent(id) {
                                                                                                                                                                                                                                            if (!confirm("Delete this record?")) return;

                                                                                                                                                                                                                                                await supabase.from('students').delete().eq('id', id);

                                                                                                                                                                                                                                                    document.querySelector(`tr[data-id="${id}"]`).remove();
                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                    // Clear form
                                                                                                                                                                                                                                                    function clearForm() {
                                                                                                                                                                                                                                                        document.getElementById('studentForm').reset();
                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                        
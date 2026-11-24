
// ==========================================
// DATA MATA KULIAH ITP B SEMESTER 1
// UNIVERSITAS HALU OLEO
// ==========================================

const courses = [
  {
    name: "Bahasa Indonesia",
    lecturers: [
      "Dr. La Ino, S.Pd., M.Hum.",
      "Wa Ode Nafilawati, S.TP., M.Si."
    ]
  },
  {
    name: "Fisika Dasar",
    lecturers: [
      "Dr. Sakir, S.T., M.Sc.",
      "Ir. Hermanto, MP.",
      "Dr. Muhammad Syukri Sadimantara, ST., MP.",
      "Wahid Wirawan, S.TP., M.Sc."
    ]
  },
  {
    name: "Pancasila",
    lecturers: [
      "Dr. Muhamad Saleh, S.Pd., M.Pd.",
      "Dr. Nur Asyik, SP., M.Si."
    ]
  },
  {
    name: "Teknologi Informasi",
    lecturers: [
      "Dr. Dhian Herdhiansyah, S.Pd., MP.",
      "Dr. Muhammad Syukri Sadimantara, ST., MP.",
      "L.M. Fid Aksara, S.Kom., M.Kom."
    ]
  },
  {
    name: "Matematika",
    lecturers: [
      "Ir. Hermanto, MP.",
      "Dr. Sakir, S.T., M.Sc.",
      "Fatahu, S.Pd., M.Si.",
      "Wahid Wirawan, S.TP., M.Sc."
    ]
  },
  {
    name: "Pengantar Ilmu Pertanian",
    lecturers: [
      "Prof. Dr. Ir. La Rianda, M.Si.",
      "Sri Rejeki, S.Pi., M.Sc.",
      "Mariani L, SP., M.Sc."
    ]
  },
  {
    name: "Agama",
    lecturers: [
      "Dr. H. Tamrin, S.P., M.P.",
      "Ilian Elvira, S.TP., M.Sc."
    ]
  },
  {
    name: "Kimia Dasar",
    lecturers: [
      "RH. Fitri Faradilla, S.T.P., M.Sc., Ph.D.",
      "Andi Laila Nugrawati M, S.Si., M.Si.",
      "Fatahu, S.Pd., M.Si.",
      "Nurchalisah Rustan M, S.T.P., M.Sc."
    ]
  },
  {
    name: "Pengantar Teknologi Pangan",
    lecturers: [
      "Prof. Dr. Ir. H. Ansharullah, M.Sc.",
      "Prof. Dr. Tamrin, SP., MP.",
      "Ilian Elvira, S.TP., M.Sc."
    ]
  }
];

// ==========================================
// PENYIMPANAN DATA
// ==========================================

let attendance = JSON.parse(
  localStorage.getItem("absensiITPB")
) || [];

function saveData() {
  localStorage.setItem(
    "absensiITPB",
    JSON.stringify(attendance)
  );
}

// ==========================================
// NAVIGASI HALAMAN
// ==========================================

function showPage(pageId) {
  document.querySelectorAll(".page").forEach(page => {
    page.classList.remove("active");
  });

  document.querySelectorAll(".nav").forEach(nav => {
    nav.classList.remove("active");
  });

  document.getElementById(pageId).classList.add("active");

  const selectedNav = document.querySelector(
    `.nav[data-page="${pageId}"]`
  );

  if (selectedNav) selectedNav.classList.add("active");

  const titles = {
    dashboard: "Dashboard",
    matkul: "Mata Kuliah",
    absensi: "Input Absensi",
    riwayat: "Riwayat Absensi",
    rekap: "Rekap Kehadiran"
  };

  document.getElementById("pageTitle").textContent =
    titles[pageId];

  document.getElementById("sidebar").classList.remove("show");

  if (pageId === "dashboard") updateDashboard();
  if (pageId === "matkul") renderCourses();
  if (pageId === "riwayat") renderHistory();
  if (pageId === "rekap") renderRecap();
}

document.querySelectorAll(".nav").forEach(button => {
  button.addEventListener("click", () => {
    showPage(button.dataset.page);
  });
});

function toggleMenu() {
  document.getElementById("sidebar").classList.toggle("show");
}

// ==========================================
// DAFTAR MATA KULIAH
// ==========================================

function renderCourses() {
  const container = document.getElementById("allCourses");
  const search = document.getElementById("searchCourse")
    .value.toLowerCase();

  container.innerHTML = "";

  courses
    .filter(course =>
      course.name.toLowerCase().includes(search) ||
      course.lecturers.some(d =>
        d.toLowerCase().includes(search)
      )
    )
    .forEach((course, index) => {
      container.innerHTML += `
        <div class="course-card">
          <div class="course-number">
            MATA KULIAH ${index + 1}
          </div>
          <h3>${course.name}</h3>
          <p><b>Dosen Pengampu:</b></p>
          ${course.lecturers.map(d =>
            `<p>• ${d}</p>`
          ).join("")}
          <p style="margin-top:12px">
            <b>Semester:</b> 1
          </p>
          <button class="primary"
            style="margin-top:12px"
            onclick="selectCourse('${course.name}')">
            Input Absensi
          </button>
        </div>
      `;
    });
}

function renderDashboardCourses() {
  const container = document.getElementById(
    "dashboardCourses"
  );

  container.innerHTML = "";

  courses.slice(0, 6).forEach((course, index) => {
    container.innerHTML += `
      <div class="course-card">
        <div class="course-number">MATA KULIAH ${index + 1}</div>
        <h3>${course.name}</h3>
        <p><b>Dosen:</b></p>
        ${course.lecturers.map(d => `<p>• ${d}</p>`).join("")}
      </div>
    `;
  });
}

// ==========================================
// PILIH MATA KULIAH
// ==========================================

function loadCourseOptions() {
  const select = document.getElementById("courseSelect");

  select.innerHTML = courses.map(course =>
    `<option value="${course.name}">${course.name}</option>`
  ).join("");

  updateCourseInfo();
}

function selectCourse(name) {
  document.getElementById("courseSelect").value = name;
  updateCourseInfo();
  showPage("absensi");
}

function updateCourseInfo() {
  const name = document.getElementById("courseSelect").value;
  const course = courses.find(c => c.name === name);

  if (!course) return;

  document.getElementById("courseInfo").innerHTML = `
    <b>${course.name}</b><br>
    Semester: 1<br>
    Kelas: ITP B<br>
    Dosen Pengampu:<br>
    ${course.lecturers.map(d => "• " + d).join("<br>")}
  `;
}

// ==========================================
// SIMPAN ABSENSI
// ==========================================

function saveAttendance() {
  const course = document.getElementById("courseSelect").value;
  const date = document.getElementById("attendanceDate").value;
  const meeting = Number(
    document.getElementById("meetingNumber").value
  );
  const status = document.getElementById("attendanceStatus").value;
  const note = document.getElementById("attendanceNote").value;

  if (!date || !meeting || meeting < 1 || meeting > 30) {
    alert("Isi tanggal dan nomor pertemuan dengan benar!");
    return;
  }

  const existingIndex = attendance.findIndex(item =>
    item.course === course &&
    item.meeting === meeting
  );

  const record = {
    id: existingIndex >= 0
      ? attendance[existingIndex].id
      : Date.now(),
    course,
    date,
    meeting,
    status,
    note
  };

  if (existingIndex >= 0) {
    attendance[existingIndex] = record;
  } else {
    attendance.push(record);
  }

  saveData();

  alert("Absensi berhasil disimpan!");

  document.getElementById("attendanceNote").value = "";

  updateDashboard();
  renderHistory();
  renderRecap();
}

// ==========================================
// RIWAYAT ABSENSI
// ==========================================

function renderHistory() {
  const table = document.getElementById("historyTable");

  if (attendance.length === 0) {
    table.innerHTML = `
      <tr>
        <td colspan="6">Belum ada data absensi.</td>
      </tr>
    `;
    return;
  }

  table.innerHTML = [...attendance]
    .sort((a, b) => b.date.localeCompare(a.date))
    .map(item => `
      <tr>
        <td>${item.date}</td>
        <td>${item.course}</td>
        <td>${item.meeting}</td>
        <td>
          <span class="status ${item.status}">
            ${item.status}
          </span>
        </td>
        <td>${escapeHTML(item.note || "-")}</td>
        <td>
          <button class="delete-btn"
            onclick="deleteAttendance(${item.id})">
            Hapus
          </button>
        </td>
      </tr>
    `).join("");
}

// ==========================================
// HAPUS ABSENSI
// ==========================================

function deleteAttendance(id) {
  if (!confirm("Apakah kamu yakin ingin menghapus data ini?")) {
    return;
  }

  attendance = attendance.filter(item => item.id !== id);

  saveData();
  renderHistory();
  renderRecap();
  updateDashboard();
}

// ==========================================
// REKAP KEHADIRAN
// ==========================================

function renderRecap() {
  const table = document.getElementById("recapTable");

  table.innerHTML = courses.map(course => {
    const records = attendance.filter(
      item => item.course === course.name
    );

    const count = status =>
      records.filter(item => item.status === status).length;

    const hadir = count("Hadir");
    const izin = count("Izin");
    const sakit = count("Sakit");
    const alpa = count("Alpa");

    const percentage = records.length
      ? Math.round((hadir / records.length) * 100)
      : 0;

    return `
      <tr>
        <td>${course.name}</td>
        <td>${records.length}</td>
        <td>${hadir}</td>
        <td>${izin}</td>
        <td>${sakit}</td>
        <td>${alpa}</td>
        <td><b>${percentage}%</b></td>
      </tr>
    `;
  }).join("");
}

// ==========================================
// DASHBOARD
// ==========================================

function updateDashboard() {
  const total = attendance.length;
  const hadir = attendance.filter(
    item => item.status === "Hadir"
  ).length;

  const percentage = total
    ? Math.round((hadir / total) * 100)
    : 0;

  document.getElementById("totalMatkul").textContent =
    courses.length;

  document.getElementById("totalPertemuan").textContent =
    total;

  document.getElementById("totalHadir").textContent =
    hadir;

  document.getElementById("persentase").textContent =
    percentage + "%";
}

// ==========================================
// KEAMANAN TAMPILAN TEKS
// ==========================================

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}

// ==========================================
// MULAI APLIKASI
// ==========================================

document.getElementById("attendanceDate").value =
  new Date().toLocaleDateString("en-CA");

loadCourseOptions();
renderCourses();
renderDashboardCourses();
updateDashboard();
renderHistory();
renderRecap();

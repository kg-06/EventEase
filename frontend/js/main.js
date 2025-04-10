async function loadData(url, tableId, formatter) {
    try {
      const res = await fetch(url);
      const result = await res.json();
      const data = result.data || result;
      const tbody = document.querySelector(`#${tableId} tbody`);
      if (!tbody) return;
      tbody.innerHTML = "";
      data.forEach(item => {
        const row = document.createElement("tr");
        formatter(item).forEach(cellData => {
          const td = document.createElement("td");
          td.textContent = cellData;
          row.appendChild(td);
        });
        tbody.appendChild(row);
      });
    } catch (err) {
      console.error("Error loading", url, err);
    }
  }
  
  window.addEventListener("DOMContentLoaded", () => {
    loadData("http://localhost:3000/users", "user-table", (u) => [u.id, u.name, u.email]);
    loadData("http://localhost:3000/events", "event-table", (e) => [e.id, e.name, e.date]);
    loadData("http://localhost:3000/assignments", "assignment-table", (a) => [a.userId, a.eventId]);
  });
  
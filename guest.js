const modal = document.createElement('div');
modal.classList.add('modal');
modal.innerHTML = `
 <div class="modal-content">
    <span class="close">&times;</span>
    <h2>Book Your Stay</h2>
    <form id="bookingForm" action="https://formspree.io/f/xzzkekgy" method="POST">
      <label for="room">Select Room:</label>
      <select id="room" name="room" required>
        <option value="">-- Choose a Room --</option>
        <option value="Sunrise View Room">Sunrise View Room</option>
        <option value="Backyard View Room">Backyard View Room</option>
        <option value="Garden Escape Room">Garden Escape Room</option>
        <option value="Family Garden-View Room">Family Garden-View Room</option>
      </select>

      <label>Check-in:</label>
      <input type="date" id="checkIn" name="checkIn" required>

      <label>Check-out:</label>
      <input type="date" id="checkOut" name="checkOut" required>

      <label>Guests:</label>
      <input type="number" id="guests" name="guests" min="1" value="1" required>

      <button class="btn" type="submit">Confirm Booking</button>
      <p id="formMessage" style="margin-top:10px; text-align:center; font-weight:500;"></p>
    </form>
  </div>
`;
document.body.appendChild(modal);

const closeBtn = modal.querySelector('.close');
const form = modal.querySelector('#bookingForm');
const formMessage = modal.querySelector('#formMessage');

document.getElementById('bookNow')?.addEventListener('click', () => {
    document.getElementById('room').value = '';
    modal.style.display = 'flex';
});

document.querySelectorAll('.btn[data-room]').forEach(btn => {
    btn.addEventListener('click', () => {
        const roomType = btn.getAttribute('data-room');
        const roomSelect = document.getElementById('room');
        roomSelect.value = roomType;
        modal.style.display = 'flex';
    });
});

closeBtn.addEventListener('click', () => (modal.style.display = 'none'));
window.addEventListener('click', e => {
    if (e.target === modal) modal.style.display = 'none';
});

form.addEventListener('submit', async e => {
    e.preventDefault();

    const formData = new FormData(form);
    const roomSelected = formData.get("room");

    if (!roomSelected) {
        formMessage.textContent = "⚠️ Please select a room type.";
        formMessage.style.color = "red";
        return;
    }

    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: { Accept: 'application/json' }
        });

        if (response.ok) {
            formMessage.textContent = "✅ Booking sent successfully!";
            formMessage.style.color = "green";
            form.reset();
            document.getElementById('room').value = roomSelected;
            setTimeout(() => (modal.style.display = 'none'), 1500);
        } else {
            throw new Error("Failed to send form");
        }
    } catch (error) {
        formMessage.textContent = "❌ Something went wrong. Please try again.";
        formMessage.style.color = "red";
    }
});

const path = window.location.pathname;
const page = path.substring(path.lastIndexOf('/') + 1) || 'index.html';

document.querySelectorAll('nav a').forEach(link => {
    link.classList.remove('active');

    const href = link.getAttribute('href');

    if (
        (page === '' && href.includes('index.html')) ||
        (page === 'index.html' && href.includes('index.html')) ||
        (href === page)
    ) {
        link.classList.add('active');
    }
});


const reviewsSlider = document.querySelector('.reviews-slider');
if (reviewsSlider) {
    reviewsSlider.addEventListener('mouseenter', () => {
        reviewsSlider.style.animationPlayState = 'paused';
    });
    reviewsSlider.addEventListener('mouseleave', () => {
        reviewsSlider.style.animationPlayState = 'running';
    });
}
// ===== BOOK NOW FIXED =====
document.getElementById("bookNow")?.addEventListener("click", function () {
  // Smooth scroll to booking form section
  const bookingSection = document.querySelector("#booking");
  if (bookingSection) {
    bookingSection.scrollIntoView({ behavior: "smooth" });

    // Wait a bit for mobile rendering
    setTimeout(() => {
      // Reset the form properly
      const form = bookingSection.querySelector("form");
      if (form) form.reset();

      // Keep the first room type selected so mobile browsers don’t blank it
      const select = form.querySelector("select[name='roomType']");
      if (select && select.options.length > 0) {
        select.selectedIndex = 0;
      }
    }, 300);
  }
});


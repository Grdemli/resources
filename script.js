function openLightbox(src) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = src;
    lightbox.style.display = 'flex';
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}
    const STORAGE_KEY = 'millennium_grade6_checklist';

    document.addEventListener('DOMContentLoaded', () => {
        loadState();
        updateProgress();
    });

    function toggleItem(checkbox) {
        const row = checkbox.closest('tr');
        if (checkbox.checked) {
            row.classList.add('completed');
        } else {
            row.classList.remove('completed');
        }
        saveState();
        updateProgress();
    }

    function saveState() {
        const state = {};
        document.querySelectorAll('tr[data-id]').forEach(row => {
            const id = row.getAttribute('data-id');
            const checkbox = row.querySelector('input[type="checkbox"]');
            if (checkbox) {
                state[id] = checkbox.checked;
            }
        });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }

    function loadState() {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (!saved) return;
        
        try {
            const state = JSON.parse(saved);
            document.querySelectorAll('tr[data-id]').forEach(row => {
                const id = row.getAttribute('data-id');
                const checkbox = row.querySelector('input[type="checkbox"]');
                if (checkbox && state[id]) {
                    checkbox.checked = true;
                    row.classList.add('completed');
                }
            });
        } catch (e) {
            console.error("Failed to load saved checklist state:", e);
        }
    }

    function updateProgress() {
        const allCheckboxes = document.querySelectorAll('tr[data-id] input[type="checkbox"]');
        const checkedCheckboxes = document.querySelectorAll('tr[data-id] input[type="checkbox"]:checked');
        
        const total = allCheckboxes.length;
        const current = checkedCheckboxes.length;
        const percentage = total > 0 ? Math.round((current / total) * 100) : 0;

        document.getElementById('progress-text').textContent = `${current} / ${total} (${percentage}%)`;
        document.getElementById('progress-fill').style.width = `${percentage}%`;
    }

    function resetChecklist() {
        if (confirm('ნამდვილად გსურთ ყველა მონიშვნის წაშლა?')) {
            localStorage.removeItem(STORAGE_KEY);
            document.querySelectorAll('tr[data-id]').forEach(row => {
                const checkbox = row.querySelector('input[type="checkbox"]');
                if (checkbox) checkbox.checked = false;
                row.classList.remove('completed');
            });
            updateProgress();
        }
    }
	function toggleSection(headerElement) {
    const content = headerElement.nextElementSibling;
    
    headerElement.classList.toggle('collapsed');
    content.classList.toggle('hidden');
}

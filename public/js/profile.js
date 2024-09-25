function setGlobalItemCount() {
    const itemCount = parseInt(document.getElementById('globalItemCount').value) || 3;
    const sections = document.querySelectorAll('.middle-content .list-group'); // Target only list-groups in middle-content
    sections.forEach(section => {
        const items = section.querySelectorAll('.list-group-item');
        items.forEach((item, index) => {
            item.style.display = (index < itemCount) ? 'block' : 'none';
        });
        const toggleButton = document.getElementById(`toggleButton-${section.id.replace('list-', '')}`);
        toggleButton.style.display = items.length > itemCount ? 'inline' : 'none';
    });
}

function toggleView(button, sectionId) {
    const listItems = button.closest('.mb-4').querySelectorAll('.list-group-item');
    const isExpanded = button.innerText === 'Collapse';

    listItems.forEach((item, index) => {
        if (index >= 3) {
            item.style.display = isExpanded ? 'none' : 'block';
        }
    });

    button.innerText = isExpanded ? 'View All' : 'Collapse';
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Initialize the display on page load
document.addEventListener('DOMContentLoaded', () => {
    setGlobalItemCount();
});

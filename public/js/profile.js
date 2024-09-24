function toggleView(button, sectionTitle) {
    const listItems = button.closest('.mb-4').querySelectorAll('.list-group-item');
    const isExpanded = button.innerText === 'Collapse';
    
    listItems.forEach((item, index) => {
        if (index >= 3) {
            item.style.display = isExpanded ? 'none' : 'block';
        }
    });

    button.innerText = isExpanded ? 'View All' : 'Collapse';
}

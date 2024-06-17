document.addEventListener('DOMContentLoaded', function() {
    const trendingContent = [
        { title: 'Panchayat', img: 'images/Panchayat.png', details: 'content-details.html' },
        { title: 'The Boys', img: 'images/The Boys.png', details: 'content-details.html' },
        // Add more content here
    ];

    const topRatedContent = [
        { title: 'Gullak', img: 'images/Gullak.png', details: 'content-details.html' },
        { title: 'The Boys', img: 'images/The Boys.png', details: 'content-details.html' },
        // Add more content here
    ];

    const newReleasesContent = [
        { title: 'Panchayat', img: 'images/Panchayat.png', details: 'content-details.html' },
        { title: 'Gullak', img: 'images/Gullak.png', details: 'content-details.html' },
        // Add more content here
    ];

    function displayContent(contentArray, containerId) {
        const container = document.querySelector(`#${containerId} .content-grid`);
        contentArray.forEach(content => {
            const contentItem = document.createElement('a');
            contentItem.href = content.details;
            contentItem.classList.add('content-item');
            contentItem.innerHTML = `
                <img src="${content.img}" alt="${content.title}">
                <h3>${content.title}</h3>
            `;
            container.appendChild(contentItem);
        });
    }

    displayContent(trendingContent, 'trending');
    displayContent(topRatedContent, 'top-rated');
    displayContent(newReleasesContent, 'new-releases');

    const searchBar = document.getElementById('search-bar');
    const searchBtn = document.getElementById('search-btn');

    searchBtn.addEventListener('click', function() {
        const query = searchBar.value.toLowerCase();
        const allContentItems = document.querySelectorAll('.content-item');
        allContentItems.forEach(item => {
            const title = item.querySelector('h3').textContent.toLowerCase();
            if (title.includes(query)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });

    searchBar.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            searchBtn.click();
        }
    });
});

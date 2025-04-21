document.addEventListener('DOMContentLoaded', () => {
    const tabContainers = document.querySelectorAll('.tab-container');

    tabContainers.forEach(container => {
        const buttons = container.querySelectorAll('.tab-button');
        const contents = container.querySelectorAll('.tab-content');

        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const targetId = button.getAttribute('data-tab-target');

                // Deactivate all buttons and contents within this container
                buttons.forEach(btn => btn.classList.remove('active'));
                contents.forEach(content => content.classList.remove('active'));

                // Activate the clicked button and corresponding content
                button.classList.add('active');
                const targetContent = container.querySelector(`#${targetId}`);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });

        // Activate the first tab by default if none are active
        if (container.querySelector('.tab-button.active') === null && buttons.length > 0) {
            buttons[0].click(); // Simulate a click on the first button
        }
    });
}); 
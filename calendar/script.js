document.addEventListener('DOMContentLoaded', () => {
    const monthYearElement = document.getElementById('month-year');
    const daysElement = document.getElementById('calendar-days');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');

    // Always show current month on reload
    const today = new Date();
    let currentDate = new Date(today);
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();
    
    // Store the selected date
    let selectedDate = null;

    // Array of month names
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    // Function to render the calendar
    function renderCalendar() {
        // Clear previous days
        daysElement.innerHTML = '';

        // Set the month and year in the header
        monthYearElement.textContent = `${months[currentMonth]} ${currentYear}`;

        // Get the first day of the month and the number of days in the month
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

        // Previous month's days
        for (let i = firstDay; i > 0; i--) {
            const dayElement = createDayElement(daysInPrevMonth - i + 1, 'other-month');
            daysElement.appendChild(dayElement);
        }

        // Current month's days
        for (let i = 1; i <= daysInMonth; i++) {
            const isToday = i === today.getDate() && 
                          currentMonth === today.getMonth() && 
                          currentYear === today.getFullYear();
            const isSelected = selectedDate && 
                             i === selectedDate.getDate() && 
                             currentMonth === selectedDate.getMonth() && 
                             currentYear === selectedDate.getFullYear();
            
            let dayClass = '';
            if (isToday) dayClass += 'today ';
            if (isSelected) dayClass += 'selected';
            
            const dayElement = createDayElement(i, dayClass.trim());
            daysElement.appendChild(dayElement);
        }

        // Next month's days
        const daysToAdd = 42 - (firstDay + daysInMonth); // 6 rows x 7 days = 42 cells
        for (let i = 1; i <= daysToAdd; i++) {
            const dayElement = createDayElement(i, 'other-month');
            daysElement.appendChild(dayElement);
        }
    }


    // Function to create a day element
    function createDayElement(day, className = '') {
        const dayElement = document.createElement('div');
        dayElement.className = `day ${className}`;
        dayElement.textContent = day;
        
        // Add click event to each day
        dayElement.addEventListener('click', () => {
            // Remove selected class from all days
            document.querySelectorAll('.day').forEach(dayEl => {
                dayEl.classList.remove('selected');
            });
            
            // Add selected class to clicked day
            dayElement.classList.add('selected');
            
            // Store the selected date
            selectedDate = new Date(currentYear, currentMonth, day);
            
            console.log(`Selected: ${day} ${months[currentMonth]} ${currentYear}`);
        });
        
        return dayElement;
    }

    // Event listeners for previous and next buttons
    prevBtn.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar();
        // Scroll to top of calendar after changing months
        document.querySelector('.container').scrollIntoView({ behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar();
        // Scroll to top of calendar after changing months
        document.querySelector('.container').scrollIntoView({ behavior: 'smooth' });
    });

    // Initial render
    renderCalendar();
});

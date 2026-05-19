// Form submission handler
document.getElementById('transferForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    // Get form data
    const formData = {
        orangeCash: document.getElementById('orangeCash').value.trim(),
        instapay: document.getElementById('instapay').value.trim(),
        amount: parseFloat(document.getElementById('amount').value),
        timestamp: new Date().toLocaleString('ar-EG'),
        commission: 5
    };

    // Validate data
    if (!validateForm(formData)) {
        alert('يرجى ملء جميع الحقول بشكل صحيح');
        return;
    }

    // Disable submit button
    const submitBtn = document.querySelector('.submit-btn');
    submitBtn.disabled = true;
    submitBtn.textContent = 'جاري الإرسال...';

    try {
        // Send to backend
        const response = await sendToBackend(formData);

        if (response.ok) {
            // Show success message
            showSuccessMessage();
            // Reset form
            document.getElementById('transferForm').reset();
        } else {
            alert('حدث خطأ. يرجى المحاولة مرة أخرى');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('خطأ في الاتصال. تأكد من اتصالك بالإنترنت');
    } finally {
        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.textContent = 'إرسال الطلب';
    }
});

// Form validation
function validateForm(data) {
    // Validate Orange Cash number (10-15 digits)
    if (!/^[0-9]{10,15}$/.test(data.orangeCash)) {
        console.warn('Invalid Orange Cash number');
        return false;
    }

    // Validate InstaPay number (10-15 digits)
    if (!/^[0-9]{10,15}$/.test(data.instapay)) {
        console.warn('Invalid InstaPay number');
        return false;
    }

    // Validate amount (must be positive)
    if (data.amount <= 0) {
        console.warn('Amount must be positive');
        return false;
    }

    return true;
}

// Send data to backend
async function sendToBackend(data) {
    // Option 1: Using Formspree (uncomment and update URL)
    // const formspreeUrl = 'https://formspree.io/f/YOUR_FORM_ID';
    // return await fetch(formspreeUrl, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(data)
    // });

    // Option 2: Using local backend (Node.js/Express or PHP)
    return await fetch('/api/submit-transfer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
}

// Show success message
function showSuccessMessage() {
    const successMessage = document.getElementById('successMessage');
    successMessage.style.display = 'flex';

    // Auto-hide after 5 seconds
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 5000);
}

// Reset form
function resetForm() {
    document.getElementById('transferForm').reset();
    document.getElementById('successMessage').style.display = 'none';
}
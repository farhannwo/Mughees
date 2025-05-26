// Initialize Firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-app-compat.js';
import { getDatabase, ref, push, onValue } from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-database-compat.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

//upddkdnnd

import { getDatabase, ref, onValue } from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-database-compat.js';

const statusDiv = document.getElementById('firebase-status');
const testRef = ref(database, '.info/connected');
onValue(testRef, (snapshot) => {
  if (snapshot.val() === true) {
    statusDiv.textContent = 'Firebase Connected';
    statusDiv.style.background = '#d4edda';
    statusDiv.style.color = '#155724';
  } else {
    statusDiv.textContent = 'Firebase Not Connected';
    statusDiv.style.background = '#f8d7da';
    statusDiv.style.color = '#721c24';
  }
});


//e7dudhdh


// Mobile Menu Toggle
document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
    document.querySelector('.mobile-menu').classList.toggle('active');
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        
        // Close mobile menu if open
        document.querySelector('.mobile-menu').classList.remove('active');
    });
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;
        
        // Save to Firebase
        const contactsRef = ref(database, 'contacts');
        push(contactsRef, {
            name: name,
            email: email,
            phone: phone,
            message: message,
            timestamp: new Date().toISOString()
        }).then(() => {
            alert('Thank you for your message! We will contact you soon.');
            contactForm.reset();
        }).catch((error) => {
            console.error('Error saving contact:', error);
            alert('There was an error sending your message. Please try again.');
        });
    });
}

// Content Editor Functionality
function setupContentEditing() {
    const editableElements = document.querySelectorAll('[data-editable]');
    
    editableElements.forEach(element => {
        element.addEventListener('click', function(e) {
            // Don't trigger if clicking a link inside the element
            if (e.target.tagName === 'A') return;
            
            const key = this.getAttribute('data-editable');
            const currentContent = this.innerHTML;
            
            // Create editor UI
            const editor = document.createElement('div');
            editor.className = 'content-editor';
            editor.style.position = 'fixed';
            editor.style.top = '50%';
            editor.style.left = '50%';
            editor.style.transform = 'translate(-50%, -50%)';
            editor.style.backgroundColor = 'white';
            editor.style.padding = '20px';
            editor.style.borderRadius = '5px';
            editor.style.boxShadow = '0 0 20px rgba(0,0,0,0.2)';
            editor.style.zIndex = '10000';
            editor.style.width = '80%';
            editor.style.maxWidth = '600px';
            
            // Create textarea
            const textarea = document.createElement('textarea');
            textarea.style.width = '100%';
            textarea.style.minHeight = '200px';
            textarea.style.padding = '10px';
            textarea.style.border = '1px solid #ddd';
            textarea.style.borderRadius = '5px';
            textarea.style.fontFamily = 'inherit';
            textarea.value = currentContent;
            editor.appendChild(textarea);
            
            // Create button container
            const buttonContainer = document.createElement('div');
            buttonContainer.style.display = 'flex';
            buttonContainer.style.justifyContent = 'flex-end';
            buttonContainer.style.gap = '10px';
            buttonContainer.style.marginTop = '15px';
            
            // Create save button
            const saveButton = document.createElement('button');
            saveButton.textContent = 'Save';
            saveButton.className = 'btn';
            saveButton.addEventListener('click', function() {
                const newContent = textarea.value;
                element.innerHTML = newContent;
                
                // Save to Firebase
                const contentRef = ref(database, 'websiteContent/' + key);
                push(contentRef, {
                    content: newContent,
                    updatedAt: new Date().toISOString()
                });
                
                document.body.removeChild(editor);
            });
            
            // Create cancel button
            const cancelButton = document.createElement('button');
            cancelButton.textContent = 'Cancel';
            cancelButton.style.backgroundColor = '#ccc';
            cancelButton.style.border = 'none';
            cancelButton.style.padding = '10px 20px';
            cancelButton.style.borderRadius = '5px';
            cancelButton.style.cursor = 'pointer';
            cancelButton.addEventListener('click', function() {
                document.body.removeChild(editor);
            });
            
            buttonContainer.appendChild(cancelButton);
            buttonContainer.appendChild(saveButton);
            editor.appendChild(buttonContainer);
            
            // Add overlay
            const overlay = document.createElement('div');
            overlay.style.position = 'fixed';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
            overlay.style.zIndex = '9999';
            
            overlay.addEventListener('click', function() {
                document.body.removeChild(overlay);
                document.body.removeChild(editor);
            });
            
            document.body.appendChild(overlay);
            document.body.appendChild(editor);
        });
    });
}

// Load saved content from Firebase
function loadContent() {
    const contentRef = ref(database, 'websiteContent');
    onValue(contentRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            Object.keys(data).forEach(key => {
                const element = document.querySelector(`[data-editable="${key}"]`);
                if (element) {
                    // Get the most recent version
                    const versions = Object.values(data[key]);
                    const latest = versions[versions.length - 1];
                    element.innerHTML = latest.content;
                }
            });
        }
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setupContentEditing();
    loadContent();
    
    // Set active nav link based on scroll position
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                const id = section.getAttribute('id');
                document.querySelectorAll('nav a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
});
// Anti-scraping and copy protection
document.addEventListener('contextmenu', event => event.preventDefault());

document.addEventListener('keydown', function(e) {
    // Mac screenshot shortcuts (Cmd+Shift+3, Cmd+Shift+4, Cmd+Shift+5)
    if (e.metaKey && e.shiftKey && (e.key === '3' || e.key === '4' || e.key === '5')) {
        e.preventDefault();
        protectContent();
        setTimeout(unprotectContent, 3000);
        return false;
    }

    // Windows screenshot shortcut (Win+Shift+S)
    if (e.metaKey && e.shiftKey && (e.key === 'S' || e.key === 's')) {
        e.preventDefault();
        protectContent();
        setTimeout(unprotectContent, 3000);
        return false;
    }

    // Disable F12
    if (e.key === 'F12' || e.keyCode === 123) {
        e.preventDefault();
        return false;
    }
    
    // Disable Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, Cmd+Opt+I, Cmd+Opt+J, Cmd+U
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.keyCode === 73)) {
        e.preventDefault();
        return false;
    }
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'J' || e.key === 'j' || e.keyCode === 74)) {
        e.preventDefault();
        return false;
    }
    if ((e.ctrlKey || e.metaKey) && (e.key === 'U' || e.key === 'u' || e.keyCode === 85)) {
        e.preventDefault();
        return false;
    }
    
    // Disable Ctrl+S (Save), Ctrl+P (Print), Ctrl+C (Copy), Cmd+C
    if ((e.ctrlKey || e.metaKey) && (e.key === 'S' || e.key === 's' || e.keyCode === 83 || 
                                     e.key === 'P' || e.key === 'p' || e.keyCode === 80 || 
                                     e.key === 'C' || e.key === 'c' || e.keyCode === 67)) {
        e.preventDefault();
        if (e.key === 'C' || e.key === 'c' || e.keyCode === 67) {
            navigator.clipboard.writeText('Content is protected.');
        }
        return false;
    }
});

// Disable drag and drop for images
document.addEventListener('dragstart', function(e) {
    if (e.target.nodeName.toUpperCase() === "IMG") {
        e.preventDefault();
    }
});

// Advanced screen capture deterrence
const blurOverlay = document.createElement('div');
blurOverlay.id = 'protection-overlay';
blurOverlay.style.position = 'fixed';
blurOverlay.style.top = '0';
blurOverlay.style.left = '0';
blurOverlay.style.width = '100vw';
blurOverlay.style.height = '100vh';
blurOverlay.style.backgroundColor = '#000';
blurOverlay.style.color = '#fff';
blurOverlay.style.display = 'flex';
blurOverlay.style.alignItems = 'center';
blurOverlay.style.justifyContent = 'center';
blurOverlay.style.fontSize = '2rem';
blurOverlay.style.fontFamily = 'sans-serif';
blurOverlay.style.zIndex = '9999999';
blurOverlay.style.opacity = '0';
blurOverlay.style.pointerEvents = 'none';
blurOverlay.style.transition = 'opacity 0.1s';
blurOverlay.innerText = 'Content Protected';
document.body.appendChild(blurOverlay);

function protectContent() {
    document.body.classList.add('blur-content');
    blurOverlay.style.opacity = '1';
    // Clear clipboard just in case
    try {
        navigator.clipboard.writeText('');
    } catch (e) {}
}

function unprotectContent() {
    document.body.classList.remove('blur-content');
    blurOverlay.style.opacity = '0';
}

window.addEventListener('blur', protectContent);
window.addEventListener('focus', unprotectContent);
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        protectContent();
    } else {
        unprotectContent();
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'PrintScreen') {
        protectContent();
        try {
            navigator.clipboard.writeText('');
        } catch (e) {}
        setTimeout(unprotectContent, 2000);
    }
});

// Prevent copy, cut, paste entirely
['copy', 'cut', 'paste'].forEach(function(event) {
    document.addEventListener(event, function(e) {
        e.preventDefault();
        try {
            navigator.clipboard.writeText('Content is protected.');
        } catch(err) {}
    });
});

// Prevent selectstart
document.addEventListener('selectstart', function(e) {
    e.preventDefault();
});

// Detect DevTools by checking screen dimensions periodically
const checkDevTools = () => {
    // Prevent false positives on mobile (e.g., virtual keyboard opening)
    if (window.innerWidth <= 800 && /Mobi|Android/i.test(navigator.userAgent)) return;
    
    const threshold = 160;
    const widthDiff = window.outerWidth - window.innerWidth > threshold;
    const heightDiff = window.outerHeight - window.innerHeight > threshold;
    if (widthDiff || heightDiff) {
        protectContent();
    }
};
setInterval(checkDevTools, 1000);

// Decode protected contacts
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.protected-contact').forEach(element => {
        element.addEventListener('click', function(e) {
            e.preventDefault();
            const contact = atob(this.getAttribute('data-contact'));
            const display = atob(this.getAttribute('data-display'));
            this.href = contact;
            this.textContent = display;
            this.classList.remove('protected-contact');
            // Remove click listener by cloning
            const clone = this.cloneNode(true);
            this.parentNode.replaceChild(clone, this);
        });
    });
});

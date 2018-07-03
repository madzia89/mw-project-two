const containerForContent = document.getElementById('container')
const containerForNavbar = document.getElementById("navbar")
const containerForLogoMW = document.getElementById('container__main-logo')

containerForContent.addEventListener('mouseover', () => closeNav())
containerForLogoMW.addEventListener('mouseover', () => openNav())

const openNav = () => {
    if ((event.target === containerForLogoMW) &&
        (containerForNavbar.style.width == 0 ||
            containerForNavbar.style.width === '0px')) {
        return (
            containerForNavbar.style.width = "100px",
                containerForLogoMW.style.animationName = 'none'
        )
    }
}

const closeNav = () => {
    if ((event.target === containerForContent) &&
        (containerForNavbar.style.width === "100px")) {
        return (
            containerForNavbar.style.width = '0',
                containerForLogoMW.style.animationName = 'pulsate'
        )
    }
}


const Messenger = function (el) {
    'use strict';
    const m = this;

    m.init = function () {
        m.codeletters = "&#*+%?£@§$";
        m.message = 0;
        m.current_length = 0;
        m.fadeBuffer = false;
        m.messages = [
            'If you obey all the rules...',
            '...you miss all the fun.'
        ];
        setTimeout(m.animateIn, 100);
    };

    m.generateRandomString = function (length) {
        let random_text = '';
        while (random_text.length < length) {
            random_text += m.codeletters.charAt(Math.floor(Math.random() * m.codeletters.length));
        }
        return random_text;
    };

    m.animateIn = function () {
        if (m.current_length < m.messages[m.message].length) {
            m.current_length = m.current_length + 2;
            if (m.current_length > m.messages[m.message].length) {
                m.current_length = m.messages[m.message].length;
            }
            let message = m.generateRandomString(m.current_length);
            $(el).html(message);
            setTimeout(m.animateIn, 20);
        } else {
            setTimeout(m.animateFadeBuffer, 20);
        }
    };

    m.animateFadeBuffer = function () {
        if (m.fadeBuffer === false) {
            m.fadeBuffer = [];
            for (let i = 0; i < m.messages[m.message].length; i++) {
                m.fadeBuffer.push({c: (Math.floor(Math.random() * 12)) + 1, l: m.messages[m.message].charAt(i)});
            }
        }

        let do_cycles = false;
        let message = '';

        for (let i = 0; i < m.fadeBuffer.length; i++) {
            let fader = m.fadeBuffer[i];
            if (fader.c > 0) {
                do_cycles = true;
                fader.c--;
                message += m.codeletters.charAt(Math.floor(Math.random() * m.codeletters.length));
            } else {
                message += fader.l;
            }
        }

        $(el).html(message);

        if (do_cycles === true) {
            setTimeout(m.animateFadeBuffer, 50);
        } else {
            setTimeout(m.cycleText, 2000);
        }
    };

    m.cycleText = function () {
        m.message = m.message + 1;
        if (m.message >= m.messages.length) {
            m.message = 0;
        }

        m.current_length = 0;
        m.fadeBuffer = false;
        $(el).html('');

        setTimeout(m.animateIn, 200);
    };

    m.init();
}

console.clear();
let messenger = new Messenger($('#messenger'));

const contact = document.getElementById('contact__envelope')
const contactDiv = document.getElementById('container__contact-div')

window.addEventListener('click', () => openContact())
window.addEventListener('click', () => closeContact())

const openContact = () => {
    if (event.target === contact) {
        contactDiv.style.height = '100px'
        contact.style.visibility = 'hidden'
    }
}

const closeContact = () => {
    if (event.target !== contact) {
        contactDiv.style.height = '0px'
        contact.style.visibility = 'visible'
    }

}
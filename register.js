// change this for whatever you want if its not study permit in france
const yourLoginCredentials = {
    name: "pol",
    email: "anyone@example.com"
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const getElementWithClassTimeout = async (cl, retries) => {
    let select = null;
    let n = retries;
    
    while (!select && n-- > 0) {
        select = document.getElementsByClassName(cl);
        if (!select)
            await sleep(100);
    }
    if (!select) {
        console.error(`'${cl}'not found after ${retries} retries`);
        return null;
    }
    return select;
}

const master = async () => {
    // check main container
    const container = await getElementWithClassTimeout('nwaContent', 10);
    if (!container) {
        return console.error("'nwaContent' not found");
    }

    // get the name
    const nameField = document.querySelector('input[name="visitor_name"]');
    if (!nameField) {
        return console.error("input for name not found")
    }
    nameField.value = yourLoginCredentials.name;

    // get the email field
    const emailField = document.querySelector('input[name="email"]');
    if (!emailField) {
        return console.error("input for name not found")
    }
    emailField.value = yourLoginCredentials.email;

    // scroll
    const heading = document.getElementById('IMG_captcha');
    if (heading)
        heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

setTimeout(master, 100);

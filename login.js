const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const getElementTimeout = async (id, retries) => {
    let select = null;
    let n = retries;
    
    while (!select && n-- > 0) {
        select = document.getElementById(id);
        if (!select)
            await sleep(100);
    }
    if (!select) {
        console.error(`'${id}'not found after ${retries} retries`);
        return null;
    }
    return select;
}

const master = async () => {
    // check main container
    const terms = await getElementTimeout('custom_visitor_accept_terms', 10);
    if (!terms) {
        return console.error("'terms' not found");
    }
    sleep(10);
    terms.checked = true;
    terms.dispatchEvent(new Event('change', { bubbles: true }));
    sleep(100);

    const registerButton = await getElementTimeout('register', 10);
    if (!registerButton) {
        return console.error("'registerButton' not found");
    }
    registerButton.click();
}


setTimeout(master, 100);

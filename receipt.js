const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const getElementQuerryTimeout = async (query, retries) => {
    let select = null;
    let n = retries;
    
    while (!select && n-- > 0) {
        select = document.querySelector(query);
        if (!select)
            await sleep(100);
    }
    if (!select) {
        console.error(`'${query}'not found after ${retries} retries`);
        return null;
    }
    return select;
}

const master = async () => {
    // check main container
    const login = await getElementQuerryTimeout('.nwaBottom > input', 10);
    if (!login) {
        return console.error("'login' not found");
    }
    login.click();
}


setTimeout(master, 100);

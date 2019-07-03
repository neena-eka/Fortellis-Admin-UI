export const fetchEntityInfo = async ()=> {
    const response = await fetch(`https://f79j2bnnmi.execute-api.us-east-2.amazonaws.com/test/entity-info`);
    const error =
        response.status !== 200
            ? "Search not found"
            : null;

    const message = await response.text();
    return !error ? message : error;
};

export const postEntifyInfo = async (requestId, newStatus)=> {
    let searchParams = new URLSearchParams(`id=${requestId}&requestStatus=${newStatus}`)
    const response = await fetch(`https://f79j2bnnmi.execute-api.us-east-2.amazonaws.com/test/entity-info`, {
        method: 'POST',
        body: JSON.stringify({
            URLSearchParams: searchParams
        }),
        //headers: {
          //  "Access-Control-Allow-Origin": "*"
        //}
    });
    const error =
        response.status !== 202
            ? "Search not found"
            : null;

    const message = await response.text();
    console.log(!error ? message : error);
};
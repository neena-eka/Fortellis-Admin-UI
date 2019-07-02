export const fetchEntityInfo = async ()=> {
    const response = await fetch(`https://f79j2bnnmi.execute-api.us-east-2.amazonaws.com/test/entity-info`);
    const error =
        response.status !== 200
            ? "Search not found"
            : null;

    const message = await response.text();
    return !error ? message : error;
};
function strChecker(prop:string):boolean{
    if (prop.length === 0) return true;
    const match = prop.match(/^[a-zA-Z\s]+$/);
    if(!match)
        return false;
    else
        return true;
}

export default strChecker
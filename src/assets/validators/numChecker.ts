function numChecker(prop:string):boolean{
    if (prop.length === 0) return true;
    const match = prop.match(/^\d+$/);
    if(!match)
        return false;
    else
        return true;
}

export default numChecker
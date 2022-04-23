
export const calcAge = (date) => {
    const birthday = new Date(date);
    const presentDay = new Date();
    let diff = presentDay - birthday;
    return Math.trunc(diff / (1000 * 60 * 60 * 24 * 365.25));
}

export const createIdClient = (obj)=>{
    return `${obj.name.replace(" ","").toLowerCase()}${obj.lastName.replace(" ","").toLowerCase()}`
}

export const average=(list)=>{
    console.log(list)
    let sum=0;
    list.forEach(element => {
        sum+=element;
    })
    return (sum/list.length)}

export const standardDeviation=(list)=>{
    let averageValue = average(list);
    let distanceMediaTotal=0;
    list.forEach(element => { 
        distanceMediaTotal+=Math.pow(element-averageValue,2);
    })
    let data=distanceMediaTotal/list.length;
    return Math.sqrt(data);
}


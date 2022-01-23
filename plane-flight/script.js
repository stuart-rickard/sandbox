let output = "hello";
console.log(output);

let sendToConsole = whatever => console.log(whatever);
let compareNames = (member1, member2) => {
    if ( member1.name > member2.name ) {
        return 1;
    } else {
        return -1;
    }
}

let compareLong = (member1, member2) => {
    if ( member1.latLong.lng > member2.latLong.lng ) {
        return 1;
    } else {
        return -1;
    }
}
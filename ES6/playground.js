function number() {
    return 10;
}


let numberarrowFunction = () => {
    return 10;
};


console.log(numberarrowFunction());


var javascript = {
    name: 'JavaScript',
    libraries: ['React', 'Angular', 'Vue'],
    printLibraries: function () {
      
        this.libraries.forEach( (a) =>{
            console.log(`${this.name} loves ${a}`);
        })
    }
}

javascript.printLibraries();
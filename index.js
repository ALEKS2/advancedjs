// constructors
let Man = function(height){
    this.weight=height;
}
let aleks=new Man(14);
console.log(aleks);

// prototypes
Man.prototype.getWeight=function(){
    return this.weight;
}
console.log(aleks.getWeight());

// inheritance
// prototype inheritance
let toyota={
    drive(){
        return 'am driving toyota';
    }
};
let benz={
    type(){
        return 'iam a marcedez';
    }
};
Object.setPrototypeOf(benz,toyota);
console.log(benz.type());
console.log(benz.drive());

// another one
// constructor iheritance

// base class
let job = function(){
    this.pays=true;
};
// create a prototype function for the job object
job.prototype.printer=function(){
    console.log(this.pays);
}
// sub class
let techjob=function(title,pays){
    job.call(this); //for inheriting from the class job
    this.title=title;
    this.pays=pays;
};
// accessing the job printer prototype within techjob
techjob.prototype=Object.create(job.prototype);
// set the constructor for the techjob prototype
techjob.prototype.constructor=techjob;

// using a global prototype function
Object.prototype.print=function(){
console.log('this is a global prototype');
};

// create a techjob object
let jsprogrammer=new techjob('jspro',true);
let java=new techjob('java','nara');
console.log(jsprogrammer.printer());
console.log(java.print());

// another inheritance
let Human=function(eyes,legs){
    this.eyes=eyes;
    this.legs=legs;
}
Human.prototype.character=function(){
    console.log('i have '+this.legs+' legs and '+this.eyes+' eyes');

}
let Baby=function(eyes,legs){
  Human.call(this,eyes,legs);
}
Baby.prototype=Object.create(Human.prototype);
let leks=new Baby(3,4);
console.log(leks.character());

// object.assign  copying one object's properties into onother
let Jack={
    run(){
        return 'im a runner';
    },
    walk(){
        return 'just good';
    }
};
// create another object
let Ann={
    tall(){
        return 'the tallest';
    }
}
// copy the properties of jack into ann
Object.assign(Ann,Jack);
console.dir(Ann);

// add a new property to Jack
Object.assign(Jack,{
   power(){
       return 'im powerful';
   },
   height:344
});
console.dir(Jack);

// copy all Jack's properties into a new empty object
let newJack=Object.assign({},Jack);
console.dir(newJack);

// promises
let promiseToEat=new Promise(function(resolve,reject){
    // eating
    let isAte=true;
    // let isAte=false;
    if(isAte){
        resolve('eaten');
    }else{
        reject('i dont eat such');
    }
});

promiseToEat.then(function(fromResolve){
    console.log(`the food is ${fromResolve}`);
}).catch(function(fromReject){
    console.log(fromReject);
});

// promises with dependence
let wakeup=function(){
    return new Promise(function(resolve,rejaect){
        resolve('im awake');
    });
}
let takeShower=function(message){
    return new Promise(function(resolve,reject){
        resolve(message+ ' took a shower');
    });
}
let dressUp=function(message){
    return new Promise(function(resolve,reject){
        resolve(message+' dressed up');
    });
}
// running the promises
wakeup().then(function(fromResolve){
    return takeShower(fromResolve);
}).then(function(fromResolve){
    return dressUp(fromResolve);
}).then(function(fromResolve){
    console.log(fromResolve);
});

// running all promises in parallel
Promise.all([wakeup(),takeShower(),dressUp()]).then(function(){
    console.log('all finished');
});

// waiting for any of them to finish
Promise.race([wakeup(),takeShower(),dressUp()]).then(function(){
    console.log('one of them finished');
});

// currying
var avg=function(...n){
    let tot=0;
    for (let index = 0; index < n.length; index++) {
        tot += n[index];
    }
    return tot/n.length;
}
var spiceUp=function(fn,...n){
    return function(...m){
        return fn.apply(this,n.concat(m));
    }
}
var doAvg=spiceUp(avg, 1,2,3);
console.log(doAvg(4,5,6));

// using call
var obj={num:8};
var addThem=function(a,b,c){
    return this.num+a+b+c;
};
console.log(addThem.call(obj,7,9,6));

// using apply
var arr=[1,2,3];
console.log(addThem.apply(obj,arr));

// using bind
var bound=addThem.bind(obj);
console.log(bound(1,2,3));

// immediately invoked functions
(function(i){
    console.log(9+i);
})(2);

!function(){
    console.log('immediately invoked');
}();

// closures
var b=4;
var addster=function(){
   var a=8;
   return a+b;
};
console.log(addster());

// another closure
let addTo=function(num){
    let adder=function(innerNum){
        return num+innerNum;
    }
    return adder;
}
var addToFive=new addTo(5);
console.dir(addToFive);
var newnum=addToFive(10);
console.log(newnum);

// time out and time interval
var timeout1=()=>{
    console.log('first');
};
var timeout2=()=>{
    console.log('second');
};
var timeout3=()=>{
    console.log('third');
};
setTimeout(timeout1,0);
setTimeout(timeout2,1000);
setTimeout(timeout3,2000);

setInterval(timeout3,3000);

// iterators
let myarr=[1,3,4,5,6];
let itr=myarr[Symbol.iterator]();
console.log(itr.next());
// generators
function *generator(){
    yield 1;
    yield 2;
    yield 3;
}
let ittr=generator();
console.log(ittr.next());
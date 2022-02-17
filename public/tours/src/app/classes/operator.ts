

export class Operator{

    #_id:any;
    #name:String;
    #rating:Number;
    

    get _id(){return this.#_id}
    get name(){return this.#name}
    get rating(){return this.#rating}

    set name(name:String){this.#name =name}
    set rating(rating:Number){this.#rating=rating}

    constructor(id:any, name:String,rating:Number){
        this.#_id =id;
        this.#name =name;
        this.#rating =rating;
        
    }
    
}
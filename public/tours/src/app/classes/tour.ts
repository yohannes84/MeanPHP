export class Tour{

    #_id:any;
    #attraction:string;
    #country:string;
    #year:number
    

    get _id(){return this.#_id}
    get attraction(){return this.#attraction}
    get country(){return this.#country}
    get year(){return this.#year}

    set attraction(attraction:string){this.#attraction =attraction}
    set country(country:string){this.#country=country}
    set year(year:number){this.#year=year}

    constructor(id:any, attraction:string,country:string,year:number){
        this.#_id =id
        this.#attraction =attraction
        this.#country =country
        this.#year=year
    }
    
}
export class Vehicule {
   anneeModel: number;
   marqueVehicule: string;
   imageVehicule: string;
   descriptif: string;
   prix: number; 
   constructor(anneeModel: number,
    marqueVehicule: string,
    imageVehicule: string,
    descriptif: string,
    prix: number){
        this.anneeModel = anneeModel;
        this.imageVehicule = imageVehicule;
        this.marqueVehicule = marqueVehicule;
        this.descriptif = descriptif;
        this.prix = prix;
    }
}

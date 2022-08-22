export interface Recipe {
  id: number;
  name: string;
  pools: {
    nbPerson: number;
    cookingModes: {
      name: string;
      steps: {
        position: number;
        title: string;
        description: string;
      }[];
    }[];
  }[];
}

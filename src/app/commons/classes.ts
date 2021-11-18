

export class User {
    id: number;
    name: String;
    lastName: String;
  
    constructor(id: number, name: String, lastName: String) {
      this.id = id;
      this.name = name;
      this.lastName = lastName;
    }
  }
  
  export class PreconData {
    UID: string;
    Project_Name: string;
    City: string;
    Province: string;
    Latitude: string;
    Longitude: string;
    Beds: string;
    Baths: string;
    Area: string;
    Starting_Price: string;
    Type: string;
    Style: string;
    Developer: string;
    Aminites: string;
    Number_of_Images: string;
    Featured: string;
    Coming_Soon: string;
  
    constructor(UID: string,    Project_Name: string,    City: string,    Province: string,    Latitude: string,
      Longitude: string,    Beds: string,    Baths: string,    Area: string,    Starting_Price: string,    Type: string,
      Style: string,    Developer: string,    Aminites: string,    Number_of_Images: string,    Featured: string,
      Coming_Soon: string) {
        this.UID = UID;
        this.Project_Name = Project_Name;
        this.City = City;
        this.Province = Province;
        this.Latitude = Latitude;
        this.Longitude = Longitude;
        this.Beds = Beds;
        this.Baths = Baths;
        this.Area = Area;
        this.Starting_Price = Starting_Price;
        this.Type = Type;
        this.Style = Style;
        this.Developer = Developer;
        this.Aminites = Aminites;
        this.Number_of_Images = Number_of_Images;
        this.Featured = Featured;
        this.Coming_Soon = Coming_Soon;
    }
  }
  
  export class ReasonsList {
    header: string;
    description: string;
  
    constructor(header: string, description: string) {
      this.header = header;
      this.description = description;
    }
  }
  
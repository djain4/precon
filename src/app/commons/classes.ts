

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
    Project_Name: string;
    Project_Description: string;
    City: string;
    Region: string;
    Latitude: string;
    Longitude: string;
    Beds: string;
    Baths: string;
    Area: string;
    Walk_Score: string;
    Bike_Score: string;
    Transportation_Score: string;
    Year: string;
    ROI: string;
    Starting_Price: string;
    Type: string;
    Style: string;
    Occupancy_Date: string;
    Amenities: string;
    Number_of_Images: string;
    Featured: string;
  
    constructor(Project_Name: string, Project_Description: string, City: string, Region: string,
      Latitude: string, Longitude: string, Beds: string, Baths: string, Area: string, 
      Walk_Score: string, Bike_Score: string, Transportation_Score: string,
      Year: string, ROI: string, Starting_Price: string, Type: string, Style: string, Occupancy_Date: string,
      Amenities: string, Number_of_Images: string, Featured: string) {
        this.Project_Name = Project_Name;
        this.Project_Description = Project_Description;
        this.City = City;
        this.Region = Region;
        this.Latitude = Latitude;
        this.Longitude = Longitude;
        this.Beds = Beds;
        this.Baths = Baths;
        this.Area = Area;
        this.Walk_Score = Walk_Score;
        this.Bike_Score = Bike_Score;
        this.Transportation_Score = Transportation_Score;
        this.Year = Year;
        this.ROI = ROI;
        this.Starting_Price = Starting_Price;
        this.Type = Type;
        this.Style = Style;
        this.Occupancy_Date = Occupancy_Date;
        this.Amenities = Amenities;
        this.Number_of_Images = Number_of_Images;
        this.Featured = Featured;
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
  

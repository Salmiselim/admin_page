  export class Location {
    id: number;
    name: string;
    demand: number;
    startPoint: boolean;
    endPoint: boolean;
    latitude: number;
    longitude: number;
    demandts: any;
    constructor(
      id: number,
      name: string,
      demand: number,
      isStartPoint: boolean,
      isEndPoint: boolean,
      latitude: number,
      longitude: number
    ) {
      this.id = id;
      this.name = name;
      this.demand = demand;
      this.startPoint = isStartPoint;
      this.endPoint = isEndPoint;
      this.latitude = latitude;
      this.longitude = longitude;
    }
  }

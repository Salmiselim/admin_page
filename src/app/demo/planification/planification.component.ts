import { MiseadispositionService } from './../../services/miseadisposition.service';
import { Echange } from './../../models/echange';
import { EchangeService } from './../../services/echange.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { LocationServiceService } from 'src/app/services/location-service.service';
import { Location } from '../../models/location';
import { AppelfondService } from 'src/app/services/appelfond.service';
import { Appelfond } from '../../models/appelfond';
import { LeveefondService } from 'src/app/services/leveefond.service';
import { Leveefond } from '../../models/leveefond';
import 'leaflet-routing-machine';
import { Miseadisposition } from 'src/app/models/miseadisposition';

@Component({
  selector: 'app-planification',
  templateUrl: './planification.component.html',
  styleUrls: ['./planification.component.scss']
})
export class PlanificationComponent implements OnInit, AfterViewInit {
  locations: Location[];
  private map;
  route: Location[];
  distance: string = '';
  time: string = '';
  validerAppelfond: Appelfond[] = [];
  validerLeveefond: Leveefond[] = [];
  validerEchange: Echange[] = [];
  validerMAD: Miseadisposition[] = [];


  showModal: boolean = false;
  selectedAppelfondItem: Appelfond;
  selectedLeveefondItem: Leveefond;

  constructor(
    private locationService: LocationServiceService,
    private appelfondService: AppelfondService,
    private leveefondService: LeveefondService,
    private EchangeService: EchangeService,
    private MiseadispositionService: MiseadispositionService
  ) {}

  ngOnInit() {
    this.locationService.getLocations().subscribe(locations => {
      this.locations = locations;
      this.addMarkers();
    });

    this.appelfondService.getAF().subscribe(appelfonds => {
      this.validerAppelfond = appelfonds.filter(item => item.state === 'valider');
    });

    this.leveefondService.getLV().subscribe(leveefonds => {  // Add this block
      this.validerLeveefond = leveefonds.filter(item => item.state === 'valider');
    });
    this.EchangeService.getAllEchanges().subscribe(leveefonds => {
      this.validerEchange = leveefonds.filter(item => item.state === 'valider');
    });
    this.MiseadispositionService.getAllMiseADispositions().subscribe(MAD => {
      this.validerMAD = MAD.filter(item => item.state === 'valider');
    });
  }

  toggleLivrerState(appelfond: Appelfond): void {
    const newLivrerState = !appelfond.livrer;
    this.appelfondService.updateLivrerState(appelfond.codeAP, newLivrerState).subscribe(updatedAppelfond => {
      const index = this.validerAppelfond.findIndex(item => item.codeAP === updatedAppelfond.codeAP);
      if (index !== -1) {
        this.validerAppelfond[index].livrer = updatedAppelfond.livrer;
      }
    });
  }
  toggleLivrerStateEchange(echange: Echange): void {
    const newLivrerState = !echange.livrer;
    this.EchangeService.updateEchangeLivrerState(echange.codeEchange, newLivrerState).subscribe(updatedEchange => {
      const index = this.validerEchange.findIndex(item => item.codeEchange === updatedEchange.codeEchange);
      if (index !== -1) {
        this.validerEchange[index].livrer = updatedEchange.livrer;
      }
    });
  }
  toggleLivrerStateMAD(MAD: Miseadisposition): void {
    const newLivrerState = !MAD.livrer;
    this.MiseadispositionService.updateMiseADispositionLivrerState(MAD.codeMAD, newLivrerState).subscribe(updatedMAD => {
      const index = this.validerMAD.findIndex(item => item.codeMAD === updatedMAD.codeMAD);
      if (index !== -1) {
        this.validerMAD[index].livrer = updatedMAD.livrer;
      }
    });
  }
  toggleLeveefondLivrerState(id: number, event: any) {
    const newLivrerState = event.target.checked;
    this.leveefondService.updateLivrerState(id, newLivrerState).subscribe(
      response => {
        console.log('Update successful', response);
        // Update the local state if needed
        const index = this.validerLeveefond.findIndex(item => item.codeLV === id);
        if (index !== -1) {
          this.validerLeveefond[index].livrer = newLivrerState;
        }
      },
      error => {
        console.error('Update failed', error);
      }
    );
  }
  ngAfterViewInit(): void {
    this.initMap();
    this.locationService.getOptimalRoute().subscribe({
      next: (route) => {
        this.route = route;
        this.addRouteToMap();
      },
      error: (err) => {
        console.error('Failed to fetch route', err);
      }
    });
  }

  private initMap(): void {
    this.map = L.map('map').setView([36.806, 10.179], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(this.map);
    setTimeout(() => this.map.invalidateSize(), 0);
  }

  private addMarkers(): void {
    if (this.map && this.locations) {
      const startIcon = L.icon({
        iconUrl: '../../assets/images/startp.png',
        shadowUrl: '../../assets/images/marker-shadow.png',
        iconAnchor: [12, 41],
        shadowSize: [41, 41],
        shadowAnchor: [12, 41],
        popupAnchor: [1, -34],
        iconSize: [30, 41],
      });

      const endIcon = L.icon({
        iconUrl: '../../assets/images/endp.png',
        shadowUrl: '../../assets/images/marker-shadow.png',
        iconAnchor: [12, 41],
        shadowSize: [41, 41],
        shadowAnchor: [12, 41],
        popupAnchor: [1, -34],
        iconSize: [30, 41],
      });

      const waypointIcon = L.icon({
        iconUrl: '../../assets/images/wayp.png',
        shadowUrl: '../../assets/images/marker-shadow.png',
        iconAnchor: [12, 41],
        shadowSize: [41, 41],
        shadowAnchor: [12, 41],
        popupAnchor: [1, -34],
        iconSize: [30, 41],
      });

      this.locations.forEach(location => {
        console.log(`Location: ${location.name}, StartPoint: ${location.startPoint}, EndPoint: ${location.endPoint}`);

        if (location.latitude !== undefined && location.longitude !== undefined) {
          let icon;
          if (location.startPoint) {
            icon = startIcon;
          } else if (location.endPoint) {
            icon = endIcon;
          } else {
            icon = waypointIcon;
          }

          const marker = L.marker([location.latitude, location.longitude], { icon });
          marker.bindPopup(location.name).addTo(this.map);
        } else {
          console.warn(`Latitude or longitude missing for location: ${location.name}`);
        }
      });
    }
  }

  private addRouteToMap(): void {
    if (this.map && this.route) {
      const waypoints = this.route.map(location => L.latLng(location.latitude, location.longitude));
      const control = L.Routing.control({
        waypoints: waypoints,
        routeWhileDragging: true,
        router: L.Routing.osrmv1({
          serviceUrl: 'https://router.project-osrm.org/route/v1'
        }),
        lineOptions: {
          styles: [{ color: 'red', opacity: 1, weight: 5 }],
          extendToWaypoints: true,
          missingRouteTolerance: 0.2
        },
        createMarker: () => null,
        addWaypoints: false,
        draggableWaypoints: false,
        fitSelectedRoutes: true,
        show: false
      } as any).addTo(this.map);

      control.on('routesfound', (e) => {
        const routes = e.routes;
        if (routes.length > 0) {
          const route = routes[0];
          const summary = route.summary;
          this.distance = (summary.totalDistance / 1000).toFixed(2);
          this.time = this.formatTime(summary.totalTime);
        }
      });

      const routeControlContainer = control.getContainer();
      if (routeControlContainer) {
        routeControlContainer.style.display = 'none';
      }
    }
  }

  private formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours > 0 ? hours + 'h ' : ''}${minutes}min`;
  }

  getOrderedRouteNames(): string[] {
    return this.route ? this.route.map(location => location.name) : [];
  }

  showDetails(appelfondItem: Appelfond): void {
    this.selectedAppelfondItem = appelfondItem;
    this.showModal = true;
  }

  hideDetails(): void {
    this.showModal = false;
    this.selectedAppelfondItem = null;
  }

  showLeveefondDetails(leveefondItem: Leveefond): void {  // Add this function
    this.selectedLeveefondItem = leveefondItem;
    this.showModal = true;
  }

  hideLeveefondDetails(): void {  // Add this function
    this.showModal = false;
    this.selectedLeveefondItem = null;
  }

  planifierCircuit(): void {
    console.log("Starting planification circuit...");

    const agencesToRemove: number[] = []; // Store the codeAP of agences to be removed

    this.validerAppelfond.forEach(appelfondItem => {
      if (appelfondItem.livrer) {
        const agenceName = appelfondItem.responsable.agence.name;
        const agenceLatitude = appelfondItem.responsable.agence.latitude;
        const agenceLongitude = appelfondItem.responsable.agence.longitude;

        // Check if the location exists by name and coordinates
        const locationExists = this.locations.some(location =>
          location.name === agenceName &&
          location.latitude === agenceLatitude &&
          location.longitude === agenceLongitude
        );

        console.log(`Checking for agence: ${agenceName}`);
        console.log(`Location exists: ${locationExists}`);

        if (!locationExists) {
          console.log(`Adding new location for agence: ${agenceName}`);
          const newLocation = new Location(
            null,
            agenceName,
            0,
            false,
            false,
            agenceLatitude,
            agenceLongitude
          );

          this.locationService.addLocation(newLocation).subscribe({
            next: (addedLocation) => {
              this.locations.push(addedLocation);
              console.log(`Location added: ${addedLocation.name}`);
              this.refreshMarkers();
              this.refreshRoute();
              agencesToRemove.push(appelfondItem.codeAP);
              window.location.reload();
            },
            error: (error) => {
              console.error(`Failed to add location for agence: ${agenceName}`, error);
            }
          });
        }
      }
    });
    this.validerLeveefond.forEach(validerLeveefondItem => {
      if (validerLeveefondItem.livrer) {
        const agenceName = validerLeveefondItem.responsable.agence.name;
        const agenceLatitude = validerLeveefondItem.responsable.agence.latitude;
        const agenceLongitude = validerLeveefondItem.responsable.agence.longitude;

        // Check if the location exists by name and coordinates
        const locationExists = this.locations.some(location =>
          location.name === agenceName &&
          location.latitude === agenceLatitude &&
          location.longitude === agenceLongitude
        );

        console.log(`Checking for agence: ${agenceName}`);
        console.log(`Location exists: ${locationExists}`);

        if (!locationExists) {
          console.log(`Adding new location for agence: ${agenceName}`);
          const newLocation = new Location(
            null,
            agenceName,
            0,
            false,
            false,
            agenceLatitude,
            agenceLongitude
          );

          this.locationService.addLocation(newLocation).subscribe({
            next: (addedLocation) => {
              this.locations.push(addedLocation);
              console.log(`Location added: ${addedLocation.name}`);
              this.refreshMarkers();
              this.refreshRoute();
              agencesToRemove.push(validerLeveefondItem.codeLV);
              window.location.reload();
 // Add the agence codeAP to the removal list
            },
            error: (error) => {
              console.error(`Failed to add location for agence: ${agenceName}`, error);
            }
          });
        }
      }
    });
    this.validerMAD.forEach(validermaditem => {
      if (validermaditem.livrer) {
        const agenceName = validermaditem.responsable.agence.name;
        const agenceLatitude = validermaditem.responsable.agence.latitude;
        const agenceLongitude = validermaditem.responsable.agence.longitude;

        // Check if the location exists by name and coordinates
        const locationExists = this.locations.some(location =>
          location.name === agenceName &&
          location.latitude === agenceLatitude &&
          location.longitude === agenceLongitude
        );

        console.log(`Checking for agence: ${agenceName}`);
        console.log(`Location exists: ${locationExists}`);

        if (!locationExists) {
          console.log(`Adding new location for agence: ${agenceName}`);
          const newLocation = new Location(
            null,
            agenceName,
            0,
            false,
            false,
            agenceLatitude,
            agenceLongitude
          );

          this.locationService.addLocation(newLocation).subscribe({
            next: (addedLocation) => {
              this.locations.push(addedLocation);
              console.log(`Location added: ${addedLocation.name}`);
              this.refreshMarkers();
              this.refreshRoute();
              agencesToRemove.push(validermaditem.codeMAD);
              window.location.reload();
 // Add the agence codeAP to the removal list
            },
            error: (error) => {
              console.error(`Failed to add location for agence: ${agenceName}`, error);
            }
          });
        }
      }
    });
    this.validerEchange.forEach(echangeitem => {
      if (echangeitem.livrer) {
        const agenceName = echangeitem.responsable.agence.name;
        const agenceLatitude = echangeitem.responsable.agence.latitude;
        const agenceLongitude = echangeitem.responsable.agence.longitude;

        // Check if the location exists by name and coordinates
        const locationExists = this.locations.some(location =>
          location.name === agenceName &&
          location.latitude === agenceLatitude &&
          location.longitude === agenceLongitude
        );

        console.log(`Checking for agence: ${agenceName}`);
        console.log(`Location exists: ${locationExists}`);

        if (!locationExists) {
          console.log(`Adding new location for agence: ${agenceName}`);
          const newLocation = new Location(
            null,
            agenceName,
            0,
            false,
            false,
            agenceLatitude,
            agenceLongitude
          );

          this.locationService.addLocation(newLocation).subscribe({
            next: (addedLocation) => {
              this.locations.push(addedLocation);
              console.log(`Location added: ${addedLocation.name}`);
              this.refreshMarkers();
              this.refreshRoute();
              agencesToRemove.push(echangeitem.codeEchange);
              window.location.reload();
            },
            error: (error) => {
              console.error(`Failed to add location for agence: ${agenceName}`, error);
            }
          });
        }
      }
    });

    // Remove agences from validerAppelfond after all additions are complete
    agencesToRemove.forEach(codeAP => {
      const index = this.validerAppelfond.findIndex(item => item.codeAP === codeAP);
      if (index !== -1) {
        this.validerAppelfond.splice(index, 1);
      }
    });
    agencesToRemove.forEach(codeLV => {
      const index = this.validerLeveefond.findIndex(item => item.codeLV === codeLV);
      if (index !== -1) {
        this.validerAppelfond.splice(index, 1);
      }
    });
    agencesToRemove.forEach(codeEchange => {
      const index = this.validerEchange.findIndex(item => item.codeEchange === codeEchange);
      if (index !== -1) {
        this.validerEchange.splice(index, 1);
      }
    });
  }


  livraisonTerminer(): void {
    const locationsToDelete: Location[] = [];

    this.validerAppelfond.forEach(appelfondItem => {
      if (appelfondItem.livrer) {
        const agenceName = appelfondItem.responsable.agence.name;
        const agenceLatitude = appelfondItem.responsable.agence.latitude;
        const agenceLongitude = appelfondItem.responsable.agence.longitude;

        const locationToDelete = this.locations.find(location =>
          location.name === agenceName &&
          location.latitude === agenceLatitude &&
          location.longitude === agenceLongitude
        );

        if (locationToDelete) {
          locationsToDelete.push(locationToDelete);
        }
      }


    });
    this.validerLeveefond.forEach(validerLeveefondItem => {
      if (validerLeveefondItem.livrer) {
        const agenceName = validerLeveefondItem.responsable.agence.name;
        const agenceLatitude = validerLeveefondItem.responsable.agence.latitude;
        const agenceLongitude = validerLeveefondItem.responsable.agence.longitude;

        const locationToDelete = this.locations.find(location =>
          location.name === agenceName &&
          location.latitude === agenceLatitude &&
          location.longitude === agenceLongitude
        );

        if (locationToDelete) {
          locationsToDelete.push(locationToDelete);
        }
      }


    });

    locationsToDelete.forEach(location => {
      this.locationService.deleteLocation(location.id).subscribe({
        next: () => {
          this.locations = this.locations.filter(loc => loc.id !== location.id);
          console.log(`Location deleted: ${location.name}`);

        },
        error: (error) => {
          console.error(`Failed to delete location: ${location.name}`, error);
        }
      });
    });


    this.validerMAD.forEach(validerMADItem => {
      if (validerMADItem.livrer) {
        const agenceName = validerMADItem.responsable.agence.name;
        const agenceLatitude = validerMADItem.responsable.agence.latitude;
        const agenceLongitude = validerMADItem.responsable.agence.longitude;

        const locationToDelete = this.locations.find(location =>
          location.name === agenceName &&
          location.latitude === agenceLatitude &&
          location.longitude === agenceLongitude
        );

        if (locationToDelete) {
          locationsToDelete.push(locationToDelete);
        }
      }


    });

    locationsToDelete.forEach(location => {
      this.locationService.deleteLocation(location.id).subscribe({
        next: () => {
          this.locations = this.locations.filter(loc => loc.id !== location.id);
          console.log(`Location deleted: ${location.name}`);

        },
        error: (error) => {
          console.error(`Failed to delete location: ${location.name}`, error);
        }
      });
    });
    this.validerEchange.forEach(validerEchangeitem => {
      if (validerEchangeitem.livrer) {
        const agenceName = validerEchangeitem.responsable.agence.name;
        const agenceLatitude = validerEchangeitem.responsable.agence.latitude;
        const agenceLongitude = validerEchangeitem.responsable.agence.longitude;

        const locationToDelete = this.locations.find(location =>
          location.name === agenceName &&
          location.latitude === agenceLatitude &&
          location.longitude === agenceLongitude
        );

        if (locationToDelete) {
          locationsToDelete.push(locationToDelete);
        }
      }


    });

    locationsToDelete.forEach(location => {
      this.locationService.deleteLocation(location.id).subscribe({
        next: () => {
          this.locations = this.locations.filter(loc => loc.id !== location.id);
          console.log(`Location deleted: ${location.name}`);

        },
        error: (error) => {
          console.error(`Failed to delete location: ${location.name}`, error);
        }
      });
    });

    // Clear the validerAppelfond list after deleting locations
    this.validerAppelfond = [];
    this.validerLeveefond = [];
    this.validerEchange = [];
    this.validerMAD = [];

    window.location.reload();

  }
  refreshMarkers(): void {
    // Clear existing markers
    this.map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        this.map.removeLayer(layer);
      }
    });

    // Add markers again
    this.addMarkers();
  }

  refreshRoute(): void {
    // Remove existing route
    this.map.eachLayer((layer) => {
      if (layer instanceof L.Routing.Control) {
        this.map.removeControl(layer);
      }
    });

    // Add route again
    this.addRouteToMap();
  }
}

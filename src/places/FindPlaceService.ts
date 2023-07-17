import { Client, PlaceInputType } from '@googlemaps/google-maps-services-js';

export interface FindPlaceOptions {
  fields?: string[];
}

export class FindPlaceService {
  client: Client;
  key: string;
  fields: string[] = ['name'];

  constructor(opts: FindPlaceOptions = {}) {
    this.client = new Client({});
    this.key = String(process.env.GOOGLE_MAPS_API_KEY || '');
    this.fields = opts.fields || this.fields;
  }

  async findPlaceDetails(search: string) {
    const placeIdRes = await this.searchPlaceId(search);

    const placeId = placeIdRes.data.candidates[0]?.place_id;

    if (placeIdRes.data.status !== 'OK' || !placeId) {
      return null;
    }

    const placeDetails = await this.searchPlaceDetails(placeId);

    if (placeDetails.data.status !== 'OK') {
      return null;
    }

    return placeDetails.data.result;
  }

  protected searchPlaceId(search: string) {
    return this.client.findPlaceFromText({
      params: {
        input: search,
        inputtype: PlaceInputType.textQuery,
        fields: ['place_id'],
        key: this.key,
      },
    });
  }

  protected searchPlaceDetails(place_id: string) {
    return this.client.placeDetails({
      params: {
        place_id,
        key: this.key,
        fields: this.fields,
      },
    });
  }
}

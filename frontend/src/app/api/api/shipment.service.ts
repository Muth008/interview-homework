/**
 * Warehouse API
 * API endpoints for a warehouse services documented on swagger
 *
 * The version of the OpenAPI document: 1.0.0
 * Contact: jorge.sindelar@gmail.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent, HttpParameterCodec, HttpContext 
        }       from '@angular/common/http';
import { CustomHttpParameterCodec }                          from '../encoder';
import { Observable }                                        from 'rxjs';

// @ts-ignore
import { Shipment } from '../model/shipment';
// @ts-ignore
import { ShipmentCreate } from '../model/shipmentCreate';
// @ts-ignore
import { ShipmentUpdate } from '../model/shipmentUpdate';
// @ts-ignore
import { ValidationError } from '../model/validationError';

// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';



@Injectable({
  providedIn: 'root'
})
export class ShipmentService {

    protected basePath = '';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();
    public encoder: HttpParameterCodec;

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string|string[], @Optional() configuration: Configuration) {
        if (configuration) {
            this.configuration = configuration;
        }
        if (typeof this.configuration.basePath !== 'string') {
            const firstBasePath = Array.isArray(basePath) ? basePath[0] : undefined;
            if (firstBasePath != undefined) {
                basePath = firstBasePath;
            }

            if (typeof basePath !== 'string') {
                basePath = this.basePath;
            }
            this.configuration.basePath = basePath;
        }
        this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
    }


    // @ts-ignore
    private addToHttpParams(httpParams: HttpParams, value: any, key?: string): HttpParams {
        if (typeof value === "object" && value instanceof Date === false) {
            httpParams = this.addToHttpParamsRecursive(httpParams, value);
        } else {
            httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
        }
        return httpParams;
    }

    private addToHttpParamsRecursive(httpParams: HttpParams, value?: any, key?: string): HttpParams {
        if (value == null) {
            return httpParams;
        }

        if (typeof value === "object") {
            if (Array.isArray(value)) {
                (value as any[]).forEach( elem => httpParams = this.addToHttpParamsRecursive(httpParams, elem, key));
            } else if (value instanceof Date) {
                if (key != null) {
                    httpParams = httpParams.append(key, (value as Date).toISOString().substring(0, 10));
                } else {
                   throw Error("key may not be null if value is Date");
                }
            } else {
                Object.keys(value).forEach( k => httpParams = this.addToHttpParamsRecursive(
                    httpParams, value[k], key != null ? `${key}.${k}` : k));
            }
        } else if (key != null) {
            httpParams = httpParams.append(key, value);
        } else {
            throw Error("key may not be null if value is not object or array");
        }
        return httpParams;
    }

    /**
     * Delete a shipment
     * Delete a shipment from the database.
     * @param id The shipment\&#39;s ID to delete.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiShipmentDelete(id: number, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<Shipment>;
    public apiShipmentDelete(id: number, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<Shipment>>;
    public apiShipmentDelete(id: number, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<Shipment>>;
    public apiShipmentDelete(id: number, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling apiShipmentDelete.');
        }

        let localVarQueryParameters = new HttpParams({encoder: this.encoder});
        if (id !== undefined && id !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>id, 'id');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        let localVarPath = `/api/shipment/`;
        return this.httpClient.request<Shipment>('delete', `${this.configuration.basePath}${localVarPath}`,
            {
                context: localVarHttpContext,
                params: localVarQueryParameters,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get a shipment
     * Retrieve a single shipment by its ID from the database.
     * @param id The shipment\&#39;s ID.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiShipmentGet(id: number, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<Shipment>;
    public apiShipmentGet(id: number, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<Shipment>>;
    public apiShipmentGet(id: number, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<Shipment>>;
    public apiShipmentGet(id: number, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling apiShipmentGet.');
        }

        let localVarQueryParameters = new HttpParams({encoder: this.encoder});
        if (id !== undefined && id !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>id, 'id');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        let localVarPath = `/api/shipment/`;
        return this.httpClient.request<Shipment>('get', `${this.configuration.basePath}${localVarPath}`,
            {
                context: localVarHttpContext,
                params: localVarQueryParameters,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Lists all shipments
     * Retrieve a list of all shipments from the database based on input filter data.
     * @param shipment 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiShipmentListPost(shipment?: Shipment, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<Array<Shipment>>;
    public apiShipmentListPost(shipment?: Shipment, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<Array<Shipment>>>;
    public apiShipmentListPost(shipment?: Shipment, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<Array<Shipment>>>;
    public apiShipmentListPost(shipment?: Shipment, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {

        let localVarHeaders = this.defaultHeaders;

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        let localVarPath = `/api/shipment/list`;
        return this.httpClient.request<Array<Shipment>>('post', `${this.configuration.basePath}${localVarPath}`,
            {
                context: localVarHttpContext,
                body: shipment,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Create a shipment
     * Create a new shipment in the database.
     * @param shipmentCreate 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiShipmentPost(shipmentCreate: ShipmentCreate, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<Shipment>;
    public apiShipmentPost(shipmentCreate: ShipmentCreate, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<Shipment>>;
    public apiShipmentPost(shipmentCreate: ShipmentCreate, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<Shipment>>;
    public apiShipmentPost(shipmentCreate: ShipmentCreate, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (shipmentCreate === null || shipmentCreate === undefined) {
            throw new Error('Required parameter shipmentCreate was null or undefined when calling apiShipmentPost.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        let localVarPath = `/api/shipment/`;
        return this.httpClient.request<Shipment>('post', `${this.configuration.basePath}${localVarPath}`,
            {
                context: localVarHttpContext,
                body: shipmentCreate,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Update a shipment
     * Update an existing shipment in the database.
     * @param shipmentUpdate 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiShipmentPut(shipmentUpdate: ShipmentUpdate, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<Shipment>;
    public apiShipmentPut(shipmentUpdate: ShipmentUpdate, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<Shipment>>;
    public apiShipmentPut(shipmentUpdate: ShipmentUpdate, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<Shipment>>;
    public apiShipmentPut(shipmentUpdate: ShipmentUpdate, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (shipmentUpdate === null || shipmentUpdate === undefined) {
            throw new Error('Required parameter shipmentUpdate was null or undefined when calling apiShipmentPut.');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        let localVarPath = `/api/shipment/`;
        return this.httpClient.request<Shipment>('put', `${this.configuration.basePath}${localVarPath}`,
            {
                context: localVarHttpContext,
                body: shipmentUpdate,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}

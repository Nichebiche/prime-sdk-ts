/**
 * Copyright 2024-present Coinbase Global, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { CoinbaseCallOptions, Method } from '@coinbase-sample/core-ts';
import { CoinbasePrimeClient } from '../client';
import {
  CoinbasePrimeClientException,
  CoinbasePrimeException,
} from '../errors';
import {
  ListAddressBooksRequest,
  ListAddressBooksResponse,
  CreateAddressBookRequest,
  CreateAddressBookResponse,
} from './types';

export interface IAddressBooksService {
  listAddressBooks(
    request: ListAddressBooksRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    | ListAddressBooksResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  >;

  createAddressBook(
    request: CreateAddressBookRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    | CreateAddressBookResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  >;
}

export class AddressBooksService implements IAddressBooksService {
  private client: CoinbasePrimeClient;

  constructor(client: CoinbasePrimeClient) {
    this.client = client;
  }

  async listAddressBooks(
    request: ListAddressBooksRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    | ListAddressBooksResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  > {
    const queryParams = { ...request, portfolioId: undefined };
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/address_book`,
      queryParams,
      callOptions: options,
    });

    return response.data as ListAddressBooksResponse;
  }

  async createAddressBook(
    request: CreateAddressBookRequest,
    options?: CoinbaseCallOptions
  ): Promise<
    | CreateAddressBookResponse
    | CoinbasePrimeClientException
    | CoinbasePrimeException
  > {
    const bodyParams = { ...request, portfolioId: undefined };
    const response = await this.client.request({
      url: `portfolios/${request.portfolioId}/address_book`,
      bodyParams,
      method: Method.POST,
      callOptions: options,
    });

    return response.data as CreateAddressBookResponse;
  }
}

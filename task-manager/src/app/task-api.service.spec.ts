/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TaskApiService } from './task-api.service';

describe('Service: TaskApi', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskApiService]
    });
  });

  it('should ...', inject([TaskApiService], (service: TaskApiService) => {
    expect(service).toBeTruthy();
  }));
});

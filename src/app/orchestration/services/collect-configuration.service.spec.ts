import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { CollectConfigurationService } from './collect-configuration.service';
import { CollectConfiguration } from '../models/orchestration.model';

describe('CollectConfigurationService', () => {
  let service: CollectConfigurationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(CollectConfigurationService);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('createOne', () => {
    it('should POST to the API and return the created configuration', async () => {
      const config: CollectConfiguration = { Id: '1', name: 'Test', startDate: null, timespan: 1, active: false };
      const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
        json: () => Promise.resolve(config)
      } as Response);

      const result = await service.createOne(config);

      expect(fetchSpy).toHaveBeenCalledWith(
        expect.stringContaining('/api/collect-configuration'),
        expect.objectContaining({ method: 'POST', body: JSON.stringify(config) })
      );
      expect(result).toEqual(config);
    });
  });

  describe('deleteOne', () => {
    it('should send a DELETE request with the id', async () => {
      const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue({} as Response);

      await service.deleteOne('abc-123');

      expect(fetchSpy).toHaveBeenCalledWith(
        expect.stringContaining('/api/collect-configuration/abc-123'),
        expect.objectContaining({ method: 'DELETE' })
      );
    });
  });
});

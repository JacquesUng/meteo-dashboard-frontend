import { TestBed } from '@angular/core/testing';
import { TaskService } from './task.service';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskService);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('schedule', () => {
    it('should POST to the API with the configId', async () => {
      const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue({} as Response);

      await service.schedule('config-123');

      expect(fetchSpy).toHaveBeenCalledWith(
        expect.stringContaining('/api/task'),
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ collectConfigId: 'config-123' })
        })
      );
    });
  });

  describe('delete', () => {
    it('should send a DELETE request with the configId', async () => {
      const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue({} as Response);

      await service.delete('config-456');

      expect(fetchSpy).toHaveBeenCalledWith(
        expect.stringContaining('/api/task/config-456'),
        expect.objectContaining({ method: 'DELETE' })
      );
    });
  });
});

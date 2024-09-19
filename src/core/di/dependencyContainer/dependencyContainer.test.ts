import { describe, it, expect, beforeEach } from 'vitest';
import { DependencyContainer } from './dependencyContainer';

describe('DependencyContainer', () => {
    let container: DependencyContainer;

    beforeEach(() => {
        container = new DependencyContainer();
    });

    it('should register and resolve a singleton instance', () => {
        class TestService {
            value = 42;
        }

        const serviceInstance = new TestService();
        container.registerSingleton<TestService>('TestService', serviceInstance);

        const resolvedInstance = container.resolve<TestService>('TestService');

        expect(resolvedInstance).toBe(serviceInstance);
        expect(resolvedInstance.value).toBe(42);
    });

    it('should throw an error when resolving an unregistered service', () => {
        expect(() => {
            container.resolve('NonExistentService');
        }).toThrowError('Service NonExistentService not found.');
    });
});

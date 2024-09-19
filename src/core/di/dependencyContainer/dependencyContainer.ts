export class DependencyContainer {
    private services = new Map<string, unknown>();

    registerSingleton<T>(serviceName: string, instance: T) {
        this.services.set(serviceName, instance);
    }

    resolve<T>(serviceName: string): T {
        const instance = this.services.get(serviceName);
        if (!instance) {
            throw new Error(`Service ${serviceName} not found.`);
        }
        return instance as T;
    }
}

export const container = new DependencyContainer();

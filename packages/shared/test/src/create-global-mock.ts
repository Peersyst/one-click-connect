import { TypeKeys } from "@swisstype/essential";
import { MethodMock } from "./method-mock";
import { ExtendedMock, Mock, MockMethods } from "./mock";

// TODO: Replace with MethodData to support properties

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export type MockDataMethods<C extends object> = Pick<
    MockMethods<keyof C>,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    TypeKeys<C, (...args: any[]) => any>
>;

/**
 * Creates a global mock.
 * @param obj Object to mock globally.
 * @param data Mocked methods.
 * @returns The global mock.
 */
export function createGlobalMock<C extends object>(
    obj: C,
    data: MockDataMethods<C>,
): {
    new (customData?: Partial<MockDataMethods<C>>): ExtendedMock<C, jest.SpyInstance>;
} {
    const mock = class extends Mock {
        constructor(customData: Partial<MockDataMethods<C>> = {}) {
            super();
            for (const [key, item] of Object.entries(data)) {
                if (item instanceof MethodMock) {
                    const usedMethod = customData?.[key as keyof MockDataMethods<C>] || item;
                    (this as any)[key] = jest.spyOn(obj, key as any)[usedMethod.type](usedMethod.value);
                } else {
                    // TODO: Support properties
                }
            }
        }
    };

    return mock as {
        new (customData?: Partial<MockDataMethods<C>>): ExtendedMock<C, jest.SpyInstance>;
    };
}

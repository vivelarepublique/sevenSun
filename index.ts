interface RGB {
    r: number;
    g: number;
    b: number;
    a?: number;
}

interface HEX {
    rgb?: string;
    rgba?: string;
}

abstract class sevenSun {
    public static readonly red: string = '#FF0000';
    public static readonly orange: string = '#FFA500';
    public static readonly yellow: string = '#FFFF00';
    public static readonly green: string = '#008002';
    public static readonly cyan: string = '#03FFFF';
    public static readonly blue: string = '#0000FF';
    public static readonly purple: string = '#800080';

    private static _calculateArray(array: number[]): string {
        try {
            let prefix = '#';
            for (let i = 0; i < array.length; i++) {
                if (typeof array[i] !== 'number') {
                    throw new Error(`Incorrect parameter type passed in`);
                } else {
                    if (i < 3) {
                        prefix += this._calculateHEX(array[i]);
                    } else if (i === 3) {
                        prefix += this._calculateHEX(array[i], 'a');
                    }
                }
            }
            return prefix;
        } catch (error) {
            throw error;
        }
    }

    private static _calculateHEX(value: number, type?: string): string {
        try {
            if (typeof value !== 'number') {
                throw new Error(`Incorrect parameter type passed in`);
            } else {
                if (type === 'a') {
                    if (value < 0 || value > 1) {
                        throw new Error(`The alpha value is not in the proper range`);
                    } else {
                        let hex = Math.round(value * 255)
                            .toString(16)
                            .toUpperCase();
                        return hex.length === 1 ? '0' + hex : hex.length > 2 ? hex.substring(0, 2) : hex;
                    }
                } else {
                    if (value > 255) {
                        throw new Error(`RGB values out of range`);
                    } else {
                        let hex = value.toString(16).toUpperCase();
                        return hex.length === 1 ? '0' + hex : hex;
                    }
                }
            }
        } catch (error) {
            throw error;
        }
    }

    public static toHEX(v1: RGB | string | number[] | number, v2?: number, v3?: number, v4?: number): string {
        try {
            if (typeof v1 === 'string') {
                const matchResult = v1.match(/(?<=(rgb\()?)\d{1,3}\,\s?\d{1,3}\,\s?\d{1,3}\,\s?((0\.[0-9]{1,2})|(1))/g);
                const rgbString = matchResult === null ? v1.match(/(?<=(rgb\()?)\d{1,3}\,\s?\d{1,3}\,\s?\d{1,3}/g) : matchResult;
                if (!rgbString) {
                    throw new Error(`Not enough RGB values found at ${v1}`);
                } else {
                    const rgbNumber = rgbString[0].split(',').map(value => parseFloat(value));
                    return this._calculateArray(rgbNumber);
                }
            } else if (typeof v1 === 'object' && !Array.isArray(v1)) {
                if (v1.hasOwnProperty('r') && v1.hasOwnProperty('g') && v1.hasOwnProperty('b')) {
                    if (!v1.hasOwnProperty('a') || !v1.a) {
                        return `#${this._calculateHEX(v1.r)}${this._calculateHEX(v1.g)}${this._calculateHEX(v1.b)}`;
                    } else {
                        return `#${this._calculateHEX(v1.r)}${this._calculateHEX(v1.g)}${this._calculateHEX(v1.b)}${this._calculateHEX(v1.a, 'a')}`;
                    }
                } else {
                    throw new Error(`Inappropriate object passed in`);
                }
            } else if (typeof v1 === 'object' && Array.isArray(v1)) {
                if (v1.length !== 3 && v1.length !== 4) {
                    throw new Error(`Array of incorrect length passed in`);
                } else {
                    return this._calculateArray(v1);
                }
            } else if (typeof v1 === 'number' && typeof v2 === 'number' && typeof v3 === 'number') {
                if (v4 && typeof v4 === 'number') {
                    return `#${this._calculateHEX(v1)}${this._calculateHEX(v2)}${this._calculateHEX(v3)}${this._calculateHEX(v4, 'a')}`;
                } else {
                    return `#${this._calculateHEX(v1)}${this._calculateHEX(v2)}${this._calculateHEX(v3)}`;
                }
            } else {
                throw new Error(`Unknown parameter type`);
            }
        } catch (error) {
            console.error(error);
        }

        return '';
    }
}

export { sevenSun };

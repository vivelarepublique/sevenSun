interface RGB<T, U, V, W> {
    r: T;
    g: U;
    b: V;
    a?: W;
}

type color = string | number;

abstract class sevenSun {
    public static readonly red: string = '#FF0000';
    public static readonly orange: string = '#FFA500';
    public static readonly yellow: string = '#FFFF00';
    public static readonly green: string = '#008002';
    public static readonly cyan: string = '#03FFFF';
    public static readonly blue: string = '#0000FF';
    public static readonly purple: string = '#800080';

    private static _calculateArray(array: color[]): string {
        try {
            let prefix = '#';
            for (let i = 0; i < array.length; i++) {
                if (typeof array[i] !== 'number' && typeof array[i] !== 'string') {
                    throw new Error(`Incorrect parameter type passed in`);
                } else {
                    if (i < 3) {
                        prefix += this._calculateHEX(array[i]);
                    } else if (i === 3) {
                        prefix += this._calculateHEX(array[i], true);
                    }
                }
            }
            return prefix;
        } catch (error) {
            throw error;
        }
    }

    private static _calculateHEX(value: color, alpha?: boolean): string {
        try {
            if (typeof value !== 'number' && typeof value !== 'string') {
                throw new Error(`Incorrect parameter type passed in`);
            } else {
                value = typeof value === 'number' ? value : Number.parseFloat(value);
                if (alpha) {
                    if (value < 0 || value > 1) {
                        throw new Error(`The alpha value is not in the proper range`);
                    } else {
                        let hex = Math.round(value * 255)
                            .toString(16)
                            .toUpperCase();
                        return hex.length === 1 ? '0' + hex : hex.length > 2 ? hex.slice(0, 2) : hex;
                    }
                } else {
                    if (value < 0 || value > 255) {
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

    public static toHEX(v1: RGB<number, number, number, number> | RGB<string, string, string, string> | string | string[] | number | number[], v2?: color, v3?: color, v4?: color): string {
        try {
            if (typeof v1 === 'string' && (!v2 || !v3)) {
                const matchResult = v1.match(/(?<=(rgb\()?)\d{1,3}\,\s?\d{1,3}\,\s?\d{1,3}\,\s?((0\.[0-9]{1,2})|(1))/g);
                const rgbString = matchResult === null ? v1.match(/(?<=(rgb\()?)\d{1,3}\,\s?\d{1,3}\,\s?\d{1,3}/g) : matchResult;
                if (!rgbString) {
                    throw new Error(`Not enough RGB values found at ${v1}`);
                } else {
                    const rgbNumber = rgbString[0].split(',').map(value => Number.parseFloat(value));
                    return this._calculateArray(rgbNumber);
                }
            } else if (typeof v1 === 'object' && !Array.isArray(v1)) {
                if (v1.hasOwnProperty('r') && v1.hasOwnProperty('g') && v1.hasOwnProperty('b')) {
                    if (!v1.hasOwnProperty('a') || !v1.a) {
                        return `#${this._calculateHEX(v1.r)}${this._calculateHEX(v1.g)}${this._calculateHEX(v1.b)}`;
                    } else {
                        return `#${this._calculateHEX(v1.r)}${this._calculateHEX(v1.g)}${this._calculateHEX(v1.b)}${this._calculateHEX(v1.a, true)}`;
                    }
                } else {
                    throw new Error(`Inappropriate object passed in`);
                }
            } else if (Array.isArray(v1)) {
                if (v1.length !== 3 && v1.length !== 4) {
                    throw new Error(`Array of incorrect length passed in`);
                } else {
                    return this._calculateArray(v1);
                }
            } else if ((typeof v1 === 'number' && typeof v2 === 'number' && typeof v3 === 'number') || (typeof v1 === 'string' && typeof v2 === 'string' && typeof v3 === 'string')) {
                if (v4 && (typeof v4 === 'number' || typeof v4 === 'string')) {
                    return `#${this._calculateHEX(v1)}${this._calculateHEX(v2)}${this._calculateHEX(v3)}${this._calculateHEX(v4, true)}`;
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

    public static toRGB(v1: string): string {
        try {
            const value = v1.match(/\w+/g);
            if (!value) {
                throw new Error(`Not HEX values found at ${v1}`);
            } else {
                const bit = value[0].length;
                if (bit !== 3 && bit !== 4 && bit !== 6 && bit !== 8) {
                    throw new Error(`Parameter length error`);
                } else {
                    const array = value[0].split('');
                    let prefix = bit === 3 || bit === 6 ? 'rgb(' : 'rgba(';
                    for (let i = 0; i < bit; ) {
                        if (bit <= 4) {
                            if (i < 3) {
                                prefix += Number.parseInt(`0x${array[i]}${array[i]}`).toString() + (bit === 3 && i === 2 ? ')' : ',');
                            } else if (i === 3) {
                                prefix += (Math.round(Number.parseInt(`0x${array[i]}${array[i]}`) / 2.55) / 100).toString() + ')';
                            }
                            i++;
                        } else {
                            if (i < 6) {
                                prefix += Number.parseInt(`0x${array[i]}${array[i + 1]}`).toString() + (bit === 6 && i === 4 ? ')' : ',');
                            } else if (i === 6) {
                                prefix += (Math.round(Number.parseInt(`0x${array[i]}${array[i + 1]}`) / 2.55) / 100).toString() + ')';
                            }
                            i += 2;
                        }
                    }
                    return prefix;
                }
            }
        } catch (error) {
            console.error(error);
        }

        return '';
    }
}

export { sevenSun };

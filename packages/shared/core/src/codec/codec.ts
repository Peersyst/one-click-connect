export interface Codec<Decoded, Encoded> {
    encode(data: Decoded): Encoded;
    decode(data: Encoded): Decoded;
}

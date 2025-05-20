import { MsgErrorCodes, RelayerAPICodec } from "../../../../src/modules";
import { MsgRelaySignIn } from "../../../../src/modules/relayer/msgs";
import { RelayerAPIMock } from "../../../mocks/core/relayer-api.mock";

describe("RelaySignInMsg", () => {
    const signingURL = "https://signing.com";
    const relayerAPI = new RelayerAPIMock();
    const accountID = "example.com";

    describe("fromURL", () => {
        describe("should throw an error if accountID is not provided", () => {
            it("should throw an error if accountID is not provided", () => {
                const url = `https://example.com?signingURL=${signingURL}&relayerAPI=${relayerAPI}`;
                expect(() => MsgRelaySignIn.fromURL(url)).toThrow(MsgErrorCodes.INVALID_URL);
            });
        });

        describe("should throw an error if signingURL is not provided", () => {
            it("should throw an error if signingURL is not provided", () => {
                const url = `https://example.com?accountID=${accountID}&relayerAPI=${relayerAPI}`;
                expect(() => MsgRelaySignIn.fromURL(url)).toThrow(MsgErrorCodes.INVALID_URL);
            });
        });

        describe("should throw an error if relayerAPI is not provided", () => {
            it("should throw an error if relayerAPI is not provided", () => {
                const url = `https://example.com?accountID=${accountID}&signingURL=${signingURL}`;
                expect(() => MsgRelaySignIn.fromURL(url)).toThrow(MsgErrorCodes.INVALID_URL);
            });
        });

        describe("should create a new MsgRelaySignIn object", () => {
            it("should create a new MsgRelaySignIn object", () => {
                const url = `https://example.com?accountID=${accountID}&signingURL=${signingURL}&relayerAPI=${encodeURIComponent(RelayerAPICodec.toURLParam(relayerAPI))}`;
                const msg = MsgRelaySignIn.fromURL(url);

                expect(msg).toBeDefined();
                expect(msg.accountID).toEqual(accountID);
                expect(msg.signingURL).toEqual(signingURL);
                expect(msg.relayerAPI).toEqual(relayerAPI);
            });
        });
    });

    describe("toURL", () => {
        const baseURL = "https://example.com";
        it("should return a URL", () => {
            const msg = new MsgRelaySignIn(accountID, signingURL, relayerAPI);
            const url = msg.toURL(baseURL);
            expect(url).toEqual(
                `${baseURL}/?accountID=${accountID}&signingURL=${encodeURIComponent(signingURL)}&relayerAPI=${encodeURIComponent(RelayerAPICodec.toURLParam(relayerAPI))}`,
            );
        });
    });

    describe("get accountID", () => {
        it("should return the accountID", () => {
            const msg = new MsgRelaySignIn(accountID, signingURL, relayerAPI);
            expect(msg.accountID).toEqual(accountID);
        });
    });

    describe("get signingURL", () => {
        it("should return the signingURL", () => {
            const msg = new MsgRelaySignIn(accountID, signingURL, relayerAPI);
            expect(msg.signingURL).toEqual(signingURL);
        });
    });

    describe("get relayerAPI", () => {
        it("should return the relayerAPI", () => {
            const msg = new MsgRelaySignIn(accountID, signingURL, relayerAPI);
            expect(msg.relayerAPI).toEqual(relayerAPI);
        });
    });
});

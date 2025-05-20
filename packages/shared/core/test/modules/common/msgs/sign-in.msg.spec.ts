import { MsgErrorCodes, MsgSignIn } from "../../../../src/modules";

describe("MsgSignIn", () => {
    describe("fromURL", () => {
        describe("should throw an error if accountID is not provided", () => {
            it("should throw an error if accountID is not provided", () => {
                const url = "https://example.com?signingURL=https://example.com";
                expect(() => MsgSignIn.fromURL(url)).toThrow(MsgErrorCodes.INVALID_URL);
            });
        });

        describe("should throw an error if signingURL is not provided", () => {
            it("should throw an error if signingURL is not provided", () => {
                const url = "https://example.com?accountID=example.com";
                expect(() => MsgSignIn.fromURL(url)).toThrow(MsgErrorCodes.INVALID_URL);
            });
        });

        describe("should create a new MsgSignIn object", () => {
            it("should create a new MsgSignIn object", () => {
                const accountID = "example.com";
                const signingURL = "https://example.com";
                const url = `https://example.com?accountID=${accountID}&signingURL=${signingURL}`;

                const msg = MsgSignIn.fromURL(url);

                expect(msg).toBeDefined();
                expect(msg.accountID).toEqual(accountID);
                expect(msg.signingURL).toEqual(signingURL);
            });
        });
    });

    describe("toURL", () => {
        describe("should create a new MsgSignIn object", () => {
            it("should create a new MsgSignIn object", () => {
                const accountID = "example.com";
                const signingURL = "https://example.com";
                const encodedSigningURL = encodeURIComponent(signingURL);
                const msg = new MsgSignIn(accountID, signingURL);
                const url = msg.toURL("https://example.com");

                expect(url).toEqual(`https://example.com/?accountID=${accountID}&signingURL=${encodedSigningURL}`);
            });
        });
    });

    describe("get signingURL", () => {
        it("should return the signingURL", () => {
            const msg = new MsgSignIn("example.com", "https://example.com");
            expect(msg.signingURL).toEqual("https://example.com");
        });
    });

    describe("get accountID", () => {
        it("should return the accountID", () => {
            const msg = new MsgSignIn("example.com", "https://example.com");
            expect(msg.accountID).toEqual("example.com");
        });
    });
});

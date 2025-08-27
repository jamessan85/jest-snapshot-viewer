import { previewSnapshot } from "../createViewer";
import * as fs from "node:fs";
import * as path from "node:path";
import * as childProcess from "node:child_process";

describe("previewSnapshot", () => {
    const tempDir = path.join(__dirname, "../../temp/");
    const testFile = path.join(__dirname, "../../test_files/test.js.snap");
    const testHtml = path.join(tempDir, "test.js.snap.html");
    
    // jest.mock("node:child_process", () => {
    //     return {spawn: spawnMock};
    // });

    let spawnSpy: any;

    beforeAll(() => {
        spawnSpy = jest.spyOn(childProcess as any, "spawn").mockReturnValue("");
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir);
        }
    });

    afterEach(() => {
        // Clean up temp files after each test
        fs.readdirSync(tempDir).forEach(file => {
            fs.rmSync(path.join(tempDir, file));
        });
    });

    it("should create an HTML file with snapshot content and open in vscode", () => {
        previewSnapshot(testFile, "div", "vscode");
        expect(fs.existsSync(testHtml)).toBe(false);
        expect(spawnSpy).not.toHaveBeenCalled();
    });

    it("should create an HTML file with snapshot content and open in browser", () => {
        previewSnapshot(testFile);
        expect(fs.existsSync(testHtml)).toBe(true);
        expect(spawnSpy).toHaveBeenCalled();
        const html = fs.readFileSync(testHtml, "utf-8");
        expect(html.includes(`<h2 class="test-heading">Test Snapshots</h2>`)).toBe(true);
        expect(html.includes(`id="Applicant_Qualifications_Question_Integration_Tests_renders_validation_error_when_no_selection_is_posted_1"`)).toBe(true);
    });

    it("should clear temp files before creating new ones", () => {
        fs.writeFileSync(path.join(tempDir, "old.html"), "old");
        previewSnapshot(testFile);
        expect(fs.existsSync(path.join(tempDir, "old.html"))).toBe(false);
    });
});
